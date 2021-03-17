import css from '../services/css.js';

export default css`
    button {
        border: none;
        background: none;
        background-color: #ddd;
        padding: 10px 20px;
        border-radius: 3px;
        font-size: 16px;
        cursor: pointer;
        transition: color 300ms ease-in-out, background-color 300ms ease-in-out;
    }

    button:hover, button.focus {
        background-color: #ff3333;
        color: white;
        outline: none;
    }
`;
