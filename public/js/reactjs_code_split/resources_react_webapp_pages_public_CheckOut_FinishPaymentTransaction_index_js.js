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
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }








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