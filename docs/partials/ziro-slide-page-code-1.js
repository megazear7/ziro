import { html } from 'orison';

export default () => html`
    <div class="well">
        <div class="outer-page">
            <button onclick="event.target.parentElement.parentElement.querySelector('ziro-slide-page').open();">Open Settings</button>
        </div>
        <ziro-slide-page>
            <h2>Open Settings</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        </ziro-slide-page>
    </div>
`;
