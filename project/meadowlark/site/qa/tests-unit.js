import { expect } from 'chai';
import { getRandomFortune } from '../lib/index.js';

suite('Fortune cookie tests', function () {
  test('getFortune() should return a fortune', function () {
    expect(typeof getRandomFortune() === 'string');
  });
});
