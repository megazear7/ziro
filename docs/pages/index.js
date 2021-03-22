import { html } from 'orison';
import slidePageCode1 from '../partials/ziro-slide-page-code-1.js';
import screenCode1 from '../partials/ziro-screen-code-1.js';
import wizardCode1 from '../partials/ziro-wizard-code-1.js';
import splashCode1 from '../partials/ziro-splash-code-1.js';

export default context => html`
  <section>
    <p>Ziro Components is a set of web components for easily building apps.</p>
  </section>
  <section>
    <h3><a href="/ziro-screen.html">&lt;ziro-screen></a></h3>
    <p>&lt;ziro-screen> allows you to build a bottom navigation between multiple pages.</p>
    ${screenCode1()}
  </section>
  <section class="slide-page">
    <h3><a href="/ziro-slide-page.html">&lt;ziro-slide-page></a></h3>
    <p>&lt;ziro-slide-page> allows you to add in slide out pages.</p>
    ${slidePageCode1()}
  </section>
  <section class="wizard">
    <h3><a href="/ziro-wizard.html">&lt;ziro-wizard></a></h3>
    <p>&lt;ziro-wizard> lets the user navigate forward and backward through a set of dialogs.</p>
    ${wizardCode1()}
  </section>
  <section class="splash">
    <h3><a href="/ziro-splash.html">&lt;ziro-splash></a></h3>
    <p>&lt;ziro-splash> lets you add splash animations.</p>
    ${splashCode1()}
  </section>
`;
