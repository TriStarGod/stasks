// Access supertest under name request
import request from 'supertest';
// top level of this test suite: the entire user API
describe('The User API', () => {
  // Specific test - the async keyword awaits for request before continuing
  it('Returns a list of all users', async () => {
    // Connect to the server and get a response
    // Expectt that the response to be a 200 and server JSON
    const res = await request('http://localhost:8000')
    .get('api/users/list')
    .expect(200)
    .expect('Content-Type', /json/);
    // These expects are jest, not supertext
    // Expect to get a result that is an array
    expect(Array.isArray(res.body)).toBe(true);
    // Expect the array to have something in it
    expect(res.body.length).toBeGreaterThan(0);
    // Expect the username of the first returned user to be administrator
    expect(res.body[0].username).toBe('administrator');
  });
});
