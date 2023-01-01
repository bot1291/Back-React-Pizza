import { Pizzas } from '../api/pizzas/pizzas.model';

const getAllTypes = async (): Promise<string[]> => {
	const pizzas = await Pizzas.find().toArray();

	const allPizzaTypes = pizzas.map((pizza) => pizza.types).flat();
	const sortedTypes: string[] = [];
	allPizzaTypes.forEach((pizza) => {
		if (!sortedTypes.includes(pizza)) {
			sortedTypes.push(pizza);
		}
	});

	return sortedTypes;
};

export default getAllTypes;
