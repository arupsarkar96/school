"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const router_1 = __importDefault(require("./routes/router"));
const serverconf_1 = __importDefault(require("./config/serverconf"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: '*'
}));
app.set('trust proxy', 1);
app.use((0, morgan_1.default)("dev"));
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use('/v1', router_1.default);
app.use(express_1.default.static('public'));
app.use('/uploads', express_1.default.static('uploads'));
app.all('*', (req, res) => { res.sendStatus(404); });
app.listen(serverconf_1.default.PORT, '0.0.0.0', () => {
    console.log(`API server is running on`, serverconf_1.default.PORT);
});
