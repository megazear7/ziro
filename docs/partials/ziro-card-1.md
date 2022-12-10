#### HTML
```html
  <div class="well">
      <div class="outer-page">
        <button>Open Wizard</button>
      </div>
      <ziro-card>
        <p>test</p>
      </ziro-card>
  </div>
</div>
```

#### JS
```js
const button = document.querySelector('button');
const card = document.querySelector('ziro-card');

button.addEventListener('click', () => card.proceed());
```

#### CSS
```css
```