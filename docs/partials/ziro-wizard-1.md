#### HTML
```html
  <div class="well">
      <div class="outer-page">
        <button>Open Wizard</button>
      </div>
      <ziro-wizard>
        <ziro-panel>
            <h3>Panel 1</h3>
            <p>Lorem ipsum...</p>
            <ziro-wizard-nav>
              <span slot="previous">Close</span>
              <span slot="next">Next &rarr;</span>
            </ziro-wizard-nav>
        </ziro-panel>
        <ziro-panel>
            <h3>Panel 2</h3>
            <p>Lorem ipsum...</p>
            <ziro-wizard-nav>
              <span slot="previous">&larr; Previous</span>
              <span slot="next">Next &rarr;</span>
            </ziro-wizard-nav>
        </ziro-panel>
        <ziro-panel>
            <h3>Panel 3</h3>
            <p>Lorem ipsum...</p>
            <ziro-wizard-nav>
              <span slot="previous">&larr; Previous</span>
              <span slot="next">Finish</span>
            </ziro-wizard-nav>
        </ziro-panel>
      </ziro-wizard>
  </div>
</div>
```

#### JS
```js
const button = document.querySelector('button');
const wizard = document.querySelector('ziro-wizard');

button.addEventListener('click', () => wizard.start());
```

#### CSS
```css
.well {
    position: relative;
    width: 100%;
    height: 400px;
    border: 1px solid #ccc;
    background-color: #ddd;
    overflow: hidden;
}

.padding {
    padding: 20px;
}
```