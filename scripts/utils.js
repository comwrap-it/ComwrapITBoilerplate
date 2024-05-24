

/**
 * Get cell content from a block structured in rows with two columns.
 * Example structure:
 * <div>
 *  <div>
 *    <div>row label</div>
 *    <div>row value</div>
 *  </div>
 *  <div>
 *    <div>row label</div>
 *    <div>row value</div>
 *  </div>
 * <div>
 *
 * @param {HTMLDivElement} block The raw block html
 * @param {string} rowName The row name (label of the first cell of the row)
 * @returns {HTMLElement | undefined} The cell element for the specified row name.
 */
export function getValueCellFromTwoColumnsBlock(block, rowName) {
    let valueCell;
    [...block.children].forEach((row) => {
        const [label, value] = row.children;
        if (rowName === label.innerText?.toLowerCase()) valueCell = value;
    });
    return valueCell;
}


/**
 * Convert px to rem
 * @param {number | string} px 
 * @param {number} base 
 * @returns 
 */
export const rem = (px, base = 16) => {
    const tempPx = `${px}`.replace('px', '');
    return (1 / base) * parseInt(tempPx) + 'rem';
};

/**
 * Enum for Media query size
 * @readonly
 * @enum {string}
 */
export const Media = {
    md: '@media (min-width: 768px)',
    lg: '@media (min-width: 1024px)',
    xl: '@media (min-width: 1440px)',
};

/**
 * Read property with name from block
 * @param {string} name
 * @param {HTMLElement} block
 */
export const readPlainText = (name, block) => {
    const element = getValueCellFromTwoColumnsBlock(block, name);
    return element.innerText.trim();
};

/**
 * Read property with name from block
 * @param {string} name
 * @param {HTMLElement} block
 */
export const readRichtext = (name, block) => {
    const element = getValueCellFromTwoColumnsBlock(block, name);
    return element.innerHTML.trim();
};

/**
 *
 * Link type definition
 * @typedef {Object} Link
 * @property {string} href
 * @property {string} title
 * @property {string} rel
 * @property {string} target
 * @property {string} label
 *
 *
 * Read property with name from block
 * @param {string} name
 * @param {HTMLElement} block
 * @return {Link} link
 */
export const readLink = (name, block) => {
    const element = getValueCellFromTwoColumnsBlock(block, name);
    return {
        href: element.href,
        title: element.title,
        label: element.innerText.trim(),
    };
};

/**
 *
 * Link type definition
 * @typedef {Object} Image
 * @property {string} src
 * @property {string} alt
 * @property {string} width
 * @property {string} height
 *
 *
 * Read property with name from block
 * @param {string} name
 * @param {HTMLElement} block
 * @return {Image} link
 */
export const readImage = (name, block) => {
    const element = getValueCellFromTwoColumnsBlock(block, name);
    const imgElement = element.querySelector('img');
    return {
        src: imgElement.src,
        alt: imgElement.alt,
        width: imgElement.getAttribute('width'),
        height: imgElement.getAttribute('height'),
    };
};
