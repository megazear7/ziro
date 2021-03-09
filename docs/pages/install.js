import { html } from 'orison';

export default context => html`
  <section>
    ${context.mdFile('./docs/partials/usage.md')}
  </section>
`;
