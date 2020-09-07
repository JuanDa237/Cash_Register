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
    listAllProducts(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            (yield database_1.default).query("SELECT id, name, price FROM products;")
                .then(dates => {
                res.status(200).json(dates);
            });
        });
    }
    //Get list
    listProducts(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            (yield database_1.default).query("SELECT id, name, price FROM products WHERE active = true;")
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
    getOneProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            (yield database_1.default).query("SELECT id, idCategory , name, price FROM products WHERE id = ? AND active = true;", [id])
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
            (yield database_1.default).query("SELECT * FROM detailProductsIngredients WHERE idProduct = ? AND active = true;", [id])
                .then(dates => {
                res.status(200).json(dates);
            });
        });
    }
    //Post
    createProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            (yield database_1.default).query("INSERT INTO products SET ?", [req.body])
                .then(function (value) {
                return __awaiter(this, void 0, void 0, function* () {
                    (yield database_1.default).query("SELECT id FROM products WHERE id=(SELECT max(id) FROM products);").then(dates => {
                        res.status(200).json({
                            message: "Saved product.",
                            id: dates
                        });
                    });
                });
            });
        });
    }
    createIngredientInProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            (yield database_1.default).query("INSERT INTO detailProductsIngredients SET ?", [req.body]);
            res.status(200).json({ message: "Saved ingredient in product." });
        });
    }
    //Update
    updateProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            (yield database_1.default).query("UPDATE products SET ? WHERE id = ?", [req.body, id]);
            res.status(200).json({ message: "Product updated successfully." });
        });
    }
    updateIngredientInProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            (yield database_1.default).query("UPDATE detailProductsIngredients SET ? WHERE id = ?", [req.body, id]);
            res.status(200).json({ message: "Ingredient in product updated successfully." });
        });
    }
    //Delete
    deleteProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            (yield database_1.default).query("UPDATE products SET active = false WHERE id = ?", [id]);
            res.status(200).json({ message: "Product eliminated successfully." });
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
exports.productsController = new ProductsController();
