const request = require('supertest');
const app = require('../server');

describe('Server API Tests', () => {
  test('GET /api/health should return OK status', async () => {
    const response = await request(app)
      .get('/api/health')
      .expect(200);
    
    expect(response.body.status).toBe('OK');
    expect(response.body.timestamp).toBeDefined();
    expect(response.body.uptime).toBeDefined();
  });

  test('GET /api/friends should return friends array', async () => {
    const response = await request(app)
      .get('/api/friends')
      .expect(200);
    
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
  });

  test('GET /api/friends/harsh should return specific friend', async () => {
    const response = await request(app)
      .get('/api/friends/harsh')
      .expect(200);
    
    expect(response.body.name).toBe('Harsh');
    expect(response.body.tagline).toBeDefined();
    expect(response.body.bio).toBeDefined();
  });

  test('GET /api/friends/nonexistent should return 404', async () => {
    const response = await request(app)
      .get('/api/friends/nonexistent')
      .expect(404);
    
    expect(response.body.error).toBe('Friend not found');
  });

  test('GET / should serve index.html', async () => {
    const response = await request(app)
      .get('/')
      .expect(200);
    
    expect(response.text).toContain('2024 Walle Pals');
  });
});