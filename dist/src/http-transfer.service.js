"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var Observable_1 = require("rxjs/Observable");
require("rxjs/add/observable/fromPromise");
require("rxjs/add/operator/do");
require("rxjs/add/operator/map");
var state_transfer_service_1 = require("./state-transfer.service");
var HttpTransferService = (function () {
    function HttpTransferService(http, stateTransfer) {
        this.http = http;
        this.stateTransfer = stateTransfer;
    }
    HttpTransferService.prototype.request = function (uri, options) {
        var _this = this;
        return this.getData(uri, options, function (urlRes, optionsRes) {
            return _this.http.request(urlRes, optionsRes);
        });
    };
    HttpTransferService.prototype.get = function (url, options) {
        var _this = this;
        return this.getData(url, options, function (urlRes, optionsRes) {
            return _this.http.get(urlRes, optionsRes);
        });
    };
    HttpTransferService.prototype.post = function (url, body, options) {
        var _this = this;
        return this.getPostData(url, body, options, function (urlRes) {
            return _this.http.post(urlRes, body, options);
        });
    };
    HttpTransferService.prototype.put = function (url, body, options) {
        var _this = this;
        return this.getData(url, options, function (urlRes, optionsRes) {
            return _this.http.put(urlRes, optionsRes);
        });
    };
    HttpTransferService.prototype.delete = function (url, options) {
        var _this = this;
        return this.getData(url, options, function (urlRes, optionsRes) {
            return _this.http.delete(urlRes, optionsRes);
        });
    };
    HttpTransferService.prototype.patch = function (url, body, options) {
        var _this = this;
        return this.getPostData(url, body, options, function (urlRes) {
            return _this.http.patch(urlRes, body, options);
        });
    };
    HttpTransferService.prototype.head = function (url, options) {
        var _this = this;
        return this.getData(url, options, function (urlRes, optionsRes) {
            return _this.http.head(urlRes, optionsRes);
        });
    };
    HttpTransferService.prototype.options = function (url, options) {
        var _this = this;
        return this.getData(url, options, function (urlRes, optionsRes) {
            return _this.http.options(urlRes, optionsRes);
        });
    };
    HttpTransferService.prototype.getData = function (uri, options, callback) {
        var _this = this;
        var url = uri;
        if (typeof uri !== 'string')
            url = uri.url;
        var key = url + JSON.stringify(options);
        try {
            return this.resolveData(key);
        }
        catch (e) {
            return callback(uri, options)
                .map(function (res) { return res.json(); })
                .do(function (data) {
                _this.setCache(key, data);
            });
        }
    };
    HttpTransferService.prototype.getPostData = function (uri, body, options, callback) {
        var _this = this;
        var url = uri;
        if (typeof uri !== 'string')
            url = uri.url;
        var key = url + JSON.stringify(body) + JSON.stringify(options);
        try {
            return this.resolveData(key);
        }
        catch (e) {
            return callback(uri, body, options)
                .map(function (res) { return res.json(); })
                .do(function (data) {
                _this.setCache(key, data);
            });
        }
    };
    HttpTransferService.prototype.resolveData = function (key) {
        var data = this.getFromCache(key);
        if (!data)
            throw new Error();
        return Observable_1.Observable.fromPromise(Promise.resolve(data));
    };
    HttpTransferService.prototype.setCache = function (key, data) {
        return this.stateTransfer.set(key, data);
    };
    HttpTransferService.prototype.getFromCache = function (key) {
        return this.stateTransfer.get(key);
    };
    return HttpTransferService;
}());
HttpTransferService.decorators = [
    { type: core_1.Injectable },
];
HttpTransferService.ctorParameters = function () { return [
    { type: http_1.Http, },
    { type: state_transfer_service_1.StateTransferService, },
]; };
exports.HttpTransferService = HttpTransferService;
