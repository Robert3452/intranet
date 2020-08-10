"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const profile_routes_1 = __importDefault(require("./profile.routes"));
const files_routes_1 = __importDefault(require("./files.routes"));
const router = express_1.Router();
router.get('/', (req, res) => {
    res.send("<h1>Hola</h1>");
});
router.use('/profile', profile_routes_1.default);
router.use('/files', files_routes_1.default);
exports.default = router;
