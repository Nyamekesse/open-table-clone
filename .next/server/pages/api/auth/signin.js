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
exports.id = "pages/api/auth/signin";
exports.ids = ["pages/api/auth/signin"];
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

/***/ "(api)/./pages/api/auth/signin.ts":
/*!**********************************!*\
  !*** ./pages/api/auth/signin.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ handler)\n/* harmony export */ });\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @prisma/client */ \"@prisma/client\");\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_prisma_client__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var validator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! validator */ \"validator\");\n/* harmony import */ var validator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(validator__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var bcrypt__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! bcrypt */ \"bcrypt\");\n/* harmony import */ var bcrypt__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(bcrypt__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var jose__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! jose */ \"jose\");\n/* harmony import */ var jose__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(jose__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var cookies_next__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! cookies-next */ \"cookies-next\");\n/* harmony import */ var cookies_next__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(cookies_next__WEBPACK_IMPORTED_MODULE_4__);\n\n\n\n\n\nconst prisma = new _prisma_client__WEBPACK_IMPORTED_MODULE_0__.PrismaClient();\nasync function handler(req, res) {\n    if (req.method === \"POST\") {\n        const errors = [];\n        const { email, password } = req.body;\n        const validationSchema = [\n            {\n                valid: validator__WEBPACK_IMPORTED_MODULE_1___default().isEmail(email),\n                errorMessage: \"Email is invalid\"\n            },\n            {\n                valid: validator__WEBPACK_IMPORTED_MODULE_1___default().isLength(password, {\n                    min: 1\n                }),\n                errorMessage: \"Password is invalid\"\n            }\n        ];\n        validationSchema.forEach((check)=>{\n            if (!check.valid) {\n                errors.push(check.errorMessage);\n            }\n        });\n        if (errors.length) {\n            return res.status(400).json({\n                errorMessage: errors[0]\n            });\n        }\n        const user = await prisma.user.findUnique({\n            where: {\n                email\n            }\n        });\n        if (!user) return res.status(401).json({\n            errorMessage: \"Email or password invalid\"\n        });\n        const isMatch = await bcrypt__WEBPACK_IMPORTED_MODULE_2___default().compare(password, user.password);\n        if (!isMatch) return res.status(401).json({\n            errorMessage: \"Email or password invalid\"\n        });\n        const algo = \"HS256\";\n        const secret = new TextEncoder().encode(process.env.JWT_SECRET);\n        const token = await new jose__WEBPACK_IMPORTED_MODULE_3__.SignJWT({\n            email: user.email\n        }).setProtectedHeader({\n            alg: algo\n        }).setExpirationTime(\"24h\").sign(secret);\n        (0,cookies_next__WEBPACK_IMPORTED_MODULE_4__.setCookie)(\"jwt\", token, {\n            req,\n            res,\n            maxAge: 60 * 6 * 24\n        });\n        res.status(200).json({\n            firstName: user.first_name,\n            lastName: user.last_name,\n            email: user.email,\n            phone: user.phone,\n            city: user.city\n        });\n    }\n    return res.status(404).json(\"Undefined endpoint\");\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9wYWdlcy9hcGkvYXV0aC9zaWduaW4udHMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBNkM7QUFFWjtBQUNOO0FBQ0M7QUFDWTtBQUV4QyxNQUFNSyxTQUFTLElBQUlMLHdEQUFZQTtBQUVoQixlQUFlTSxRQUM1QkMsR0FBbUIsRUFDbkJDLEdBQW9CO0lBRXBCLElBQUlELElBQUlFLE1BQU0sS0FBSyxRQUFRO1FBQ3pCLE1BQU1DLFNBQW1CLEVBQUU7UUFDM0IsTUFBTSxFQUFFQyxLQUFLLEVBQUVDLFFBQVEsRUFBRSxHQUFHTCxJQUFJTSxJQUFJO1FBRXBDLE1BQU1DLG1CQUFtQjtZQUN2QjtnQkFDRUMsT0FBT2Qsd0RBQWlCLENBQUNVO2dCQUN6Qk0sY0FBYztZQUNoQjtZQUNBO2dCQUNFRixPQUFPZCx5REFBa0IsQ0FBQ1csVUFBVTtvQkFBRU8sS0FBSztnQkFBRTtnQkFDN0NGLGNBQWM7WUFDaEI7U0FDRDtRQUNESCxpQkFBaUJNLE9BQU8sQ0FBQyxDQUFDQztZQUN4QixJQUFJLENBQUNBLE1BQU1OLEtBQUssRUFBRTtnQkFDaEJMLE9BQU9ZLElBQUksQ0FBQ0QsTUFBTUosWUFBWTtZQUNoQztRQUNGO1FBRUEsSUFBSVAsT0FBT2EsTUFBTSxFQUFFO1lBQ2pCLE9BQU9mLElBQUlnQixNQUFNLENBQUMsS0FBS0MsSUFBSSxDQUFDO2dCQUFFUixjQUFjUCxNQUFNLENBQUMsRUFBRTtZQUFDO1FBQ3hEO1FBRUEsTUFBTWdCLE9BQU8sTUFBTXJCLE9BQU9xQixJQUFJLENBQUNDLFVBQVUsQ0FBQztZQUN4Q0MsT0FBTztnQkFDTGpCO1lBQ0Y7UUFDRjtRQUVBLElBQUksQ0FBQ2UsTUFDSCxPQUFPbEIsSUFBSWdCLE1BQU0sQ0FBQyxLQUFLQyxJQUFJLENBQUM7WUFBRVIsY0FBYztRQUE0QjtRQUUxRSxNQUFNWSxVQUFVLE1BQU0zQixxREFBYyxDQUFDVSxVQUFVYyxLQUFLZCxRQUFRO1FBQzVELElBQUksQ0FBQ2lCLFNBQ0gsT0FBT3JCLElBQUlnQixNQUFNLENBQUMsS0FBS0MsSUFBSSxDQUFDO1lBQUVSLGNBQWM7UUFBNEI7UUFFMUUsTUFBTWMsT0FBTztRQUNiLE1BQU1DLFNBQVMsSUFBSUMsY0FBY0MsTUFBTSxDQUFDQyxRQUFRQyxHQUFHLENBQUNDLFVBQVU7UUFDOUQsTUFBTUMsUUFBUSxNQUFNLElBQUluQyx5Q0FBWSxDQUFDO1lBQUVRLE9BQU9lLEtBQUtmLEtBQUs7UUFBQyxHQUN0RDZCLGtCQUFrQixDQUFDO1lBQ2xCQyxLQUFLVjtRQUNQLEdBQ0NXLGlCQUFpQixDQUFDLE9BQ2xCQyxJQUFJLENBQUNYO1FBRVI1Qix1REFBU0EsQ0FBQyxPQUFPa0MsT0FBTztZQUFFL0I7WUFBS0M7WUFBS29DLFFBQVEsS0FBSyxJQUFJO1FBQUc7UUFDeERwQyxJQUNHZ0IsTUFBTSxDQUFDLEtBQ1BDLElBQUksQ0FBQztZQUNKb0IsV0FBV25CLEtBQUtvQixVQUFVO1lBQzFCQyxVQUFVckIsS0FBS3NCLFNBQVM7WUFDeEJyQyxPQUFPZSxLQUFLZixLQUFLO1lBQ2pCc0MsT0FBT3ZCLEtBQUt1QixLQUFLO1lBQ2pCQyxNQUFNeEIsS0FBS3dCLElBQUk7UUFDakI7SUFDSjtJQUVBLE9BQU8xQyxJQUFJZ0IsTUFBTSxDQUFDLEtBQUtDLElBQUksQ0FBQztBQUM5QiIsInNvdXJjZXMiOlsid2VicGFjazovL215LWFwcC8uL3BhZ2VzL2FwaS9hdXRoL3NpZ25pbi50cz9jNGQwIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFByaXNtYUNsaWVudCB9IGZyb20gJ0BwcmlzbWEvY2xpZW50J1xuaW1wb3J0IHsgTmV4dEFwaVJlc3BvbnNlLCBOZXh0QXBpUmVxdWVzdCB9IGZyb20gJ25leHQnXG5pbXBvcnQgdmFsaWRhdG9yIGZyb20gJ3ZhbGlkYXRvcidcbmltcG9ydCBiY3J5cHQgZnJvbSAnYmNyeXB0J1xuaW1wb3J0ICogYXMgam9zZSBmcm9tICdqb3NlJ1xuaW1wb3J0IHsgc2V0Q29va2llIH0gZnJvbSAnY29va2llcy1uZXh0J1xuXG5jb25zdCBwcmlzbWEgPSBuZXcgUHJpc21hQ2xpZW50KClcblxuZXhwb3J0IGRlZmF1bHQgYXN5bmMgZnVuY3Rpb24gaGFuZGxlcihcbiAgcmVxOiBOZXh0QXBpUmVxdWVzdCxcbiAgcmVzOiBOZXh0QXBpUmVzcG9uc2Vcbikge1xuICBpZiAocmVxLm1ldGhvZCA9PT0gJ1BPU1QnKSB7XG4gICAgY29uc3QgZXJyb3JzOiBzdHJpbmdbXSA9IFtdXG4gICAgY29uc3QgeyBlbWFpbCwgcGFzc3dvcmQgfSA9IHJlcS5ib2R5XG5cbiAgICBjb25zdCB2YWxpZGF0aW9uU2NoZW1hID0gW1xuICAgICAge1xuICAgICAgICB2YWxpZDogdmFsaWRhdG9yLmlzRW1haWwoZW1haWwpLFxuICAgICAgICBlcnJvck1lc3NhZ2U6ICdFbWFpbCBpcyBpbnZhbGlkJyxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHZhbGlkOiB2YWxpZGF0b3IuaXNMZW5ndGgocGFzc3dvcmQsIHsgbWluOiAxIH0pLFxuICAgICAgICBlcnJvck1lc3NhZ2U6ICdQYXNzd29yZCBpcyBpbnZhbGlkJyxcbiAgICAgIH0sXG4gICAgXVxuICAgIHZhbGlkYXRpb25TY2hlbWEuZm9yRWFjaCgoY2hlY2spID0+IHtcbiAgICAgIGlmICghY2hlY2sudmFsaWQpIHtcbiAgICAgICAgZXJyb3JzLnB1c2goY2hlY2suZXJyb3JNZXNzYWdlKVxuICAgICAgfVxuICAgIH0pXG5cbiAgICBpZiAoZXJyb3JzLmxlbmd0aCkge1xuICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNDAwKS5qc29uKHsgZXJyb3JNZXNzYWdlOiBlcnJvcnNbMF0gfSlcbiAgICB9XG5cbiAgICBjb25zdCB1c2VyID0gYXdhaXQgcHJpc21hLnVzZXIuZmluZFVuaXF1ZSh7XG4gICAgICB3aGVyZToge1xuICAgICAgICBlbWFpbCxcbiAgICAgIH0sXG4gICAgfSlcblxuICAgIGlmICghdXNlcilcbiAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwMSkuanNvbih7IGVycm9yTWVzc2FnZTogJ0VtYWlsIG9yIHBhc3N3b3JkIGludmFsaWQnIH0pXG5cbiAgICBjb25zdCBpc01hdGNoID0gYXdhaXQgYmNyeXB0LmNvbXBhcmUocGFzc3dvcmQsIHVzZXIucGFzc3dvcmQpXG4gICAgaWYgKCFpc01hdGNoKVxuICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNDAxKS5qc29uKHsgZXJyb3JNZXNzYWdlOiAnRW1haWwgb3IgcGFzc3dvcmQgaW52YWxpZCcgfSlcblxuICAgIGNvbnN0IGFsZ28gPSAnSFMyNTYnXG4gICAgY29uc3Qgc2VjcmV0ID0gbmV3IFRleHRFbmNvZGVyKCkuZW5jb2RlKHByb2Nlc3MuZW52LkpXVF9TRUNSRVQpXG4gICAgY29uc3QgdG9rZW4gPSBhd2FpdCBuZXcgam9zZS5TaWduSldUKHsgZW1haWw6IHVzZXIuZW1haWwgfSlcbiAgICAgIC5zZXRQcm90ZWN0ZWRIZWFkZXIoe1xuICAgICAgICBhbGc6IGFsZ28sXG4gICAgICB9KVxuICAgICAgLnNldEV4cGlyYXRpb25UaW1lKCcyNGgnKVxuICAgICAgLnNpZ24oc2VjcmV0KVxuXG4gICAgc2V0Q29va2llKCdqd3QnLCB0b2tlbiwgeyByZXEsIHJlcywgbWF4QWdlOiA2MCAqIDYgKiAyNCB9KVxuICAgIHJlc1xuICAgICAgLnN0YXR1cygyMDApXG4gICAgICAuanNvbih7XG4gICAgICAgIGZpcnN0TmFtZTogdXNlci5maXJzdF9uYW1lLFxuICAgICAgICBsYXN0TmFtZTogdXNlci5sYXN0X25hbWUsXG4gICAgICAgIGVtYWlsOiB1c2VyLmVtYWlsLFxuICAgICAgICBwaG9uZTogdXNlci5waG9uZSxcbiAgICAgICAgY2l0eTogdXNlci5jaXR5LFxuICAgICAgfSlcbiAgfVxuXG4gIHJldHVybiByZXMuc3RhdHVzKDQwNCkuanNvbignVW5kZWZpbmVkIGVuZHBvaW50Jylcbn1cbiJdLCJuYW1lcyI6WyJQcmlzbWFDbGllbnQiLCJ2YWxpZGF0b3IiLCJiY3J5cHQiLCJqb3NlIiwic2V0Q29va2llIiwicHJpc21hIiwiaGFuZGxlciIsInJlcSIsInJlcyIsIm1ldGhvZCIsImVycm9ycyIsImVtYWlsIiwicGFzc3dvcmQiLCJib2R5IiwidmFsaWRhdGlvblNjaGVtYSIsInZhbGlkIiwiaXNFbWFpbCIsImVycm9yTWVzc2FnZSIsImlzTGVuZ3RoIiwibWluIiwiZm9yRWFjaCIsImNoZWNrIiwicHVzaCIsImxlbmd0aCIsInN0YXR1cyIsImpzb24iLCJ1c2VyIiwiZmluZFVuaXF1ZSIsIndoZXJlIiwiaXNNYXRjaCIsImNvbXBhcmUiLCJhbGdvIiwic2VjcmV0IiwiVGV4dEVuY29kZXIiLCJlbmNvZGUiLCJwcm9jZXNzIiwiZW52IiwiSldUX1NFQ1JFVCIsInRva2VuIiwiU2lnbkpXVCIsInNldFByb3RlY3RlZEhlYWRlciIsImFsZyIsInNldEV4cGlyYXRpb25UaW1lIiwic2lnbiIsIm1heEFnZSIsImZpcnN0TmFtZSIsImZpcnN0X25hbWUiLCJsYXN0TmFtZSIsImxhc3RfbmFtZSIsInBob25lIiwiY2l0eSJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(api)/./pages/api/auth/signin.ts\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("(api)/./pages/api/auth/signin.ts"));
module.exports = __webpack_exports__;

})();