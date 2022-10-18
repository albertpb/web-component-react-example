import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import App from './app/app';

class ReactWc extends HTMLElement {
  container;
  reactRoot;
  private _counterObj = { value: 0 };

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.container = document.createElement('div');
    this.reactRoot = createRoot(this.container);
  }

  connectedCallback() {
    const sheet = new CSSStyleSheet();
    sheet.replaceSync(`
      h1, h2 {
        color: red;
      }
    `);

    this.shadowRoot?.adoptedStyleSheets?.push(sheet);
    this.shadowRoot?.appendChild(this.container);

    this.render();
  }

  set counterObj(data) {
    this._counterObj = data;
    this.render();
  }

  get counterObj() {
    return this._counterObj;
  }

  render() {
    if (this.shadowRoot) {
      const counterAtr = parseInt(this.getAttribute('counter-attr') || '0', 10);

      this.reactRoot.render(
        <StrictMode>
          <App counterObj={this.counterObj} counterAtr={counterAtr} />
        </StrictMode>
      );
    }
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    console.log('attributeChangedCallback', name, oldValue, newValue);
    if (oldValue !== newValue) {
      this.render();
    }
  }

  static get observedAttributes() {
    return ['counter-attr'];
  }
}

customElements.define('react-wc', ReactWc);
