import weave from './weave.js';

export default function html(parts, ...expressions) {
    return weave(parts, expressions).join('');
}
