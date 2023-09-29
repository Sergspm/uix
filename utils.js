/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise, SuppressedError, Symbol */


function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

const copyToClipboard = (text) => __awaiter(void 0, void 0, void 0, function* () { return navigator.clipboard.writeText(text); });

const getQueryStringParam = (params, param) => {
    const value = params === null || params === void 0 ? void 0 : params[param];
    return typeof value === 'string' ? value : null;
};

let IP_WHITE_LIST = [];
const configureWhiteIPList = (whiteIps) => {
    IP_WHITE_LIST = whiteIps;
};
const isIpAvailable = (req) => {
    var _a;
    let ip = (_a = req.socket.remoteAddress) !== null && _a !== void 0 ? _a : '';
    if (ip.indexOf('::') === 0 && typeof req.headers['x-real-ip'] === 'string') {
        ip = req.headers['x-real-ip'];
    }
    return IP_WHITE_LIST.includes(ip);
};

export { configureWhiteIPList, copyToClipboard, getQueryStringParam, isIpAvailable };
//# sourceMappingURL=utils.js.map
