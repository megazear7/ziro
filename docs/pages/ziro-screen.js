import { html } from 'orison';

export default context => html`
  <section>
    <div><h3>&lt;ziro-screen></h3></div>
    <p>&lt;ziro-screen> allows you to build a bottom navigation based app with ease. By default it takes up the full viewport. The &lt;ziro-screen> can be resized in order to use it on a subsection of the viewport.</p>
    <p>The panels will only render their contents when active. The 'next' panels is activated when the transition begins and the 'previous' panel is deactivated when the transition ends.</p>
    <p>The transition speed can be configued on the &lt;ziro-panel-set> element.</p>
    <ziro-screen>
      <ziro-panel-set speed="500">
          <ziro-panel active>
              <h3>Panel 1</h3>
          </ziro-panel>
          <ziro-panel>
              <h3>Panel 2</h3>
          </ziro-panel>
          <ziro-panel>
              <h3>Panel 3</h3>
          </ziro-panel>
      </ziro-panel-set>
      <ziro-nav>
          <ziro-nav-item selected>A</ziro-nav-item>
          <ziro-nav-item>B</ziro-nav-item>
          <ziro-nav-item>C</ziro-nav-item>
      </ziro-nav>
    </ziro-screen>
    ${context.mdFile('./docs/partials/ziro-screen.md')}
  </section>
`;
