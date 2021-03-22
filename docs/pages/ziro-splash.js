import { html } from 'orison';
import splashCode1 from '../partials/ziro-splash-code-1';
import splashCode2 from '../partials/ziro-splash-code-2';
import splashCode3 from '../partials/ziro-splash-code-3';

export default context => html`
  <section>
    <h2>&lt;ziro-splash></h2>
    <p>&lt;ziro-splash> allows you to add splash effects.</p>
  </section>
  <section class="splash">
    <h3>Basic Example</h3>
    <p>The splash effect will be bounded by the first ancestor element that is set to relative positioning.</p>
    ${splashCode1()}
    ${context.mdFile('./docs/partials/ziro-splash-1.md')}
  </section>
  <section class="splash">
    <h3>Speed Example</h3>
    <p>You can increase and decrease the speed of the animation with the speed attribute. The speed should be any number greater than 0. The default speed is 1.</p>
    ${splashCode2()}
    ${context.mdFile('./docs/partials/ziro-splash-2.md')}
  </section>
  <section class="splash">
    <h3>Opacity Example</h3>
    <p>You can increase and decrease the opacity of the animation with the opacity attribute. The opacity should be greater than 0 and less than 1. The default opacity is 0.5</p>
    ${splashCode3()}
    ${context.mdFile('./docs/partials/ziro-splash-3.md')}
  </section>
`;
