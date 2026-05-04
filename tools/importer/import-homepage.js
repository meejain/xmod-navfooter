/* eslint-disable */
/* global WebImporter */

// PARSER IMPORTS
import carouselParser from './parsers/carousel.js';
import heroParser from './parsers/hero.js';
import embedParser from './parsers/embed.js';
import cardsParser from './parsers/cards.js';
import columnsParser from './parsers/columns.js';

// TRANSFORMER IMPORTS
import hyundaiCleanupTransformer from './transformers/hyundai-cleanup.js';
import hyundaiSectionsTransformer from './transformers/hyundai-sections.js';

// PARSER REGISTRY
const parsers = {
  'carousel': carouselParser,
  'hero': heroParser,
  'embed': embedParser,
  'cards': cardsParser,
  'columns': columnsParser,
};

// TRANSFORMER REGISTRY
const transformers = [
  hyundaiCleanupTransformer,
  hyundaiSectionsTransformer,
];

// PAGE TEMPLATE CONFIGURATION
const PAGE_TEMPLATE = {
  name: 'homepage',
  description: 'Hyundai Brazil homepage with hero carousel, vehicle showcase, and promotional content',
  urls: [
    'https://www.hyundai.com.br/'
  ],
  blocks: [
    {
      name: 'carousel',
      instances: ['.hyundai-carousel-container']
    },
    {
      name: 'hero',
      instances: ['.full-video-page']
    },
    {
      name: 'embed',
      instances: ['.vehicle-showroom']
    },
    {
      name: 'cards',
      instances: ['.mosaic', '.offers-slider']
    },
    {
      name: 'columns',
      instances: ['.call-page', '.link-hub']
    }
  ],
  sections: [
    {
      id: 'section-1-hero-carousel',
      name: 'Hero Carousel',
      selector: '.hyundai-carousel-container',
      style: null,
      blocks: ['carousel'],
      defaultContent: []
    },
    {
      id: 'section-2-vehicle-video',
      name: 'Vehicle Video Feature',
      selector: '#_content_hmb_br_jcr_content_root_responsivegrid_container_colors',
      style: null,
      blocks: ['hero'],
      defaultContent: []
    },
    {
      id: 'section-3-vehicle-showroom',
      name: 'Vehicle Showroom',
      selector: '#_content_hmb_br_jcr_content_root_responsivegrid_container_colors_1111485370',
      style: null,
      blocks: ['embed'],
      defaultContent: []
    },
    {
      id: 'section-4-mosaic',
      name: 'Promotional Mosaic',
      selector: '#_content_hmb_br_jcr_content_root_responsivegrid_container_colors_1161884039',
      style: null,
      blocks: ['cards'],
      defaultContent: []
    },
    {
      id: 'section-5-offers',
      name: 'Offers Slider',
      selector: '#_content_hmb_br_jcr_content_root_responsivegrid_container_colors_854163895',
      style: null,
      blocks: ['cards'],
      defaultContent: ['.os-texts-home h2', '.os-texts-home h3']
    },
    {
      id: 'section-6-call-page',
      name: 'Call to Action',
      selector: '#_content_hmb_br_jcr_content_root_responsivegrid_container_colors_904966112',
      style: null,
      blocks: ['columns'],
      defaultContent: []
    },
    {
      id: 'section-7-link-hub',
      name: 'Owners Link Hub',
      selector: '#_content_hmb_br_jcr_content_root_responsivegrid_container_colors_354976112',
      style: null,
      blocks: ['columns'],
      defaultContent: []
    },
    {
      id: 'section-8-secondary-mosaic',
      name: 'Secondary Mosaic',
      selector: '#_content_hmb_br_jcr_content_root_responsivegrid_container_colors_1796570009',
      style: null,
      blocks: ['cards'],
      defaultContent: []
    },
    {
      id: 'section-9-footer',
      name: 'Footer',
      selector: '.hyundai-footer',
      style: 'dark',
      blocks: [],
      defaultContent: []
    }
  ]
};

/**
 * Execute all page transformers for a specific hook
 */
function executeTransformers(hookName, element, payload) {
  const enhancedPayload = {
    ...payload,
    template: PAGE_TEMPLATE
  };

  transformers.forEach((transformerFn) => {
    try {
      transformerFn.call(null, hookName, element, enhancedPayload);
    } catch (e) {
      console.error(`Transformer failed at ${hookName}:`, e);
    }
  });
}

/**
 * Find all blocks on the page based on the embedded template configuration
 */
function findBlocksOnPage(document, template) {
  const pageBlocks = [];

  template.blocks.forEach(blockDef => {
    blockDef.instances.forEach(selector => {
      const elements = document.querySelectorAll(selector);
      if (elements.length === 0) {
        console.warn(`Block "${blockDef.name}" selector not found: ${selector}`);
      }
      elements.forEach(element => {
        pageBlocks.push({
          name: blockDef.name,
          selector,
          element,
          section: blockDef.section || null
        });
      });
    });
  });

  console.log(`Found ${pageBlocks.length} block instances on page`);
  return pageBlocks;
}

export default {
  transform: (payload) => {
    const { document, url, html, params } = payload;

    const main = document.body;

    // 1. Execute beforeTransform transformers (initial cleanup)
    executeTransformers('beforeTransform', main, payload);

    // 2. Find blocks on page using embedded template
    const pageBlocks = findBlocksOnPage(document, PAGE_TEMPLATE);

    // 3. Parse each block using registered parsers
    pageBlocks.forEach(block => {
      const parser = parsers[block.name];
      if (parser) {
        try {
          parser(block.element, { document, url, params });
        } catch (e) {
          console.error(`Failed to parse ${block.name} (${block.selector}):`, e);
        }
      } else {
        console.warn(`No parser found for block: ${block.name}`);
      }
    });

    // 4. Execute afterTransform transformers (final cleanup + section breaks)
    executeTransformers('afterTransform', main, payload);

    // 5. Apply WebImporter built-in rules
    const hr = document.createElement('hr');
    main.appendChild(hr);
    WebImporter.rules.createMetadata(main, document);
    WebImporter.rules.transformBackgroundImages(main, document);
    WebImporter.rules.adjustImageUrls(main, url, params.originalURL);

    // 6. Generate sanitized path
    const path = WebImporter.FileUtils.sanitizePath(
      new URL(params.originalURL).pathname.replace(/\/$/, '').replace(/\.html$/, '') || '/index'
    );

    return [{
      element: main,
      path,
      report: {
        title: document.title,
        template: PAGE_TEMPLATE.name,
        blocks: pageBlocks.map(b => b.name),
      }
    }];
  }
};
