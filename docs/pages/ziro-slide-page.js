import { html } from 'orison';
import slidePageCode1 from '../partials/ziro-slide-page-code-1.js';

export default context => html`
    <section class="slide-page">
        <h3>Basic Example</h3>
        <p>Call the .open() method of &lt;ziro-slide-page> in order to open the page.</p>
        <p>Make sure that the container is position relative and has no padding.</p>
        ${slidePageCode1()}
        ${context.mdFile('./docs/partials/ziro-slide-page-1.md')}
    </section>
`;
