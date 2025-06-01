/**
 * @typedef {object} FossLink
 * @property {string} [label]
 * @property {string} [href]
 * @property {string} [imgAlt]
 * @property {string} [downloadText]
 * @property {string} [downloadHref]
 * @property {boolean} [hideLabels]
 */

/**
 * @typedef {object} FossItem
 * @property {string} id
 * @property {string} title
 * @property {{ webp: string, png: string }} images
 * @property {string} imgAlt
 * @property {string} headline
 * @property {string} headlineDescription
 * @property {string} detailsDescription
 * @property {Array<any>} features
 * @property {Array<string>} notes
 * @property {Array<FossLink>} links
 */
