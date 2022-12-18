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

let id = '';
describe('POST /api/pizzas', () => {
	it('responds with a created pizza', async () =>
		request(app)
			.post('/api/pizzas')
			.set('Accept', 'applicatipn/json')
			.send({
				currentPrice: 100,
				image: 'https://cdn.fishki.net/upload/post/2020/11/11/3470626/324e458e86be1f4ab97ee5a667f8fa1a.jpg',
				title: 'Пицца',
				rating: 5,
				types: ['Сырная'],
				possibleDoughs: ['тонкое'],
				sizesAndPrices: [
					{
						size: '30',
						price: 100,
					},
				],
			})
			.expect('Content-Type', /json/)
			.expect(201)
			.then((response) => {
				expect(response.body).toHaveProperty('_id');
				id = response.body._id;
				expect(response.body).toHaveProperty('currentPrice');
				expect(response.body.currentPrice).toBe(100);
				expect(response.body).toHaveProperty('title');
				expect(response.body.title).toBe('Пицца');
				expect(response.body).toHaveProperty('sizesAndPrices');
			}));
	it('responds with an error if pizza structure is invalid', async () =>
		request(app)
			.post('/api/pizzas')
			.set('Accept', 'applicatipn/json')
			.send({
				currentPrice: 100,
			})
			.expect('Content-Type', /json/)
			.expect(422)
			.then((response) => {
				expect(response.body).toHaveProperty('message');
			}));
});

describe('GET /api/pizzas/:id', () => {
	it('responds with a one pizzas', async () =>
		request(app)
			.get(`/api/pizzas/${id}`)
			.set('Accept', 'application/json')
			.expect('Content-Type', /json/)
			.expect(200)
			.then((response) => {
				expect(response.body).toHaveProperty('_id');
				expect(response.body._id).toBe(id);
				expect(response.body).toHaveProperty('currentPrice');
				expect(response.body.currentPrice).toBe(100);
				expect(response.body).toHaveProperty('title');
				expect(response.body.title).toBe('Пицца');
				expect(response.body).toHaveProperty('sizesAndPrices');
			}));
	it('responds with a not found error', async () =>
		request(app)
			.get(`/api/pizzas/639dadb976b8603fcc1111eb`)
			.set('Accept', 'application/json')
			.expect('Content-Type', /json/)
			.expect(404)
			.then((response) => {
				expect(response.body).toHaveProperty('message');
			}));
	it('responds with an incorrect error id', async () =>
		request(app)
			.get('/api/pizzas/id_that_dont_exist')
			.set('Accept', 'application/json')
			.expect('Content-Type', /json/)
			.expect(422)
			.then((response) => {
				expect(response.body).toHaveProperty('message');
			}));
});
