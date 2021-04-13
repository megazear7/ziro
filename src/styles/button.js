import css from '../services/css.js';

export default css`
    button {
        border: none;
        background: none;
        background-color: var(--zc-selected-color);
        color: var(--zc-selected-text-color);
        padding: var(--zc-space-small) var(--zc-space-medium);
        border-radius: var(--zc-border-radius);
        font-size: var(--zc-font-size-medium);
        cursor: pointer;
        transition: color var(--zc-transition-speed) ease-in-out, background-color var(--zc-transition-speed) ease-in-out;
    }

    button:hover, button:focus {
        background-color: var(--zc-primary-color);
        color: var(--zc-primary-text-color);
        outline: none;
    }
`;
