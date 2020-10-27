export interface Ingredient {
	id: number;
	name: string;
	priceByUnit: number;
	amount: number;
}

export function createEmptyIngredient(): Ingredient {
	return {
		id: 0,
		name: '',
		priceByUnit: 0,
		amount: 0
	} as Ingredient;
}

export function createIngredient(ingredient: Ingredient): Ingredient {
	return {
		id: ingredient.id,
		name: ingredient.name,
		priceByUnit: ingredient.priceByUnit,
		amount: ingredient.amount
	} as Ingredient;
}

export interface IngredientInProduct {
	id: number;
	idProduct: number;
	idIngredient: number;
	spendingAmount: number;
}
