import { html } from 'orison';

export default (currentPath) => html`
  <nav>
    <div>
      <a href="/" class="${currentPath.length === 1 ? 'active' : ''}">Home</a>
    </div>
  </nav>
`;
