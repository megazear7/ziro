import { html } from 'orison';

export default () => html`
  <div class="well">
      <div class="outer-page">
        <button onclick="event.target.parentElement.parentElement.querySelector('ziro-wizard').start()">Open Wizard</button>
      </div>
      <ziro-wizard>
        <ziro-panel>
            <h3>Panel 1</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            <ziro-wizard-nav>
              <span slot="previous">Close</span>
              <span slot="next">Next &rarr;</span>
            </ziro-wizard-nav>
        </ziro-panel>
        <ziro-panel>
            <h3>Panel 2</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            <ziro-wizard-nav>
              <span slot="previous">&larr; Previous</span>
              <span slot="next">Next &rarr;</span>
            </ziro-wizard-nav>
        </ziro-panel>
        <ziro-panel>
            <h3>Panel 3</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            <ziro-wizard-nav>
              <span slot="previous">&larr; Previous</span>
              <span slot="next">Finish</span>
            </ziro-wizard-nav>
        </ziro-panel>
      </ziro-wizard>
  </div>
`;
