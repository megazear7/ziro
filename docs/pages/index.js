import { html } from 'orison';
import slidePageCode1 from '../partials/ziro-slide-page-code-1.js';
import screenCode1 from '../partials/ziro-screen-code-1.js';
import wizardCode1 from '../partials/ziro-wizard-code-1.js';
import splashCode1 from '../partials/ziro-splash-code-1.js';
import inputCode1 from '../partials/ziro-input-code-1.js';
import finderCode1 from '../partials/ziro-finder-code-1.js';
import cardCode1 from '../partials/ziro-card-code-1.js';

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
  <section class="input">
    <h3><a href="/ziro-input.html">&lt;ziro-input></a></h3>
    <p>&lt;ziro-input> lets you gather user input.</p>
    ${inputCode1()}
  </section>
  <section class="finder">
    <h3><a href="/ziro-finder.html">&lt;ziro-finder></a></h3>
    <p>&lt;ziro-finder> lets you search through a list and make selections.</p>
    ${finderCode1()}
  </section>
  <section class="finder">
    <h3><a href="/ziro-card.html">&lt;ziro-card></a></h3>
    <p>&lt;ziro-card> todo.</p>
    ${cardCode1()}
  </section>
`;
