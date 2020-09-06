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
    listIngredients(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            (yield database_1.default).query("SELECT id, name, amount, priceByUnit FROM ingredients WHERE active = true;")
                .then(dates => {
                res.status(200).json(dates);
            });
        });
    }
    listIngredientsInProducts(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            (yield database_1.default).query("SELECT * FROM detailProductsIngredients;")
                .then(dates => {
                res.status(200).json(dates);
            });
        });
    }
    //Get one
    getOneIngredient(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            (yield database_1.default).query("SELECT id, name, amount, priceByUnit FROM ingredients WHERE id = ? AND active = true;", [id])
                .then(dates => {
                if (dates != 0) {
                    return res.status(200).json(dates);
                }
                else {
                    return res.status(404).json({ message: "Not found" });
                }
            });
        });
    }
    getIngredientsInProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            (yield database_1.default).query("SELECT * FROM detailProductsIngredients WHERE idProduct = ?", [id])
                .then(dates => {
                res.status(200).json(dates);
            });
        });
    }
    //Post
    createIngredient(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            (yield database_1.default).query("INSERT INTO ingredients SET ?", [req.body]);
            res.status(200).json({ message: "Saved ingredient." });
        });
    }
    createIngredientInProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            (yield database_1.default).query("INSERT INTO detailProductsIngredients SET ?", [req.body]);
            res.status(200).json({ message: "Saved ingredient in product." });
        });
    }
    //Update
    updateIngredient(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            (yield database_1.default).query("UPDATE ingredients SET ? WHERE id = ?", [req.body, id]);
            res.status(200).json({ message: "Ingredient updated successfully." });
        });
    }
    updateIngredientInProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            (yield database_1.default).query("UPDATE detailProductsIngredients SET ? WHERE id = ?", [req.body, id]);
            res.status(200).json({ message: "Ingredient in product updated successfully." });
        });
    }
    updateAmountIngredients(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var ids = req.body;
            for (let x = 0; x < ids.length; x++) {
                yield (yield database_1.default).query("SELECT idIngredient, spendingAmount FROM detailProductsIngredients WHERE idProduct = ?", [ids[x]])
                    .then((dates) => __awaiter(this, void 0, void 0, function* () {
                    const ingredientsInProduct = dates;
                    for (var i = 0; i < ingredientsInProduct.length; i++) {
                        let spendingAmount = ingredientsInProduct[i].spendingAmount;
                        let idIngredient = ingredientsInProduct[i].idIngredient;
                        yield (yield database_1.default).query("SELECT amount FROM ingredients WHERE id = ? AND active = true;", [idIngredient])
                            .then((date) => __awaiter(this, void 0, void 0, function* () {
                            let newAmount = date[0].amount - spendingAmount;
                            yield (yield database_1.default).query("UPDATE ingredients SET amount = ? WHERE id = ?", [newAmount, idIngredient]);
                        }));
                    }
                }));
            }
            res.status(200).json({ message: "Ingredients amount updated successfully." });
        });
    }
    //Delete
    deleteIngredient(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            (yield database_1.default).query("UPDATE ingredients SET active = false WHERE id = ?", [id]);
            res.status(200).json({ message: "Ingredient eliminated successfully." });
        });
    }
    deleteIngredientInProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idProduct, idIngredient } = req.params;
            (yield database_1.default).query("UPDATE detailProductsIngredients SET active = false WHERE idProduct = ? AND idIngredient = ?", [idProduct, idIngredient]);
            res.status(200).json({ message: "Ingredient in product eliminated successfully." });
        });
    }
}
exports.ingredientsControllers = new IngredientsControllers();
