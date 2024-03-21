"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_react_webapp_pages_public_CheckOut_FinishPaymentTransaction_index_js"],{

/***/ "./resources/react/webapp/pages/public/CheckOut/FinishPaymentTransaction/index.js":
/*!****************************************************************************************!*\
  !*** ./resources/react/webapp/pages/public/CheckOut/FinishPaymentTransaction/index.js ***!
  \****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var _Waiting__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Waiting */ "./resources/react/webapp/pages/public/CheckOut/FinishPaymentTransaction/Waiting.js");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router/esm/react-router.js");
/* harmony import */ var _Services__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../Services */ "./resources/react/webapp/Services.js");
/* harmony import */ var _Error__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Error */ "./resources/react/webapp/pages/public/CheckOut/FinishPaymentTransaction/Error.js");
/* harmony import */ var _Success__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Success */ "./resources/react/webapp/pages/public/CheckOut/FinishPaymentTransaction/Success.js");
/* harmony import */ var _context_CartProvider__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../context/CartProvider */ "./resources/react/webapp/context/CartProvider/index.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }









var FinishPaymentTransaction = function FinishPaymentTransaction() {
  var _useParams = (0,react_router_dom__WEBPACK_IMPORTED_MODULE_7__.useParams)(),
    token = _useParams.token;
  var _useContext = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(_context_CartProvider__WEBPACK_IMPORTED_MODULE_5__.CartContext),
    clearCart = _useContext.clearCart;
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(true),
    _useState2 = _slicedToArray(_useState, 2),
    waiting = _useState2[0],
    setWaiting = _useState2[1];
  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)('NONE'),
    _useState4 = _slicedToArray(_useState3, 2),
    showFinish = _useState4[0],
    setShowFinish = _useState4[1];
  var _useState5 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null),
    _useState6 = _slicedToArray(_useState5, 2),
    order = _useState6[0],
    setOrder = _useState6[1];
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    verifyPayment(token);
  }, [token]);
  window.dataLayer = window.dataLayer || [];
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    function gtag2() {
      if (window.location.href.includes("checkout-verify")) {
        dataLayer.push(arguments);
      }
    }
    gtag2('js', new Date());
    gtag2('config', 'AW-10785537269');
  }, []);
  var verifyPayment = function verifyPayment(token, customerId) {
    var data = {
      token: token
    };
    var url = _Services__WEBPACK_IMPORTED_MODULE_2__.ENDPOINT.PAYMENTS.VERIFY;
    _Services__WEBPACK_IMPORTED_MODULE_2__.DoPost(url, data).then(function (response) {
      console.log(response);
      _Services__WEBPACK_IMPORTED_MODULE_2__.Response({
        response: response,
        success: function success() {
          if (response.data.order && response.data.order.status == 'PAID') {
            setWaiting(false);
            setShowFinish('SUCCESS');
            setOrder(response.data.order);
            clearCart();
          } else {
            setWaiting(false);
            setShowFinish('ERROR');
          }
        },
        error: function error() {
          setWaiting(false);
          setShowFinish('ERROR');
        }
      });
    })["catch"](function (error) {
      _Services__WEBPACK_IMPORTED_MODULE_2__.ErrorCatch(error);
    });
  };
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
      className: "pb-5",
      style: {
        background: '#FAFAFA'
      },
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
        className: "container pt-4",
        children: [waiting ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_Waiting__WEBPACK_IMPORTED_MODULE_1__["default"], {}) : null, showFinish === 'ERROR' ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_Error__WEBPACK_IMPORTED_MODULE_3__["default"], {}) : null, showFinish === 'SUCCESS' ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_Success__WEBPACK_IMPORTED_MODULE_4__["default"], {
          order: order
        }) : null]
      })
    })
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (FinishPaymentTransaction);

/***/ })

}]);