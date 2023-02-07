"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongooseBaseService = void 0;
var mongoose_1 = require("mongoose");
var decorator_1 = require("./decorator");
var MongooseBaseService = /** @class */ (function () {
    function MongooseBaseService(mongooseModel) {
        this._mongooseModel = mongooseModel;
    }
    MongooseBaseService.prototype.getAll = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._mongooseModel.find({}).lean()];
                    case 1: return [2 /*return*/, (_a.sent())];
                }
            });
        });
    };
    MongooseBaseService.prototype.getById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._mongooseModel.findById(id)];
                    case 1: return [2 /*return*/, (_a.sent())];
                }
            });
        });
    };
    MongooseBaseService.prototype.getOne = function (query) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._mongooseModel.findOne(query)];
                    case 1: return [2 /*return*/, (_a.sent())];
                }
            });
        });
    };
    MongooseBaseService.prototype.getByQuery = function (_a) {
        var page = _a.page, limit = _a.limit, select = _a.select, sort = _a.sort, query = _a.query;
        return __awaiter(this, void 0, void 0, function () {
            var _b, docs, count;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, Promise.all([
                            this._mongooseModel
                                .find(query)
                                .select(select)
                                .sort(sort)
                                .skip(page * limit)
                                .limit(limit)
                                .lean(),
                            this._mongooseModel.find(query).countDocuments(),
                        ])];
                    case 1:
                        _b = _c.sent(), docs = _b[0], count = _b[1];
                        return [2 /*return*/, {
                                records: docs,
                                metadata: {
                                    totalPage: Math.ceil(count / limit),
                                    totalRecord: count,
                                    currentPage: page,
                                    limit: limit,
                                },
                            }];
                }
            });
        });
    };
    MongooseBaseService.prototype.getDistinct = function (_a) {
        var distinct = _a.distinct, query = _a.query;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this._mongooseModel.distinct(distinct, query)];
                    case 1: return [2 /*return*/, _b.sent()];
                }
            });
        });
    };
    MongooseBaseService.prototype.create = function (data, options) {
        if (options === void 0) { options = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var model;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        model = new this._mongooseModel(data);
                        return [4 /*yield*/, model.save(options)];
                    case 1: return [2 /*return*/, (_a.sent())];
                }
            });
        });
    };
    MongooseBaseService.prototype.createOrUpdate = function (query, data, options) {
        if (options === void 0) { options = {}; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._mongooseModel.findOneAndUpdate(query, data, __assign({ new: true, upsert: true }, options))];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    MongooseBaseService.prototype.createMany = function (data, options) {
        if (options === void 0) { options = {}; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._mongooseModel.insertMany(data, options)];
                    case 1: return [2 /*return*/, (_a.sent())];
                }
            });
        });
    };
    MongooseBaseService.prototype.countByQuery = function (query) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._mongooseModel.find(query).countDocuments()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    MongooseBaseService.prototype.updateOne = function (query, data, options) {
        if (options === void 0) { options = {}; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._mongooseModel.findOneAndUpdate(query, data, __assign({ new: true }, options))];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    MongooseBaseService.prototype.updateMany = function (query, data, options) {
        if (options === void 0) { options = {}; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._mongooseModel.updateMany(query, data, __assign({ new: true }, options))];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    MongooseBaseService.prototype.updateById = function (id, data, options) {
        if (options === void 0) { options = {}; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._mongooseModel.findByIdAndUpdate(id, data, __assign({ new: true }, options))];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    MongooseBaseService.prototype.deleteById = function (id, options) {
        if (options === void 0) { options = {}; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._mongooseModel.findByIdAndDelete(id, options)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    MongooseBaseService.prototype.deleteOne = function (query, options) {
        if (options === void 0) { options = {}; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._mongooseModel.findOneAndDelete(query, options)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    MongooseBaseService.prototype.deleteMany = function (query, options) {
        if (options === void 0) { options = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var doc;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._mongooseModel.deleteMany(query, options)];
                    case 1:
                        doc = _a.sent();
                        return [2 /*return*/, doc];
                }
            });
        });
    };
    MongooseBaseService.prototype.populate = function (iPopulate) {
        return __awaiter(this, void 0, void 0, function () {
            var query, sort, select, populate, _a, page, _b, limit, _c, docs, count;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        query = iPopulate.query, sort = iPopulate.sort, select = iPopulate.select, populate = iPopulate.populate, _a = iPopulate.page, page = _a === void 0 ? 0 : _a, _b = iPopulate.limit, limit = _b === void 0 ? 10 : _b;
                        return [4 /*yield*/, Promise.all([
                                this._mongooseModel
                                    .find(query)
                                    .populate(populate)
                                    .select(select)
                                    .sort(sort)
                                    .skip(page * limit)
                                    .limit(limit)
                                    .exec(),
                                this._mongooseModel.find(query).countDocuments(),
                            ])];
                    case 1:
                        _c = _d.sent(), docs = _c[0], count = _c[1];
                        return [2 /*return*/, {
                                records: docs,
                                metadata: {
                                    totalPage: Math.ceil(count / limit),
                                    totalRecord: count,
                                    currentPage: page,
                                    limit: limit,
                                },
                            }];
                }
            });
        });
    };
    MongooseBaseService.prototype.getOneAndPopulate = function (iPopulate) {
        return __awaiter(this, void 0, void 0, function () {
            var query, populate;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        query = iPopulate.query, populate = iPopulate.populate;
                        return [4 /*yield*/, this._mongooseModel.findOne(query).populate(populate)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    MongooseBaseService.prototype.updateOneAndPopulate = function (iUpdateAndPopulate) {
        return __awaiter(this, void 0, void 0, function () {
            var query, data, populate, select, _a, options;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        query = iUpdateAndPopulate.query, data = iUpdateAndPopulate.data, populate = iUpdateAndPopulate.populate, select = iUpdateAndPopulate.select, _a = iUpdateAndPopulate.options, options = _a === void 0 ? {} : _a;
                        return [4 /*yield*/, this._mongooseModel
                                .findOneAndUpdate(query, data, __assign(__assign({}, options), { new: true }))
                                .populate(populate)
                                .select(select)
                                .exec()];
                    case 1: return [2 /*return*/, _b.sent()];
                }
            });
        });
    };
    MongooseBaseService.prototype.aggregate = function (arg) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._mongooseModel.aggregate(arg)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    MongooseBaseService = __decorate([
        decorator_1.Injectable,
        __metadata("design:paramtypes", [mongoose_1.Model])
    ], MongooseBaseService);
    return MongooseBaseService;
}());
exports.MongooseBaseService = MongooseBaseService;
