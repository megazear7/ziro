import { html } from 'orison';
import wizardCode1 from '../partials/ziro-wizard-code-1';

export default context => html`
  <section>
    <h2>&lt;ziro-wizard></h2>
    <p>&lt;ziro-wizard> allows you to build a bottom navigation based app with ease. By default it takes up the full viewport. The &lt;ziro-wizard> can be resized in order to use it on a subsection of the viewport.</p>
    <p>The panels will only render their contents when active. The 'next' panels is activated when the transition begins and the 'previous' panel is deactivated when the transition ends.</p>\
  </section>
  <section>
    <h3>Basic Example</h3>
    <p>The transition speed can be configued with the 'speed' attribute of the &lt;ziro-panel-set> element. The unit is provided in milliseconds.</p>
    ${wizardCode1()}
    ${context.mdFile('./docs/partials/ziro-wizard-1.md')}
  </section>
`;
