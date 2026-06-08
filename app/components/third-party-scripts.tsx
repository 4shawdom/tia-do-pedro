"use client";

import { useEffect } from "react";

// Meta Pixel NOVO — Casa da Chita / Faça Você Mesma 3.0
const META_PIXEL_ID = "1536814544717090";

// Microsoft Clarity — heatmaps + session replay
const CLARITY_PROJECT_ID = "wtejljm2z9";

let injected = false;

function injectScripts() {
  if (injected) return;
  injected = true;

  // Meta Pixel
  const fbq = document.createElement("script");
  fbq.id = "meta-pixel";
  fbq.innerHTML = `
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '${META_PIXEL_ID}');
fbq('track', 'PageView');
`;
  document.body.appendChild(fbq);

  // Microsoft Clarity
  const clarity = document.createElement("script");
  clarity.id = "ms-clarity";
  clarity.innerHTML = `
(function(c,l,a,r,i,t,y){
    c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
    t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
    y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
})(window, document, "clarity", "script", "${CLARITY_PROJECT_ID}");
`;
  document.body.appendChild(clarity);

  // Utmify — captura e persiste UTMs por toda a sessão
  const utmify = document.createElement("script");
  utmify.id = "utmify";
  utmify.src = "https://cdn.utmify.com.br/scripts/utms/latest.js";
  utmify.async = true;
  utmify.setAttribute("data-utmify-prevent-xcod-sck", "");
  utmify.setAttribute("data-utmify-prevent-subids", "");
  document.body.appendChild(utmify);
}

/**
 * Carrega Pixel + Clarity + Utmify só na primeira interação (ou após
 * um tempo de segurança) — em vez de no carregamento da página.
 *
 * Por quê: esses 3 scripts somavam ~900ms de "Script Evaluation" na
 * thread principal logo no início do carregamento, atrasando o LCP
 * (o <h1> do Hero) em ~1,2s observados (~5s no mobile simulado pelo
 * Lighthouse, que aplica 4x de CPU throttling). Adiando pra depois da
 * interação, esse trabalho sai do caminho crítico do LCP sem perder
 * rastreamento — quase todo visitante rola/toca a tela em menos de 1s,
 * e o timeout garante que o PageView ainda dispara pra quem não interage.
 */
export default function ThirdPartyScripts() {
  useEffect(() => {
    const events: Array<keyof WindowEventMap> = [
      "pointerdown",
      "touchstart",
      "keydown",
      "scroll",
    ];

    const trigger = () => {
      injectScripts();
      cleanup();
    };

    const cleanup = () => {
      events.forEach((e) => window.removeEventListener(e, trigger));
      clearTimeout(timer);
    };

    events.forEach((e) =>
      window.addEventListener(e, trigger, { passive: true, once: true })
    );
    const timer = setTimeout(trigger, 4000);

    return cleanup;
  }, []);

  return null;
}
