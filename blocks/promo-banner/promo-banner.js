import html from 'solid-js/html';
import { Show, render } from 'solid-js/web';
import { css } from 'solid-styled-components';
import { ButtonLink } from '../../atoms/buttons.js';
import { Picture } from '../../atoms/picture.js';
import { Media, readImage, readLink, readPlainText, readRichtext, rem } from '../../scripts/utils.js';
import { container, prose, text4XL } from '../../styles/styles.js';

export const PromoBanner = ({ title, description, img, link }) => {
    return html` <div
        class="${container} ${css({
            display: 'flex',
            alignItems: 'center',
            gap: rem(20),
            justifyContent: 'space-between',
        })}"
    >
        <div
            class="${css({
                maxWidth: rem(512),
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
            })}"
        >
            <h1 class="${text4XL} ${css({ marginBottom: rem(12) })}">${title}</h1>
            <${Show} when="${description}">
                <div class="${prose}" innerHTML="${description}" />
            <//>
            <${Show} when="${link}">
                <${ButtonLink} link="${link}" class="${css({ marginTop: rem(16) })}" />
            <//>
        </div>
        <${Show} when="${img}">
            <${Picture}
                img="${img}"
                class="${css({
                    display: 'none',
                    height: rem(500),
                    maxWidth: rem(600),
                    objectFit: 'cover',
                    [Media.lg]: { display: 'block' },
                })}"
            />
        <//>
    </div>`;
};

export default function decorate(block) {
    // read content
    const img = readImage('image', block);
    const link = readLink('link', block);
    const title = readPlainText('title', block);
    const description = readRichtext('description', block);

    // remove content
    block.textContent = '';

    // launch render
    return render(
        () => html`<${PromoBanner} title="${title}" description="${description}" link="${link}" img="${img}" />`,
        block,
    );
}
