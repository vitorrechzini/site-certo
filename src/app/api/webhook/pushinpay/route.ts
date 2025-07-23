
import { NextRequest, NextResponse } from 'next/server';

// Esta é a sua URL de Webhook: https://<seu-dominio>.com/api/webhook/pushinpay
// Você deve configurar esta URL em cada link de pagamento no painel da Pushin Pay
// para os eventos de "Pagamento Aprovado".

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log('Webhook recebido da Pushin Pay:', JSON.stringify(body, null, 2));

    // A descrição do pagamento que definimos na página /gerar-pix
    // Formato esperado: "OnlyFree - Email: cliente@email.com - Plano: vitalicio - ID: XXXXXXXXXX"
    const description = body?.pix?.description || body?.description;
    const paymentStatus = body?.status;

    if (!description) {
      console.warn('Webhook recebido sem descrição.', body);
      return NextResponse.json({ status: 'error', message: 'Descrição não encontrada no payload' }, { status: 400 });
    }

    if (paymentStatus === 'paid' || paymentStatus === 'approved') {
        console.log(`Pagamento aprovado recebido. Descrição: "${description}"`);

        // A entrega do produto agora é feita diretamente pela Pushin Pay
        // com base no link de pagamento que configuramos.
        // O trabalho do webhook aqui é apenas registrar o evento, se necessário.
        // Por enquanto, apenas confirmamos o recebimento para a Pushin Pay.
        
        // Futuramente, você poderia adicionar lógicas aqui, como:
        // - Salvar os dados do cliente (email, plano) em um banco de dados para seu controle.
        // - Enviar os dados para uma planilha.
        // - Integrar com outra ferramenta de marketing.

        console.log('Webhook processado com sucesso. A entrega é gerenciada pela Pushin Pay.');

    } else {
        console.log(`Webhook recebido com status não pago: ${paymentStatus}. Descrição: "${description}"`);
    }

    // Retornamos 200 OK para a Pushin Pay saber que recebemos a notificação.
    return NextResponse.json({ status: 'success' }, { status: 200 });

  } catch (error: any) {
    console.error('Erro fatal ao processar webhook da Pushin Pay:', error);
    return NextResponse.json({ status: 'error', message: error.message }, { status: 500 });
  }
}
