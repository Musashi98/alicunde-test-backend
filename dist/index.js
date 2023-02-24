"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose = __importStar(require("mongoose"));
const bodyParser = require("body-parser");
const cors = require("cors");
dotenv_1.default.config();
const app = (0, express_1.default)();
//Middleware
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
const authorRoutes = require('./routers/AuthorRoutes');
const bookRoutes = require('./routers/BookRoutes');
app.use("/api/author", authorRoutes);
app.use("/api/book", bookRoutes);
// Url path not found
app.use((req, res) => {
    res.status(404).json({ message: "No se encuentra el recurso " + req.path, errorCode: -1 });
});
// General error in any controller
app.use((err, req, res, next) => {
    res.status(500).json({ message: err.message, errorCode: 0 });
});
const CONNECTION_URL = process.env.DB_URL || "mongodb://127.0.0.1:27017/backend-test";
const PORT = process.env.PORT || 5000;
mongoose
    .connect(CONNECTION_URL)
    .then(() => {
    app.listen(PORT, () => {
        console.log(`Servidor corriendo en el puerto ${PORT}`);
    });
})
    .catch((error) => {
    console.log(error.message);
});
