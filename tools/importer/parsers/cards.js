/* eslint-disable */
/* global WebImporter */

/**
 * Parser for cards variant.
 * Base block: cards
 * Source: https://www.hyundai.com.br/ (.mosaic, .offers-slider)
 * Generated: 2026-05-04
 *
 * Extracts mosaic items (both .mosaic-dual-item and standalone .mosaic-item)
 * into a Cards block table. Each row contains the image and a link.
 */
export default function parse(element, { document }) {
  const cells = [];

  // Collect all linked image items from the mosaic
  // Pattern 1: .mosaic-dual-item elements (paired items in dual-column layout)
  // Pattern 2: standalone .mosaic-item elements with a direct anchor child
  const dualItems = element.querySelectorAll('.mosaic-dual-item');
  const standaloneItems = element.querySelectorAll('.mosaic-item > a');

  // Process dual-column items
  dualItems.forEach((item) => {
    const anchor = item.querySelector('a');
    if (!anchor) return;
    const picture = anchor.querySelector('picture');
    const img = anchor.querySelector('img');
    if (!picture && !img) return;

    const image = picture || img;
    const linkText = img ? (img.getAttribute('alt') || '') : '';
    const href = anchor.getAttribute('href') || '';

    // Each card row: [image, link with text]
    const link = document.createElement('a');
    link.setAttribute('href', href);
    link.textContent = linkText || href;

    cells.push([image, link]);
  });

  // Process standalone mosaic items (direct anchor inside .mosaic-item)
  standaloneItems.forEach((anchor) => {
    const picture = anchor.querySelector('picture');
    const img = anchor.querySelector('img');
    if (!picture && !img) return;

    const image = picture || img;
    const linkText = img ? (img.getAttribute('alt') || '') : '';
    const href = anchor.getAttribute('href') || '';

    const link = document.createElement('a');
    link.setAttribute('href', href);
    link.textContent = linkText || href;

    cells.push([image, link]);
  });

  // If no items found, try a generic fallback: any anchor with an image inside the element
  if (cells.length === 0) {
    const allAnchors = element.querySelectorAll('a');
    allAnchors.forEach((anchor) => {
      const picture = anchor.querySelector('picture');
      const img = anchor.querySelector('img');
      if (!picture && !img) return;

      const image = picture || img;
      const linkText = img ? (img.getAttribute('alt') || '') : '';
      const href = anchor.getAttribute('href') || '';

      const link = document.createElement('a');
      link.setAttribute('href', href);
      link.textContent = linkText || href;

      cells.push([image, link]);
    });
  }

  const block = WebImporter.Blocks.createBlock(document, { name: 'cards', cells });
  element.replaceWith(block);
}
