export const pathMatches = function(path) {
    const pathSegments = typeof path === 'string' ? path.split('/') : [];
    const urlPathSegments = window.location.pathname.split('/');

    if (pathSegments.length >= 2) {
        let matches = true;
        pathSegments.forEach((segment, index) => {
            if (segment !== urlPathSegments[index]) {
                matches = false;
            }
        });
        return matches;
    } else {
        return false;
    }
};
