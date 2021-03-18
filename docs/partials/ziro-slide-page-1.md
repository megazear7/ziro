#### HTML
```html
<div class="well">
    <div class="padding">
        <button id="open-btn">Open Settings</button>
    </div>
    <ziro-slide-page id="page-to-open">
        <ziro-closer>&larr; Close</ziro-closer>
        <h2>Settings</h2>
        <p>Lorem ipsum...</p>
    </ziro-slide-page>
</div>
```

#### JS
```js
document.getElementById('open-btn').addEventListener('click', () => {
    document.getElementById('page-to-open').open();
});
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
