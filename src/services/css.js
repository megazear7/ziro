import weave from './weave.js';

export default function css(parts, ...expressions) {
    return `<style>${weave(parts, expressions).join('')}</style>`;
}
