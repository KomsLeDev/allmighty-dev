jest.mock('./services/anthropic.service', () => ({
  analyzeDamage: jest.fn(),
}));

const request = require('supertest');
const app = require('./app');
const { analyzeDamage } = require('./services/anthropic.service');

describe('GET /', () => {
  it('confirms the API is running', async () => {
    const res = await request(app).get('/');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ message: 'API is running' });
  });
});

describe('POST /api/analyze-damage', () => {
  it('rejects a request with no file', async () => {
    const res = await request(app).post('/api/analyze-damage');
    expect(res.status).toBe(400);
    expect(res.body).toEqual({ error: 'Aucune image reçue' });
  });

  it('returns the analysis when a file is provided', async () => {
    const fakeAnalysis = {
      objects: [{ name: 'Chaise', damage: 'léger', description: '...', estimatedValue: 50 }],
    };
    analyzeDamage.mockResolvedValue(fakeAnalysis);

    const res = await request(app)
      .post('/api/analyze-damage')
      .attach('image', Buffer.from('fake-image-data'), 'test.jpg');

    expect(res.status).toBe(200);
    expect(res.body).toEqual({ analysis: fakeAnalysis });
  });

  it('returns a 500 when the analysis fails', async () => {
    analyzeDamage.mockRejectedValue(new Error('Anthropic API unreachable'));

    const res = await request(app)
      .post('/api/analyze-damage')
      .attach('image', Buffer.from('fake-image-data'), 'test.jpg');

    expect(res.status).toBe(500);
  });
});
