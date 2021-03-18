import css from '../services/css.js';

export default css`
    :host {
        --primary-color: #ff3333;
        --primary-text-color: #fff;
        --secondary-color: #264653;
        --secondary-text-color: #fff;
        --background-color: #fff;
        --background-text-color: #111;
        --selected-color: #ddd;
        --selected-text-color: #111;

        --border-radius: 3px;

        --space-small: 10px;
        --space-medium: 20px;
        --space-large: 30px;
        --space-x2: 40px;
        --space-x3: 60px;

        --font-size-small: 14px;
        --font-size-medium: 16px;
        --font-size-large: 20px;
        --font-size-x2: 26px;
        --font-size-x3: 36px;

        --transition-speed: 300ms;
    }
`;
