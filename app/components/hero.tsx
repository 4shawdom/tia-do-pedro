import Image from "next/image";
import dynamic from "next/dynamic";
import {
  Secao,
  Manuscrita,
  TituloEditorial,
  Destaque,
  BotaoCta,
  FotoEmoldurada,
  Selo,
} from "./marca";

// Decorativos — só carrega depois do LCP via dynamic
const Magnet = dynamic(() => import("./animations/magnet"));

export default function Hero() {
 return (
 <Secao fundo="paper" padding="hero" largura="wide" priority>
 <div className="grid md:grid-cols-2 gap-12 items-center">

 {/* Sem animação de entrada aqui: é a seção do LCP — opacity:0 no estado
     inicial atrasa o "render time" reportado pelo Lighthouse/Chrome em
     até ~0,9s–1,2s (a animação fade-up só é considerada "pintada" quando
     a opacidade chega em 1). */}
 <div>
 <div className="flex items-center gap-4 mb-7">
 <Image
   src="/logo/casa-da-chita-logo.png"
   alt="Casa da Chita"
   width={84}
   height={84}
   priority
   className="object-contain flex-shrink-0"
 />
 <div className="flex flex-col">
 <Manuscrita tamanho="md" cor="vermelho-chita" className="leading-none mb-1">
 Olá, querida ✿
 </Manuscrita>
 <span className="text-[11px] tracking-[0.3em] uppercase text-azul-royal/70 font-medium">
 Curso da Casa da Chita
 </span>
 </div>
 </div>

 <TituloEditorial as="h1" tamanho="xl" leading="tight" className="mb-6">
 Em 7 dias, sua primeira bolsa bordada.
 <br />
 <Destaque>Mesmo que você nunca tenha pegado uma agulha.</Destaque>
 </TituloEditorial>

 <p className="text-lg md:text-xl text-tinta-suave leading-relaxed mb-9 max-w-xl">
 Aulas em vídeo, no seu ritmo, com a Jacira te guiando do risco até o acabamento.
 </p>

 <BotaoCta href="#metodo" pulse>
 Quero fazer a minha primeira bolsa
 </BotaoCta>

 <div className="mt-9 flex flex-wrap gap-x-6 gap-y-3 text-sm text-tinta-suave">
 <span className="flex items-center gap-2">🪡 Acesso imediato</span>
 <span className="flex items-center gap-2">🧵 14 dias de garantia</span>
 <span className="flex items-center gap-2">🏠 +1.000 alunas</span>
 </div>
 </div>

 <div className="relative">
 <FotoEmoldurada
 src="/fotos/jacira-loja-bolsa-colorida.jpg"
 alt="Jacira na loja da Casa da Chita segurando uma bolsa bordada"
 aspect="4-5"
 corMoldura="creme"
 prioridade
 />
 <div className="absolute -bottom-5 -left-6 z-10">
 <Magnet padding={120} strength={4}>
 <Selo>feito à mão, ensinado com afeto</Selo>
 </Magnet>
 </div>
 </div>

 </div>
 </Secao>
 );
}
