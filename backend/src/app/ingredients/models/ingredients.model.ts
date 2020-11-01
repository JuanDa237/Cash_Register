export interface Ingredient {
	id: number;
	idCompanyn: number;
	name: string;
	priceByUnit: number;
	amount: number;
	active: boolean;
}

export interface IngredientInProduct {
	id: number;
	idCompany: number;
	idProduct: number;
	idIngredient: number;
	spendingAmount: number;
	active: boolean;
}
