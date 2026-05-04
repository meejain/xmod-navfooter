/* eslint-disable */
var CustomImportScript = (() => {
  var __defProp = Object.defineProperty;
  var __defProps = Object.defineProperties;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getOwnPropSymbols = Object.getOwnPropertySymbols;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __propIsEnum = Object.prototype.propertyIsEnumerable;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __spreadValues = (a, b) => {
    for (var prop in b || (b = {}))
      if (__hasOwnProp.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    if (__getOwnPropSymbols)
      for (var prop of __getOwnPropSymbols(b)) {
        if (__propIsEnum.call(b, prop))
          __defNormalProp(a, prop, b[prop]);
      }
    return a;
  };
  var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // tools/importer/import-homepage.js
  var import_homepage_exports = {};
  __export(import_homepage_exports, {
    default: () => import_homepage_default
  });

  // tools/importer/parsers/carousel.js
  function parse(element, { document }) {
    const slides = element.querySelectorAll('.swiper-slide.hc-item, .swiper-slide[class*="hc-item"]');
    const cells = [];
    slides.forEach((slide) => {
      const cellContent = [];
      const link = slide.querySelector(":scope > a");
      const picture = slide.querySelector("picture");
      const img = slide.querySelector("img");
      const video = slide.querySelector("video");
      const heading = slide.querySelector(".hc-title-content h1, .hc-title-content h2, .hc-title-content h3, .hc-texts-container h1, .hc-texts-container h2, .hc-texts-container h3");
      const textContent = slide.querySelector(".hc-title-content p, .hc-texts-container p");
      if (picture) {
        cellContent.push(picture);
      } else if (img) {
        cellContent.push(img);
      } else if (video) {
        cellContent.push(video);
      }
      if (heading && heading.textContent.trim()) {
        cellContent.push(heading);
      }
      if (textContent && textContent.textContent.trim()) {
        cellContent.push(textContent);
      }
      if (link && link.href) {
        const linkEl = document.createElement("a");
        linkEl.href = link.href;
        linkEl.textContent = link.href;
        cellContent.push(linkEl);
      }
      if (cellContent.length > 0) {
        cells.push(cellContent);
      }
    });
    const block = WebImporter.Blocks.createBlock(document, { name: "carousel", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/hero.js
  function parse2(element, { document }) {
    const video = element.querySelector(".fvp-thumb video, video[src]");
    const vehicleImage = element.querySelector(".fvp-vehicle img, img[alt]");
    const ctaLink = element.querySelector(".fvp-button-content a, a.hyundai-button, a[href]");
    const cells = [];
    if (video) {
      const videoSrc = video.getAttribute("src");
      if (videoSrc) {
        const videoLink = document.createElement("a");
        videoLink.href = videoSrc;
        videoLink.textContent = videoSrc;
        cells.push([videoLink]);
      }
    }
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
    const block = WebImporter.Blocks.createBlock(document, { name: "hero", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/embed.js
  function parse3(element, { document }) {
    const panelImage = element.querySelector(".vs-panel img, .vs-body img");
    const cells = [];
    const contentCell = [];
    if (panelImage) {
      contentCell.push(panelImage);
    }
    if (contentCell.length === 0) {
      const link = document.createElement("a");
      link.href = "https://www.hyundai.com.br/";
      link.textContent = "Hyundai Vehicle Showroom";
      contentCell.push(link);
    }
    cells.push(contentCell);
    const block = WebImporter.Blocks.createBlock(document, { name: "embed", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/cards.js
  function parse4(element, { document }) {
    const cells = [];
    const dualItems = element.querySelectorAll(".mosaic-dual-item");
    const standaloneItems = element.querySelectorAll(".mosaic-item > a");
    dualItems.forEach((item) => {
      const anchor = item.querySelector("a");
      if (!anchor) return;
      const picture = anchor.querySelector("picture");
      const img = anchor.querySelector("img");
      if (!picture && !img) return;
      const image = picture || img;
      const linkText = img ? img.getAttribute("alt") || "" : "";
      const href = anchor.getAttribute("href") || "";
      const link = document.createElement("a");
      link.setAttribute("href", href);
      link.textContent = linkText || href;
      cells.push([image, link]);
    });
    standaloneItems.forEach((anchor) => {
      const picture = anchor.querySelector("picture");
      const img = anchor.querySelector("img");
      if (!picture && !img) return;
      const image = picture || img;
      const linkText = img ? img.getAttribute("alt") || "" : "";
      const href = anchor.getAttribute("href") || "";
      const link = document.createElement("a");
      link.setAttribute("href", href);
      link.textContent = linkText || href;
      cells.push([image, link]);
    });
    if (cells.length === 0) {
      const allAnchors = element.querySelectorAll("a");
      allAnchors.forEach((anchor) => {
        const picture = anchor.querySelector("picture");
        const img = anchor.querySelector("img");
        if (!picture && !img) return;
        const image = picture || img;
        const linkText = img ? img.getAttribute("alt") || "" : "";
        const href = anchor.getAttribute("href") || "";
        const link = document.createElement("a");
        link.setAttribute("href", href);
        link.textContent = linkText || href;
        cells.push([image, link]);
      });
    }
    const block = WebImporter.Blocks.createBlock(document, { name: "cards", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/columns.js
  function parse5(element, { document }) {
    const imageEl = element.querySelector(".cp-image img, .row img, img");
    const col1 = [];
    if (imageEl) {
      col1.push(imageEl);
    }
    const col2 = [];
    const heading = element.querySelector(".cp-title, .cp-texts h3, .cp-texts h2, h3, h2");
    if (heading) {
      col2.push(heading);
    }
    const subtitle = element.querySelector(".cp-text, .cp-texts h4, .cp-texts p, h4");
    if (subtitle) {
      col2.push(subtitle);
    }
    const ctaLinks = Array.from(element.querySelectorAll(".cp-link a, a.hyundai-button, a.button"));
    const seen = /* @__PURE__ */ new Set();
    ctaLinks.forEach((link) => {
      if (!seen.has(link)) {
        seen.add(link);
        col2.push(link);
      }
    });
    const cells = [
      [col1, col2]
    ];
    const block = WebImporter.Blocks.createBlock(document, { name: "columns", cells });
    element.replaceWith(block);
  }

  // tools/importer/transformers/hyundai-cleanup.js
  var TransformHook = { beforeTransform: "beforeTransform", afterTransform: "afterTransform" };
  function transform(hookName, element, payload) {
    if (hookName === TransformHook.beforeTransform) {
      WebImporter.DOMUtils.remove(element, [
        "#onetrust-consent-sdk",
        "#first-time-visitor-target-wrapper",
        ".welcome-organic-floating-banner",
        "#hyundai-wordcup26-retargeting-target-wrapper",
        ".hyundai-wordcup26-retargeting-floating-banner",
        ".hyundai-loading",
        ".MuiSkeleton-root"
      ]);
    }
    if (hookName === TransformHook.afterTransform) {
      WebImporter.DOMUtils.remove(element, [
        ".hyundai-header",
        ".hyundai-footer",
        ".aamIframeLoaded",
        ".ht-skip",
        "iframe",
        "link",
        "noscript"
      ]);
    }
  }

  // tools/importer/transformers/hyundai-sections.js
  var TransformHook2 = { beforeTransform: "beforeTransform", afterTransform: "afterTransform" };
  function transform2(hookName, element, payload) {
    if (hookName === TransformHook2.afterTransform) {
      const sections = payload && payload.template && payload.template.sections;
      if (!sections || !Array.isArray(sections) || sections.length < 2) {
        return;
      }
      const document = element.ownerDocument;
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (!section || !section.selector) continue;
        const sectionEl = element.querySelector(section.selector);
        if (!sectionEl) continue;
        if (section.style) {
          const sectionMetadata = WebImporter.Blocks.createBlock(document, {
            name: "Section Metadata",
            cells: { style: section.style }
          });
          sectionEl.after(sectionMetadata);
        }
        if (i > 0) {
          const hr = document.createElement("hr");
          sectionEl.before(hr);
        }
      }
    }
  }

  // tools/importer/import-homepage.js
  var parsers = {
    "carousel": parse,
    "hero": parse2,
    "embed": parse3,
    "cards": parse4,
    "columns": parse5
  };
  var transformers = [
    transform,
    transform2
  ];
  var PAGE_TEMPLATE = {
    name: "homepage",
    description: "Hyundai Brazil homepage with hero carousel, vehicle showcase, and promotional content",
    urls: [
      "https://www.hyundai.com.br/"
    ],
    blocks: [
      {
        name: "carousel",
        instances: [".hyundai-carousel-container"]
      },
      {
        name: "hero",
        instances: [".full-video-page"]
      },
      {
        name: "embed",
        instances: [".vehicle-showroom"]
      },
      {
        name: "cards",
        instances: [".mosaic", ".offers-slider"]
      },
      {
        name: "columns",
        instances: [".call-page", ".link-hub"]
      }
    ],
    sections: [
      {
        id: "section-1-hero-carousel",
        name: "Hero Carousel",
        selector: ".hyundai-carousel-container",
        style: null,
        blocks: ["carousel"],
        defaultContent: []
      },
      {
        id: "section-2-vehicle-video",
        name: "Vehicle Video Feature",
        selector: "#_content_hmb_br_jcr_content_root_responsivegrid_container_colors",
        style: null,
        blocks: ["hero"],
        defaultContent: []
      },
      {
        id: "section-3-vehicle-showroom",
        name: "Vehicle Showroom",
        selector: "#_content_hmb_br_jcr_content_root_responsivegrid_container_colors_1111485370",
        style: null,
        blocks: ["embed"],
        defaultContent: []
      },
      {
        id: "section-4-mosaic",
        name: "Promotional Mosaic",
        selector: "#_content_hmb_br_jcr_content_root_responsivegrid_container_colors_1161884039",
        style: null,
        blocks: ["cards"],
        defaultContent: []
      },
      {
        id: "section-5-offers",
        name: "Offers Slider",
        selector: "#_content_hmb_br_jcr_content_root_responsivegrid_container_colors_854163895",
        style: null,
        blocks: ["cards"],
        defaultContent: [".os-texts-home h2", ".os-texts-home h3"]
      },
      {
        id: "section-6-call-page",
        name: "Call to Action",
        selector: "#_content_hmb_br_jcr_content_root_responsivegrid_container_colors_904966112",
        style: null,
        blocks: ["columns"],
        defaultContent: []
      },
      {
        id: "section-7-link-hub",
        name: "Owners Link Hub",
        selector: "#_content_hmb_br_jcr_content_root_responsivegrid_container_colors_354976112",
        style: null,
        blocks: ["columns"],
        defaultContent: []
      },
      {
        id: "section-8-secondary-mosaic",
        name: "Secondary Mosaic",
        selector: "#_content_hmb_br_jcr_content_root_responsivegrid_container_colors_1796570009",
        style: null,
        blocks: ["cards"],
        defaultContent: []
      },
      {
        id: "section-9-footer",
        name: "Footer",
        selector: ".hyundai-footer",
        style: "dark",
        blocks: [],
        defaultContent: []
      }
    ]
  };
  function executeTransformers(hookName, element, payload) {
    const enhancedPayload = __spreadProps(__spreadValues({}, payload), {
      template: PAGE_TEMPLATE
    });
    transformers.forEach((transformerFn) => {
      try {
        transformerFn.call(null, hookName, element, enhancedPayload);
      } catch (e) {
        console.error(`Transformer failed at ${hookName}:`, e);
      }
    });
  }
  function findBlocksOnPage(document, template) {
    const pageBlocks = [];
    template.blocks.forEach((blockDef) => {
      blockDef.instances.forEach((selector) => {
        const elements = document.querySelectorAll(selector);
        if (elements.length === 0) {
          console.warn(`Block "${blockDef.name}" selector not found: ${selector}`);
        }
        elements.forEach((element) => {
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
  var import_homepage_default = {
    transform: (payload) => {
      const { document, url, html, params } = payload;
      const main = document.body;
      executeTransformers("beforeTransform", main, payload);
      const pageBlocks = findBlocksOnPage(document, PAGE_TEMPLATE);
      pageBlocks.forEach((block) => {
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
      executeTransformers("afterTransform", main, payload);
      const hr = document.createElement("hr");
      main.appendChild(hr);
      WebImporter.rules.createMetadata(main, document);
      WebImporter.rules.transformBackgroundImages(main, document);
      WebImporter.rules.adjustImageUrls(main, url, params.originalURL);
      const path = WebImporter.FileUtils.sanitizePath(
        new URL(params.originalURL).pathname.replace(/\/$/, "").replace(/\.html$/, "") || "/index"
      );
      return [{
        element: main,
        path,
        report: {
          title: document.title,
          template: PAGE_TEMPLATE.name,
          blocks: pageBlocks.map((b) => b.name)
        }
      }];
    }
  };
  return __toCommonJS(import_homepage_exports);
})();
