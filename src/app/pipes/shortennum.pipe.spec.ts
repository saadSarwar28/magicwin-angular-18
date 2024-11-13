import { ShortennumPipe } from './shortennum.pipe';

describe('ShortennumPipe', () => {
  it('create an instance', () => {
    const pipe = new ShortennumPipe();
    expect(pipe).toBeTruthy();
  });
});
