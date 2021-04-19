# Ziro Components

###### [A Ziro Project](https://ziro.alexlockhart.me/)

[![Netlify Status](https://api.netlify.com/api/v1/badges/5725bd07-7160-4bf8-aaf5-13a8a7580e7b/deploy-status)](https://app.netlify.com/sites/ziro-components/deploys)

A library of web components

## Using

```bash
npm install ziro
```

```js
import 'ziro';
```

```html
<ziro-panel></ziro-panel>
```

## Contributing

### Install

```
npm install
```

### Serve

```
npm start
```

Open [localhost:8000/dev](http://localhost:8000/dev)

### Build

```
npm run build
```

Then push to the master branch.

### Deploy

Bump the package version in `package.json` and bump the service worker cache version in `docs/static/sw.js`. Then push changes to the `main` branch and run `npm publish`. Make sure all changes are detailed in the documentation.

### Documentation

#### Serve

```
npm run docs:serve
```

Open [localhost:3000](http://localhost:3000)

#### Build

```
npm run docs:build
```

## Support

[Buy me a coffee](https://www.buymeacoffee.com/alexlockhart)

[Patreon](https://www.patreon.com/alexlockhart)
