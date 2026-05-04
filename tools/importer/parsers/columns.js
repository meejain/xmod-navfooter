/* eslint-disable */
/* global WebImporter */

/**
 * Parser for columns variant.
 * Base block: columns
 * Source: https://www.hyundai.com.br/
 * Selectors: .call-page, .link-hub
 * Generated: 2026-05-04
 *
 * Extracts a 2-column layout from source HTML:
 *   Column 1: image/icon
 *   Column 2: heading, subtitle, and CTA link
 */
export default function parse(element, { document }) {
  // Column 1: Extract the image/icon
  const imageEl = element.querySelector('.cp-image img, .row img, img');
  const col1 = [];
  if (imageEl) {
    col1.push(imageEl);
  }

  // Column 2: Extract text content and CTA
  const col2 = [];

  // Heading (h3 with class cp-title, or fallback to any h3/h2)
  const heading = element.querySelector('.cp-title, .cp-texts h3, .cp-texts h2, h3, h2');
  if (heading) {
    col2.push(heading);
  }

  // Subtitle (h4 with class cp-text, or fallback to any h4/p in cp-texts)
  const subtitle = element.querySelector('.cp-text, .cp-texts h4, .cp-texts p, h4');
  if (subtitle) {
    col2.push(subtitle);
  }

  // CTA link (button/link in cp-link, or fallback to any anchor with button class)
  const ctaLinks = Array.from(element.querySelectorAll('.cp-link a, a.hyundai-button, a.button'));
  // Deduplicate in case selectors overlap
  const seen = new Set();
  ctaLinks.forEach((link) => {
    if (!seen.has(link)) {
      seen.add(link);
      col2.push(link);
    }
  });

  // Build cells: single row with 2 columns
  const cells = [
    [col1, col2],
  ];

  const block = WebImporter.Blocks.createBlock(document, { name: 'columns', cells });
  element.replaceWith(block);
}
