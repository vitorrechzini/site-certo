import Image from 'next/image';
import Link from 'next/link';

export default function RemocaoPage() {
  return (
    <div className="bg-black text-white min-h-screen flex flex-col items-center justify-center p-4">
      <div className="max-w-4xl w-full text-center">
        <h1 className="text-3xl font-bold text-red-600 mb-8">
          Remoção de Conteúdos
        </h1>
        <div className="text-sm text-gray-300 space-y-4">
          <p>
            Todos os vídeos e fotos postados neste site são conteúdos encontrados na internet, especialmente retirados do site adulto xvideos.com. Não somos responsáveis pela criação, obtenção ou autoria de qualquer imagem ou vídeo exibido aqui. Além disso, não assumimos responsabilidade por eventuais danos que a distribuição ou reprodução do conteúdo disponibilizado no site possa causar aos autores, às pessoas envolvidas ou a qualquer indivíduo que tenha acesso ao material.
          </p>
          <p>
            Se você for o autor ou detentor dos direitos de algum conteúdo publicado aqui e deseja solicitar a sua remoção, entre em contato conosco pelo e-mail <a href="mailto:pxcvendas@gmail.com" className="underline text-red-500">pxcvendas@gmail.com</a>. Para que possamos atender sua solicitação, por favor, inclua as seguintes informações:
          </p>
          <div className="text-left inline-block mx-auto my-4 space-y-2">
            <p>- URL do conteúdo publicado</p>
            <p>- Motivo do pedido de remoção</p>
          </div>
          <p>
            Estamos comprometidos em analisar todas as solicitações de forma responsável e em conformidade com as regulamentações aplicáveis.
          </p>
        </div>
        <div className="flex items-center justify-center w-full my-8">
            <Link href="/">
                <Image
                    src="/logo.png"
                    alt="OnlyFree Logo"
                    width={200}
                    height={50}
                    style={{ objectFit: 'contain' }}
                />
            </Link>
        </div>
      </div>
    </div>
  );
}