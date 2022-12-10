import { html } from 'orison';

export default () => html`
  <div>
      <button onclick="event.target.parentElement.parentElement.querySelector('ziro-card').proceed()">Proceed</button>
      </br></br>
      <ziro-card>
        <p>Test</p>
      </ziro-card>
  </div>
`;
