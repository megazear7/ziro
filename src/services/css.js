import weave from './weave.js';

export default function css(parts, ...expressions) {
    return weave(parts, expressions).join('');
}
