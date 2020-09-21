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
    listCategories(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            (yield database_1.default).query("SELECT id, name FROM categories WHERE active = true AND idCompany = ?", [req.user.idCompany])
                .then(dates => {
                res.status(200).json(dates);
            });
        });
    }
    //Get One    
    getOneCategory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            (yield database_1.default).query("SELECT id, name FROM categories WHERE id = ? AND active = true AND idCompany = ?;", [id, req.user.idCompany])
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
    //Post
    createCategory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            req.body.idCompany = req.user.idCompany;
            (yield database_1.default).query("INSERT INTO categories SET ?", [req.body]);
            res.status(200).json({ message: "Saved category." });
        });
    }
    //Update
    updateCategory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            (yield database_1.default).query("UPDATE categories SET ? WHERE id = ?", [req.body, id]);
            res.status(200).json({ message: "Category updated successfully." });
        });
    }
    //Delete
    deleteCategory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            (yield database_1.default).query("UPDATE categories SET active = false WHERE id = ?", [id]);
            res.status(200).json({ message: "Category eliminated successfully." });
        });
    }
}
exports.categoriesControllers = new CategoriesControllers();
