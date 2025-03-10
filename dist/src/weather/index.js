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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fetch_1 = __importDefault(require("../../lib/fetch"));
var chalk_1 = __importDefault(require("chalk"));
var fs_1 = __importDefault(require("fs"));
var spinner_1 = __importDefault(require("../../lib/spinner"));
var lang_1 = __importStar(require("../../lang"));
var config_1 = require("./config");
var data_1 = __importDefault(require("./data"));
var utils_1 = require("../../lib/utils");
var package_json_1 = __importDefault(require("../../package.json"));
var path_1 = __importDefault(require("path"));
var _packgeJson = JSON.parse(JSON.stringify(package_json_1.default));
var tempCityCode = _packgeJson.city || '110100';
var writeCode = function (item) {
    var code = item.code, address = item.address;
    _packgeJson.city = code;
    var str = JSON.stringify(_packgeJson);
    try {
        var packagePath = path_1.default.resolve(__dirname, '../../package.json');
        fs_1.default.writeFileSync(packagePath, str);
        (0, utils_1.consoleSuccess)(lang_1.langFormatData.getEditWeatherCodeSuccess(address));
    }
    catch (error) {
        console.log(error);
    }
};
var getWeather = function (inputCityCode, type) { return __awaiter(void 0, void 0, void 0, function () {
    var cityCode, _a, code, res, error;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                cityCode = inputCityCode || tempCityCode;
                if (!data_1.default.find(function (item) { return item.code === cityCode; })) {
                    (0, utils_1.consoleErr)(lang_1.default.weatherCodeNotFind);
                    return [2 /*return*/];
                }
                spinner_1.default.log(lang_1.default.weathering);
                return [4 /*yield*/, fetch_1.default.get("".concat((0, config_1.getWeatherAPI)(type, cityCode)), true)];
            case 1:
                _a = _b.sent(), code = _a.code, res = _a.res, error = _a.error;
                if (code !== 0 || res.status !== '1') {
                    spinner_1.default.stop();
                    console.log("".concat(chalk_1.default.red(error)));
                    return [2 /*return*/];
                }
                spinner_1.default.stop();
                (0, config_1.printWeather)(type, res);
                return [2 /*return*/];
        }
    });
}); };
exports.default = (function (inputCityCode, opt) { return __awaiter(void 0, void 0, void 0, function () {
    var keys, length, type, findList, findItem;
    return __generator(this, function (_a) {
        keys = Object.keys(opt);
        length = keys.length;
        if (length > 1) {
            (0, utils_1.consoleErr)(lang_1.default.optionError);
            return [2 /*return*/];
        }
        type = keys[0] ? keys[0] : 'all';
        // 寻找code码 findcode
        if (type === 'findcode') {
            findList = data_1.default.filter(function (item) { return item.address.includes(inputCityCode); });
            findList.length > 0 ? console.table(findList) : (0, utils_1.consoleErr)(lang_1.default.weatherCodeNotFind);
            return [2 /*return*/];
        }
        // 设置本机地区 setsystem
        if (type === 'setsystem') {
            findItem = data_1.default.find(function (item) { return item.code === inputCityCode; });
            if (!findItem) {
                (0, utils_1.consoleErr)(lang_1.default.weatherCodeNotFind);
                return [2 /*return*/];
            }
            writeCode(findItem);
            return [2 /*return*/];
        }
        // 查询天气 base | all
        getWeather(inputCityCode, type);
        return [2 /*return*/];
    });
}); });
//# sourceMappingURL=index.js.map