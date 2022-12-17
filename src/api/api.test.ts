import request from 'supertest';
import app from '../app';

describe('GET /api', () => {
	it('responds with a json message', async () => {
		request(app)
			.get('/api')
			.set('Accept', 'application/json')
			.expect('Content-Type', /json/)
			.expect(200)
			.then((response) => {
				expect(response.body).toHaveProperty('message');
				expect(response.body.message).toBe('Api route');
			});
	});
});
