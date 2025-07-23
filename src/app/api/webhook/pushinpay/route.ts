
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { doc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore';

// Esta é a sua URL de Webhook: https://<seu-dominio>.com/api/webhook/pushinpay
// Você deve configurar esta URL em cada link de pagamento no painel da Pushin Pay.

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

        // 2. Apaga o documento do Firestore após a confirmação
        await deleteDoc(transactionRef);
        console.log(`Transação ${transactionId} finalizada e removida do banco de dados.`);

    } else {
        console.log(`Webhook recebido para transação ${transactionId} com status não pago: ${paymentStatus}`);
    }

    return NextResponse.json({ status: 'success' }, { status: 200 });

  } catch (error: any) {
    console.error('Erro fatal ao processar webhook da Pushin Pay:', error);
    return NextResponse.json({ status: 'error', message: error.message }, { status: 500 });
  }
}
