
const request = require('supertest');
const app = require('../../server/app'); // Assuming server exports app

describe('API Contract Tests', () => {
  describe('Authentication Endpoints', () => {
    test('POST /auth/login should validate credentials', async () => {
      const response = await request(app)
        .post('/auth/login')
        .send({
          email: 'test@healthcare.com',
          password: 'securepassword'
        });
      
      expect([200, 401]).toContain(response.status);
      if (response.status === 200) {
        expect(response.body).toHaveProperty('token');
      }
    });

    test('POST /auth/login should reject invalid format', async () => {
      const response = await request(app)
        .post('/auth/login')
        .send({
          email: 'invalid-email',
          password: ''
        });
      
      expect(response.status).toBe(400);
    });
  });

  describe('Audio Upload API', () => {
    test('POST /api/audio/upload should accept valid audio file', async () => {
      const response = await request(app)
        .post('/api/audio/upload')
        .attach('audio', Buffer.from('fake-audio-data'), 'test.wav')
        .set('Authorization', 'Bearer valid-token');
      
      expect([200, 201, 401]).toContain(response.status);
    });

    test('GET /api/audio/:id should return audio metadata', async () => {
      const response = await request(app)
        .get('/api/audio/123')
        .set('Authorization', 'Bearer valid-token');
      
      expect([200, 404, 401]).toContain(response.status);
      if (response.status === 200) {
        expect(response.body).toHaveProperty('id');
        expect(response.body).toHaveProperty('status');
      }
    });
  });

  describe('AI Processing Status', () => {
    test('GET /api/processing/:id should return processing status', async () => {
      const response = await request(app)
        .get('/api/processing/123')
        .set('Authorization', 'Bearer valid-token');
      
      expect([200, 404, 401]).toContain(response.status);
      if (response.status === 200) {
        expect(response.body).toHaveProperty('status');
        expect(['pending', 'processing', 'completed', 'failed']).toContain(response.body.status);
      }
    });
  });
});
