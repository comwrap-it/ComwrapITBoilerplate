// eslint-disable-next-line import/no-unresolved
import { For, render } from 'solid-js/web';
import { css } from 'solid-styled-components';
import { toClassName } from '../../scripts/aem.js';
import html from 'solid-js/html';
import { container } from '../../styles/styles.js';
import { createSignal } from 'solid-js';
import { rem } from '../../scripts/utils.js';

/**
 * @typedef {Object} Tab
 * @property {string} title
 * @property {string} content
 * @property {string} id
 */

const TAB_BUTTON_ID_PREFIX = 'tab-';
const TAB_PANEL_ID_PREFIX = 'tabpanel-';

const CSS_TAB_LIST = css({
    display: 'flex',
    gap: rem(8),
    maxWidth: '100%',
    overflowX: 'auto',
});

const CSS_TAB_BUTTON = css({
    flex: '0 0 max-content',
    margin: 0,
    border: '1px solid var(--dark-color)',
    borderRadius: 0,
    padding: `${rem(8)} ${rem(16)}`,
    backgroundColor: 'var(--light-color)',
    color: 'initial',
    fontSize: 'unset',
    fontWeight: 'bold',
    lineHeight: 'unset',
    textAlign: 'initial',
    textOverflow: 'unset',
    overflow: 'unset',
    whiteSpace: 'unset',
    transition: 'background-color 0.2s',
    '&[aria-selected="true"]': {
        borderBottom: '1px solid var(--background-color)',
        backgroundColor: 'var(--background-color)',
        cursor: 'initial',
    },
    '&[aria-selected="false"]:hover,&[aria-selected="false"]:focus': {
        backgroundColor: 'var(--dark-color)',
    },
});

const CSS_TAB_PANEL = css({
    marginTop: rem(-1),
    padding: `0 ${rem(16)}`,
    border: '1px solid var(--dark-color)',
    overflow: 'auto',
    '&[aria-hidden="true"]': {
        display: 'none',
    },
});

/**
 * 
 * @param {{
 *   tabs: Tab[]
 * }} param0 
 * @returns 
 */
export const Tabs = ({ tabs }) => {
    const [activeTab, setActiveTab] = createSignal(0);
    const handleKeyDownArrowsOnTabList = (/**@type {KeyboardEvent}*/e) => {
        if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
        // update active tab
        switch (e.key) {
            case 'ArrowRight':
                setActiveTab((activeTab() + 1) % tabs.length);
                break;
            case 'ArrowLeft':
                setActiveTab((activeTab() - 1 + tabs.length) % tabs.length);
                break;
            default:
                break;
        }
        // focus active tab button
        e.currentTarget.querySelectorAll('button')[activeTab()].focus();
    };

    return html`<div>
        <div
            class="${CSS_TAB_LIST}"
            role="tablist"
            onKeyDown="${handleKeyDownArrowsOnTabList}"
        >
            <${For} each=${tabs}>
                ${(t, i) => html`<button
                    class="${CSS_TAB_BUTTON}"
                    id="${TAB_BUTTON_ID_PREFIX+t.id}"
                    aria-controls="${TAB_PANEL_ID_PREFIX+t.id}"
                    aria-selected="${() => i() === activeTab()}"
                    tabindex="${() => i() === activeTab() ? '0' : '-1'}"
                    type="button"
                    role="tab"
                    onClick="${() => setActiveTab(i())}"
                >
                    ${t.title}
                </button>`}
            <//>
        </div>
        <${For} each=${tabs}>
            ${(t, i) => html`<div
                class="${CSS_TAB_PANEL}"
                id="${TAB_PANEL_ID_PREFIX+t.id}"
                aria-labelledby="${TAB_BUTTON_ID_PREFIX+t.id}"
                aria-hidden="${() => i() !== activeTab()}"
                role="tabpanel"
                innerHTML=${t.content}
            />`}
        <//>
    </div>`
};

/**
 * 
 * @param {HTMLDivElement} block 
 */
export default async function decorate(block) {
    // read content
    /**@type {Tab[]}*/
    const tabs = [...block.children].map((row) => {
        const title = row.children?.item(0)?.innerText.trim();
        const content = row.children?.item(1)?.innerHTML.trim();
        return {
            title,
            content,
            id: toClassName(title),
        };
    });

    // remove content
    block.textContent = '';

    // launch render
    return render(
        () => html`<${Tabs} tabs="${tabs}" />`,
        block,
    );
}
