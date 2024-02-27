import { HourPipe } from './hour.pipe';

describe('HourPipe', () => {
  const pipe = new HourPipe();

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  describe('should return a formatted hour from UTC date to Europe/Madrid timezone', () => {
    it('should transform "2024-02-22T20:21:31.623Z" to "21:21:31"', () => {
      expect(pipe.transform('2024-02-22T20:21:31.623Z')).toBe('21:21:31');
    });
  });
});
