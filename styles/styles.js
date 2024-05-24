import { css } from 'solid-styled-components';
import { Media, rem } from '../scripts/utils.js';

/////////////////////////////////////// BASIC
export const container = css({
    maxWidth: '375px',
    padding: '0 16px',
    margin: '0 auto',

    [Media.md]: {
        maxWidth: '768px',
    },

    [Media.lg]: {
        maxWidth: '1024px',
    },

    [Media.xl]: {
        maxWidth: '1440px',
    },
});

/////////////////////////////////////// TYPOGRAPHY
export const text4XL = css`
    font-size: ${rem(60)};
    font-weight: 600;
    line-height: 1.1em;
`;

/////////////////////////////////////// PROSE
export const prose = css`
    a {
        color: blue;
    }
`;
