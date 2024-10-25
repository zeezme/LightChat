"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_openid_connect_1 = require("express-openid-connect");
const DefaultRoutes_1 = __importDefault(require("./DefaultRoutes"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.configDotenv();
const router = express_1.default.Router();
const secret = process.env.AUTH0_SECRET;
const baseURL = process.env.AUTH0_BASE_URL;
const clientID = process.env.AUTH0_CLIENT_ID;
const issuerBaseURL = process.env.AUTH0_ISSUER_BASE_URL;
if (!secret || !baseURL || !clientID || !issuerBaseURL) {
    throw new Error('Missing environment variables');
}
const config = {
    authRequired: true,
    auth0Logout: true,
    secret,
    baseURL,
    clientID,
    issuerBaseURL
};
router.use((0, express_openid_connect_1.auth)(config));
router.use((request, response, next) => {
    if (!request.oidc || !request.oidc.user) {
        throw new Error('Missing user information from token.');
    }
    request.userId = request.oidc.user.sub;
    request.userEmail = request.oidc.user.email;
    request.userName = request.oidc.user.name;
    next();
});
router.use(DefaultRoutes_1.default);
exports.default = router;
