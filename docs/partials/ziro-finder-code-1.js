import { html } from 'orison';

export default () => html`
  <div>
    <ziro-finder placeholder="Search by movie title. For example, 'Moon'" hint="Movie title" query="">
      <ziro-item>Lord of the Rings</ziro-item>
      <ziro-item>Interstellar</ziro-item>
      <ziro-item>Avengers: End Game</ziro-item>
      <ziro-item>Alien</ziro-item>
      <ziro-item>Gone with the Wind</ziro-item>
      <ziro-item>The Hobbit</ziro-item>
      <ziro-item>Harry Potter</ziro-item>
      <ziro-item>Green Moon</ziro-item>
      <ziro-item>Blue Moon</ziro-item>
      <ziro-item>Orange Moon</ziro-item>
      <ziro-item>Red Moon</ziro-item>
      <ziro-item>Yellow Moon</ziro-item>
      <ziro-item>Example Moon</ziro-item>
    </ziro-finder>
  </div>
`;
