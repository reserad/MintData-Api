'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.start = exports.init = exports.server = void 0;
const hapi_1 = __importDefault(require("@hapi/hapi"));
const routes_1 = require("./routes");
const services_1 = __importDefault(require("./services"));
const init = async function () {
    exports.server = hapi_1.default.server({
        port: process.env.PORT || 4000,
        host: '0.0.0.0',
        routes: {
            cors: {
                origin: ['*'],
                headers: ['Authorization', "Accept", "Content-Type"],
                exposedHeaders: ['Accept'],
                additionalExposedHeaders: ['Accept'],
                maxAge: 60,
                credentials: false
            }
        }
    });
    exports.server.realm.modifiers.route.prefix = '/api';
    exports.server.bind(services_1.default);
    exports.server.route(routes_1.routes);
    exports.server.ext('onRequest', (request, h) => {
        return h.continue;
    });
    return exports.server;
};
exports.init = init;
const start = async function () {
    console.log(`Listening on ${exports.server.settings.host}:${exports.server.settings.port}`);
    return exports.server.start();
};
exports.start = start;
process.on('unhandledRejection', (err) => {
    console.error("unhandledRejection");
    console.error(err);
    process.exit(1);
});
