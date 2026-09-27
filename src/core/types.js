/**
 * @typedef {Object} Track
 * @property {number} number
 * @property {number} type
 * @property {string} codecId
 * @property {Uint8Array|string} [codecPrivate]
 * @property {string} [language]
 * @property {string} [name]
 * @property {boolean} [default]
 */

/**
 * @typedef {Object} Attachment
 * @property {string} name
 * @property {string} mimeType
 * @property {Uint8Array} data
 */

/**
 * @typedef {Object} Cue
 * @property {number} time
 * @property {number} track
 * @property {number} clusterPosition
 */

/**
 * @typedef {Object} ClusterBlock
 * @property {number} trackNumber
 * @property {number} timecode
 * @property {number} duration
 * @property {string} data
 * @property {boolean} keyframe
 */
