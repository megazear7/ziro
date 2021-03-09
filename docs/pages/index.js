import { html } from 'orison';

export default context => html`
  <div class="home>
    <section>
      <p>A set of web components for easily building apps.</p>
    </section>
    <section>
      <div><a href="/ziro-screen.html"><h3>&lt;ziro-screen></h3></a></div>
      <p>ZiroScreen allows you to build a bottom navigation based app with ease</p>
      <ziro-screen>
        <ziro-panel-set>
            <ziro-panel>
                <h1>Panel 1</h1>
            </ziro-panel>
            <ziro-panel>
                <h1>Panel 2</h1>
            </ziro-panel>
            <ziro-panel>
                <h1>Panel 3</h1>
            </ziro-panel>
        </ziro-panel-set>
        <ziro-nav>
            <ziro-nav-item selected>A</ziro-nav-item>
            <ziro-nav-item>B</ziro-nav-item>
            <ziro-nav-item>C</ziro-nav-item>
        </ziro-nav>
      </ziro-screen>
    </section>
    <section>
      <div><a href="/ziro-panel.html"><h3>&lt;ziro-panel></h3></a></div>
      <p></p>
    </section>
    <section>
      <div><a href="/ziro-panel-set.html"><h3>&lt;ziro-panel-set></h3></a></div>
      <p></p>
    </section>
    <section>
      <div><a href="/ziro-nav.html"><h3>&lt;ziro-nav></h3></a></div>
      <p></p>
    </section>
    <section>
      <div><a href="/ziro-nav-item.html"><h3>&lt;ziro-nav-item></h3></a></div>
      <p></p>
    </section>
  </div>
`;
