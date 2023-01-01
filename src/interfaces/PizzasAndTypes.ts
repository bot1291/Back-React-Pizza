import { PizzaWithId } from '../api/pizzas/pizzas.model';

export default interface PizzasAndTypes {
	pizzas: PizzaWithId[];
	types: string[];
}
