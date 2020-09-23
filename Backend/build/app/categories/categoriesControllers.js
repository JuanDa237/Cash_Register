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
exports.categoriesControllers = void 0;
const database_1 = __importDefault(require("../../database"));
class CategoriesControllers {
    //Get List
    listCategories(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield database_1.default).query("SELECT id, name FROM categories WHERE active = true AND idCompany = ?", [request.user.idCompany])
                .then(dates => {
                return response.status(200).json(dates);
            });
        });
    }
    //Get One    
    getOneCategory(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = request.params;
            return (yield database_1.default).query("SELECT id, name FROM categories WHERE id = ? AND active = true AND idCompany = ?;", [id, request.user.idCompany])
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
    createCategory(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            request.body.idCompany = request.user.idCompany;
            return (yield database_1.default).query("INSERT INTO categories SET ?", [request.body])
                .then(value => {
                return response.status(200).json({ message: "Saved category." });
            });
        });
    }
    //Update
    updateCategory(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = request.params;
            return (yield database_1.default).query("UPDATE categories SET ? WHERE id = ?", [request.body, id])
                .then(value => {
                return response.status(200).json({ message: "Category updated successfully." });
            });
        });
    }
    //Delete
    deleteCategory(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = request.params;
            return (yield database_1.default).query("UPDATE categories SET active = false WHERE id = ?", [id])
                .then((value) => __awaiter(this, void 0, void 0, function* () {
                yield (yield database_1.default).query("SELECT id FROM products WHERE idCategory = ? AND active = true", [id])
                    .then((value) => __awaiter(this, void 0, void 0, function* () {
                    //Delete products in category
                    for (var i = 0; i < value.length; i++) {
                        (yield database_1.default).query("UPDATE products SET active = false WHERE id = ?", [value[i].id]);
                    }
                }));
                return response.status(200).json({ message: "Category eliminated successfully." });
            }));
        });
    }
}
exports.categoriesControllers = new CategoriesControllers();
