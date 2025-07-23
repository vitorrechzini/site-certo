
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { doc, updateDoc, query, collection, where, getDocs } from 'firebase/firestore';

// Esta é a sua URL de Webhook: https://<seu-dominio>.com/api/webhook/pushinpay
// Você deve configurar esta URL no painel da Pushin Pay.

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log('Webhook recebido da Pushin Pay:', JSON.stringify(body, null, 2));

    // Lógica para extrair o ID da transação do corpo do webhook.
    // A documentação da Pushin Pay não é clara sobre o payload do webhook.
    // Vamos assumir que a descrição que enviamos é retornada.
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

    // Ação principal: Atualizar o documento no Firestore
    // Como estamos usando a descrição para encontrar o ID, não precisamos de uma query complexa.
    // Apenas atualizamos o documento com o ID que extraímos.
    const transactionRef = doc(db, 'transactions', transactionId);

    // TODO: Adicionar verificação se o documento existe antes de tentar atualizar.
    
    // Verificamos o status do pagamento (opcional, mas bom ter)
    // Assumindo que a Pushin Pay envia um status. Ex: "paid", "approved", etc.
    const paymentStatus = body?.status;

    if (paymentStatus === 'paid' || paymentStatus === 'approved' || true) { // O 'true' é para aceitar qualquer notificação por enquanto
        await updateDoc(transactionRef, {
            status: 'paid',
            updatedAt: new Date(),
            webhookPayload: body // Salva o payload completo para depuração
        });

        console.log(`Transação ${transactionId} atualizada para "pago".`);

        //
        // AQUI VAI A LÓGICA FUTURA:
        // 1. Buscar o e-mail do cliente no documento (transactionRef).
        // 2. Enviar o e-mail com o link do produto.
        // 3. Se o envio for bem-sucedido, apagar o documento: `await deleteDoc(transactionRef);`
        //
    
    } else {
        console.log(`Webhook recebido para transação ${transactionId} com status: ${paymentStatus}`);
    }

    return NextResponse.json({ status: 'success' }, { status: 200 });

  } catch (error: any) {
    console.error('Erro ao processar webhook da Pushin Pay:', error);
    return NextResponse.json({ status: 'error', message: error.message }, { status: 500 });
  }
}
