
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { doc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { Resend } from 'resend';

// Esta é a sua URL de Webhook: https://<seu-dominio>.com/api/webhook/pushinpay
// Você deve configurar esta URL em cada link de pagamento no painel da Pushin Pay.

const resend = new Resend(process.env.RESEND_API_KEY);
const FROM_EMAIL = process.env.FROM_EMAIL || 'onboarding@resend.dev'; // Use um e-mail verificado no Resend

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log('Webhook recebido da Pushin Pay:', JSON.stringify(body, null, 2));

    // A Pushin Pay envia a descrição que usamos ao criar o pagamento.
    // Ex: "Acesso OnlyFree - ID: XXXXXXXXXX"
    const description = body?.pix?.description || body?.description;
    
    if (!description || !description.includes('Acesso OnlyFree - ID:')) {
      console.warn('Webhook recebido sem a descrição esperada.', body);
      return NextResponse.json({ status: 'error', message: 'Descrição não encontrada no payload' }, { status: 400 });
    }

    const transactionId = description.split('ID: ')[1];

    if (!transactionId) {
        console.error('Não foi possível extrair o transactionId da descrição:', description);
        return NextResponse.json({ status: 'error', message: 'ID da transação não extraído' }, { status: 400 });
    }

    const transactionRef = doc(db, 'transactions', transactionId);
    const transactionSnap = await getDoc(transactionRef);

    if (!transactionSnap.exists()) {
        console.error(`Transação com ID ${transactionId} não encontrada no Firestore.`);
        return NextResponse.json({ status: 'error', message: 'Transação não encontrada' }, { status: 404 });
    }

    const transactionData = transactionSnap.data();
    const customerEmail = transactionData.email;
    
    // Verificamos o status do pagamento.
    // O status "paid" ou "approved" confirma o pagamento.
    const paymentStatus = body?.status;

    if (paymentStatus === 'paid' || paymentStatus === 'approved') {
        // 1. Atualiza o status para "paid"
        await updateDoc(transactionRef, {
            status: 'paid',
            updatedAt: new Date(),
            webhookPayload: body 
        });
        console.log(`Transação ${transactionId} atualizada para "pago".`);

        // 2. Envia o e-mail para o cliente com o link do produto
        try {
            await resend.emails.send({
                from: `OnlyFree <${FROM_EMAIL}>`,
                to: [customerEmail],
                subject: '✅ Acesso Liberado! Seu conteúdo OnlyFree está aqui.',
                html: `
                    <h1>Seja bem-vindo(a)!</h1>
                    <p>Seu pagamento foi confirmado com sucesso.</p>
                    <p>Para acessar seu conteúdo exclusivo, clique no link abaixo:</p>
                    <a href="https://t.me/+oFYc4k3NfqJhMWQx" style="display: inline-block; padding: 12px 24px; background-color: #007bff; color: white; text-decoration: none; border-radius: 5px; font-weight: bold;">Acessar meu conteúdo</a>
                    <p>Qualquer dúvida, responda a este e-mail.</p>
                `,
            });
            console.log(`E-mail de boas-vindas enviado para ${customerEmail}.`);

            // 3. (Opcional, mas recomendado) Apaga o documento do Firestore após o envio bem-sucedido
            await deleteDoc(transactionRef);
            console.log(`Transação ${transactionId} finalizada e removida do banco de dados.`);

        } catch (emailError: any) {
             console.error(`Falha ao enviar e-mail para ${customerEmail} na transação ${transactionId}:`, emailError);
             // Não retornamos erro aqui, pois o pagamento foi processado.
             // A transação permanecerá no banco para uma tentativa manual de reenvio.
        }

    } else {
        console.log(`Webhook recebido para transação ${transactionId} com status não pago: ${paymentStatus}`);
    }

    return NextResponse.json({ status: 'success' }, { status: 200 });

  } catch (error: any) {
    console.error('Erro fatal ao processar webhook da Pushin Pay:', error);
    return NextResponse.json({ status: 'error', message: error.message }, { status: 500 });
  }
}
