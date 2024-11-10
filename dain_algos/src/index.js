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
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
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
var zod_1 = require("zod");
var client_js_1 = require("@polygon.io/client-js");
var service_sdk_1 = require("@dainprotocol/service-sdk");
var getStockPriceConfig = {
    id: "get-stock-price",
    name: "Get Stock Price",
    description: "Fetches current stock price, daily stats, and 24h price history for a ticker symbol",
    input: zod_1.z
        .object({
        ticker: zod_1.z.string().describe("Stock ticker symbol (e.g. AAPL)"),
    })
        .describe("Input parameters for the stock price request"),
    output: zod_1.z
        .any()
        .describe("Current stock price information"),
    pricing: { pricePerUse: 0, currency: "USD" },
    handler: function (_a, agentInfo_1) { return __awaiter(void 0, [_a, agentInfo_1], void 0, function (_b, agentInfo) {
        var client, prevClose, prevCloseData, to, from, aggs, change, changePercent, chartData, tableData;
        var _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u;
        var ticker = _b.ticker;
        return __generator(this, function (_v) {
            switch (_v.label) {
                case 0:
                    console.log("User / Agent ".concat(agentInfo.id, " requested price for ").concat(ticker));
                    client = (0, client_js_1.restClient)(process.env.POLYGON_API_KEY);
                    return [4 /*yield*/, client.stocks.previousClose(ticker)];
                case 1:
                    prevClose = _v.sent();
                    prevCloseData = prevClose.results[0];
                    to = new Date();
                    from = new Date(to.getTime() - (24 * 60 * 60 * 1000));
                    return [4 /*yield*/, client.stocks.aggregates(ticker, 30, 'minute', from.toISOString().split('T')[0], to.toISOString().split('T')[0])];
                case 2:
                    aggs = _v.sent();
                    change = prevCloseData.c ? prevCloseData.c - prevCloseData.o : 0;
                    changePercent = ((change) / ((_c = prevCloseData.o) !== null && _c !== void 0 ? _c : 1) * 100).toFixed(2);
                    chartData = {
                        type: "line",
                        title: "".concat(ticker, " 24 Hour Price History"),
                        description: "Price movement over the last 24 hours",
                        data: ((_d = aggs.results) !== null && _d !== void 0 ? _d : []).map(function (bar) {
                            var _a;
                            return ({
                                time: new Date(bar.t).toLocaleTimeString(),
                                price: (_a = bar.c) !== null && _a !== void 0 ? _a : 0
                            });
                        }),
                        config: {
                            height: 350,
                            colors: ["#3B82F6"],
                            margin: {
                                left: 12,
                                right: 12
                            }
                        },
                        dataKeys: {
                            x: "time",
                            y: "price"
                        },
                        trend: {
                            value: parseFloat(changePercent),
                            text: "".concat(changePercent, "% change")
                        }
                    };
                    tableData = {
                        columns: [
                            {
                                key: "metric",
                                header: "Metric",
                                type: "text",
                                width: "40%"
                            },
                            {
                                key: "value",
                                header: "Value",
                                type: "text",
                                width: "60%"
                            }
                        ],
                        rows: [
                            { metric: "Volume", value: ((_e = prevCloseData.v) !== null && _e !== void 0 ? _e : 0).toLocaleString() },
                            { metric: "Open", value: "$".concat((_g = (_f = prevCloseData.o) === null || _f === void 0 ? void 0 : _f.toFixed(2)) !== null && _g !== void 0 ? _g : 0) },
                            { metric: "High", value: "$".concat((_j = (_h = prevCloseData.h) === null || _h === void 0 ? void 0 : _h.toFixed(2)) !== null && _j !== void 0 ? _j : 0) },
                            { metric: "Low", value: "$".concat((_l = (_k = prevCloseData.l) === null || _k === void 0 ? void 0 : _k.toFixed(2)) !== null && _l !== void 0 ? _l : 0) },
                            { metric: "VWAP", value: "$".concat((_o = (_m = prevCloseData.vw) === null || _m === void 0 ? void 0 : _m.toFixed(2)) !== null && _o !== void 0 ? _o : 0) }
                        ]
                    };
                    return [2 /*return*/, {
                            text: "".concat(ticker, " is trading at $").concat((_p = prevCloseData.c) === null || _p === void 0 ? void 0 : _p.toFixed(2), ". Today's change: ").concat(changePercent, "%"),
                            data: {
                                price: (_q = prevCloseData.c) !== null && _q !== void 0 ? _q : 0,
                                high: (_r = prevCloseData.h) !== null && _r !== void 0 ? _r : 0,
                                low: (_s = prevCloseData.l) !== null && _s !== void 0 ? _s : 0,
                                volume: (_t = prevCloseData.v) !== null && _t !== void 0 ? _t : 0,
                                change: change,
                                changePercent: parseFloat(changePercent),
                            },
                            ui: {
                                type: "div",
                                uiData: JSON.stringify({
                                    title: "".concat(ticker, " Stock Price and Stats"),
                                    content: "".concat(ticker, " is trading at $").concat((_u = prevCloseData.c) === null || _u === void 0 ? void 0 : _u.toFixed(2), ". Today's change: ").concat(changePercent, "%")
                                }),
                                children: [{
                                        type: "chart",
                                        uiData: JSON.stringify(chartData)
                                    },
                                    /*
                                    ugly tbh
                                    {
                                      type: "table",
                                      uiData: JSON.stringify(tableData)
                                    }
                                      */
                                ]
                            }
                        }];
            }
        });
    }); },
};
var getStockNewsConfig = {
    id: "get-stock-news",
    name: "Get Stock News",
    description: "Fetches latest news articles for a ticker symbol",
    input: zod_1.z
        .object({
        ticker: zod_1.z.string().describe("Stock ticker symbol (e.g. AAPL)"),
        limit: zod_1.z
            .number()
            .optional()
            .describe("Number of news items to fetch (default 5)"),
    })
        .describe("Input parameters for the news request"),
    output: zod_1.z
        .any()
        .describe("Latest stock news articles"),
    pricing: { pricePerUse: 0, currency: "USD" },
    handler: function (_a, agentInfo_1) { return __awaiter(void 0, [_a, agentInfo_1], void 0, function (_b, agentInfo) {
        var client, response, articles, table;
        var ticker = _b.ticker, _c = _b.limit, limit = _c === void 0 ? 5 : _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    console.log("User / Agent ".concat(agentInfo.id, " requested news for ").concat(ticker));
                    client = (0, client_js_1.restClient)(process.env.POLYGON_API_KEY);
                    return [4 /*yield*/, client.reference.tickerNews({ ticker: ticker, limit: limit })];
                case 1:
                    response = _d.sent();
                    articles = response.results.map(function (article) { return ({
                        title: article.title,
                        publisher: article.publisher.name,
                        timestamp: article.published_utc,
                        url: article.article_url,
                    }); });
                    table = {
                        columns: [
                            {
                                key: "publisher",
                                header: "Source",
                                type: "text",
                                width: "20%"
                            },
                            {
                                key: "title",
                                header: "Title",
                                type: "text",
                                width: "50%"
                            },
                            {
                                key: "url",
                                header: "Link",
                                type: "link",
                                width: "15%"
                            },
                            {
                                key: "timestamp",
                                header: "Published",
                                type: "text",
                                width: "15%"
                            }
                        ],
                        rows: articles.map(function (article) { return (__assign(__assign({}, article), { url: {
                                text: "Read More",
                                url: article.url
                            }, timestamp: new Date(article.timestamp).toLocaleDateString() })); })
                    };
                    return [2 /*return*/, {
                            text: "Found ".concat(articles.length, " news articles for ").concat(ticker),
                            data: { articles: articles },
                            ui: {
                                type: "table",
                                uiData: JSON.stringify(table)
                            },
                        }];
            }
        });
    }); },
};
var getStockChartConfig = {
    id: "get-stock-chart",
    name: "View Stock Chart",
    description: "View historical price chart for a ticker symbol",
    input: zod_1.z
        .object({
        ticker: zod_1.z.string().describe("Stock ticker symbol (e.g. AAPL)"),
        multiplier: zod_1.z.number().describe("Time multiplier"),
        timespan: zod_1.z.enum([
            "minute",
            "hour",
            "day",
            "week",
            "month",
            "quarter",
            "year",
        ]),
        from: zod_1.z.string().describe("From date (YYYY-MM-DD)"),
        to: zod_1.z.string().describe("To date (YYYY-MM-DD)"),
    })
        .describe("Input parameters for chart data request"),
    output: zod_1.z
        .any()
        .describe("Historical price data"),
    pricing: { pricePerUse: 0, currency: "USD" },
    handler: function (_a, agentInfo_1) { return __awaiter(void 0, [_a, agentInfo_1], void 0, function (_b, agentInfo) {
        var client, response, chartData;
        var ticker = _b.ticker, multiplier = _b.multiplier, timespan = _b.timespan, from = _b.from, to = _b.to;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    console.log("User / Agent ".concat(agentInfo.id, " requested chart for ").concat(ticker));
                    client = (0, client_js_1.restClient)(process.env.POLYGON_API_KEY);
                    return [4 /*yield*/, client.stocks.aggregates(ticker, multiplier, timespan, from, to)];
                case 1:
                    response = _c.sent();
                    chartData = {
                        type: "line",
                        title: "".concat(ticker, " Price History"),
                        description: "From ".concat(from, " to ").concat(to),
                        data: response.results.map(function (result) { return ({
                            date: new Date(result.t).toLocaleDateString(),
                            price: result.c
                        }); }),
                        config: {
                            height: 350,
                            colors: ["#3B82F6"],
                            margin: {
                                left: 12,
                                right: 12
                            }
                        },
                        dataKeys: {
                            x: "date",
                            y: "price"
                        },
                        footer: "".concat(timespan, "ly price data with multiplier ").concat(multiplier)
                    };
                    return [2 /*return*/, {
                            text: "Retrieved historical data for ".concat(ticker, " from ").concat(from, " to ").concat(to),
                            data: {
                                results: response.results,
                            },
                            ui: {
                                type: "chart",
                                uiData: JSON.stringify(chartData)
                            },
                        }];
            }
        });
    }); },
};
var getStockTickerDetailsConfig = {
    id: "get-stock-details",
    name: "Get Stock Details",
    description: "Fetches detailed information about a stock ticker including name, market cap, exchange",
    input: zod_1.z
        .object({
        ticker: zod_1.z.string().describe("Stock ticker symbol (e.g. AAPL)"),
    })
        .describe("Input parameters for the ticker details request"),
    output: zod_1.z
        .any()
        .describe("Detailed ticker information"),
    pricing: { pricePerUse: 0, currency: "USD" },
    handler: function (_a, agentInfo_1) { return __awaiter(void 0, [_a, agentInfo_1], void 0, function (_b, agentInfo) {
        var client, response, details, tableData;
        var _c;
        var ticker = _b.ticker;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    console.log("User / Agent ".concat(agentInfo.id, " requested details for ").concat(ticker));
                    client = (0, client_js_1.restClient)(process.env.POLYGON_API_KEY);
                    return [4 /*yield*/, client.reference.tickerDetails(ticker)];
                case 1:
                    response = _d.sent();
                    details = response.results;
                    tableData = {
                        columns: [
                            { key: "field", header: "Field", type: "text", width: "40%" },
                            { key: "value", header: "Value", type: "text", width: "60%" }
                        ],
                        rows: [
                            { field: "Name", value: details.name },
                            { field: "Description", value: details.description },
                            { field: "Market Cap", value: (_c = details.market_cap) === null || _c === void 0 ? void 0 : _c.toLocaleString() },
                            { field: "Exchange", value: details.primary_exchange },
                            { field: "Industry", value: details.sic_description },
                            { field: "Homepage", value: details.homepage_url }
                        ]
                    };
                    return [2 /*return*/, {
                            text: "".concat(ticker, " (").concat(details.name, ") is listed on ").concat(details.primary_exchange),
                            data: details,
                            ui: {
                                type: "table",
                                uiData: JSON.stringify(tableData)
                            }
                        }];
            }
        });
    }); }
};
var getStockDividendsConfig = {
    id: "get-stock-dividends",
    name: "Get Stock Dividends",
    description: "Fetches dividend history for a ticker symbol",
    input: zod_1.z
        .object({
        ticker: zod_1.z.string().describe("Stock ticker symbol (e.g. AAPL)"),
        limit: zod_1.z.number().optional().describe("Number of dividend records to fetch (default 10)")
    })
        .describe("Input parameters for the dividends request"),
    output: zod_1.z
        .any()
        .describe("Dividend history information"),
    pricing: { pricePerUse: 0, currency: "USD" },
    handler: function (_a, agentInfo_1) { return __awaiter(void 0, [_a, agentInfo_1], void 0, function (_b, agentInfo) {
        var client, response, tableData;
        var ticker = _b.ticker, _c = _b.limit, limit = _c === void 0 ? 10 : _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    console.log("User / Agent ".concat(agentInfo.id, " requested dividends for ").concat(ticker));
                    client = (0, client_js_1.restClient)(process.env.POLYGON_API_KEY);
                    return [4 /*yield*/, client.reference.dividends({ ticker: ticker, limit: limit })];
                case 1:
                    response = _d.sent();
                    tableData = {
                        columns: [
                            { key: "date", header: "Ex-Dividend Date", type: "text", width: "30%" },
                            { key: "amount", header: "Amount", type: "text", width: "30%" },
                            { key: "payDate", header: "Pay Date", type: "text", width: "40%" }
                        ],
                        rows: response.results.map(function (div) { return ({
                            date: new Date(div.ex_dividend_date).toLocaleDateString(),
                            amount: "$".concat(div.cash_amount.toFixed(2)),
                            payDate: new Date(div.pay_date).toLocaleDateString()
                        }); })
                    };
                    return [2 /*return*/, {
                            text: "Retrieved last ".concat(response.results.length, " dividend records for ").concat(ticker),
                            data: response.results,
                            ui: {
                                type: "table",
                                uiData: JSON.stringify(tableData)
                            }
                        }];
            }
        });
    }); }
};
var getStockSplitsConfig = {
    id: "get-stock-splits",
    name: "Get Stock Splits",
    description: "Fetches stock split history for a ticker symbol",
    input: zod_1.z
        .object({
        ticker: zod_1.z.string().describe("Stock ticker symbol (e.g. AAPL)"),
        limit: zod_1.z.number().optional().describe("Number of split records to fetch (default 5)")
    })
        .describe("Input parameters for the splits request"),
    output: zod_1.z
        .any()
        .describe("Stock split history information"),
    pricing: { pricePerUse: 0, currency: "USD" },
    handler: function (_a, agentInfo_1) { return __awaiter(void 0, [_a, agentInfo_1], void 0, function (_b, agentInfo) {
        var client, response, tableData;
        var ticker = _b.ticker, _c = _b.limit, limit = _c === void 0 ? 5 : _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    console.log("User / Agent ".concat(agentInfo.id, " requested splits for ").concat(ticker));
                    client = (0, client_js_1.restClient)(process.env.POLYGON_API_KEY);
                    return [4 /*yield*/, client.reference.stockSplits({ ticker: ticker, limit: limit })];
                case 1:
                    response = _d.sent();
                    tableData = {
                        columns: [
                            { key: "date", header: "Execution Date", type: "text", width: "40%" },
                            { key: "ratio", header: "Split Ratio", type: "text", width: "60%" }
                        ],
                        rows: response.results.map(function (split) { return ({
                            date: new Date(split.execution_date).toLocaleDateString(),
                            ratio: "".concat(split.split_to, ":").concat(split.split_from)
                        }); })
                    };
                    return [2 /*return*/, {
                            text: "Retrieved last ".concat(response.results.length, " stock splits for ").concat(ticker),
                            data: response.results,
                            ui: {
                                type: "table",
                                uiData: JSON.stringify(tableData)
                            }
                        }];
            }
        });
    }); }
};
var dainService = (0, service_sdk_1.defineDAINService)({
    metadata: {
        title: "Stock Prices and Data Service",
        description: "A DAIN service providing real-time stock prices, news, historical data, stock splits, dividends, and detailed company information",
        version: "1.0.0",
        author: "Ryan Trattner",
        logo: "https://compote.slate.com/images/926e5009-c10a-48fe-b90e-fa0760f82fcd.png?crop=680%2C453%2Cx0%2Cy0",
        tags: ["stocks", "finance", "market-data", "polygon"],
    },
    identity: {
        apiKey: process.env.DAIN_API_KEY,
    },
    tools: [getStockPriceConfig, getStockNewsConfig, getStockChartConfig, getStockTickerDetailsConfig, getStockDividendsConfig, getStockSplitsConfig],
});
dainService.startNode({ port: Number(process.env.PORT) || 2022 }).then(function () {
    console.log("Stock Prices and Data Service is running on port 2022");
});
