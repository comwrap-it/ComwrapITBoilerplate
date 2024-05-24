import html from 'solid-js/html';

/**
 * Image type definition
 * @typedef {Object} Image
 * @property {string} src
 * @property {string} alt
 */

/**
 * Picture Component
 *
 * @param {Object} props - Properties
 * @param {Image} props.img - The image
 * @param {string} props.class - Extra classes for picture
 */
export const Picture = ({ img, class: clazz }) => {
    return html`<img class="${clazz}" src="${img.src}" alt="${img.alt}" />`;
};
