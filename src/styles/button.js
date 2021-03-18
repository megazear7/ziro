import css from '../services/css.js';

export default css`
    button {
        border: none;
        background: none;
        background-color: var(--selected-color);
        color: var(--selected-text-color);
        padding: var(--space-small) var(--space-medium);
        border-radius: var(--border-radius);
        font-size: var(--font-size-medium);
        cursor: pointer;
        transition: color var(--transition-speed) ease-in-out, background-color var(--transition-speed) ease-in-out;
    }

    button:hover, button.focus {
        background-color: var(--primary-color);
        color: var(--primary-text-color);
        color: white;
        outline: none;
    }
`;
