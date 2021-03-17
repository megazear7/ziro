import { html } from 'orison';
import slidePageCode1 from '../partials/ziro-slide-page-code-1.js';
import screenCode1 from '../partials/ziro-screen-code-1';

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
`;
