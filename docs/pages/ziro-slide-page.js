import { html } from 'orison';
import slidePageCode1 from '../partials/ziro-slide-page-code-1.js';
import slidePageCode2 from '../partials/ziro-slide-page-code-2.js';
import slidePageCode3 from '../partials/ziro-slide-page-code-3.js';

export default context => html`
    <section class="slide-page">
        <h3>Basic Example</h3>
        <p>Call the .open() method of &lt;ziro-slide-page> in order to open the page.</p>
        <p>Make sure that the container is position relative and has no padding.</p>
        ${slidePageCode1()}
        ${context.mdFile('./docs/partials/ziro-slide-page-1.md')}
    </section>
    <section class="slide-page">
        <h3>Navigation Example</h3>
        <p>The path attribute will connect the &lt;ziro-slide-page> to the URL. If the URL path matches the provided path, the page will be opened.</p>
        ${slidePageCode2()}
        ${context.mdFile('./docs/partials/ziro-slide-page-2.md')}
    </section>
    <section class="slide-page">
        <h3>Browser History Example</h3>
        <p>Setting the 'history' attributes on the &lt;ziro-slide-page> element integrates the component with the browser history. This needs to be used in conjunction with the path attribute.</p>
        <p>Try clicking on the navigation buttons and watch the url in the browser. Then, hit the back and forward buttons.</p>
        ${slidePageCode3()}
        ${context.mdFile('./docs/partials/ziro-slide-page-3.md')}
    </section>
`;
