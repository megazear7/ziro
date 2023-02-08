import { html } from 'orison';
import finderCode1 from '../partials/ziro-finder-code-1';
import finderCode2 from '../partials/ziro-finder-code-2';

export default context => html`
  <section>
    <h2>&lt;ziro-finder></h2>
    <p>&lt;ziro-finder> lets you search through a list and make selections.</p>
  </section>
  <section class="splash">
    <h3>Basic Example</h3>
    ${finderCode1()}
    ${context.mdFile('./docs/partials/ziro-finder-1.md')}
    <h3>Plain Example</h3>
    ${finderCode2()}
    ${context.mdFile('./docs/partials/ziro-finder-2.md')}
  </section>
`;
