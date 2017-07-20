import { helloEndpointRoute } from './index';

test('helloEndpointRoute', () => {
  expect(helloEndpointRoute()).toBe('/ajax/hello/:num');
  expect(helloEndpointRoute(123)).toBe('/ajax/hello/123');
});
