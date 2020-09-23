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
exports.productsController = void 0;
const database_1 = __importDefault(require("../../database"));
class ProductsController {
    //Get All List
    listAllProducts(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield database_1.default).query("SELECT id, name, price FROM products WHERE idCompany = ?", [request.user.idCompany])
                .then(dates => {
                return response.status(200).json(dates);
            });
        });
    }
    //Get list
    listProducts(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield database_1.default).query("SELECT id, name, price FROM products WHERE active = true AND idCompany = ?", [request.user.idCompany])
                .then(dates => {
                return response.status(200).json(dates);
            });
        });
    }
    listIngredientsInProducts(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield database_1.default).query("SELECT id, idProduct, idIngredient, spendingAmount FROM detailProductsIngredients WHERE active = true AND idCompany = ?", [request.user.idCompany])
                .then(dates => {
                return response.status(200).json(dates);
            });
        });
    }
    //Get one
    getOneProduct(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = request.params;
            return (yield database_1.default).query("SELECT id, idCategory , name, price FROM products WHERE id = ? AND active = true AND idCompany = ?", [id, request.user.idCompany])
                .then(dates => {
                if (dates != 0) {
                    return response.status(200).json(dates);
                }
                else {
                    return response.status(404).json({ message: "Not found" });
                }
            });
        });
    }
    getIngredientsInProduct(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = request.params;
            return (yield database_1.default).query("SELECT id, idProduct, idIngredient, spendingAmount FROM detailProductsIngredients WHERE idProduct = ? AND active = true AND idCompany = ?", [id, request.user.idCompany])
                .then(dates => {
                return response.status(200).json(dates);
            });
        });
    }
    //Post
    createProduct(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            request.body.idCompany = request.user.idCompany;
            return (yield database_1.default).query("INSERT INTO products SET ?", [request.body])
                .then(function (value) {
                return __awaiter(this, void 0, void 0, function* () {
                    return response.status(200).json({
                        message: "Saved product.",
                        id: value.insertId
                    });
                });
            });
        });
    }
    createIngredientInProduct(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            request.body.idCompany = request.user.idCompany;
            return (yield database_1.default).query("INSERT INTO detailProductsIngredients SET ?", [request.body])
                .then(value => {
                return response.status(200).json({ message: "Saved ingredient in product." });
            });
        });
    }
    //Update
    updateProduct(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = request.params;
            return (yield database_1.default).query("UPDATE products SET ? WHERE id = ?", [request.body, id])
                .then(value => {
                return response.status(200).json({ message: "Product updated successfully." });
            });
        });
    }
    updateIngredientInProduct(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = request.params;
            return (yield database_1.default).query("UPDATE detailProductsIngredients SET ? WHERE id = ?", [request.body, id])
                .then(value => {
                return response.status(200).json({ message: "Ingredient in product updated successfully." });
            });
        });
    }
    //Delete
    deleteProduct(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = request.params;
            return (yield database_1.default).query("UPDATE products SET active = false WHERE id = ?", [id])
                .then(value => {
                return response.status(200).json({ message: "Product eliminated successfully." });
            });
        });
    }
    deleteIngredientInProduct(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = request.params;
            return (yield database_1.default).query("UPDATE detailProductsIngredients SET active = false WHERE id = ?", [id])
                .then(value => {
                return response.status(200).json({ message: "Ingredient in product eliminated successfully." });
            });
        });
    }
}
exports.productsController = new ProductsController();
