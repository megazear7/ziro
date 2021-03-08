export default function weave(a, b) {
    return a.length ? [a[0], ...weave(b, a.slice(1))] : b;
}
