"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var server_state_transfer_service_1 = require("./src/server-state-transfer.service");
var http_transfer_service_1 = require("./src/http-transfer.service");
var state_transfer_service_1 = require("./src/state-transfer.service");
__export(require("./src/server-state-transfer.service"));
__export(require("./src/state-transfer.service"));
__export(require("./src/http-transfer.service"));
function stateTransferFactory(stateId) {
    var stateTransfer = new state_transfer_service_1.StateTransferService();
    stateTransfer.initialize(window[stateId] || {});
    return stateTransfer;
}
exports.stateTransferFactory = stateTransferFactory;
var HttpTransferModule = (function () {
    function HttpTransferModule(parentModule) {
        if (parentModule)
            throw new Error('HttpTransferModule already loaded; import in root module only.');
    }
    HttpTransferModule.forRoot = function () {
        return {
            ngModule: HttpTransferModule
        };
    };
    return HttpTransferModule;
}());
HttpTransferModule.decorators = [
    { type: core_1.NgModule, args: [{
                providers: [
                    http_transfer_service_1.HttpTransferService
                ]
            },] },
];
HttpTransferModule.ctorParameters = function () { return [
    { type: HttpTransferModule, decorators: [{ type: core_1.Optional }, { type: core_1.SkipSelf },] },
]; };
exports.HttpTransferModule = HttpTransferModule;
var BrowserStateTransferModule = (function () {
    function BrowserStateTransferModule(parentModule) {
        if (parentModule)
            throw new Error('BrowserStateTransferModule already loaded; import in BROWSER module only.');
    }
    BrowserStateTransferModule.forRoot = function (stateId) {
        if (stateId === void 0) { stateId = server_state_transfer_service_1.DEFAULT_STATE_ID; }
        return {
            ngModule: BrowserStateTransferModule,
            providers: [
                {
                    provide: state_transfer_service_1.StateTransferService,
                    useFactory: (stateTransferFactory),
                    deps: [server_state_transfer_service_1.STATE_ID]
                },
                {
                    provide: server_state_transfer_service_1.STATE_ID,
                    useValue: stateId
                }
            ]
        };
    };
    return BrowserStateTransferModule;
}());
BrowserStateTransferModule.decorators = [
    { type: core_1.NgModule },
];
BrowserStateTransferModule.ctorParameters = function () { return [
    { type: BrowserStateTransferModule, decorators: [{ type: core_1.Optional }, { type: core_1.SkipSelf },] },
]; };
exports.BrowserStateTransferModule = BrowserStateTransferModule;
var ServerStateTransferModule = (function () {
    function ServerStateTransferModule(parentModule) {
        if (parentModule)
            throw new Error('ServerStateTransferModule already loaded; import in SERVER module only.');
    }
    ServerStateTransferModule.forRoot = function (stateId) {
        if (stateId === void 0) { stateId = server_state_transfer_service_1.DEFAULT_STATE_ID; }
        return {
            ngModule: ServerStateTransferModule,
            providers: [
                {
                    provide: server_state_transfer_service_1.STATE_ID,
                    useValue: stateId
                }
            ]
        };
    };
    return ServerStateTransferModule;
}());
ServerStateTransferModule.decorators = [
    { type: core_1.NgModule, args: [{
                providers: [
                    {
                        provide: state_transfer_service_1.StateTransferService,
                        useClass: server_state_transfer_service_1.ServerStateTransferService
                    }
                ]
            },] },
];
ServerStateTransferModule.ctorParameters = function () { return [
    { type: ServerStateTransferModule, decorators: [{ type: core_1.Optional }, { type: core_1.SkipSelf },] },
]; };
exports.ServerStateTransferModule = ServerStateTransferModule;
