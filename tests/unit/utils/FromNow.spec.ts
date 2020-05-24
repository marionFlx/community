import fromNow from '@/utils/FromNow';

describe('FromNow', () => {
  test('should transform a date', () => {
    const date = '2016-02-18T08:02:00Z';
    const transformed = fromNow(date);

    // The filter should transform the date into a human string, using the `fromNow` method of Moment.js
    expect(transformed).toContain('ago');
  });
});
