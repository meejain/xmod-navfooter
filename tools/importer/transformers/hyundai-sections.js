/* eslint-disable */
/* global WebImporter */

/**
 * Transformer: Hyundai Brazil section breaks and section metadata.
 * Inserts <hr> section breaks and Section Metadata blocks based on
 * template sections from page-templates.json.
 *
 * All selectors verified against migration-work/cleaned.html:
 * - .hyundai-carousel-container (line 904): Hero Carousel section
 * - #_content_hmb_br_jcr_content_root_responsivegrid_container_colors (line 1035): Vehicle Video section
 * - #_content_hmb_br_jcr_content_root_responsivegrid_container_colors_1111485370 (line 1067): Vehicle Showroom section
 * - #_content_hmb_br_jcr_content_root_responsivegrid_container_colors_1161884039 (line 1146): Promotional Mosaic section
 * - #_content_hmb_br_jcr_content_root_responsivegrid_container_colors_854163895 (line 1217): Offers Slider section
 * - #_content_hmb_br_jcr_content_root_responsivegrid_container_colors_904966112 (line 1266): Call to Action section
 * - #_content_hmb_br_jcr_content_root_responsivegrid_container_colors_354976112 (line 1304): Owners Link Hub section
 * - #_content_hmb_br_jcr_content_root_responsivegrid_container_colors_1796570009 (line 1372): Secondary Mosaic section
 * - .hyundai-footer (line 1431): Footer section (style: dark)
 *
 * Expects 9 sections, 8 hr breaks, 1 Section Metadata (Footer: dark)
 */
const TransformHook = { beforeTransform: 'beforeTransform', afterTransform: 'afterTransform' };

export default function transform(hookName, element, payload) {
  if (hookName === TransformHook.afterTransform) {
    const sections = payload && payload.template && payload.template.sections;
    if (!sections || !Array.isArray(sections) || sections.length < 2) {
      return;
    }

    const document = element.ownerDocument;

    // Process sections in reverse order to preserve DOM positions
    for (let i = sections.length - 1; i >= 0; i--) {
      const section = sections[i];
      if (!section || !section.selector) continue;

      const sectionEl = element.querySelector(section.selector);
      if (!sectionEl) continue;

      // Add Section Metadata block if section has a style
      if (section.style) {
        const sectionMetadata = WebImporter.Blocks.createBlock(document, {
          name: 'Section Metadata',
          cells: { style: section.style },
        });
        sectionEl.after(sectionMetadata);
      }

      // Insert <hr> before each section except the first
      if (i > 0) {
        const hr = document.createElement('hr');
        sectionEl.before(hr);
      }
    }
  }
}
