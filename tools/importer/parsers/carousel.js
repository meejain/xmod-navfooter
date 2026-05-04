/* eslint-disable */
/* global WebImporter */

/**
 * Parser for carousel variant.
 * Base block: carousel
 * Source: https://www.hyundai.com.br/
 * Generated: 2026-05-04
 *
 * Source structure (verified against migration-work/block-context/carousel/source.html):
 * - Root: div.hyundai-carousel-container
 *   - div.swiper-container > div.swiper > div.swiper-wrapper
 *     - div.swiper-slide.hc-item (multiple slides)
 *       - a[href] (link wrapping slide content)
 *         - div.hc-texts-container > div.hc-title-content (empty text containers)
 *         - picture > img (slide image)
 *
 * Each slide is a full-width image wrapped in an anchor link.
 * The text containers (hc-texts-container) are empty in the source.
 * Some slides may contain video elements instead of images.
 *
 * Output: Standard EDS carousel block table.
 * Each row = one slide, single cell containing the image wrapped in its link.
 */
export default function parse(element, { document }) {
  // Select all carousel slide items - verified selector from source HTML
  const slides = element.querySelectorAll('.swiper-slide.hc-item, .swiper-slide[class*="hc-item"]');

  const cells = [];

  slides.forEach((slide) => {
    const cellContent = [];

    // Extract the anchor link wrapping the slide content
    const link = slide.querySelector(':scope > a');

    // Extract image (picture element preferred, fallback to img)
    const picture = slide.querySelector('picture');
    const img = slide.querySelector('img');

    // Extract video element if present (some slides may have video instead of image)
    const video = slide.querySelector('video');

    // Extract any heading/text content from the text container
    const heading = slide.querySelector('.hc-title-content h1, .hc-title-content h2, .hc-title-content h3, .hc-texts-container h1, .hc-texts-container h2, .hc-texts-container h3');
    const textContent = slide.querySelector('.hc-title-content p, .hc-texts-container p');

    // Build the cell content for this slide
    if (picture) {
      cellContent.push(picture);
    } else if (img) {
      cellContent.push(img);
    } else if (video) {
      cellContent.push(video);
    }

    // Add heading if present
    if (heading && heading.textContent.trim()) {
      cellContent.push(heading);
    }

    // Add text if present
    if (textContent && textContent.textContent.trim()) {
      cellContent.push(textContent);
    }

    // Add link as a separate element if the slide was wrapped in an anchor
    if (link && link.href) {
      const linkEl = document.createElement('a');
      linkEl.href = link.href;
      linkEl.textContent = link.href;
      cellContent.push(linkEl);
    }

    // Only add the row if we have content
    if (cellContent.length > 0) {
      cells.push(cellContent);
    }
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'carousel', cells });
  element.replaceWith(block);
}
