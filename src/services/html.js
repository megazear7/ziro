import weave from './weave.js';

export default function html(parts, ...expressions) {
    return weave(
        parts,
        expressions.map(exp => exp
            .replaceAll('<', '&lt;')
            .replaceAll("'", '&apos;')
            .replaceAll('"', '&squot;'))
    ).join('');
}
