import { html } from 'orison';
import cardCode1 from '../partials/ziro-card-code-1';

export default context => html`
  <section>
    <h2>&lt;ziro-card></h2>
    <p>&lt;ziro-card> todo</p>
  </section>
  <section>
    <h3>Basic Example</h3>
    ${cardCode1()}
    ${context.mdFile('./docs/partials/ziro-card-1.md')}
  </section>
`;
