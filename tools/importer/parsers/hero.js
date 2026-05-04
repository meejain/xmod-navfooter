/* eslint-disable */
/* global WebImporter */

/**
 * Parser for hero variant.
 * Base block: hero
 * Source: https://www.hyundai.com.br/
 * Selector: .full-video-page
 * Generated: 2026-05-04
 *
 * Extracts a full-width video hero with vehicle image overlay and CTA button.
 * Source structure:
 *   .fvp-thumb > video (background video)
 *   .fvp-vehicle > img (vehicle/product image overlay)
 *   .fvp-button-content a.hyundai-button (CTA link)
 */
export default function parse(element, { document }) {
  // Extract background video
  const video = element.querySelector('.fvp-thumb video, video[src]');

  // Extract vehicle/product image
  const vehicleImage = element.querySelector('.fvp-vehicle img, img[alt]');

  // Extract CTA link
  const ctaLink = element.querySelector('.fvp-button-content a, a.hyundai-button, a[href]');

  // Build cells array matching standard EDS hero block structure
  // Row 1: Background media (video)
  // Row 2: Content (vehicle image + CTA)
  const cells = [];

  // Row 1: Video background
  if (video) {
    const videoSrc = video.getAttribute('src');
    if (videoSrc) {
      const videoLink = document.createElement('a');
      videoLink.href = videoSrc;
      videoLink.textContent = videoSrc;
      cells.push([videoLink]);
    }
  }

  // Row 2: Content cell with vehicle image and CTA
  const contentCell = [];
  if (vehicleImage) {
    contentCell.push(vehicleImage);
  }
  if (ctaLink) {
    contentCell.push(ctaLink);
  }
  if (contentCell.length > 0) {
    cells.push(contentCell);
  }

  const block = WebImporter.Blocks.createBlock(document, { name: 'hero', cells });
  element.replaceWith(block);
}
