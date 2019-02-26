import request from 'supertest';

import app from '../src/server';

describe('routes test', () => {
  describe('Users', () => {
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
    
    it('GET /user/alicebobeve@dev.com', async () => {
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


  describe('Auth', () => {
    let token: string;

    beforeAll(async () => {
      const response = await request(app.callback())
          .post('/login')
          .set('Accept', 'application/json')
          .send({ email: 'neuralchain@dev.com', password: 'quantum' });

      expect(response.type).toBe('application/json');
      expect(response.body.token).toBeDefined();
      expect(response.status).toBe(200);
      token = response.body.token;
    });

    test('GET /protected-route token not set', async () => {
      const response = await request(app.callback()).get('/protected-route');
      
      expect(response.body.message).toBe('Authentication Error');
      expect(response.status).toBe(401);
    });
    
    test('GET /protected-route with token set', async () => {
      const response = await request(app.callback())
          .get('/protected-route')
          .set('Authorization', `Bearer ${token}`);
      
      expect(response.type).toBe('application/json');
      expect(response.status).toBe(200);
    });

    test('POST /signup', async () => {
      const randomEmail = `ncq${Math.floor(Math.random()*1000)}@dev.com`;
      const response = await request(app.callback())
          .post('/signup')
          .set('Accept', 'application/json')
          .send({
            firstName: 'neural',
            lastName: 'chain',
            password: 'ncquantum45',
            email: randomEmail
          });

      expect(response.type).toBe('application/json');
      expect(response.body.token).toBeDefined();
      expect(response.status).toBe(201);
    });
  });
});