import { html } from 'orison';
import inputCode1 from '../partials/ziro-input-code-1';

export default context => html`
  <section>
    <h2>&lt;ziro-input></h2>
    <p>&lt;ziro-input> allows you to take user input.</p>
    <p>You can get the users input with the 'input' property.</p>
    <p>You can listen to changes with the 'ziro-selector-input' and 'ziro-selector-change' events.</p>
  </section>
  <section class="splash">
    <h3>Basic Example</h3>
    ${inputCode1()}
    ${context.mdFile('./docs/partials/ziro-input-1.md')}
  </section>
`;
