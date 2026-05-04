/* eslint-disable */
/* global WebImporter */

/**
 * Parser for embed variant.
 * Base block: embed
 * Source: https://www.hyundai.com.br/
 * Selector: .vehicle-showroom
 * Generated: 2026-05-04
 *
 * This block represents an interactive vehicle showroom (360-degree viewer)
 * that is JavaScript-driven and cannot be statically authored. The parser
 * extracts the heading and panel image as representational content for the
 * embed block.
 */
export default function parse(element, { document }) {
  // Extract the panel image (vehicle showcase image)
  const panelImage = element.querySelector('.vs-panel img, .vs-body img');

  // Build cells for the embed block
  // Standard embed: one row with content representing the embedded widget
  const cells = [];

  // Row 1: Image content representing the showroom (heading excluded intentionally)
  const contentCell = [];
  if (panelImage) {
    contentCell.push(panelImage);
  }

  // If no image found, create a placeholder link to source
  if (contentCell.length === 0) {
    const link = document.createElement('a');
    link.href = 'https://www.hyundai.com.br/';
    link.textContent = 'Hyundai Vehicle Showroom';
    contentCell.push(link);
  }

  cells.push(contentCell);

  const block = WebImporter.Blocks.createBlock(document, { name: 'embed', cells });
  element.replaceWith(block);
}
