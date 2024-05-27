// eslint-disable-next-line import/no-unresolved
import { For, render } from 'solid-js/web';
import { toClassName } from '../../scripts/aem.js';
import html from 'solid-js/html';
import { container } from '../../styles/styles.js';
import { createSignal } from 'solid-js';

/**
 * @typedef {Object} Tab
 * @property {string} title
 * @property {string} content
 * @property {string} id
 */

const TAB_BUTTON_ID_PREFIX = 'tab-';
const TAB_PANEL_ID_PREFIX = 'tabpanel-';

/**
 * 
 * @param {{
 *   tabs: Tab[]
 * }} param0 
 * @returns 
 */
export const Tabs = ({ tabs }) => {
    const [activeTab, setActiveTab] = createSignal(0);

    return html`<div class="${container}">
        <div class="tab-list" role="tablist">
            <${For} each=${tabs}>
                ${(t, i) => html`<button
                    class="tabs-tab"
                    id="${TAB_BUTTON_ID_PREFIX+t.id}"
                    aria-controls="${TAB_PANEL_ID_PREFIX+t.id}"
                    aria-selected="${() => i() === activeTab()}"
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
                class="tabs-panel"
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
