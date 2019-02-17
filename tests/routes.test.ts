import request from 'supertest';

import app from '../src/server';

describe('routes test', () => {
  it('GET /user', async () => {
    const response = await request(app.callback()).get('/user');

    expect(response.status).toBe(200);
    expect(response.type).toBe('application/json');
    response.body.forEach((obj: object) => {
      expect(obj).toHaveProperty("firstName");
      expect(obj).toHaveProperty("lastName");
      expect(obj).toHaveProperty("email");
      expect(obj).toHaveProperty("password");
    });
  });

  it.skip('GET /user/alicebobeve@dev.com', async () => {
    const response = await request(app.callback()).get('/user/alicebobeve@dev.com');

    expect(response.status).toBe(200);
    expect(response.type).toBe('application/json');
    expect(response.body).toHaveProperty("firstName");
    expect(response.body).toHaveProperty("lastName");
    expect(response.body).toHaveProperty("email");
    expect(response.body).toHaveProperty("password");
    expect(response.body.email).toBe('alicebobeve@dev.com');
  });

  it('POST /user/create', async () => {
    const randomEmail = `alicebob${Math.floor(Math.random()*1000)}eve@dev.com`;
    const response = await request(app.callback())
        .post('/user/create')
        .type('application/json')
        .accept('application/json')
        .send({
          firstName: 'Alice',
          lastName: 'Bob',
          password: 'Eve',
          email: randomEmail
        });

    expect(response.status).toBe(201);
    expect(response.body.email).toBe(randomEmail);
  });

  it('POST /user/create', async () => {
    const response = await request(app.callback())
        .post('/user/create')
        .type('application/json')
        .accept('application/json')
        .send({
          firstName: 'Alice',
          lastName: 'Bob',
          password: 'Eve',
          email: `alicebobeve@dev.com`
        });

    expect(response.status).toBe(400);
  });
});