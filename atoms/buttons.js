import html from 'solid-js/html';
import { css } from 'solid-styled-components';
import { rem } from '../scripts/utils.js';



const btnPrimary = css`
    border-radius: 6px;
    background-color: var(--primary);
    color: var(--text-over-primary);
    padding: ${rem(6)} ${rem(12)};
    min-width: ${rem(120)};
    font-size: ${rem(18)};
    line-height: ${rem(24)};
    display: inline-flex;
    text-transform: uppercase;
    font-weight: 600;
    justify-content: center;
`;

/**
 * Link rendered as Button Component
 *
 * @param {Object} props - Properties
 * @param {Link} props.link - The link
 * @param {Node | Node[]} props.children - Children
 * @param {string} props.class - Extra classes for button
 */
export const ButtonLink = ({ link, children, class: clazz }) => {
    return html`<a
        href="${link.href}"
        title="${link.title}"
        rel="${link.rel}"
        target="${link.target}"
        class="${btnPrimary} ${clazz}"
        >${children ? children : link.label}</a
    >`;
};

/**
 * Simple Button Component
 *
 * @param {Object} props - Properties
 * @param {Node | Node[]} props.children - Children
 * @param {string} props.type - Button type
 * @param {string} props.class - Extra classes for button
 */
export const Button = ({ children, type, class: clazz }) => {
    return html`<button
        type="${type}"
        class="${btnPrimary} ${clazz}"
        >${children}</a
    >`;
};
