"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/api/auth/signup";
exports.ids = ["pages/api/auth/signup"];
exports.modules = {

/***/ "@prisma/client":
/*!*********************************!*\
  !*** external "@prisma/client" ***!
  \*********************************/
/***/ ((module) => {

module.exports = require("@prisma/client");

/***/ }),

/***/ "bcrypt":
/*!*************************!*\
  !*** external "bcrypt" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("bcrypt");

/***/ }),

/***/ "cookies-next":
/*!*******************************!*\
  !*** external "cookies-next" ***!
  \*******************************/
/***/ ((module) => {

module.exports = require("cookies-next");

/***/ }),

/***/ "jose":
/*!***********************!*\
  !*** external "jose" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("jose");

/***/ }),

/***/ "validator":
/*!****************************!*\
  !*** external "validator" ***!
  \****************************/
/***/ ((module) => {

module.exports = require("validator");

/***/ }),

/***/ "(api)/./pages/api/auth/signup.ts":
/*!**********************************!*\
  !*** ./pages/api/auth/signup.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ handler)\n/* harmony export */ });\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @prisma/client */ \"@prisma/client\");\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_prisma_client__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var validator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! validator */ \"validator\");\n/* harmony import */ var validator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(validator__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var bcrypt__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! bcrypt */ \"bcrypt\");\n/* harmony import */ var bcrypt__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(bcrypt__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var jose__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! jose */ \"jose\");\n/* harmony import */ var jose__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(jose__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var cookies_next__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! cookies-next */ \"cookies-next\");\n/* harmony import */ var cookies_next__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(cookies_next__WEBPACK_IMPORTED_MODULE_4__);\n\n\n\n\n\nconst prisma = new _prisma_client__WEBPACK_IMPORTED_MODULE_0__.PrismaClient();\nasync function handler(req, res) {\n    if (req.method === \"POST\") {\n        const { firstName, lastName, email, phone, password, city } = req.body;\n        const errors = [];\n        const validatorSchema = [\n            {\n                valid: validator__WEBPACK_IMPORTED_MODULE_1___default().isLength(firstName, {\n                    min: 1,\n                    max: 20\n                }),\n                errorMessage: \"First name is Invalid\"\n            },\n            {\n                valid: validator__WEBPACK_IMPORTED_MODULE_1___default().isLength(lastName, {\n                    min: 1,\n                    max: 20\n                }),\n                errorMessage: \"Last name is Invalid\"\n            },\n            {\n                valid: validator__WEBPACK_IMPORTED_MODULE_1___default().isEmail(email),\n                errorMessage: \"Email is Invalid\"\n            },\n            {\n                valid: validator__WEBPACK_IMPORTED_MODULE_1___default().isMobilePhone(phone),\n                errorMessage: \"Phone number is invalid is Invalid\"\n            },\n            {\n                valid: validator__WEBPACK_IMPORTED_MODULE_1___default().isLength(city, {\n                    min: 1,\n                    max: 20\n                }),\n                errorMessage: \"City is Invalid\"\n            },\n            {\n                valid: validator__WEBPACK_IMPORTED_MODULE_1___default().isStrongPassword(password),\n                errorMessage: \"Password is not strong enough\"\n            }\n        ];\n        validatorSchema.forEach((check)=>{\n            if (!check.valid) {\n                errors.push(check.errorMessage);\n            }\n        });\n        if (errors.length) {\n            return res.status(400).json({\n                errorMessage: errors[0]\n            });\n        }\n        const userWithEmail = await prisma.user.findUnique({\n            where: {\n                email: email\n            }\n        });\n        if (userWithEmail) {\n            return res.status(400).json({\n                errorMessage: \"Email is associated with another account\"\n            });\n        }\n        const hashPassword = await bcrypt__WEBPACK_IMPORTED_MODULE_2___default().hash(password, 10);\n        const user = await prisma.user.create({\n            data: {\n                first_name: firstName,\n                last_name: lastName,\n                email: email,\n                phone: phone,\n                city: city,\n                password: hashPassword\n            }\n        });\n        const algo = \"HS256\";\n        const secret = new TextEncoder().encode(process.env.JWT_SECRET);\n        const token = await new jose__WEBPACK_IMPORTED_MODULE_3__.SignJWT({\n            email: user.email\n        }).setProtectedHeader({\n            alg: algo\n        }).setExpirationTime(\"24h\").sign(secret);\n        (0,cookies_next__WEBPACK_IMPORTED_MODULE_4__.setCookie)(\"jwt\", token, {\n            req,\n            res,\n            maxAge: 60 * 6 * 24\n        });\n        return res.status(200).json({\n            firstName: user.first_name,\n            lastName: user.last_name,\n            email: user.email,\n            phone: user.phone,\n            city: user.city\n        });\n    }\n    return res.status(404).json(\"Undefined endpoint\");\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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S0FBSztZQUNqQkUsTUFBTW1CLEtBQUtuQixJQUFJO1FBQ2pCO0lBQ0Y7SUFFQSxPQUFPUCxJQUFJdUIsTUFBTSxDQUFDLEtBQUtDLElBQUksQ0FBQztBQUM5QiIsInNvdXJjZXMiOlsid2VicGFjazovL215LWFwcC8uL3BhZ2VzL2FwaS9hdXRoL3NpZ251cC50cz83ZjFmIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFByaXNtYUNsaWVudCB9IGZyb20gJ0BwcmlzbWEvY2xpZW50J1xuaW1wb3J0IHsgTmV4dEFwaVJlc3BvbnNlLCBOZXh0QXBpUmVxdWVzdCB9IGZyb20gJ25leHQnXG5pbXBvcnQgdmFsaWRhdG9yIGZyb20gJ3ZhbGlkYXRvcidcbmltcG9ydCBiY3J5cHQgZnJvbSAnYmNyeXB0J1xuaW1wb3J0ICogYXMgam9zZSBmcm9tICdqb3NlJ1xuaW1wb3J0IHsgc2V0Q29va2llIH0gZnJvbSAnY29va2llcy1uZXh0J1xuXG5pbnRlcmZhY2UgcmVxdWVzdEJvZHkge1xuICBmaXJzdE5hbWU6IHN0cmluZ1xuICBsYXN0TmFtZTogc3RyaW5nXG4gIGVtYWlsOiBzdHJpbmdcbiAgcGhvbmU6IHN0cmluZ1xuICBjaXR5OiBzdHJpbmdcbiAgcGFzc3dvcmQ6IHN0cmluZ1xufVxuXG5jb25zdCBwcmlzbWEgPSBuZXcgUHJpc21hQ2xpZW50KClcblxuZXhwb3J0IGRlZmF1bHQgYXN5bmMgZnVuY3Rpb24gaGFuZGxlcihcbiAgcmVxOiBOZXh0QXBpUmVxdWVzdCxcbiAgcmVzOiBOZXh0QXBpUmVzcG9uc2Vcbikge1xuICBpZiAocmVxLm1ldGhvZCA9PT0gJ1BPU1QnKSB7XG4gICAgY29uc3QgeyBmaXJzdE5hbWUsIGxhc3ROYW1lLCBlbWFpbCwgcGhvbmUsIHBhc3N3b3JkLCBjaXR5IH06IHJlcXVlc3RCb2R5ID1cbiAgICAgIHJlcS5ib2R5XG4gICAgY29uc3QgZXJyb3JzOiBzdHJpbmdbXSA9IFtdXG4gICAgY29uc3QgdmFsaWRhdG9yU2NoZW1hID0gW1xuICAgICAge1xuICAgICAgICB2YWxpZDogdmFsaWRhdG9yLmlzTGVuZ3RoKGZpcnN0TmFtZSwge1xuICAgICAgICAgIG1pbjogMSxcbiAgICAgICAgICBtYXg6IDIwLFxuICAgICAgICB9KSxcbiAgICAgICAgZXJyb3JNZXNzYWdlOiAnRmlyc3QgbmFtZSBpcyBJbnZhbGlkJyxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHZhbGlkOiB2YWxpZGF0b3IuaXNMZW5ndGgobGFzdE5hbWUsIHtcbiAgICAgICAgICBtaW46IDEsXG4gICAgICAgICAgbWF4OiAyMCxcbiAgICAgICAgfSksXG4gICAgICAgIGVycm9yTWVzc2FnZTogJ0xhc3QgbmFtZSBpcyBJbnZhbGlkJyxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHZhbGlkOiB2YWxpZGF0b3IuaXNFbWFpbChlbWFpbCksXG4gICAgICAgIGVycm9yTWVzc2FnZTogJ0VtYWlsIGlzIEludmFsaWQnLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgdmFsaWQ6IHZhbGlkYXRvci5pc01vYmlsZVBob25lKHBob25lKSxcbiAgICAgICAgZXJyb3JNZXNzYWdlOiAnUGhvbmUgbnVtYmVyIGlzIGludmFsaWQgaXMgSW52YWxpZCcsXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICB2YWxpZDogdmFsaWRhdG9yLmlzTGVuZ3RoKGNpdHksIHtcbiAgICAgICAgICBtaW46IDEsXG4gICAgICAgICAgbWF4OiAyMCxcbiAgICAgICAgfSksXG4gICAgICAgIGVycm9yTWVzc2FnZTogJ0NpdHkgaXMgSW52YWxpZCcsXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICB2YWxpZDogdmFsaWRhdG9yLmlzU3Ryb25nUGFzc3dvcmQocGFzc3dvcmQpLFxuICAgICAgICBlcnJvck1lc3NhZ2U6ICdQYXNzd29yZCBpcyBub3Qgc3Ryb25nIGVub3VnaCcsXG4gICAgICB9LFxuICAgIF1cblxuICAgIHZhbGlkYXRvclNjaGVtYS5mb3JFYWNoKChjaGVjaykgPT4ge1xuICAgICAgaWYgKCFjaGVjay52YWxpZCkge1xuICAgICAgICBlcnJvcnMucHVzaChjaGVjay5lcnJvck1lc3NhZ2UpXG4gICAgICB9XG4gICAgfSlcbiAgICBpZiAoZXJyb3JzLmxlbmd0aCkge1xuICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNDAwKS5qc29uKHsgZXJyb3JNZXNzYWdlOiBlcnJvcnNbMF0gfSlcbiAgICB9XG4gICAgY29uc3QgdXNlcldpdGhFbWFpbCA9IGF3YWl0IHByaXNtYS51c2VyLmZpbmRVbmlxdWUoe1xuICAgICAgd2hlcmU6IHtcbiAgICAgICAgZW1haWw6IGVtYWlsLFxuICAgICAgfSxcbiAgICB9KVxuICAgIGlmICh1c2VyV2l0aEVtYWlsKSB7XG4gICAgICByZXR1cm4gcmVzXG4gICAgICAgIC5zdGF0dXMoNDAwKVxuICAgICAgICAuanNvbih7IGVycm9yTWVzc2FnZTogJ0VtYWlsIGlzIGFzc29jaWF0ZWQgd2l0aCBhbm90aGVyIGFjY291bnQnIH0pXG4gICAgfVxuXG4gICAgY29uc3QgaGFzaFBhc3N3b3JkID0gYXdhaXQgYmNyeXB0Lmhhc2gocGFzc3dvcmQsIDEwKVxuICAgIGNvbnN0IHVzZXIgPSBhd2FpdCBwcmlzbWEudXNlci5jcmVhdGUoe1xuICAgICAgZGF0YToge1xuICAgICAgICBmaXJzdF9uYW1lOiBmaXJzdE5hbWUsXG4gICAgICAgIGxhc3RfbmFtZTogbGFzdE5hbWUsXG4gICAgICAgIGVtYWlsOiBlbWFpbCxcbiAgICAgICAgcGhvbmU6IHBob25lLFxuICAgICAgICBjaXR5OiBjaXR5LFxuICAgICAgICBwYXNzd29yZDogaGFzaFBhc3N3b3JkLFxuICAgICAgfSxcbiAgICB9KVxuXG4gICAgY29uc3QgYWxnbyA9ICdIUzI1NidcbiAgICBjb25zdCBzZWNyZXQgPSBuZXcgVGV4dEVuY29kZXIoKS5lbmNvZGUocHJvY2Vzcy5lbnYuSldUX1NFQ1JFVClcbiAgICBjb25zdCB0b2tlbiA9IGF3YWl0IG5ldyBqb3NlLlNpZ25KV1QoeyBlbWFpbDogdXNlci5lbWFpbCB9KVxuICAgICAgLnNldFByb3RlY3RlZEhlYWRlcih7XG4gICAgICAgIGFsZzogYWxnbyxcbiAgICAgIH0pXG4gICAgICAuc2V0RXhwaXJhdGlvblRpbWUoJzI0aCcpXG4gICAgICAuc2lnbihzZWNyZXQpXG4gICAgc2V0Q29va2llKCdqd3QnLCB0b2tlbiwgeyByZXEsIHJlcywgbWF4QWdlOiA2MCAqIDYgKiAyNCB9KVxuXG4gICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAwKS5qc29uKHtcbiAgICAgIGZpcnN0TmFtZTogdXNlci5maXJzdF9uYW1lLFxuICAgICAgbGFzdE5hbWU6IHVzZXIubGFzdF9uYW1lLFxuICAgICAgZW1haWw6IHVzZXIuZW1haWwsXG4gICAgICBwaG9uZTogdXNlci5waG9uZSxcbiAgICAgIGNpdHk6IHVzZXIuY2l0eSxcbiAgICB9KVxuICB9XG5cbiAgcmV0dXJuIHJlcy5zdGF0dXMoNDA0KS5qc29uKCdVbmRlZmluZWQgZW5kcG9pbnQnKVxufVxuIl0sIm5hbWVzIjpbIlByaXNtYUNsaWVudCIsInZhbGlkYXRvciIsImJjcnlwdCIsImpvc2UiLCJzZXRDb29raWUiLCJwcmlzbWEiLCJoYW5kbGVyIiwicmVxIiwicmVzIiwibWV0aG9kIiwiZmlyc3ROYW1lIiwibGFzdE5hbWUiLCJlbWFpbCIsInBob25lIiwicGFzc3dvcmQiLCJjaXR5IiwiYm9keSIsImVycm9ycyIsInZhbGlkYXRvclNjaGVtYSIsInZhbGlkIiwiaXNMZW5ndGgiLCJtaW4iLCJtYXgiLCJlcnJvck1lc3NhZ2UiLCJpc0VtYWlsIiwiaXNNb2JpbGVQaG9uZSIsImlzU3Ryb25nUGFzc3dvcmQiLCJmb3JFYWNoIiwiY2hlY2siLCJwdXNoIiwibGVuZ3RoIiwic3RhdHVzIiwianNvbiIsInVzZXJXaXRoRW1haWwiLCJ1c2VyIiwiZmluZFVuaXF1ZSIsIndoZXJlIiwiaGFzaFBhc3N3b3JkIiwiaGFzaCIsImNyZWF0ZSIsImRhdGEiLCJmaXJzdF9uYW1lIiwibGFzdF9uYW1lIiwiYWxnbyIsInNlY3JldCIsIlRleHRFbmNvZGVyIiwiZW5jb2RlIiwicHJvY2VzcyIsImVudiIsIkpXVF9TRUNSRVQiLCJ0b2tlbiIsIlNpZ25KV1QiLCJzZXRQcm90ZWN0ZWRIZWFkZXIiLCJhbGciLCJzZXRFeHBpcmF0aW9uVGltZSIsInNpZ24iLCJtYXhBZ2UiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(api)/./pages/api/auth/signup.ts\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("(api)/./pages/api/auth/signup.ts"));
module.exports = __webpack_exports__;

})();