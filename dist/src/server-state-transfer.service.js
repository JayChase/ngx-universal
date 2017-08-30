"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var platform_server_1 = require("@angular/platform-server");
var state_transfer_service_1 = require("./state-transfer.service");
exports.STATE_ID = new core_1.InjectionToken('STATE_ID');
exports.DEFAULT_STATE_ID = 'STATE';
var ServerStateTransferService = (function (_super) {
    tslib_1.__extends(ServerStateTransferService, _super);
    function ServerStateTransferService(stateId, platformState, rendererFactory) {
        var _this = _super.call(this) || this;
        _this.stateId = stateId;
        _this.platformState = platformState;
        _this.rendererFactory = rendererFactory;
        return _this;
    }
    ServerStateTransferService.prototype.inject = function () {
        try {
            var document_1 = this.platformState.getDocument();
            var state = JSON.stringify(this.toJson());
            var renderer = this.rendererFactory.createRenderer(document_1, {
                id: '-1',
                encapsulation: core_1.ViewEncapsulation.None,
                styles: [],
                data: {}
            });
            var html = Array.from(document_1.children).find(function (child) { return child.name === 'html'; });
            var head = Array.from(html.children).find(function (child) { return child.name === 'head'; });
            if (!head)
                throw new Error('<head> not found in the document');
            var script = renderer.createElement('script');
            renderer.setValue(script, "window['" + this.stateId + "'] = " + state);
            renderer.appendChild(head, script);
        }
        catch (e) {
            console.error(e);
        }
    };
    return ServerStateTransferService;
}(state_transfer_service_1.StateTransferService));
ServerStateTransferService.decorators = [
    { type: core_1.Injectable },
];
ServerStateTransferService.ctorParameters = function () { return [
    { type: undefined, decorators: [{ type: core_1.Inject, args: [exports.STATE_ID,] },] },
    { type: platform_server_1.PlatformState, },
    { type: core_1.RendererFactory2, },
]; };
exports.ServerStateTransferService = ServerStateTransferService;
