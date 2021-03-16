import { html } from 'orison';

export default context => html`
  <section>
    <p>Ziro Components is a set of web components for easily building apps.</p>
  </section>
  <section>
    <h3><a href="/ziro-screen.html">&lt;ziro-screen></a></h3>
    <p>&lt;ziro-screen> allows you to build a bottom navigation based app with ease</p>
    <ziro-screen>
      <ziro-panel-set>
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
    ${context.mdFile('./docs/partials/ziro-screen-1.md')}
  </section>
`;
