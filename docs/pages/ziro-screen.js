import { html } from 'orison';
import screenCode1 from '../partials/ziro-screen-code-1';
import screenCode2 from '../partials/ziro-screen-code-2';
import screenCode3 from '../partials/ziro-screen-code-3';
import screenCode4 from '../partials/ziro-screen-code-4';

export default context => html`
  <section>
    <h2>&lt;ziro-screen></h2>
    <p>&lt;ziro-screen> allows you to build a bottom navigation based app with ease. By default it takes up the full viewport. The &lt;ziro-screen> can be resized in order to use it on a subsection of the viewport.</p>
    <p>The panels will only render their contents when active. The 'next' panels is activated when the transition begins and the 'previous' panel is deactivated when the transition ends.</p>\
  </section>
  <section>
    <h3>Basic Example</h3>
    <p>The transition speed can be configued with the 'speed' attribute of the &lt;ziro-panel-set> element. The unit is provided in milliseconds.</p>
    ${screenCode1()}
    ${context.mdFile('./docs/partials/ziro-screen-1.md')}
  </section>
  <section>
    <h3>Defaul Panel Example</h3>
    <p>The default active panel can be set to something other than the first panel.</p>
    ${screenCode2()}
    ${context.mdFile('./docs/partials/ziro-screen-2.md')}
  </section>
  <section>
    <h3>Navigation Example</h3>
    <p>The panels can be given a path attribute. If the current URL path starts with the provided path, that screen will be selected by default. The provided path needs to match a full path segment, including extensions.</p>
    ${screenCode3()}
    ${context.mdFile('./docs/partials/ziro-screen-3.md')}
  </section>
  <section>
    <h3>Browser History Example</h3>
    <p>Setting the 'history' attributes on the &lt;ziro-screen> element integrates the component with the browser history. This needs to be used in conjunction with the path attributes.</p>
    <p>Try clicking on the navigation buttons and watch the url in the browser. Then, hit the back and forward buttons.</p>
    ${screenCode4()}
    ${context.mdFile('./docs/partials/ziro-screen-4.md')}
  </section>
`;
