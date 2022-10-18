import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import App from './app/app';

class ReactWc extends HTMLElement {
  container;
  reactRoot;
  reactContainer;
  private _counterObj = { value: 0 };
  private _counterAtr = 0;

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.container = document.createElement('div');
    this.reactContainer = document.createElement('div');
    this.container.innerHTML = `
      <style>
        @import url('http://localhost:4200/styles.css');
      </style>
    `;
    this.container.appendChild(this.reactContainer);

    this.reactRoot = createRoot(this.reactContainer);
  }

  connectedCallback() {
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
    this.reactRoot.render(
      <StrictMode>
        <App counterObj={this._counterObj} counterAtr={this._counterAtr} />
      </StrictMode>
    );
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    console.log('attributeChangedCallback', name, oldValue, newValue);
    if (oldValue !== newValue) {
      this._counterAtr = parseInt(this.getAttribute('counter-attr') || '0', 10);
      this.render();
    }
  }

  static get observedAttributes() {
    return ['counter-attr'];
  }
}

customElements.define('react-wc', ReactWc);
