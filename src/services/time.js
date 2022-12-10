export const wait = async function(ms) {
    return new Promise(resolve => setTimeout(() => resolve(), ms));
}
