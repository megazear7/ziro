import { html } from 'orison';

export default () => html`
  <div>
      <style>
        ziro-card::part(card) {
          background: #c0c7e3;
          margin: auto;
          height: 350px;
          width: 250px;
        }
      </style>
      <button onclick="event.target.parentElement.parentElement.querySelector('ziro-card').proceed()">Proceed</button>
      </br></br>
      <ziro-card>
        <p> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
      </ziro-card>
  </div>
`;
