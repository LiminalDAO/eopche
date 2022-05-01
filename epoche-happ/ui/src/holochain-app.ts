import '@webcomponents/scoped-custom-element-registry';

import { LitElement, css, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { AppWebsocket, InstalledCell } from '@holochain/client';
import { ContextProvider } from '@holochain-open-dev/context';
import '@material/mwc-circular-progress';

import './components/dna_0/zome_0/create-entry-def-0';
import './components/dna_0/zome_0/entry-def-0-detail';
import { appWebsocketContext, appInfoContext } from './contexts';

@customElement('holochain-app')
export class HolochainApp extends LitElement {
  @state() loading = true;
  @state() entryHash: string | undefined;

  async firstUpdated() {
    const appWebsocket = await AppWebsocket.connect(
      `ws://localhost:${process.env.HC_PORT}`
    );

    new ContextProvider(this, appWebsocketContext, appWebsocket);

    const appInfo = await appWebsocket.appInfo({
      installed_app_id: 'epoche-happ'
    });
    new ContextProvider(this, appInfoContext, appInfo);

    this.loading = false;
  }

  render() {
    if (this.loading)
      return html`
        <mwc-circular-progress indeterminate></mwc-circular-progress>
      `;

    return html`
      <main>
        <h1>epoche-happ</h1>

        <create-entry-def-0 @entry-def-0-created=${(e: CustomEvent) => this.entryHash = e.detail.entryHash}></create-entry-def-0>
    ${this.entryHash ? html`
      <entry-def-0-detail .entryHash=${this.entryHash}></entry-def-0-detail>
    ` : html``}
      </main>
    `;
  }

  static styles = css`
    :host {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;
      font-size: calc(10px + 2vmin);
      color: #1a2b42;
      max-width: 960px;
      margin: 0 auto;
      text-align: center;
      background-color: var(--lit-element-background-color);
    }

    main {
      flex-grow: 1;
    }

    .app-footer {
      font-size: calc(12px + 0.5vmin);
      align-items: center;
    }

    .app-footer a {
      margin-left: 5px;
    }
  `;
}
