import request from 'supertest';
import app from '../../app';
import { Pizzas } from './pizzas.model';

beforeAll(async () => {
	try {
		await Pizzas.drop();
	} catch (error) {
		/* empty */
	}
});

describe('GET /api/pizzas', () => {
	it('responds with an array of pizzas', async () =>
		request(app)
			.get('/api/pizzas')
			.set('Accept', 'application/json')
			.expect('Content-Type', /json/)
			.expect(200)
			.then((response) => {
				expect(response.body).toHaveProperty('length');
				expect(response.body.length).toBe(0);
			}));
});
