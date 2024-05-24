import html from 'solid-js/html';
import { Show, render } from 'solid-js/web';
import { css } from 'solid-styled-components';
import { ButtonLink } from '../../atoms/buttons.js';
import { Picture } from '../../atoms/picture.js';
import { readImage, readLink, readPlainText, readRichtext, rem } from '../../scripts/utils.js';
import { container, text4XL } from '../../styles/styles.js';

// variants
const CONTENTS_LEFT = 'contents-left';
const CONTENTS_RIGHT = 'contents-right';

/**
 * 
 * @param {DOMTokenList | string[]} blockClassList The block classlist
 * @returns {string} Active variants
 */
function getHeroCtaVariant(classList) {  
  if (classList.contains(CONTENTS_LEFT)) {
    return CONTENTS_LEFT;
  }
  if (classList.contains(CONTENTS_RIGHT)) {
    return CONTENTS_RIGHT;
  }
  return "";
}

export const HeroCta = ({ img, title, description, link, variant }) => {
    return html` <div class="${container} ${css({ position: 'relative' })}">
            <${Picture}
                img="${img}"
                class="${css({ 
                    width: '100%',
                    display: 'block'
                })}"
            />
            <div
                class="${css({
                    position: 'absolute',
                    top: 0,
                    left: variant == CONTENTS_LEFT ? '100px' : '',
                    right: variant == CONTENTS_RIGHT ? '100px' : '',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    color: 'white', /* Optional: to give a semi-transparent background */
                    textAlign: 'center',
                    alignItems: variant == CONTENTS_LEFT ? 'flex-start' : 'flex-end'
                })}"
            >
                <h1 class="${text4XL} ${css({ marginBottom: rem(12) })}">${title}</h1>
                <${Show} when="${description}">
                    <div innerHTML="${description}" class="${css({ fontSize: '18px' })}" />
                <//>
                <${Show} when="${link}">
                    <${ButtonLink} link="${link}" class="${css({ marginTop: rem(16), cursor: 'pointer' })}" />
                <//>
            </div>
        </div>`;
};

export default function decorate(block) {
    // read content
    const img = readImage('image', block);
    const link = readLink('link', block);
    const title = readPlainText('title', block);
    const description = readRichtext('description', block);

    const variant = getHeroCtaVariant(block.classList);
    console.log(link);
    
    // remove content
    block.textContent = '';

    // launch render
    return render(
        () => html`<${HeroCta} img="${img}" title="${title}" description="${description}" link="${link}" variant="${variant}" />`,
        block,
    );
}
