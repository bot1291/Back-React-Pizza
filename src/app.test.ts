import request from 'supertest';
import app from './app';

describe('app', () => {
	it('responds with a not found message', (done) => {
		request(app)
			.get('/what-is-this-even')
			.set('Accept', 'application/json')
			.expect('Content-Type', /json/)
			.expect(404, done);
	});
});

describe('GET /', () => {
	it('responds with a json message', async () =>
		request(app)
			.get('/')
			.set('Accept', 'application/json')
			.expect('Content-Type', /json/)
			.expect(200)
			.then((response) => {
				expect(response.body).toHaveProperty('message');
				expect(response.body.message).toBe('Start page');
			}));
});
