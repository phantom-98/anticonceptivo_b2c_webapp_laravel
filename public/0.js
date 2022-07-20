(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[0],{

/***/ "./resources/react/webapp/components/sections/BannerStatic.js":
/*!********************************************************************!*\
  !*** ./resources/react/webapp/components/sections/BannerStatic.js ***!
  \********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! uuid */ "./node_modules/uuid/dist/esm-browser/index.js");
/* harmony import */ var _Config__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../Config */ "./resources/react/webapp/Config.js");
/* harmony import */ var _context_AppProvider__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../context/AppProvider */ "./resources/react/webapp/context/AppProvider/index.js");
/* harmony import */ var _helpers_vars__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../helpers/vars */ "./resources/react/webapp/helpers/vars.js");






var BannerStatic = function BannerStatic(_ref) {
  var banners = _ref.banners;

  var _useContext = Object(react__WEBPACK_IMPORTED_MODULE_0__["useContext"])(_context_AppProvider__WEBPACK_IMPORTED_MODULE_3__["AppContext"]),
      breakpoint = _useContext.breakpoint;

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "container mt-4 pt-2"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "row"
  }, banners.length ? banners.map(function (banner) {
    var _banner$public_file_r;

    var bannerStaticKey = Object(uuid__WEBPACK_IMPORTED_MODULE_1__["v4"])();
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      key: bannerStaticKey,
      className: "pb-4 ".concat(banner.size)
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
      href: banner.button_link,
      target: banner.button_target
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", {
      src: breakpoint === _helpers_vars__WEBPACK_IMPORTED_MODULE_4__["BREAKPOINTS"].MEDIUM || breakpoint === _helpers_vars__WEBPACK_IMPORTED_MODULE_4__["BREAKPOINTS"].LARGE || breakpoint === _helpers_vars__WEBPACK_IMPORTED_MODULE_4__["BREAKPOINTS"].EXTRA_LARGE || breakpoint === _helpers_vars__WEBPACK_IMPORTED_MODULE_4__["BREAKPOINTS"].EXTRA_EXTRA_LARGE ? banner.public_file : (_banner$public_file_r = banner.public_file_responsive) !== null && _banner$public_file_r !== void 0 ? _banner$public_file_r : banner.public_file,
      alt: _Config__WEBPACK_IMPORTED_MODULE_2__["CONFIG"].APP_NAME,
      style: {
        width: '100%'
      }
    })));
  }) : null));
};

/* harmony default export */ __webpack_exports__["default"] = (BannerStatic);

/***/ })

}]);