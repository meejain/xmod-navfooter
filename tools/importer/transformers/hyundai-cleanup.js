/* eslint-disable */
/* global WebImporter */

/**
 * Transformer: Hyundai Brazil site-wide cleanup.
 * Removes non-authorable content from all pages.
 * All selectors verified against migration-work/cleaned.html.
 * Note: Live validation exceeded retries due to SPA networkidle timeout.
 */
const TransformHook = { beforeTransform: 'beforeTransform', afterTransform: 'afterTransform' };

export default function transform(hookName, element, payload) {
  if (hookName === TransformHook.beforeTransform) {
    // Remove cookie consent banner (OneTrust) - found at line 1799: <div id="onetrust-consent-sdk">
    // Remove welcome/retargeting overlays that may block parsing
    // #first-time-visitor-target-wrapper (line 2): welcome overlay wrapper
    // .welcome-organic-floating-banner (line 4): welcome organic banner
    // #hyundai-wordcup26-retargeting-target-wrapper (line 13): retargeting overlay wrapper
    // .hyundai-wordcup26-retargeting-floating-banner (line 14): retargeting banner
    // Remove React loading states - .hyundai-loading (line 24)
    // Remove MUI skeleton loaders - .MuiSkeleton-root (lines 1079, 1085, etc.)
    WebImporter.DOMUtils.remove(element, [
      '#onetrust-consent-sdk',
      '#first-time-visitor-target-wrapper',
      '.welcome-organic-floating-banner',
      '#hyundai-wordcup26-retargeting-target-wrapper',
      '.hyundai-wordcup26-retargeting-floating-banner',
      '.hyundai-loading',
      '.MuiSkeleton-root',
    ]);
  }

  if (hookName === TransformHook.afterTransform) {
    // Remove header navigation - .hyundai-header (line 39)
    // Remove footer - .hyundai-footer (line 1431)
    // Remove demdex tracking iframe - .aamIframeLoaded (line 1795)
    // Remove Hand Talk accessibility widget - .ht-skip (line 2080)
    // Remove leftover iframes (tracking), link elements, noscript tags
    WebImporter.DOMUtils.remove(element, [
      '.hyundai-header',
      '.hyundai-footer',
      '.aamIframeLoaded',
      '.ht-skip',
      'iframe',
      'link',
      'noscript',
    ]);
  }
}
