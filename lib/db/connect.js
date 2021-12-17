"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.knex = void 0;
const knex_1 = __importDefault(require("knex"));
const knexfile_1 = __importDefault(require("./knexfile"));
const knex_paginate_1 = require("knex-paginate");
const config = knexfile_1.default.development;
const knex = (0, knex_1.default)(config);
exports.knex = knex;
(0, knex_paginate_1.attachPaginate)();
