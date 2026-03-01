// ============================================================
// VOLT Sleep — Marketing Pixel Integration
// ============================================================
// TikTok Pixel + Meta (Facebook) Pixel.
// Only fires when user has given marketing consent (GDPR).
// ============================================================

import { isMarketingAllowed } from '../gdpr/consent'

/**
 * Initialize marketing pixels.
 * Call once on app mount, after consent check.
 */
export function initPixels(): void {
  if (typeof window === 'undefined') return
  if (!isMarketingAllowed()) return

  initTikTokPixel()
  initMetaPixel()
}

/**
 * Track a conversion event across all active pixels.
 */
export function trackPixelEvent(
  event: 'ViewContent' | 'CompleteRegistration' | 'Subscribe' | 'InitiateCheckout',
  data?: Record<string, string | number>,
): void {
  if (typeof window === 'undefined') return
  if (!isMarketingAllowed()) return

  trackTikTokEvent(event, data)
  trackMetaEvent(event, data)
}

// --- TikTok Pixel ---

function initTikTokPixel(): void {
  const pixelId = process.env.NEXT_PUBLIC_TIKTOK_PIXEL_ID
  if (!pixelId) return

  // TikTok pixel snippet (standard init)
  const w = window as any
  if (w.ttq) return // Already initialized

  const script = document.createElement('script')
  script.innerHTML = `
    !function(w,d,t){
      w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];
      ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie"];
      ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};
      for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);
      ttq.instance=function(t){for(var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e};
      ttq.load=function(e,n){var i="https://analytics.tiktok.com/i18n/pixel/events.js";
      ttq._i=ttq._i||{};ttq._i[e]=[];ttq._i[e]._u=i;ttq._t=ttq._t||{};
      ttq._t[e]=+new Date;ttq._o=ttq._o||{};ttq._o[e]=n||{};
      var o=document.createElement("script");o.type="text/javascript";o.async=!0;o.src=i+"?sdkid="+e+"&lib="+t;
      var a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(o,a)};
      ttq.load('${pixelId}');ttq.page();
    }(window,document,'ttq');
  `
  document.head.appendChild(script)
}

function trackTikTokEvent(event: string, data?: Record<string, string | number>): void {
  const w = window as any
  if (!w.ttq) return

  const eventMap: Record<string, string> = {
    ViewContent: 'ViewContent',
    CompleteRegistration: 'CompleteRegistration',
    Subscribe: 'Subscribe',
    InitiateCheckout: 'InitiateCheckout',
  }

  w.ttq.track(eventMap[event] || event, data || {})
}

// --- Meta (Facebook) Pixel ---

function initMetaPixel(): void {
  const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID
  if (!pixelId) return

  const w = window as any
  if (w.fbq) return // Already initialized

  const script = document.createElement('script')
  script.innerHTML = `
    !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
    n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}
    (window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
    fbq('init','${pixelId}');fbq('track','PageView');
  `
  document.head.appendChild(script)
}

function trackMetaEvent(event: string, data?: Record<string, string | number>): void {
  const w = window as any
  if (!w.fbq) return

  const eventMap: Record<string, string> = {
    ViewContent: 'ViewContent',
    CompleteRegistration: 'CompleteRegistration',
    Subscribe: 'Subscribe',
    InitiateCheckout: 'InitiateCheckout',
  }

  w.fbq('track', eventMap[event] || event, data || {})
}
