"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ingredientsControllers = void 0;
const database_1 = __importDefault(require("../../database"));
class IngredientsControllers {
    //Get list
    listIngredients(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield database_1.default).query("SELECT id, name, amount, priceByUnit FROM ingredients WHERE active = true AND idCompany = ?", [request.user.idCompany])
                .then(dates => {
                return response.status(200).json(dates);
            });
        });
    }
    //Get one
    getOneIngredient(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = request.params;
            return (yield database_1.default).query("SELECT id, name, amount, priceByUnit FROM ingredients WHERE id = ? AND active = true AND idCompany = ?", [id, request.user.idCompany])
                .then((dates) => {
                if (dates.length != 0) {
                    return response.status(200).json(dates[0]);
                }
                else {
                    return response.status(404).json({ message: "Not found" });
                }
            });
        });
    }
    //Post
    createIngredient(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            request.body.idCompany = request.user.idCompany;
            return (yield database_1.default).query("INSERT INTO ingredients SET ?", [request.body])
                .then(value => {
                return response.status(200).json({ message: "Saved ingredient." });
            });
        });
    }
    //Update
    updateIngredient(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = request.params;
            return (yield database_1.default).query("UPDATE ingredients SET ? WHERE id = ?", [request.body, id])
                .then(value => {
                return response.status(200).json({ message: "Ingredient updated successfully." });
            });
        });
    }
    updateAmountIngredients(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            var ids = request.body;
            const idCompany = request.user.idCompany;
            for (let x = 0; x < ids.length; x++) {
                yield (yield database_1.default).query("SELECT idIngredient, spendingAmount FROM detailProductsIngredients WHERE idProduct = ? AND idCompany = ?", [ids[x], idCompany])
                    .then((dates) => __awaiter(this, void 0, void 0, function* () {
                    const ingredientsInProduct = dates;
                    for (var i = 0; i < ingredientsInProduct.length; i++) {
                        let spendingAmount = ingredientsInProduct[i].spendingAmount;
                        let idIngredient = ingredientsInProduct[i].idIngredient;
                        yield (yield database_1.default).query("SELECT amount FROM ingredients WHERE id = ? AND active = true AND idCompany = ?", [idIngredient, idCompany])
                            .then((date) => __awaiter(this, void 0, void 0, function* () {
                            let newAmount = date[0].amount - spendingAmount;
                            yield (yield database_1.default).query("UPDATE ingredients SET amount = ? WHERE id = ?", [newAmount, idIngredient]);
                        }));
                    }
                }));
            }
            return response.status(200).json({ message: "Ingredients amount updated successfully." });
        });
    }
    //Delete
    deleteIngredient(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = request.params;
            return (yield database_1.default).query("UPDATE ingredients SET active = false WHERE id = ?", [id])
                .then(value => {
                return response.status(200).json({ message: "Ingredient eliminated successfully." });
            });
        });
    }
}
exports.ingredientsControllers = new IngredientsControllers();
