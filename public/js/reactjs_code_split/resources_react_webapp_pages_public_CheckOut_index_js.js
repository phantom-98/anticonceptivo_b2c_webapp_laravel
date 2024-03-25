(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_react_webapp_pages_public_CheckOut_index_js"],{

/***/ "./resources/react/webapp/components/shopping/MiniCart/ProductItem.js":
/*!****************************************************************************!*\
  !*** ./resources/react/webapp/components/shopping/MiniCart/ProductItem.js ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var _Config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../Config */ "./resources/react/webapp/Config.js");
/* harmony import */ var _helpers_GlobalUtils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../helpers/GlobalUtils */ "./resources/react/webapp/helpers/GlobalUtils.js");
/* harmony import */ var _general_Icon__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../general/Icon */ "./resources/react/webapp/components/general/Icon.js");
/* harmony import */ var _assets_images_icons_remove_mini_cart_svg__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../assets/images/icons/remove-mini-cart.svg */ "./resources/react/webapp/assets/images/icons/remove-mini-cart.svg");
/* harmony import */ var _context_CartProvider__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../context/CartProvider */ "./resources/react/webapp/context/CartProvider/index.js");
/* harmony import */ var _QuantityInput__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../QuantityInput */ "./resources/react/webapp/components/shopping/QuantityInput.js");
/* harmony import */ var _assets_images_producto_default_png__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../assets/images/producto-default.png */ "./resources/react/webapp/assets/images/producto-default.png");
/* harmony import */ var react_lazy_load_image_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! react-lazy-load-image-component */ "./node_modules/react-lazy-load-image-component/build/index.js");
/* harmony import */ var react_lazy_load_image_component__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(react_lazy_load_image_component__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var react_lazy_load_image_component_src_effects_blur_css__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! react-lazy-load-image-component/src/effects/blur.css */ "./node_modules/react-lazy-load-image-component/src/effects/blur.css");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }












var ProductItem = function ProductItem(_ref) {
  var item = _ref.item;
  // console.log(item);
  var _useContext = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(_context_CartProvider__WEBPACK_IMPORTED_MODULE_5__.CartContext),
    removeFromCart = _useContext.removeFromCart,
    updateQuantity = _useContext.updateQuantity;
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(item.quantity),
    _useState2 = _slicedToArray(_useState, 2),
    quantity = _useState2[0],
    setQuantity = _useState2[1];
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    updateQuantity(quantity, item.product, item.subscription);
  }, [quantity]);
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxs)("div", {
    className: "col-12 product-item",
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxs)("div", {
      className: "row",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("div", {
        className: "col-auto",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)(react_lazy_load_image_component__WEBPACK_IMPORTED_MODULE_8__.LazyLoadImage, {
          alt: _Config__WEBPACK_IMPORTED_MODULE_1__.CONFIG.APP_NAME,
          title: "Anticonceptivo",
          width: 77,
          rel: "nofollow",
          effect: "blur",
          src: item.product.images.length ? item.product.images[0].public_file : _assets_images_producto_default_png__WEBPACK_IMPORTED_MODULE_7__["default"]
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxs)("div", {
        className: "col",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("div", {
          className: "font-poppins font-12 color-009BE8",
          children: item.product.sku
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("div", {
          className: "font-poppins font-14 bold text-black",
          children: item.subscription == null ? item.product.name : item.product.name + ' (' + 'suscripción' + ')'
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("div", {
          className: "font-poppins font-16 bold color-009BE8",
          children: item.subscription == null ? (0,_helpers_GlobalUtils__WEBPACK_IMPORTED_MODULE_2__.formatMoney)(item.quantity * (item.product.is_offer ? item.product.offer_price : item.product.price)) : (0,_helpers_GlobalUtils__WEBPACK_IMPORTED_MODULE_2__.formatMoney)(item.subscription.price * item.subscription.quantity * item.quantity) + ' (' + (0,_helpers_GlobalUtils__WEBPACK_IMPORTED_MODULE_2__.formatMoney)(item.subscription.price) + ' c/u)'
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxs)("div", {
          className: "row",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("div", {
            className: "col pt-2",
            children: item.subscription != null ? null : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)(_QuantityInput__WEBPACK_IMPORTED_MODULE_6__["default"], {
              quantity: item.quantity,
              setQuantity: setQuantity,
              maxQuantity: item.product.stock >= item.product.subcategory.category.quantity_limit ? item.product.subcategory.category.quantity_limit : item.product.stock
            })
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxs)("div", {
            className: "col-auto pt-1 text-center pointer",
            onClick: function onClick() {
              return removeFromCart(item);
            },
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("div", {
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)(_general_Icon__WEBPACK_IMPORTED_MODULE_3__["default"], {
                path: _assets_images_icons_remove_mini_cart_svg__WEBPACK_IMPORTED_MODULE_4__["default"]
              })
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("div", {
              className: "font-poppins font-12 color-A3A3A3",
              children: "BORRAR"
            })]
          })]
        })]
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("div", {
      className: "line"
    })]
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ProductItem);

/***/ }),

/***/ "./resources/react/webapp/components/shopping/QuantityInput.js":
/*!*********************************************************************!*\
  !*** ./resources/react/webapp/components/shopping/QuantityInput.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");



var QuantityInput = function QuantityInput(_ref) {
  var quantity = _ref.quantity,
    setQuantity = _ref.setQuantity,
    maxQuantity = _ref.maxQuantity;
  var handleQuantity = function handleQuantity(e) {
    var value = parseInt(e.target.value);
    if (!isNaN(value) && e.target.value.match("^[1-9][0-9]?$|^".concat(maxQuantity, "$")) && value <= maxQuantity) {
      setQuantity(value);
    }
  };
  var addQuantity = function addQuantity() {
    if (quantity + 1 <= maxQuantity) {
      setQuantity(quantity + 1);
    }
  };
  var subtractQuantity = function subtractQuantity() {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("div", {
    className: "quantity-input",
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
      className: "quantity-input-button",
      onClick: subtractQuantity,
      children: "-"
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
      className: "quantity-input-field",
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("input", {
        type: "number",
        min: "0",
        max: maxQuantity,
        value: quantity,
        onChange: handleQuantity
      })
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
      className: "quantity-input-button",
      onClick: addQuantity,
      children: "+"
    })]
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (QuantityInput);

/***/ }),

/***/ "./resources/react/webapp/components/shopping/Step.js":
/*!************************************************************!*\
  !*** ./resources/react/webapp/components/shopping/Step.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom */ "./node_modules/react-dom/index.js");
/* harmony import */ var _assets_images_icons_step_check_svg__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../assets/images/icons/step-check.svg */ "./resources/react/webapp/assets/images/icons/step-check.svg");
/* harmony import */ var _general_Icon__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../general/Icon */ "./resources/react/webapp/components/general/Icon.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");






var Step = function Step(_ref) {
  var title = _ref.title,
    number = _ref.number,
    _ref$disabled = _ref.disabled,
    disabled = _ref$disabled === void 0 ? false : _ref$disabled,
    _ref$isHeader = _ref.isHeader,
    isHeader = _ref$isHeader === void 0 ? false : _ref$isHeader,
    _ref$isReady = _ref.isReady,
    isReady = _ref$isReady === void 0 ? false : _ref$isReady;
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
    id: "reason_focus",
    className: "row ".concat(disabled ? 'step-disable' : ''),
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
      className: "col-auto pr-0",
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
        className: "circle-step ".concat(isReady ? 'circle-step-ready' : ''),
        children: isReady ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_general_Icon__WEBPACK_IMPORTED_MODULE_3__["default"], {
          path: _assets_images_icons_step_check_svg__WEBPACK_IMPORTED_MODULE_2__["default"],
          title: title
        }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("span", {
          children: number
        })
      })
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
      className: "col d-flex",
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("h3", {
        className: "my-auto font-poppins bold color-033F5D mb-0 ".concat(isHeader ? ' font-14' : 'font-18'),
        children: title
      })
    })]
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Step);
if (document.getElementById('Step')) {
  react_dom__WEBPACK_IMPORTED_MODULE_1__.render( /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(Step, {}), document.getElementById('Step'));
}

/***/ }),

/***/ "./resources/react/webapp/components/shopping/StepResponsive.js":
/*!**********************************************************************!*\
  !*** ./resources/react/webapp/components/shopping/StepResponsive.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom */ "./node_modules/react-dom/index.js");
/* harmony import */ var _assets_images_icons_step_check_svg__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../assets/images/icons/step-check.svg */ "./resources/react/webapp/assets/images/icons/step-check.svg");
/* harmony import */ var _general_Icon__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../general/Icon */ "./resources/react/webapp/components/general/Icon.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");






var Step = function Step(_ref) {
  var title = _ref.title,
    number = _ref.number,
    _ref$disabled = _ref.disabled,
    disabled = _ref$disabled === void 0 ? false : _ref$disabled,
    _ref$isHeader = _ref.isHeader,
    isHeader = _ref$isHeader === void 0 ? false : _ref$isHeader,
    _ref$isReady = _ref.isReady,
    isReady = _ref$isReady === void 0 ? false : _ref$isReady;
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
      className: "row d-none d-md-flex ".concat(disabled ? 'step-disable' : ''),
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
        className: "col-auto pr-0",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
          className: "circle-step ".concat(isReady ? 'circle-step-ready' : ''),
          children: isReady ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_general_Icon__WEBPACK_IMPORTED_MODULE_3__["default"], {
            path: _assets_images_icons_step_check_svg__WEBPACK_IMPORTED_MODULE_2__["default"],
            title: title
          }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("span", {
            children: number
          })
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
        className: "col d-flex",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("h3", {
          className: "my-auto font-poppins bold color-033F5D mb-0 ".concat(isHeader ? ' font-14' : 'font-18'),
          children: title
        })
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
      className: "row d-flex d-md-none ".concat(disabled ? 'step-disable' : ''),
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
        className: "col-12 d-flex mb-2",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
          className: "mx-auto circle-step circle-step-responsive text-center ".concat(isReady ? 'circle-step-ready' : ''),
          children: isReady ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_general_Icon__WEBPACK_IMPORTED_MODULE_3__["default"], {
            path: _assets_images_icons_step_check_svg__WEBPACK_IMPORTED_MODULE_2__["default"],
            title: title,
            style: {
              width: '23px'
            }
          }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("span", {
            className: "font-9",
            children: number
          })
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
        className: "col-12 text-center",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("h3", {
          className: "my-auto font-poppins bold color-033F5D mb-0 ".concat(isHeader ? ' font-6' : 'font-6'),
          children: title
        })
      })]
    })]
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Step);
if (document.getElementById('Step')) {
  react_dom__WEBPACK_IMPORTED_MODULE_1__.render( /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(Step, {}), document.getElementById('Step'));
}

/***/ }),

/***/ "./resources/react/webapp/components/shopping/TotalCartItems.js":
/*!**********************************************************************!*\
  !*** ./resources/react/webapp/components/shopping/TotalCartItems.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var _context_CartProvider__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../context/CartProvider */ "./resources/react/webapp/context/CartProvider/index.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }




var TotalCartItems = function TotalCartItems() {
  var _useContext = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(_context_CartProvider__WEBPACK_IMPORTED_MODULE_1__.CartContext),
    cartItems = _useContext.cartItems;
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(0),
    _useState2 = _slicedToArray(_useState, 2),
    totalCart = _useState2[0],
    setTotalCart = _useState2[1];
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    var _total = 0;
    // console.log(cartItems)
    cartItems.map(function (item) {
      _total = _total + item.quantity;
    });
    setTotalCart(_total);
    // console.log(cartItems);
  }, [cartItems]);
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.Fragment, {
    children: totalCart
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (TotalCartItems);

/***/ }),

/***/ "./resources/react/webapp/components/shopping/TotalCartPrice.js":
/*!**********************************************************************!*\
  !*** ./resources/react/webapp/components/shopping/TotalCartPrice.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var _helpers_GlobalUtils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../helpers/GlobalUtils */ "./resources/react/webapp/helpers/GlobalUtils.js");
/* harmony import */ var _context_CartProvider__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../context/CartProvider */ "./resources/react/webapp/context/CartProvider/index.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }





var TotalCartPrice = function TotalCartPrice() {
  var _useContext = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(_context_CartProvider__WEBPACK_IMPORTED_MODULE_2__.CartContext),
    cartItems = _useContext.cartItems;
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(0),
    _useState2 = _slicedToArray(_useState, 2),
    totalCart = _useState2[0],
    setTotalCart = _useState2[1];
  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(0),
    _useState4 = _slicedToArray(_useState3, 2),
    totalDiscount = _useState4[0],
    setTotalDiscount = _useState4[1];
  var _useState5 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(0),
    _useState6 = _slicedToArray(_useState5, 2),
    subTotal = _useState6[0],
    setSubTotal = _useState6[1];
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    var _total = 0;
    var _total_discount = 0;
    var _sub_total = 0;
    cartItems.map(function (item) {
      var _temp_total = 0;
      var _temp_sub_total = 0;
      var _temp_discount = 0;
      if (item.subscription != null) {
        _temp_total = item.quantity * item.subscription.price * item.subscription.quantity;
        _temp_sub_total = item.quantity * (item.product.price * item.subscription.quantity);
        _temp_discount = _temp_sub_total - _temp_total;
      } else {
        _temp_total = item.quantity * (item.product.is_offer ? item.product.offer_price : item.product.price);
        _temp_sub_total = item.quantity * item.product.price;
        _temp_discount = _temp_sub_total - _temp_total;
      }
      _total += _temp_total;
      _sub_total += _temp_sub_total;
      _total_discount += _temp_discount;
    });
    setTotalDiscount(_total_discount);
    setSubTotal(_sub_total);
    setTotalCart(_total);
  }, [cartItems]);
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("div", {
      className: "row pt-3",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("div", {
        className: "col-auto",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("span", {
          className: "font-poppins font-16 regular color-1F1F1F text-uppercase",
          children: "Sub Total"
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("div", {
        className: "col text-right",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("span", {
          className: "font-poppins font-16 regular color-1F1F1F text-uppercase",
          children: (0,_helpers_GlobalUtils__WEBPACK_IMPORTED_MODULE_1__.formatMoney)(subTotal)
        })
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("div", {
      className: "row",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("div", {
        className: "col-auto",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("span", {
          className: "font-poppins font-16 bold color-033F5D text-uppercase",
          children: "Descuento"
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("div", {
        className: "col text-right",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("span", {
          className: "font-poppins font-16 bold color-033F5D text-uppercase",
          children: (0,_helpers_GlobalUtils__WEBPACK_IMPORTED_MODULE_1__.formatMoney)(totalDiscount)
        })
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("div", {
      className: "row",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("div", {
        className: "col-auto",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("span", {
          className: "font-poppins font-23 bold color-033F5D text-uppercase",
          children: "Total"
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("div", {
        className: "col text-right",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("span", {
          className: "font-poppins font-23 bold color-033F5D text-uppercase",
          children: (0,_helpers_GlobalUtils__WEBPACK_IMPORTED_MODULE_1__.formatMoney)(totalCart)
        })
      })]
    })]
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (TotalCartPrice);

/***/ }),

/***/ "./resources/react/webapp/components/shopping/TotalCartPriceFinal.js":
/*!***************************************************************************!*\
  !*** ./resources/react/webapp/components/shopping/TotalCartPriceFinal.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var _helpers_GlobalUtils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../helpers/GlobalUtils */ "./resources/react/webapp/helpers/GlobalUtils.js");
/* harmony import */ var _context_CartProvider__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../context/CartProvider */ "./resources/react/webapp/context/CartProvider/index.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }





var TotalCartPriceFinal = function TotalCartPriceFinal(_ref) {
  var discount = _ref.discount,
    discountType = _ref.discountType,
    total = _ref.total,
    setTotal = _ref.setTotal,
    subtotal = _ref.subtotal,
    setSubtotal = _ref.setSubtotal,
    dispatch = _ref.dispatch;
  var _useContext = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(_context_CartProvider__WEBPACK_IMPORTED_MODULE_2__.CartContext),
    cartItems = _useContext.cartItems;
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(0),
    _useState2 = _slicedToArray(_useState, 2),
    totalDiscount = _useState2[0],
    setTotalDiscount = _useState2[1];
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    var _total = 0;
    var _total_discount = discount === 0 ? 0 : (discountType === 0 ? discount : Math.round(subtotal * discount)) * -1;
    var _sub_total = 0;
    cartItems.map(function (item) {
      var _temp_total = 0;
      var _temp_sub_total = 0;
      var _temp_discount = 0;
      if (item.subscription != null) {
        _temp_total = item.quantity * item.subscription.price * item.subscription.quantity;
        _temp_sub_total = item.quantity * (item.product.price * item.subscription.quantity);
        _temp_discount = _temp_sub_total - _temp_total;
      } else {
        _temp_total = item.quantity * (item.product.is_offer ? item.product.offer_price : item.product.price);
        _temp_sub_total = item.quantity * item.product.price;
        _temp_discount = _temp_sub_total - _temp_total;
      }
      _total += _temp_total;
      _sub_total += _temp_sub_total;
      _total_discount += _temp_discount;
    });
    setSubtotal(_sub_total);
    setTotalDiscount(_total_discount);
    if (discountType === 0) {
      _total = _total + dispatch - discount;
    } else {
      _total = _total - Math.round(_total * discount) + dispatch;
    }
    setTotal(_total);
  }, [cartItems, discount, dispatch]);
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("div", {
      className: "row pt-3",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("div", {
        className: "col-auto",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("span", {
          className: "font-poppins font-16 regular color-1F1F1F text-uppercase",
          children: "Sub Total"
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("div", {
        className: "col text-right",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("span", {
          className: "font-poppins font-16 regular color-1F1F1F text-uppercase",
          children: (0,_helpers_GlobalUtils__WEBPACK_IMPORTED_MODULE_1__.formatMoney)(subtotal)
        })
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("div", {
      className: "row",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("div", {
        className: "col-auto",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("span", {
          className: "font-poppins font-12 regular color-1F1F1F",
          children: "Costo despacho"
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("div", {
        className: "col text-right",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("span", {
          className: "font-poppins font-12 regular color-1F1F1F",
          children: (0,_helpers_GlobalUtils__WEBPACK_IMPORTED_MODULE_1__.formatMoney)(dispatch)
        })
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("div", {
      className: "row",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("div", {
        className: "col-auto",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("span", {
          className: "font-poppins font-12 bold color-033F5D",
          children: "Total Descuento"
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("div", {
        className: "col text-right",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("span", {
          className: "font-poppins font-12 bold color-033F5D",
          children: (0,_helpers_GlobalUtils__WEBPACK_IMPORTED_MODULE_1__.formatMoney)(totalDiscount)
        })
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("div", {
      className: "row",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("div", {
        className: "col-12",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("hr", {})
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("div", {
        className: "col-auto",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("span", {
          className: "font-poppins font-23 bold color-033F5D text-uppercase",
          children: "Total"
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("div", {
        className: "col text-right",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("span", {
          className: "font-poppins font-23 bold color-033F5D text-uppercase",
          children: (0,_helpers_GlobalUtils__WEBPACK_IMPORTED_MODULE_1__.formatMoney)(total)
        })
      })]
    })]
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (TotalCartPriceFinal);

/***/ }),

/***/ "./resources/react/webapp/pages/private/Account/sections/Addresses/Form.js":
/*!*********************************************************************************!*\
  !*** ./resources/react/webapp/pages/private/Account/sections/Addresses/Form.js ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var toastr__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! toastr */ "./node_modules/toastr/toastr.js");
/* harmony import */ var toastr__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(toastr__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _helpers_GlobalUtils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../helpers/GlobalUtils */ "./resources/react/webapp/helpers/GlobalUtils.js");
/* harmony import */ var _Services__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../Services */ "./resources/react/webapp/Services.js");
/* harmony import */ var react_google_autocomplete__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-google-autocomplete */ "./node_modules/react-google-autocomplete/index.js");
/* harmony import */ var _context_AppProvider__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../../context/AppProvider */ "./resources/react/webapp/context/AppProvider/index.js");
/* harmony import */ var _helpers_vars__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../../helpers/vars */ "./resources/react/webapp/helpers/vars.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }










var Form = function Form(_ref) {
  var addressSelected = _ref.addressSelected,
    goBack = _ref.goBack,
    formMode = _ref.formMode,
    _ref$customerId = _ref.customerId,
    customerId = _ref$customerId === void 0 ? null : _ref$customerId,
    regions = _ref.regions,
    setAddresses = _ref.setAddresses;
  var _useContext = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(_context_AppProvider__WEBPACK_IMPORTED_MODULE_5__.AppContext),
    breakpoint = _useContext.breakpoint;
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)({
      id: '',
      name: '',
      region_id: 7,
      commune_id: '',
      address: '',
      extra_info: '',
      isAutocomplete: true
    }),
    _useState2 = _slicedToArray(_useState, 2),
    address = _useState2[0],
    setAddress = _useState2[1];
  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(''),
    _useState4 = _slicedToArray(_useState3, 2),
    googleAddress = _useState4[0],
    setGoogleAddress = _useState4[1];
  var _useState5 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(true),
    _useState6 = _slicedToArray(_useState5, 2),
    validAddress = _useState6[0],
    setValidAddress = _useState6[1];
  var _useState7 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(0),
    _useState8 = _slicedToArray(_useState7, 2),
    selectedRegion = _useState8[0],
    setSelectedRegion = _useState8[1];
  var _useState9 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]),
    _useState10 = _slicedToArray(_useState9, 2),
    communes = _useState10[0],
    setCommunes = _useState10[1];
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    if (formMode === 'edit') {
      setAddress(_objectSpread({}, addressSelected));
    }
  }, []);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    if (regions.length > 0) {
      setSelectedRegion(address.region_id);
    }
  }, [regions, address.region_id]);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    if (selectedRegion) {
      var region = regions.find(function (r) {
        return r.id == selectedRegion;
      });
      var tempCommunes = [];
      region.provinces.map(function (province) {
        province.communes.map(function (commune) {
          if (commune.is_valid) {
            tempCommunes.push(commune);
          }
        });
      });
      var orderCommunes = tempCommunes.sort(function (a, b) {
        var commA = a.name.toLowerCase();
        var commB = b.name.toLowerCase();
        var comparison = 0;
        if (commA > commB) {
          comparison = 1;
        } else if (commA < commB) {
          comparison = -1;
        }
        return comparison;
      });
      setCommunes(orderCommunes);
    }
  }, [selectedRegion]);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    if (googleAddress.length > 0) {
      setAddress(_objectSpread(_objectSpread({}, address), {}, _defineProperty({}, 'address', googleAddress)));
    }
  }, [googleAddress]);
  var handleAddress = function handleAddress(e) {
    var direction = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    var number = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    var text = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
    if (direction) {
      if (e.target.value.match('^$|^[a-zA-Z0-9\ñ ]+$')) {
        setAddress(_objectSpread(_objectSpread({}, address), {}, _defineProperty({}, e.target.name, e.target.value)));
      }
    }
    if (number) {
      if (e.target.value.match("^$|^[0-9]+$")) {
        setAddress(_objectSpread(_objectSpread({}, address), {}, _defineProperty({}, e.target.name, e.target.value)));
      }
    }
    if (text) {
      if (e.target.value.match('^$|^[a-zA-Z\ñ ]+$')) {
        setAddress(_objectSpread(_objectSpread({}, address), {}, _defineProperty({}, e.target.name, e.target.value)));
      }
    }
    if (!direction && !number && !text) {
      setAddress(_objectSpread(_objectSpread({}, address), {}, _defineProperty({}, e.target.name, e.target.value)));
    }
  };
  var handleAddressComment = function handleAddressComment(e) {
    if (e.target.value.match('^$|^[a-zA-Z\ñ ]+$')) {
      setAddress(_objectSpread(_objectSpread({}, address), {}, _defineProperty({}, e.target.name, e.target.value)));
    }
  };
  var updateData = function updateData() {
    if (validAddress === false) {}
    var url = _Services__WEBPACK_IMPORTED_MODULE_3__.ENDPOINT.CUSTOMER.ADDRESSES.UPDATE;
    var data = {
      customer_id: customerId,
      address_id: address.id,
      name: address.name,
      region_id: address.region_id,
      commune_id: parseInt(address.commune_id),
      address: address.address,
      extra_info: address.extra_info,
      comment: address.comment
    };
    _Services__WEBPACK_IMPORTED_MODULE_3__.DoPost(url, data).then(function (response) {
      _Services__WEBPACK_IMPORTED_MODULE_3__.Response({
        response: response,
        success: function success() {
          setAddresses(response.data.addresses);
          toastr__WEBPACK_IMPORTED_MODULE_1___default().success(response.message);
          goBack();
        }
      });
    })["catch"](function (error) {
      _Services__WEBPACK_IMPORTED_MODULE_3__.ErrorCatch(error);
    });
  };
  var selectRegion = function selectRegion(e) {
    var region = regions.find(function (r) {
      return r.id == e.target.value;
    });
    setAddress(_objectSpread(_objectSpread({}, address), {}, {
      region_id: region.id,
      commune_id: null
    }));
    setSelectedRegion(e.target.value);
  };
  var setAddressNoAuth = function setAddressNoAuth() {
    setAddresses(address);
    goBack();
  };
  var autoCompleteHandle = function autoCompleteHandle(place) {
    setGoogleAddress('');
    setValidAddress(false);
    setAddress(_objectSpread(_objectSpread({}, address), {}, _defineProperty({}, 'address', place)));
  };
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)("div", {
    className: "row",
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("div", {
      className: "col-md-12",
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)("div", {
        className: "form-group",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("label", {
          htmlFor: "name",
          children: "Nombre (*)"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("input", {
          type: "text",
          className: "form-control form-control-custom",
          id: "name",
          name: "name",
          placeholder: "Nombre Direcci\xF3n",
          value: address.name,
          onChange: function onChange(e) {
            return handleAddress(e, false, false, true);
          },
          onFocus: _helpers_GlobalUtils__WEBPACK_IMPORTED_MODULE_2__.setCleanInputError
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("div", {
          className: "invalid-feedback"
        })]
      })
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("div", {
      className: "col-md-8",
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)("div", {
        className: "form-group",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("label", {
          htmlFor: "address",
          children: "Calle y N\xFAmero (*)"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("input", {
          type: "text",
          className: "form-control form-control-custom",
          id: "address",
          name: "address",
          placeholder: "Calle y N\xFAmero",
          value: address.address,
          onChange: function onChange(e) {
            return handleAddress(e);
          },
          onFocus: _helpers_GlobalUtils__WEBPACK_IMPORTED_MODULE_2__.setCleanInputError
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("div", {
          className: "invalid-feedback"
        })]
      })
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("div", {
      className: "col-md-4",
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)("div", {
        className: "form-group",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("label", {
          htmlFor: "extra_info",
          children: "N\xFAmero casa o departamento"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("input", {
          type: "text",
          className: "form-control form-control-custom",
          id: "extra_info",
          name: "extra_info",
          placeholder: "N\xFAmero casa o departamento",
          value: address.extra_info,
          onChange: function onChange(e) {
            return handleAddress(e);
          },
          onFocus: _helpers_GlobalUtils__WEBPACK_IMPORTED_MODULE_2__.setCleanInputError
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("div", {
          className: "invalid-feedback"
        })]
      })
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("div", {
      className: "col-md-6",
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)("div", {
        className: "form-group",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("label", {
          htmlFor: "region_id",
          children: "Regi\xF3n (*)"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)("select", {
          className: "form-control form-control-custom pl-2",
          id: "region_id",
          name: "region_id",
          value: address.region_id,
          onChange: function onChange(e) {
            return selectRegion(e);
          },
          onFocus: _helpers_GlobalUtils__WEBPACK_IMPORTED_MODULE_2__.setCleanInputError,
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("option", {
            value: "",
            disabled: true,
            selected: true,
            children: "Seleccionar"
          }), regions.map(function (region) {
            return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("option", {
              value: region.id,
              children: region.name
            }, region.id);
          })]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("div", {
          className: "invalid-feedback"
        })]
      })
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("div", {
      className: "col-md-6",
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)("div", {
        className: "form-group",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("label", {
          htmlFor: "commune_id",
          children: "Comuna (*)"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)("select", {
          className: "form-control form-control-custom pl-2",
          id: "commune_id",
          name: "commune_id",
          onChange: handleAddress,
          onFocus: _helpers_GlobalUtils__WEBPACK_IMPORTED_MODULE_2__.setCleanInputError,
          value: address.commune_id,
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("option", {
            value: "",
            disabled: true,
            selected: true,
            children: "Seleccionar"
          }), communes.map(function (commune) {
            return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("option", {
              value: commune.id,
              children: commune.name
            }, commune.id);
          })]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("div", {
          className: "invalid-feedback"
        })]
      })
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("div", {
      className: "col-md-12",
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)("div", {
        className: "form-group",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("label", {
          htmlFor: "name",
          children: "Comentario"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("textarea", {
          className: "form-control form-control-custom",
          rows: 3,
          id: "comment",
          name: "comment",
          placeholder: "Agrega un rango de horario para la entrega, es en oficina o una casa, u cualquier otra informaci\xF3n relevante como el detalle de como llegar",
          value: address.comment,
          onChange: function onChange(e) {
            return handleAddressComment(e);
          },
          onFocus: _helpers_GlobalUtils__WEBPACK_IMPORTED_MODULE_2__.setCleanInputError
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("div", {
          className: "invalid-feedback"
        })]
      })
    }), breakpoint === _helpers_vars__WEBPACK_IMPORTED_MODULE_6__.BREAKPOINTS.MEDIUM || breakpoint === _helpers_vars__WEBPACK_IMPORTED_MODULE_6__.BREAKPOINTS.LARGE || breakpoint === _helpers_vars__WEBPACK_IMPORTED_MODULE_6__.BREAKPOINTS.EXTRA_LARGE || breakpoint === _helpers_vars__WEBPACK_IMPORTED_MODULE_6__.BREAKPOINTS.EXTRA_EXTRA_LARGE ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.Fragment, {
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("div", {
        className: "col-md-6 mt-4 text-center text-md-left",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("button", {
          type: "button",
          className: "btn btn-bicolor px-5 btn-adress",
          onClick: function onClick() {
            return goBack();
          },
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("span", {
            children: "VOLVER"
          })
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("div", {
        className: "col-md-6 mt-4 text-center text-md-right",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("button", {
          type: "button",
          className: "btn btn-bicolor px-3 btn-save-address",
          onClick: customerId ? function () {
            return updateData();
          } : function () {
            return setAddressNoAuth();
          },
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("span", {
            children: "GUARDAR DIRECCI\xD3N"
          })
        })
      })]
    }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.Fragment, {
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("div", {
        className: "col-md-6 mt-4 text-center text-md-right",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("button", {
          type: "button",
          className: "btn btn-bicolor px-3 btn-save-address",
          onClick: customerId ? function () {
            return updateData();
          } : function () {
            return setAddressNoAuth();
          },
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("span", {
            children: "GUARDAR DIRECCI\xD3N"
          })
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("div", {
        className: "col-md-6 mt-4 text-center text-md-left",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("button", {
          type: "button",
          className: "btn btn-bicolor px-5 btn-adress",
          onClick: function onClick() {
            return goBack();
          },
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("span", {
            children: "VOLVER"
          })
        })
      })]
    })]
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Form);

/***/ }),

/***/ "./resources/react/webapp/pages/private/Account/sections/PersonalInfo/FormPersonalData.js":
/*!************************************************************************************************!*\
  !*** ./resources/react/webapp/pages/private/Account/sections/PersonalInfo/FormPersonalData.js ***!
  \************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-bootstrap */ "./node_modules/react-bootstrap/esm/Form.js");
/* harmony import */ var _helpers_GlobalUtils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../../helpers/GlobalUtils */ "./resources/react/webapp/helpers/GlobalUtils.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }





var FormPersonalData = function FormPersonalData(_ref) {
  var handleData = _ref.handleData,
    handleCheckBox = _ref.handleCheckBox,
    rutFormat = _ref.rutFormat,
    rutValidate = _ref.rutValidate,
    data = _ref.data,
    _ref$password = _ref.password,
    password = _ref$password === void 0 ? true : _ref$password,
    _ref$editable = _ref.editable,
    editable = _ref$editable === void 0 ? false : _ref$editable;
  var inputProps = {};
  if (data.id_type === 'RUT') {
    inputProps.onKeyUp = rutFormat;
    inputProps.onBlur = rutValidate;
  }
  ;
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("div", {
    className: "row",
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("div", {
      className: "col-md-12",
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("div", {
        className: "form-group",
        id: "email_focus",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("label", {
          htmlFor: "first_name",
          children: "Nombres"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("input", {
          type: "text",
          className: "form-control form-control-custom",
          id: "first_name",
          name: "first_name",
          onChange: function onChange(e) {
            return handleData(e, true);
          },
          value: data.first_name,
          placeholder: "Nombres",
          onFocus: _helpers_GlobalUtils__WEBPACK_IMPORTED_MODULE_1__.setCleanInputError,
          disabled: editable
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("div", {
          className: "invalid-feedback"
        })]
      })
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("div", {
      className: "col-md-12",
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("div", {
        className: "form-group",
        id: "id_number_focus",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("label", {
          htmlFor: "last_name",
          children: "Apellidos"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("input", {
          type: "text",
          className: "form-control form-control-custom",
          id: "last_name",
          name: "last_name",
          placeholder: "Apellidos",
          onChange: function onChange(e) {
            return handleData(e, true);
          },
          value: data.last_name,
          onFocus: _helpers_GlobalUtils__WEBPACK_IMPORTED_MODULE_1__.setCleanInputError,
          disabled: editable
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("div", {
          className: "invalid-feedback"
        })]
      })
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("div", {
      className: "col-md-12",
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("div", {
        className: "form-group",
        id: "phone_focus",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("label", {
          htmlFor: "email",
          children: "E-Mail"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("input", {
          type: "email",
          className: "form-control form-control-custom",
          id: "email",
          name: "email",
          placeholder: "E-Mail",
          onChange: function onChange(e) {
            return handleData(e);
          },
          value: data.email,
          onFocus: _helpers_GlobalUtils__WEBPACK_IMPORTED_MODULE_1__.setCleanInputError,
          disabled: editable
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("div", {
          className: "invalid-feedback"
        })]
      })
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("div", {
      className: "col-md-12",
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("div", {
        className: "form-group",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("div", {
          className: "",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["default"].Check, {
            custom: true,
            inline: true,
            label: "RUT",
            type: "radio",
            name: "id_type",
            id: "custom-inline-radio-rut",
            onClick: function onClick(e) {
              return handleCheckBox(e);
            },
            checked: data.id_type === 'RUT' ? true : false,
            disabled: editable
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["default"].Check, {
            custom: true,
            inline: true,
            label: "DNI",
            type: "radio",
            name: "id_type",
            id: "custom-inline-radio-dni",
            onClick: function onClick(e) {
              return handleCheckBox(e);
            },
            checked: data.id_type === 'DNI' ? true : false,
            disabled: editable
          })]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("input", _objectSpread(_objectSpread({
          type: "text",
          className: "form-control form-control-custom",
          id: "id_number",
          name: "id_number",
          placeholder: "",
          onChange: function onChange(e) {
            return handleData(e);
          },
          value: data.id_number,
          onFocus: _helpers_GlobalUtils__WEBPACK_IMPORTED_MODULE_1__.setCleanInputError
        }, inputProps), {}, {
          disabled: editable
        })), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("div", {
          className: "invalid-feedback"
        })]
      })
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("div", {
      className: "col-md-12",
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("div", {
        className: "row",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("div", {
          className: "col-md-auto pr-3 pr-md-0",
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("div", {
            className: "form-group",
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("label", {
              htmlFor: "phone_code",
              children: "C\xF3digo"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("select", {
              className: "form-control form-control-custom pl-2",
              id: "phone_code",
              name: "phone_code",
              onChange: function onChange(e) {
                return handleData(e);
              },
              onFocus: _helpers_GlobalUtils__WEBPACK_IMPORTED_MODULE_1__.setCleanInputError,
              disabled: editable,
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("option", {
                value: "+56",
                children: "+56"
              })
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("div", {
              className: "invalid-feedback"
            })]
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("div", {
          className: "col-md",
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("div", {
            className: "form-group",
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("label", {
              htmlFor: "phone",
              children: "Tel\xE9fono"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("input", {
              type: "text",
              className: "form-control form-control-custom",
              id: "phone",
              name: "phone",
              placeholder: "987654321",
              maxLength: "15",
              onChange: function onChange(e) {
                return handleData(e, false, true);
              },
              value: data.phone,
              onFocus: _helpers_GlobalUtils__WEBPACK_IMPORTED_MODULE_1__.setCleanInputError,
              disabled: editable
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("div", {
              className: "invalid-feedback"
            })]
          })
        })]
      })
    }), password ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("div", {
        className: "col-md-6",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("div", {
          className: "form-group",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("label", {
            htmlFor: "password",
            children: "Contrase\xF1a"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("input", {
            type: "password",
            className: "form-control form-control-custom",
            id: "password",
            name: "password",
            placeholder: "****",
            onChange: function onChange(e) {
              return handleData(e);
            },
            onFocus: _helpers_GlobalUtils__WEBPACK_IMPORTED_MODULE_1__.setCleanInputError
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("div", {
            className: "invalid-feedback"
          })]
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("div", {
        className: "col-md-6",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("div", {
          className: "form-group",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("label", {
            htmlFor: "new_password",
            children: "Nueva Contrase\xF1a"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("input", {
            type: "password",
            className: "form-control form-control-custom",
            id: "new_password",
            name: "new_password",
            placeholder: "****",
            onChange: function onChange(e) {
              return handleData(e);
            },
            onFocus: _helpers_GlobalUtils__WEBPACK_IMPORTED_MODULE_1__.setCleanInputError
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("div", {
            className: "invalid-feedback"
          })]
        })
      })]
    }) : null]
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (FormPersonalData);

/***/ }),

/***/ "./resources/react/webapp/pages/private/Account/sections/Subscriptions/List.js":
/*!*************************************************************************************!*\
  !*** ./resources/react/webapp/pages/private/Account/sections/Subscriptions/List.js ***!
  \*************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var _ListItem__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ListItem */ "./resources/react/webapp/pages/private/Account/sections/Subscriptions/ListItem.js");
/* harmony import */ var _components_general_Icon__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../components/general/Icon */ "./resources/react/webapp/components/general/Icon.js");
/* harmony import */ var _assets_images_icons_plus_green_svg__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../assets/images/icons/plus-green.svg */ "./resources/react/webapp/assets/images/icons/plus-green.svg");
/* harmony import */ var _Services__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../../Services */ "./resources/react/webapp/Services.js");
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! sweetalert2 */ "./node_modules/sweetalert2/dist/sweetalert2.all.js");
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(sweetalert2__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var toastr__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! toastr */ "./node_modules/toastr/toastr.js");
/* harmony import */ var toastr__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(toastr__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");









var List = function List(_ref) {
  var subscriptions = _ref.subscriptions,
    showCreate = _ref.showCreate,
    getData = _ref.getData,
    subscriptionId = _ref.subscriptionId,
    setSubscriptionId = _ref.setSubscriptionId;
  var saveDefaultSubscription = function saveDefaultSubscription(subscriptionId) {
    setSubscriptionId(subscriptionId);
  };
  var deleteSubscription = function deleteSubscription(subscription_id) {
    var swalWithBootstrapButtons = sweetalert2__WEBPACK_IMPORTED_MODULE_5___default().mixin({
      customClass: {
        confirmButton: 'col-6 btn btn-bicolor btn-block',
        title: 'mt-4'
      },
      buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
      title: '<span style="color: #0869A6;">¿Esta seguro de eliminar esta tarjeta?</span>',
      confirmButtonText: 'Confirmar',
      reverseButtons: true
    }).then(function (result) {
      if (result.isConfirmed) {
        var url = _Services__WEBPACK_IMPORTED_MODULE_4__.ENDPOINT.CUSTOMER.SUBSCRIPTIONS.DELETE;
        var data = {
          subscription_id: subscription_id
        };
        _Services__WEBPACK_IMPORTED_MODULE_4__.DoPost(url, data).then(function (response) {
          _Services__WEBPACK_IMPORTED_MODULE_4__.Response({
            response: response,
            success: function success() {
              getData();
            },
            error: function error() {
              toastr__WEBPACK_IMPORTED_MODULE_6___default().error(response.message);
            }
          });
        })["catch"](function (error) {
          _Services__WEBPACK_IMPORTED_MODULE_4__.ErrorCatch(error);
        });
      }
    });
  };
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)("div", {
    className: "row",
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("div", {
      className: "col-md-12 py-2",
      children: subscriptions.map(function (subscription, index) {
        return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_ListItem__WEBPACK_IMPORTED_MODULE_1__["default"], {
          subscription: subscription,
          saveDefaultSubscription: saveDefaultSubscription,
          deleteSubscription: deleteSubscription,
          subscriptionChecked: subscriptionId == null ? null : subscriptionId == subscription.id ? 1 : 0
        }, index);
      })
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)("div", {
      className: "col-md-12",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_components_general_Icon__WEBPACK_IMPORTED_MODULE_2__["default"], {
        path: _assets_images_icons_plus_green_svg__WEBPACK_IMPORTED_MODULE_3__["default"]
      }), "  ", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("span", {
        onClick: function onClick() {
          return showCreate();
        },
        className: "link pointer font-14 bold link-address-checkout",
        children: "Agregar nuevo m\xE9todo de pago"
      })]
    })]
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (List);

/***/ }),

/***/ "./resources/react/webapp/pages/private/Account/sections/Subscriptions/ListItem.js":
/*!*****************************************************************************************!*\
  !*** ./resources/react/webapp/pages/private/Account/sections/Subscriptions/ListItem.js ***!
  \*****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-bootstrap */ "./node_modules/react-bootstrap/esm/Form.js");
/* harmony import */ var _components_general_Icon__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../../components/general/Icon */ "./resources/react/webapp/components/general/Icon.js");
/* harmony import */ var _assets_images_icons_remove_mini_cart_svg__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../assets/images/icons/remove-mini-cart.svg */ "./resources/react/webapp/assets/images/icons/remove-mini-cart.svg");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");






var ListItem = function ListItem(_ref) {
  var subscription = _ref.subscription,
    saveDefaultSubscription = _ref.saveDefaultSubscription,
    deleteSubscription = _ref.deleteSubscription,
    subscriptionChecked = _ref.subscriptionChecked,
    _ref$isModal = _ref.isModal,
    isModal = _ref$isModal === void 0 ? false : _ref$isModal;
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("div", {
    className: "row",
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("div", {
      className: "col-auto d-flex pr-0",
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("div", {
        className: "my-auto",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["default"].Check, {
          custom: true,
          inline: true,
          label: "",
          type: "radio",
          name: "default_subscription",
          checked: (subscriptionChecked !== null && subscriptionChecked !== void 0 ? subscriptionChecked : subscription.default_subscription) == 1 ? true : false,
          className: "mr-1",
          onClick: function onClick() {
            return saveDefaultSubscription(subscription.id, subscription.customer_id);
          },
          id: "custom-inline-radio-subscription-".concat(subscription.id)
        })
      })
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("div", {
      className: "col pl-0",
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("div", {
        className: "row",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("div", {
          className: "col-12",
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("span", {
            className: "font-poppins mt-4 font-16 regular color-484848",
            children: [subscription.card_type, " ", subscription.card_number]
          })
        })
      })
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("div", {
      className: "col-auto text-center d-flex",
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("div", {
        onClick: function onClick() {
          return deleteSubscription(subscription.id);
        },
        className: "my-auto pointer",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("div", {
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_components_general_Icon__WEBPACK_IMPORTED_MODULE_1__["default"], {
            path: _assets_images_icons_remove_mini_cart_svg__WEBPACK_IMPORTED_MODULE_2__["default"]
          })
        })
      })
    })
    // isModal ? : null
    , /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("div", {
      className: "col-md-12",
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("hr", {})
    })]
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ListItem);

/***/ }),

/***/ "./resources/react/webapp/pages/public/CheckOut/AddAddress.js":
/*!********************************************************************!*\
  !*** ./resources/react/webapp/pages/public/CheckOut/AddAddress.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var _helpers_GlobalUtils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../helpers/GlobalUtils */ "./resources/react/webapp/helpers/GlobalUtils.js");
/* harmony import */ var _Services__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../Services */ "./resources/react/webapp/Services.js");
/* harmony import */ var _context_AuthProvider__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../context/AuthProvider */ "./resources/react/webapp/context/AuthProvider/index.js");
/* harmony import */ var react_google_autocomplete__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-google-autocomplete */ "./node_modules/react-google-autocomplete/index.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

// import FormPersonalData from "../../private/Account/sections/PersonalInfo/FormPersonalData";
// import FormComercialInfo from "../../private/Account/sections/PersonalInfo/FormComercialInfo";
// import {CONFIG} from "../../../Config";







var AddAddress = function AddAddress(_ref) {
  var setView = _ref.setView,
    regions = _ref.regions,
    address = _ref.address,
    validateDataAddressInvite = _ref.validateDataAddressInvite,
    setAddress = _ref.setAddress,
    validAddress = _ref.validAddress,
    setValidAddress = _ref.setValidAddress,
    setInputError = _ref.setInputError;
  // const [showBilling, setShowBilling] = useState(false);

  var _useContext = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(_context_AuthProvider__WEBPACK_IMPORTED_MODULE_3__.AuthContext),
    auth = _useContext.auth;
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(0),
    _useState2 = _slicedToArray(_useState, 2),
    selectedRegion = _useState2[0],
    setSelectedRegion = _useState2[1];
  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(0),
    _useState4 = _slicedToArray(_useState3, 2),
    mode = _useState4[0],
    setMode = _useState4[1];
  var _useState5 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]),
    _useState6 = _slicedToArray(_useState5, 2),
    communes = _useState6[0],
    setCommunes = _useState6[1];
  var _useState7 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(""),
    _useState8 = _slicedToArray(_useState7, 2),
    googleAddress = _useState8[0],
    setGoogleAddress = _useState8[1];
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    if (mode == 1) {
      setAddress({
        name: "Retiro_tienda",
        region_id: 7,
        commune_id: "RetiroTienda",
        extra_info: "147",
        address: "Antonio Bellet",
        step: 2
      });
      setView("addresses");
    } else {
      setAddress({
        name: address.name,
        region_id: 7
      });
    }
  }, [mode]);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    if (regions.length > 0) {
      if (address && address.region_id != "") {
        setSelectedRegion(address.region_id);
      } else {
        setAddress(_objectSpread(_objectSpread({}, address), {}, {
          region_id: 7,
          commune_id: null
        }));
        setSelectedRegion(7);
      }
    }
  }, [regions, address.region_id]);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    if (selectedRegion) {
      var region = regions.find(function (r) {
        return r.id == selectedRegion;
      });
      var tempCommunes = [];
      region.provinces.map(function (province) {
        province.communes.map(function (commune) {
          if (commune.is_valid) {
            tempCommunes.push(commune);
          }
        });
      });
      var orderCommunes = tempCommunes.sort(function (a, b) {
        var commA = a.name.toLowerCase();
        var commB = b.name.toLowerCase();
        var comparison = 0;
        if (commA > commB) {
          comparison = 1;
        } else if (commA < commB) {
          comparison = -1;
        }
        return comparison;
      });
      setCommunes(orderCommunes);
    }
  }, [selectedRegion]);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    if (googleAddress.length > 0) {
      setAddress(_objectSpread(_objectSpread({}, address), {}, _defineProperty({}, "address", googleAddress)));
    }
  }, [googleAddress]);
  var selectRegion = function selectRegion(e) {
    var region = regions.find(function (r) {
      return r.id == e.target.value;
    });
    setAddress(_objectSpread(_objectSpread({}, address), {}, {
      region_id: region.id,
      commune_id: null
    }));
    setSelectedRegion(e.target.value);
  };
  var handleAddressComment = function handleAddressComment(e) {
    if (e.target.value.match("^$|^[a-zA-Zñ ]+$")) {
      setAddress(_objectSpread(_objectSpread({}, address), {}, _defineProperty({}, e.target.name, e.target.value)));
    }
  };
  var handleAddress = function handleAddress(e) {
    var direction = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    var number = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    var text = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
    if (direction) {
      if (e.target.value.match("^$|^[a-zA-Z0-9ñ ]+$")) {
        setAddress(_objectSpread(_objectSpread({}, address), {}, _defineProperty({}, e.target.name, e.target.value)));
      }
    }
    if (number) {
      if (e.target.value.match("^$|^[0-9]+$")) {
        setAddress(_objectSpread(_objectSpread({}, address), {}, _defineProperty({}, e.target.name, e.target.value)));
      }
    }
    if (text) {
      if (e.target.value.match("^$|^[a-zA-Zñ ]+$")) {
        setAddress(_objectSpread(_objectSpread({}, address), {}, _defineProperty({}, e.target.name, e.target.value)));
      }
    }
    if (!direction && !number && !text) {
      setAddress(_objectSpread(_objectSpread({}, address), {}, _defineProperty({}, e.target.name, e.target.value)));
    }
  };
  var autoCompleteHandle = function autoCompleteHandle(place) {
    setGoogleAddress("");
    setValidAddress(false);
    setAddress(_objectSpread(_objectSpread({}, address), {}, _defineProperty({}, "address", place)));
  };
  var retire = function retire() {
    setAddress({
      name: "Retiro_tienda",
      region_id: 7,
      commune_id: 118,
      extra_info: "147",
      address: "Antonio Bellet",
      step: 2
    });
    setTimeout(function () {
      setAddress({
        name: "Retiro_tienda",
        region_id: 7,
        commune_id: 118,
        extra_info: "147",
        address: "Antonio Bellet",
        step: 2
      });
    }, 50);
    validateDataAddressInvite();
  };
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div", {
      className: "panel panel-cart mb-3",
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div", {
        className: "panel-body",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div", {
          className: "row",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div", {
            className: "col-12 col-md-12 col-lg-6",
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div", {
              className: "py-3",
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("button", {
                type: "button",
                className: "btn btn-bicolor btn-block",
                onClick: function onClick() {
                  return setMode(2);
                },
                children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("span", {
                  children: "Entrega a Domicilio"
                })
              })
            })
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div", {
            className: "col-12 col-md-12 col-lg-6",
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div", {
              className: "py-3",
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("button", {
                type: "button",
                className: "btn btn-bicolor btn-block",
                onClick: function onClick() {
                  return setMode(1);
                },
                children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("span", {
                  children: "Retiro En tienda"
                })
              })
            })
          })]
        }), mode == 2 ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div", {
          className: "row",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div", {
            className: "col-md-12",
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("h3", {
              className: "font-poppins font-14 bold color-2A317F",
              children: "Entrega a Domicilio"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div", {
              className: "form-group",
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("label", {
                htmlFor: "name",
                children: "Nombre"
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("input", {
                type: "text",
                className: "form-control form-control-custom",
                id: "name",
                name: "name",
                placeholder: "Nombre Contacto",
                value: address.name,
                onChange: function onChange(e) {
                  return handleAddress(e, false, false, true);
                },
                onFocus: _helpers_GlobalUtils__WEBPACK_IMPORTED_MODULE_1__.setCleanInputError
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div", {
                className: "invalid-feedback"
              })]
            })]
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div", {
            className: "col-md-8",
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div", {
              className: "form-group",
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("label", {
                htmlFor: "address",
                children: "Calle y N\xFAmero"
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("input", {
                type: "text",
                className: "form-control form-control-custom",
                id: "address",
                name: "address",
                placeholder: "Calle y N\xFAmero",
                value: address.address,
                onChange: function onChange(e) {
                  return handleAddress(e);
                },
                onFocus: _helpers_GlobalUtils__WEBPACK_IMPORTED_MODULE_1__.setCleanInputError
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div", {
                className: "invalid-feedback"
              })]
            })
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div", {
            className: "col-md-4",
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div", {
              className: "form-group",
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("label", {
                htmlFor: "extra_info",
                children: "N\xFAmero casa o departamento"
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("input", {
                type: "text",
                className: "form-control form-control-custom",
                id: "extra_info",
                name: "extra_info",
                placeholder: "N\xFAmero casa o departamento",
                value: address.extra_info,
                onChange: function onChange(e) {
                  return handleAddress(e);
                },
                onFocus: _helpers_GlobalUtils__WEBPACK_IMPORTED_MODULE_1__.setCleanInputError
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div", {
                className: "invalid-feedback"
              })]
            })
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div", {
            className: "col-md-6",
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div", {
              className: "form-group",
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("label", {
                htmlFor: "region_id",
                children: "Regi\xF3n"
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("select", {
                className: "form-control form-control-custom pl-md-2",
                id: "region_id",
                name: "region_id",
                value: address.region_id,
                onChange: function onChange(e) {
                  return selectRegion(e);
                },
                onFocus: _helpers_GlobalUtils__WEBPACK_IMPORTED_MODULE_1__.setCleanInputError,
                children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("option", {
                  value: "",
                  disabled: true,
                  selected: true,
                  children: "Seleccionar"
                }), regions.map(function (region) {
                  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("option", {
                    value: region.id,
                    children: region.name
                  }, region.id);
                })]
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div", {
                className: "invalid-feedback"
              })]
            })
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div", {
            className: "col-md-6",
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div", {
              className: "form-group",
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("label", {
                htmlFor: "commune_id",
                children: "Comuna"
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("select", {
                className: "form-control form-control-custom pl-md-2",
                id: "commune_id",
                name: "commune_id",
                onChange: function onChange(e) {
                  return handleAddress(e);
                },
                onFocus: _helpers_GlobalUtils__WEBPACK_IMPORTED_MODULE_1__.setCleanInputError,
                value: address.commune_id ? address.commune_id : "",
                children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("option", {
                  value: "",
                  disabled: true,
                  selected: true,
                  children: "Seleccionar"
                }), communes.map(function (commune) {
                  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("option", {
                    value: commune.id,
                    children: commune.name
                  }, commune.id);
                })]
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div", {
                className: "invalid-feedback"
              })]
            })
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div", {
            className: "col-md-12",
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div", {
              className: "form-group",
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("label", {
                htmlFor: "name",
                children: "Comentario"
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("textarea", {
                className: "form-control form-control-custom",
                id: "comment",
                rows: 3,
                name: "comment",
                placeholder: "Agrega un rango de horario para la entrega, es en oficina o una casa, u cualquier otra informaci\xF3n relevante como el detalle de como llegar",
                value: address.comment,
                onChange: function onChange(e) {
                  return handleAddressComment(e);
                },
                onFocus: _helpers_GlobalUtils__WEBPACK_IMPORTED_MODULE_1__.setCleanInputError
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div", {
                className: "invalid-feedback"
              })]
            })
          })]
        }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.Fragment, {})]
      })
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div", {
      className: "row button-nav-checkout",
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div", {
        className: "col-md-6 pb-5",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("button", {
          onClick: function onClick() {
            return setView("user-form");
          },
          className: "link",
          style: {
            textDecoration: "none"
          },
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            width: "8.405",
            height: "14.545",
            viewBox: "0 0 8.405 14.545",
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("path", {
              id: "Trazado_3290",
              "data-name": "Trazado 3290",
              d: "M0,0,7.344,6.768.288,13.824",
              transform: "translate(8.066 14.177) rotate(-180)",
              fill: "none",
              stroke: "#009be8",
              "stroke-width": "1"
            })
          }), " ", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("span", {
            className: "font-12 add-underline-responsive",
            children: " Volver a paso anterior"
          })]
        })
      })
    })]
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (AddAddress);

/***/ }),

/***/ "./resources/react/webapp/pages/public/CheckOut/Addresses.js":
/*!*******************************************************************!*\
  !*** ./resources/react/webapp/pages/public/CheckOut/Addresses.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var _Components_List__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Components/List */ "./resources/react/webapp/pages/public/CheckOut/Components/List.js");
/* harmony import */ var _private_Account_sections_Addresses_Form__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../private/Account/sections/Addresses/Form */ "./resources/react/webapp/pages/private/Account/sections/Addresses/Form.js");
/* harmony import */ var _components_general_Icon__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../components/general/Icon */ "./resources/react/webapp/components/general/Icon.js");
/* harmony import */ var _assets_images_icons_calendar_blue_svg__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../assets/images/icons/calendar-blue.svg */ "./resources/react/webapp/assets/images/icons/calendar-blue.svg");
/* harmony import */ var _assets_images_icons_clock_blue_svg__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../assets/images/icons/clock-blue.svg */ "./resources/react/webapp/assets/images/icons/clock-blue.svg");
/* harmony import */ var _context_AuthProvider__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../context/AuthProvider */ "./resources/react/webapp/context/AuthProvider/index.js");
/* harmony import */ var _Services__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../Services */ "./resources/react/webapp/Services.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }











var Addresses = function Addresses(_ref) {
  var setView = _ref.setView,
    regions = _ref.regions,
    communes = _ref.communes,
    address = _ref.address,
    setAddress = _ref.setAddress,
    dispatchDateObject = _ref.dispatchDateObject;
  var _useContext = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(_context_AuthProvider__WEBPACK_IMPORTED_MODULE_6__.AuthContext),
    auth = _useContext.auth;
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]),
    _useState2 = _slicedToArray(_useState, 2),
    addresses = _useState2[0],
    setAddresses = _useState2[1];
  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)("list"),
    _useState4 = _slicedToArray(_useState3, 2),
    view = _useState4[0],
    setViewAd = _useState4[1];
  var _useState5 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)("create"),
    _useState6 = _slicedToArray(_useState5, 2),
    formMode = _useState6[0],
    setFormMode = _useState6[1];
  var _useState7 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null),
    _useState8 = _slicedToArray(_useState7, 2),
    addressSelected = _useState8[0],
    setAddressSelected = _useState8[1];
  console.log(dispatchDateObject);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    if (auth) {
      getData();
    }
  }, [auth]);
  var getData = function getData() {
    var url = _Services__WEBPACK_IMPORTED_MODULE_7__.ENDPOINT.CUSTOMER.ADDRESSES.GET;
    var data = {
      customer_id: auth.id
    };
    _Services__WEBPACK_IMPORTED_MODULE_7__.DoPost(url, data).then(function (response) {
      _Services__WEBPACK_IMPORTED_MODULE_7__.Response({
        response: response,
        success: function success() {
          setAddresses(response.data.addresses);
          if (response.data.addresses != null) {
            response.data.addresses.forEach(function (elementAddress) {
              if (elementAddress.default_address) {
                setAddress(elementAddress);
              }
            });
          }
        }
      });
    })["catch"](function (error) {
      _Services__WEBPACK_IMPORTED_MODULE_7__.ErrorCatch(error);
    });
  };
  var goBack = function goBack() {
    setViewAd("list");
    setAddressSelected(null);
  };
  var showEdit = function showEdit(address) {
    setViewAd("form");
    setFormMode("edit");
    setAddressSelected(address);
  };
  var showCreate = function showCreate() {
    setViewAd("form");
    setFormMode("create");
    setAddressSelected(null);
  };
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("div", {
      className: "panel panel-cart mb-3",
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("div", {
        className: "panel-body",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("h3", {
          className: "font-poppins font-16 bold color-033F5D",
          children: "Confirma tu direcci\xF3n de despacho o agrega una nueva"
        }), view === "list" ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_Components_List__WEBPACK_IMPORTED_MODULE_1__["default"], {
          addresses: auth ? addresses : address,
          showEdit: showEdit,
          showCreate: showCreate,
          regions: regions,
          communes: communes,
          getData: getData,
          setAddress: setAddress,
          setAddresses: setAddresses
        }) : null, view === "form" ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_private_Account_sections_Addresses_Form__WEBPACK_IMPORTED_MODULE_2__["default"], {
          formMode: formMode,
          addressSelected: addressSelected,
          regions: regions,
          customerId: auth ? auth.id : null,
          goBack: goBack,
          setAddresses: auth ? setAddresses : setAddress
        }) : null]
      })
    }), dispatchDateObject !== null && dispatchDateObject !== void 0 && dispatchDateObject.label_calendar ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("div", {
      className: "panel panel-cart mb-3",
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("div", {
        className: "panel-body",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("h3", {
          className: "font-poppins font-16 bold color-033F5D mb-3",
          children: "Fecha estimada de entrega"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("div", {
          className: "row",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("div", {
            className: "col-12 col-md pb-2",
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("div", {
              className: "row no-gutters",
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("div", {
                className: "col-auto",
                style: {
                  width: "27px"
                },
                children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_components_general_Icon__WEBPACK_IMPORTED_MODULE_3__["default"], {
                  path: _assets_images_icons_calendar_blue_svg__WEBPACK_IMPORTED_MODULE_4__["default"]
                })
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("div", {
                className: "col-auto mx-2 d-flex",
                children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("span", {
                  className: "my-auto font-poppins font-12 bold",
                  children: dispatchDateObject === null || dispatchDateObject === void 0 ? void 0 : dispatchDateObject.label_calendar
                })
              })]
            })
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("div", {
            className: "col-12 col-md",
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("div", {
              className: "row no-gutters",
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("div", {
                className: "col-auto",
                style: {
                  width: "27px"
                },
                children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_components_general_Icon__WEBPACK_IMPORTED_MODULE_3__["default"], {
                  path: _assets_images_icons_clock_blue_svg__WEBPACK_IMPORTED_MODULE_5__["default"]
                })
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("div", {
                className: "col-auto mx-2 d-flex",
                children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("span", {
                  className: "my-auto font-poppins font-12 regular color-8E8E8E",
                  children: "Hora de entrega"
                })
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("div", {
                className: "col-auto mx-4 d-flex",
                children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("span", {
                  className: "my-auto font-poppins font-14 regular color-484848",
                  style: {
                    marginLeft: "10px"
                  },
                  children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("span", {
                    className: "bold",
                    children: "9:00 a 21:00 hrs"
                  })
                })
              })]
            })
          })]
        })]
      })
    }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.Fragment, {}), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("div", {
      className: "row button-nav-checkout",
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("div", {
        className: "col-md-6 pb-5",
        children: auth ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("button", {
          onClick: function onClick() {
            return setView("user-form");
          },
          className: "link",
          style: {
            textDecoration: "none"
          },
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            width: "8.405",
            height: "14.545",
            viewBox: "0 0 8.405 14.545",
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("path", {
              id: "Trazado_3290",
              "data-name": "Trazado 3290",
              d: "M0,0,7.344,6.768.288,13.824",
              transform: "translate(8.066 14.177) rotate(-180)",
              fill: "none",
              stroke: "#009be8",
              "stroke-width": "1"
            })
          }), " ", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("span", {
            className: "font-12 add-underline-responsive",
            children: " Volver a paso anterior"
          })]
        }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("button", {
          onClick: function onClick() {
            return setView("add-address");
          },
          className: "link",
          style: {
            textDecoration: "none"
          },
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            width: "8.405",
            height: "14.545",
            viewBox: "0 0 8.405 14.545",
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("path", {
              id: "Trazado_3290",
              "data-name": "Trazado 3290",
              d: "M0,0,7.344,6.768.288,13.824",
              transform: "translate(8.066 14.177) rotate(-180)",
              fill: "none",
              stroke: "#009be8",
              "stroke-width": "1"
            })
          }), " ", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("span", {
            className: "font-12 add-underline-responsive",
            children: " Volver a paso anterior"
          })]
        })
      })
    })]
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Addresses);

/***/ }),

/***/ "./resources/react/webapp/pages/public/CheckOut/Components/AddressList.js":
/*!********************************************************************************!*\
  !*** ./resources/react/webapp/pages/public/CheckOut/Components/AddressList.js ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! react-bootstrap */ "./node_modules/react-bootstrap/esm/Form.js");
/* harmony import */ var _context_AppProvider__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../context/AppProvider */ "./resources/react/webapp/context/AppProvider/index.js");
/* harmony import */ var _context_AuthProvider__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../context/AuthProvider */ "./resources/react/webapp/context/AuthProvider/index.js");
/* harmony import */ var _helpers_vars__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../helpers/vars */ "./resources/react/webapp/helpers/vars.js");
/* harmony import */ var _components_general_Icon__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../components/general/Icon */ "./resources/react/webapp/components/general/Icon.js");
/* harmony import */ var _assets_images_icons_remove_mini_cart_svg__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../assets/images/icons/remove-mini-cart.svg */ "./resources/react/webapp/assets/images/icons/remove-mini-cart.svg");
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! sweetalert2 */ "./node_modules/sweetalert2/dist/sweetalert2.all.js");
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(sweetalert2__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var toastr__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! toastr */ "./node_modules/toastr/toastr.js");
/* harmony import */ var toastr__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(toastr__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _Services__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../../Services */ "./resources/react/webapp/Services.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");













var ListItem = function ListItem(_ref) {
  var address = _ref.address,
    showEdit = _ref.showEdit,
    saveDefaultAddress = _ref.saveDefaultAddress,
    regions = _ref.regions,
    communes = _ref.communes,
    setAddresses = _ref.setAddresses,
    _ref$name = _ref.name,
    name = _ref$name === void 0 ? 'default_address' : _ref$name;
  var _useContext = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(_context_AuthProvider__WEBPACK_IMPORTED_MODULE_2__.AuthContext),
    auth = _useContext.auth;
  var _useContext2 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(_context_AppProvider__WEBPACK_IMPORTED_MODULE_1__.AppContext),
    breakpoint = _useContext2.breakpoint;
  var region = regions.find(function (x) {
    return x.id === address.region_id;
  });
  var commune = communes.find(function (x) {
    return x.id === address.commune_id;
  });
  var removeData = function removeData(addresId) {
    var url = _Services__WEBPACK_IMPORTED_MODULE_8__.ENDPOINT.CUSTOMER.ADDRESSES.REMOVE;
    var data = {
      customer_id: auth.id,
      address_id: addresId
    };
    var swalWithBootstrapButtons = sweetalert2__WEBPACK_IMPORTED_MODULE_6___default().mixin({
      customClass: {
        confirmButton: 'col-6 btn btn-bicolor btn-block',
        title: 'mt-4'
      },
      buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
      title: '<span style="color: #0869A6;">¿Está seguro de eliminar esta dirección?</span>',
      confirmButtonText: 'Confirmar',
      reverseButtons: true
    }).then(function (result) {
      if (result.isConfirmed) {
        _Services__WEBPACK_IMPORTED_MODULE_8__.DoPost(url, data).then(function (response) {
          _Services__WEBPACK_IMPORTED_MODULE_8__.Response({
            response: response,
            success: function success() {
              setAddresses(response.data.addresses);
              toastr__WEBPACK_IMPORTED_MODULE_7___default().success(response.message);
            },
            error: function error() {
              toastr__WEBPACK_IMPORTED_MODULE_7___default().error(response.message);
            }
          });
        })["catch"](function (error) {
          _Services__WEBPACK_IMPORTED_MODULE_8__.ErrorCatch(error);
        });
      }
    });
  };
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)("div", {
    className: "row",
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)("div", {
      className: "col-auto d-flex pr-0",
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)("div", {
        className: "my-auto",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(react_bootstrap__WEBPACK_IMPORTED_MODULE_10__["default"].Check, {
          custom: true,
          inline: true,
          label: "",
          type: "radio",
          name: name,
          checked: address.default_address ? true : false,
          className: "mr-1",
          onClick: function onClick() {
            return saveDefaultAddress(address.id, address.customer_id);
          },
          id: "custom-inline-radio-address-".concat(address.id, "-").concat(name)
        })
      })
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)("div", {
      className: "col pl-0",
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)("div", {
        className: "row",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)("div", {
          className: "col-12",
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)("span", {
            className: "font-poppins font-10 regular color-8E8E8E",
            children: address.name
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)("div", {
          className: "col-12",
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)("div", {
            className: "font-poppins font-14 lh-18 regular color-484848",
            children: [address.address, ", ", address.extra_info ? address.extra_info + ', ' : '', " ", commune ? commune.name : null, ", ", region ? region.name : null]
          })
        })]
      })
    }), breakpoint === _helpers_vars__WEBPACK_IMPORTED_MODULE_3__.BREAKPOINTS.MEDIUM || breakpoint === _helpers_vars__WEBPACK_IMPORTED_MODULE_3__.BREAKPOINTS.LARGE || breakpoint === _helpers_vars__WEBPACK_IMPORTED_MODULE_3__.BREAKPOINTS.EXTRA_LARGE || breakpoint === _helpers_vars__WEBPACK_IMPORTED_MODULE_3__.BREAKPOINTS.EXTRA_EXTRA_LARGE ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.Fragment, {
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)("div", {
        className: "col-auto d-flex",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)("div", {
          className: "mt-4",
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)("span", {
            onClick: function onClick() {
              return showEdit(address);
            },
            className: "link pointer font-12 regular",
            children: "Editar"
          })
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)("div", {
        className: "col-auto d-flex",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)("div", {
          className: "mt-4",
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)("span", {
            onClick: function onClick() {
              return removeData(address.id);
            },
            className: "my-auto pointer",
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)("div", {
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(_components_general_Icon__WEBPACK_IMPORTED_MODULE_4__["default"], {
                path: _assets_images_icons_remove_mini_cart_svg__WEBPACK_IMPORTED_MODULE_5__["default"]
              })
            })
          })
        })
      })]
    }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)("div", {
      className: "col-md-12 text-right",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.Fragment, {
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)("div", {
          className: "mb-auto ",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)("span", {
            onClick: function onClick() {
              return showEdit(address);
            },
            className: "link pointer font-12 regular",
            children: "editar"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)("span", {
            onClick: function onClick() {
              return removeData(address.id);
            },
            className: "my-auto pointer",
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)("div", {
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(_components_general_Icon__WEBPACK_IMPORTED_MODULE_4__["default"], {
                path: _assets_images_icons_remove_mini_cart_svg__WEBPACK_IMPORTED_MODULE_5__["default"]
              })
            })
          })]
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)("hr", {})]
    })]
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ListItem);

/***/ }),

/***/ "./resources/react/webapp/pages/public/CheckOut/Components/List.js":
/*!*************************************************************************!*\
  !*** ./resources/react/webapp/pages/public/CheckOut/Components/List.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var _ListItem__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ListItem */ "./resources/react/webapp/pages/public/CheckOut/Components/ListItem.js");
/* harmony import */ var _AddressList__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./AddressList */ "./resources/react/webapp/pages/public/CheckOut/Components/AddressList.js");
/* harmony import */ var _components_general_Icon__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../components/general/Icon */ "./resources/react/webapp/components/general/Icon.js");
/* harmony import */ var _assets_images_icons_plus_green_svg__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../assets/images/icons/plus-green.svg */ "./resources/react/webapp/assets/images/icons/plus-green.svg");
/* harmony import */ var _Services__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../Services */ "./resources/react/webapp/Services.js");
/* harmony import */ var _context_AuthProvider__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../context/AuthProvider */ "./resources/react/webapp/context/AuthProvider/index.js");
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! uuid */ "./node_modules/uuid/dist/esm-browser/v4.js");
/* harmony import */ var _context_AppProvider__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../../context/AppProvider */ "./resources/react/webapp/context/AppProvider/index.js");
/* harmony import */ var _helpers_vars__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../../helpers/vars */ "./resources/react/webapp/helpers/vars.js");
/* harmony import */ var _StoreRetire__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./StoreRetire */ "./resources/react/webapp/pages/public/CheckOut/Components/StoreRetire.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }














var List = function List(_ref) {
  var addresses = _ref.addresses,
    showEdit = _ref.showEdit,
    showCreate = _ref.showCreate,
    getData = _ref.getData,
    regions = _ref.regions,
    communes = _ref.communes,
    setAddress = _ref.setAddress,
    setAddresses = _ref.setAddresses;
  var _useContext = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(_context_AppProvider__WEBPACK_IMPORTED_MODULE_7__.AppContext),
    breakpoint = _useContext.breakpoint;
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
    _useState2 = _slicedToArray(_useState, 2),
    checked = _useState2[0],
    setChecked = _useState2[1];
  var _useContext2 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(_context_AuthProvider__WEBPACK_IMPORTED_MODULE_6__.AuthContext),
    auth = _useContext2.auth;
  var saveDefaultAddress = function saveDefaultAddress(addressId, customerId) {
    if (!customerId) {
      setChecked(false);
    }
    var url = _Services__WEBPACK_IMPORTED_MODULE_5__.ENDPOINT.CUSTOMER.ADDRESSES.SET_DEFAULT_ADDRESS;
    var data = {
      address_id: addressId,
      customer_id: customerId ? customerId : auth === null || auth === void 0 ? void 0 : auth.id
    };
    _Services__WEBPACK_IMPORTED_MODULE_5__.DoPost(url, data).then(function (response) {
      _Services__WEBPACK_IMPORTED_MODULE_5__.Response({
        response: response,
        success: function success() {
          if (addressId !== "5606") {
            setChecked(false);
          }
          setAddress(addresses.find(function (x) {
            return x.id == addressId;
          }));
          getData();
        }
      });
    })["catch"](function (error) {
      _Services__WEBPACK_IMPORTED_MODULE_5__.ErrorCatch(error);
    });
  };
  var uuid = (0,uuid__WEBPACK_IMPORTED_MODULE_11__["default"])();
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxs)("div", {
    className: "row",
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxs)("div", {
      className: "col-md-12 py-2",
      children: [auth ? addresses.map(function (address, index) {
        return address.name !== 'Retiro_tienda' ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)(_AddressList__WEBPACK_IMPORTED_MODULE_2__["default"], {
          address: address,
          showEdit: showEdit,
          saveDefaultAddress: saveDefaultAddress,
          regions: regions,
          communes: communes,
          setAddresses: setAddresses
        }, index) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.Fragment, {});
      }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)(_ListItem__WEBPACK_IMPORTED_MODULE_1__["default"], {
        address: addresses,
        showEdit: showEdit,
        saveDefaultAddress: saveDefaultAddress,
        regions: regions,
        communes: communes
      }, uuid), auth ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)(_StoreRetire__WEBPACK_IMPORTED_MODULE_9__["default"], {
        setChecked: setChecked,
        checked: checked,
        saveDefaultAddress: saveDefaultAddress
      }) : (addresses === null || addresses === void 0 ? void 0 : addresses.name) !== 'Retiro_tienda' ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.Fragment, {}) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)(_StoreRetire__WEBPACK_IMPORTED_MODULE_9__["default"], {
        setChecked: setChecked,
        checked: checked,
        saveDefaultAddress: saveDefaultAddress
      })]
    }), breakpoint === _helpers_vars__WEBPACK_IMPORTED_MODULE_8__.BREAKPOINTS.MEDIUM || breakpoint === _helpers_vars__WEBPACK_IMPORTED_MODULE_8__.BREAKPOINTS.LARGE || breakpoint === _helpers_vars__WEBPACK_IMPORTED_MODULE_8__.BREAKPOINTS.EXTRA_LARGE || breakpoint === _helpers_vars__WEBPACK_IMPORTED_MODULE_8__.BREAKPOINTS.EXTRA_EXTRA_LARGE ? auth ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("div", {
      className: "col-md-12 py-2",
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("hr", {})
    }) : null : null, auth ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxs)("div", {
      className: "col-md-12",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)(_components_general_Icon__WEBPACK_IMPORTED_MODULE_3__["default"], {
        path: _assets_images_icons_plus_green_svg__WEBPACK_IMPORTED_MODULE_4__["default"]
      }), " ", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("span", {
        onClick: function onClick() {
          return showCreate();
        },
        className: "link pointer font-14 bold link-address-checkout",
        children: "Agregar nueva direcci\xF3n"
      })]
    }) : null]
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (List);

/***/ }),

/***/ "./resources/react/webapp/pages/public/CheckOut/Components/ListItem.js":
/*!*****************************************************************************!*\
  !*** ./resources/react/webapp/pages/public/CheckOut/Components/ListItem.js ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-bootstrap */ "./node_modules/react-bootstrap/esm/Form.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");





var ListItem = function ListItem(_ref) {
  var address = _ref.address,
    showEdit = _ref.showEdit,
    saveDefaultAddress = _ref.saveDefaultAddress,
    regions = _ref.regions,
    communes = _ref.communes;
  console.log(address);
  var region = regions.find(function (x) {
    return x.id === address.region_id;
  });
  var commune = communes.find(function (x) {
    return x.id == address.commune_id;
  });
  return address.name !== "Retiro_tienda" ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("div", {
    className: "row",
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
      className: "col-auto d-flex pr-0",
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
        className: "my-auto",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["default"].Check, {
          custom: true,
          inline: true,
          label: "",
          type: "radio",
          name: "default_address",
          checked: true,
          disabled: true,
          className: "mr-1",
          id: "custom-inline-radio-address-".concat(address.id)
        })
      })
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
      className: "col pl-0",
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("div", {
        className: "row",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
          className: "col-12",
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("span", {
            className: "font-poppins font-10 regular color-8E8E8E",
            children: [address.first_name, " ", address.last_name]
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
          className: "col-12",
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("div", {
            className: "font-poppins font-16 lh-18 regular color-484848",
            children: [address.address, ", ", address.extra_info ? address.extra_info + ', ' : '', " ", commune ? commune.name : null, ", ", region ? region.name : null]
          })
        })]
      })
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
      className: "col-auto d-flex",
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
        className: "my-auto",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("span", {
          onClick: function onClick() {
            return showEdit(address);
          },
          className: "link pointer font-12 regular",
          children: "editar"
        })
      })
    })]
  }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.Fragment, {});
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ListItem);

/***/ }),

/***/ "./resources/react/webapp/pages/public/CheckOut/Components/StoreRetire.js":
/*!********************************************************************************!*\
  !*** ./resources/react/webapp/pages/public/CheckOut/Components/StoreRetire.js ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-bootstrap */ "./node_modules/react-bootstrap/esm/Form.js");
/* harmony import */ var _assets_images_logo_jpeg__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../assets/images/logo.jpeg */ "./resources/react/webapp/assets/images/logo.jpeg");
/* harmony import */ var _components_general_Icon__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../components/general/Icon */ "./resources/react/webapp/components/general/Icon.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");







var StoreRetire = function StoreRetire(_ref) {
  var saveDefaultAddress = _ref.saveDefaultAddress,
    _ref$name = _ref.name,
    name = _ref$name === void 0 ? "default_address" : _ref$name,
    addresses = _ref.addresses,
    setChecked = _ref.setChecked,
    checked = _ref.checked;
  console.log(addresses);
  var setAddress = function setAddress() {
    saveDefaultAddress("5606", null);
    setChecked(true);
  };
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.Fragment, {
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("div", {
      className: "row",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("div", {
        className: "col-auto d-flex pr-0",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("div", {
          className: "my-auto",
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["default"].Check, {
            custom: true,
            inline: true,
            label: "",
            type: "radio",
            name: name,
            checked: checked,
            className: "mr-1",
            onClick: function onClick() {
              return setAddress();
            },
            id: "custom-inline-radio-address-retirotienda"
          })
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("div", {
        className: "col pl-0",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("div", {
          className: "row",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("div", {
            className: "col-12",
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("span", {
              className: "font-poppins font-10 regular color-8E8E8E",
              children: "Retiro en Tienda:"
            })
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("div", {
            className: "col-12",
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("div", {
              className: "font-poppins font-14 lh-18 regular color-484848",
              children: "Farmacias Oxfar, Antonio Bellet 147, Providencia"
            })
          })]
        })
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("div", {
      style: {
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
        width: "90%",
        paddingTop: "56.25%",
        margin: "0 auto"
      },
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("br", {}), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("iframe", {
        src: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3329.896243891384!2d-70.6175332!3d-33.42594929999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9662cf63bef52a5f%3A0x1b3d0c24107d99c5!2sAntonio%20Bellet%20147%2C%207500025%20Providencia%2C%20Regi%C3%B3n%20Metropolitana%2C%20Chile!5e0!3m2!1ses-419!2smx!4v1690257068337!5m2!1ses-419!2smx",
        style: {
          border: "0",
          margin: "10px auto",
          position: "absolute",
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          width: "100%",
          height: "100%"
        },
        allowfullscreen: "",
        loading: "lazy",
        referrerpolicy: "no-referrer-when-downgrade"
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("div", {
      style: {
        textAlign: "center"
      },
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("br", {}), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_components_general_Icon__WEBPACK_IMPORTED_MODULE_2__["default"], {
        path: _assets_images_logo_jpeg__WEBPACK_IMPORTED_MODULE_1__["default"],
        style: {
          height: 47
        }
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("br", {}), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("b", {
        children: "Horarios:"
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("br", {}), "8:00am a 21:00 hrs lunes a viernes ", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("br", {}), "9:00am a 18:00 hrs S\xE1bados, domingos y festivos ", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("br", {}), "Telefono: +56 2 2437 0237"]
    })]
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (StoreRetire);

/***/ }),

/***/ "./resources/react/webapp/pages/public/CheckOut/GrantUser.js":
/*!*******************************************************************!*\
  !*** ./resources/react/webapp/pages/public/CheckOut/GrantUser.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var _context_AuthProvider__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../context/AuthProvider */ "./resources/react/webapp/context/AuthProvider/index.js");
/* harmony import */ var _helpers_GlobalUtils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../helpers/GlobalUtils */ "./resources/react/webapp/helpers/GlobalUtils.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

// import ReactDOM from 'react-dom';
// import Step from "../../../components/shopping/Step";
// import {Link} from "react-router-dom";
// import PUBLIC_ROUTES from "../../../routes/publicRoutes";
// import {ModalAuthMode} from "../../../Globals";




var GrantUser = function GrantUser(_ref) {
  var setView = _ref.setView;
  var _useContext = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(_context_AuthProvider__WEBPACK_IMPORTED_MODULE_1__.AuthContext),
    login = _useContext.login;
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)({
      email: '',
      password: ''
    }),
    _useState2 = _slicedToArray(_useState, 2),
    data = _useState2[0],
    setData = _useState2[1];
  var handleData = function handleData(e) {
    setData(_objectSpread(_objectSpread({}, data), {}, _defineProperty({}, e.target.name, e.target.value)));
  };
  var doLogin = function doLogin() {
    login(data, true);
  };
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("div", {
    className: "panel panel-cart mb-3",
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("div", {
      className: "panel-body",
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("div", {
        className: "row",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("div", {
          className: "col-12 col-md-12 col-lg-6 pb-5",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("h3", {
            className: "font-poppins font-14 bold color-2A317F",
            children: "Iniciar Sesi\xF3n"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("div", {
            className: "row",
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("div", {
              className: "col-md-12",
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("div", {
                className: "form-group",
                children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("label", {
                  htmlFor: "email",
                  children: "E-Mail"
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("input", {
                  type: "email",
                  className: "form-control form-control-custom",
                  id: "email",
                  name: "email",
                  placeholder: "hola@email.com",
                  onChange: handleData,
                  onFocus: _helpers_GlobalUtils__WEBPACK_IMPORTED_MODULE_2__.setCleanInputError
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("div", {
                  className: "invalid-feedback"
                })]
              })
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("div", {
              className: "col-md-12",
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("div", {
                className: "form-group mb-1",
                children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("label", {
                  htmlFor: "password",
                  children: "Contrase\xF1a"
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("input", {
                  type: "password",
                  className: "form-control form-control-custom",
                  id: "password",
                  name: "password",
                  placeholder: "*********",
                  onChange: handleData,
                  onFocus: _helpers_GlobalUtils__WEBPACK_IMPORTED_MODULE_2__.setCleanInputError
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("div", {
                  className: "invalid-feedback"
                })]
              })
            })]
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("div", {
            className: "py-3",
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("button", {
              className: "btn btn-bicolor btn-block",
              onClick: function onClick() {
                return doLogin();
              },
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("span", {
                children: "INICIAR SESI\xD3N"
              })
            })
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("div", {
            className: "row",
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("div", {
              className: "col-6 col-sm",
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("button", {
                type: "button",
                className: "link",
                onClick: function onClick() {
                  return setView('user-form');
                },
                children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("span", {
                  className: "font-12",
                  children: "Recuperar contrase\xF1a"
                })
              })
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("div", {
              className: "col-6 col-sm-auto text-right",
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("button", {
                type: "button",
                className: "link",
                onClick: function onClick() {
                  return setView('user-form');
                },
                children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("span", {
                  className: "font-12",
                  children: "Crear cuenta"
                })
              })
            })]
          })]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("div", {
          className: "col-12 col-md-12 col-lg-6",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("h3", {
            className: "font-poppins font-14 bold color-2A317F",
            children: "Compra sin registro"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("p", {
            className: "font-poppins font-12 regular color-484848 mb-0",
            children: "Puedes compra sin guardar tus datos, registrarse es opcional."
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("div", {
            className: "py-3",
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("button", {
              className: "btn btn-bicolor btn-block",
              onClick: function onClick() {
                return setView('user-form');
              },
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("span", {
                children: "CONTINUAR COMO INVITADO"
              })
            })
          })]
        })]
      })
    })
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (GrantUser);

/***/ }),

/***/ "./resources/react/webapp/pages/public/CheckOut/HandleResponse.js":
/*!************************************************************************!*\
  !*** ./resources/react/webapp/pages/public/CheckOut/HandleResponse.js ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var _Payment_Success__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Payment/Success */ "./resources/react/webapp/pages/public/CheckOut/Payment/Success.js");
/* harmony import */ var _Payment_Error__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Payment/Error */ "./resources/react/webapp/pages/public/CheckOut/Payment/Error.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");




var HandleResponse = function HandleResponse(_ref) {
  var webpayProccessSuccess = _ref.webpayProccessSuccess,
    orderId = _ref.orderId,
    productCount = _ref.productCount,
    files = _ref.files,
    prescriptionRadio = _ref.prescriptionRadio,
    withoutPrescriptionAnswer = _ref.withoutPrescriptionAnswer;
  return webpayProccessSuccess ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_Payment_Success__WEBPACK_IMPORTED_MODULE_1__["default"], {
    orderId: orderId,
    productCount: productCount,
    files: files,
    prescriptionRadio: prescriptionRadio,
    withoutPrescriptionAnswer: withoutPrescriptionAnswer
  }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_Payment_Error__WEBPACK_IMPORTED_MODULE_2__["default"], {});
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (HandleResponse);

/***/ }),

/***/ "./resources/react/webapp/pages/public/CheckOut/Header.js":
/*!****************************************************************!*\
  !*** ./resources/react/webapp/pages/public/CheckOut/Header.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var _components_general_Icon__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../components/general/Icon */ "./resources/react/webapp/components/general/Icon.js");
/* harmony import */ var _assets_images_logo_full_svg__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../assets/images/logo-full.svg */ "./resources/react/webapp/assets/images/logo-full.svg");
/* harmony import */ var _assets_images_cardioLogo_svg__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../assets/images/cardioLogo.svg */ "./resources/react/webapp/assets/images/cardioLogo.svg");
/* harmony import */ var _assets_images_oxfar_svg__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../assets/images/oxfar.svg */ "./resources/react/webapp/assets/images/oxfar.svg");
/* harmony import */ var _assets_images_bioequivalente_png__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../assets/images/bioequivalente.png */ "./resources/react/webapp/assets/images/bioequivalente.png");
/* harmony import */ var _components_shopping_StepResponsive__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../components/shopping/StepResponsive */ "./resources/react/webapp/components/shopping/StepResponsive.js");
/* harmony import */ var _context_AppProvider__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../context/AppProvider */ "./resources/react/webapp/context/AppProvider/index.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }










var Header = function Header(_ref) {
  var showFinal = _ref.showFinal;
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(_assets_images_logo_full_svg__WEBPACK_IMPORTED_MODULE_2__["default"]),
    _useState2 = _slicedToArray(_useState, 2),
    logo = _useState2[0],
    setLogo = _useState2[1];
  var _useContext = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(_context_AppProvider__WEBPACK_IMPORTED_MODULE_7__.AppContext),
    currentStore = _useContext.currentStore;
  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)({
      one: false,
      two: false,
      three: false
    }),
    _useState4 = _slicedToArray(_useState3, 2),
    ready = _useState4[0],
    setReady = _useState4[1];
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    switch (currentStore) {
      case "cardio":
        setLogo(_assets_images_cardioLogo_svg__WEBPACK_IMPORTED_MODULE_3__["default"]);
        break;
      case "anticonceptivo":
        setLogo(_assets_images_logo_full_svg__WEBPACK_IMPORTED_MODULE_2__["default"]);
        break;
      case "bioequivalente":
        setLogo(_assets_images_bioequivalente_png__WEBPACK_IMPORTED_MODULE_5__["default"]);
        break;
      default:
        setLogo(_assets_images_oxfar_svg__WEBPACK_IMPORTED_MODULE_4__["default"]);
        break;
    }
  }, []);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    if (showFinal !== 1) {
      setReady({
        one: true,
        two: false,
        three: false
      });
    } else {
      setReady({
        one: false,
        two: false,
        three: false
      });
    }
  }, [showFinal]);
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("div", {
    className: "row pb-4",
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("div", {
      className: "col-md-12 col-lg pb-3 pb-lg-0 d-none d-md-flex",
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("div", {
        className: "my-auto",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_components_general_Icon__WEBPACK_IMPORTED_MODULE_1__["default"], {
          path: logo,
          style: {
            width: "100%",
            maxHeight: "47px"
          }
        })
      })
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("div", {
      className: "col-md-12 col-lg-auto",
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("div", {
        className: "row justify-content-md-start justify-content-end",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("div", {
          className: "col col-md-auto py-1 px-0 px-md-3",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_components_shopping_StepResponsive__WEBPACK_IMPORTED_MODULE_6__["default"], {
            title: "DATOS PERSONALES",
            number: "1",
            disabled: false,
            isHeader: true,
            isReady: ready.one
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("div", {
            className: "step-back-line step-back-line-first"
          })]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("div", {
          className: "col col-md-auto py-1 px-0 px-md-3",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_components_shopping_StepResponsive__WEBPACK_IMPORTED_MODULE_6__["default"], {
            title: "DATOS DE ENV\xCDO",
            number: "2",
            disabled: !ready.one,
            isHeader: true,
            isReady: ready.two
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("div", {
            className: "step-back-line"
          })]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("div", {
          className: "col col-md-auto py-1 px-0 px-md-3",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_components_shopping_StepResponsive__WEBPACK_IMPORTED_MODULE_6__["default"], {
            title: "PAGO",
            number: "3",
            disabled: true,
            isHeader: true,
            isReady: ready.three
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("div", {
            className: "step-back-line step-back-line-last"
          })]
        })]
      })
    })]
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Header);

/***/ }),

/***/ "./resources/react/webapp/pages/public/CheckOut/Payment/Error.js":
/*!***********************************************************************!*\
  !*** ./resources/react/webapp/pages/public/CheckOut/Payment/Error.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var _routes_publicRoutes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../routes/publicRoutes */ "./resources/react/webapp/routes/publicRoutes.js");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/esm/react-router-dom.js");
/* harmony import */ var _components_general_Icon__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../components/general/Icon */ "./resources/react/webapp/components/general/Icon.js");
/* harmony import */ var _assets_images_icons_close_circle_outline_svg__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../assets/images/icons/close-circle-outline.svg */ "./resources/react/webapp/assets/images/icons/close-circle-outline.svg");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");







var Error = function Error() {
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
    className: "row pb-5",
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
      className: "col-md-8 offset-md-2",
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
        className: "panel",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
          className: "panel-body text-center panel-bordered",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
            className: "text-center mb-3",
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_components_general_Icon__WEBPACK_IMPORTED_MODULE_2__["default"], {
              path: _assets_images_icons_close_circle_outline_svg__WEBPACK_IMPORTED_MODULE_3__["default"]
            })
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("span", {
            className: "bold font-poppins font-26 d-block",
            children: "Lo sentimos"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("span", {
            className: "light font-poppins font-22",
            children: "La transacci\xF3n no pudo realizarse."
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
            className: "row",
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
              className: "col-md-4 offset-md-4 mt-5",
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(react_router_dom__WEBPACK_IMPORTED_MODULE_5__.Link, {
                to: _routes_publicRoutes__WEBPACK_IMPORTED_MODULE_1__["default"].CART.path,
                className: "btn btn-bicolor btn-block d-flex",
                children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("span", {
                  className: "m-auto font-poppins font-14 bold",
                  children: "VOLVER A INTENTAR"
                })
              })
            })
          })]
        })
      })
    })
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Error);

/***/ }),

/***/ "./resources/react/webapp/pages/public/CheckOut/Payment/Success.js":
/*!*************************************************************************!*\
  !*** ./resources/react/webapp/pages/public/CheckOut/Payment/Success.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var _routes_publicRoutes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../routes/publicRoutes */ "./resources/react/webapp/routes/publicRoutes.js");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/esm/react-router-dom.js");
/* harmony import */ var _components_general_Icon__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../components/general/Icon */ "./resources/react/webapp/components/general/Icon.js");
/* harmony import */ var _assets_images_icons_checkmark_circle_outline_svg__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../assets/images/icons/checkmark-circle-outline.svg */ "./resources/react/webapp/assets/images/icons/checkmark-circle-outline.svg");
/* harmony import */ var _Services__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../Services */ "./resources/react/webapp/Services.js");
/* harmony import */ var _helpers_GlobalUtils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../helpers/GlobalUtils */ "./resources/react/webapp/helpers/GlobalUtils.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _components_customHooks_UseGoogleAnalyticsEcommerce__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../../components/customHooks/UseGoogleAnalyticsEcommerce */ "./resources/react/webapp/components/customHooks/UseGoogleAnalyticsEcommerce.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }











var Success = function Success(_ref) {
  var _order$delivery_addre, _order$comments;
  var orderId = _ref.orderId,
    files = _ref.files,
    productCount = _ref.productCount,
    prescriptionRadio = _ref.prescriptionRadio,
    withoutPrescriptionAnswer = _ref.withoutPrescriptionAnswer;
  var _useGoogleAnalyticsEc = (0,_components_customHooks_UseGoogleAnalyticsEcommerce__WEBPACK_IMPORTED_MODULE_7__["default"])(),
    addTransaction = _useGoogleAnalyticsEc.addTransaction,
    addItems = _useGoogleAnalyticsEc.addItems,
    transaction = _useGoogleAnalyticsEc.transaction,
    items = _useGoogleAnalyticsEc.items,
    send = _useGoogleAnalyticsEc.send;
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)({
      id: ''
    }),
    _useState2 = _slicedToArray(_useState, 2),
    order = _useState2[0],
    setOrder = _useState2[1];
  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(true),
    _useState4 = _slicedToArray(_useState3, 2),
    load = _useState4[0],
    setLoad = _useState4[1];
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    getData();
  }, []);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    if (transaction.id && items.length) {
      // console.log('useEffect send GA !');
      send();
    }
  }), [items, transaction];
  var getData = function getData() {
    var url = _Services__WEBPACK_IMPORTED_MODULE_4__.ENDPOINT.NO_AUTH.CHECKOUT.GET_ORDER;
    var formData = new FormData();
    formData.append('product_count', productCount);
    formData.append('order_id', orderId);
    formData.append('prescription_radio', productCount > 0 ? prescriptionRadio : null);
    formData.append('without_prescription_answer', withoutPrescriptionAnswer);
    var fileList = _toConsumableArray(files);
    for (var i = 0; i < fileList.length; i++) {
      formData.append('attachments[]', fileList[i]);
      formData.append('productIds[]', fileList[i].product_id);
    }
    var config = {
      headers: {
        'content-type': 'multipart/form-data'
      }
    };
    _Services__WEBPACK_IMPORTED_MODULE_4__.DoPost(url, formData, config).then(function (response) {
      _Services__WEBPACK_IMPORTED_MODULE_4__.Response({
        response: response,
        success: function success() {
          setOrder(response.data.order);
          setLoad(false);
          addTransaction({
            'id': response.data.order.id,
            'affiliation': 'Anticonceptivo',
            'revenue': response.data.order.subtotal,
            'shipping': response.data.order.dispatch,
            'tax': response.data.order.subtotal * 0.19
          });
          addItems(response.data.order.order_items);
        }
      });
    })["catch"](function (error) {
      _Services__WEBPACK_IMPORTED_MODULE_4__.ErrorCatch(error);
    });
  };
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("div", {
    className: "row pb-5",
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("div", {
      className: "col-md-8 offset-md-2",
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("div", {
        className: "panel",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("div", {
          className: "panel-body panel-bordered",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("div", {
            className: "text-center mb-3",
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_components_general_Icon__WEBPACK_IMPORTED_MODULE_2__["default"], {
              path: _assets_images_icons_checkmark_circle_outline_svg__WEBPACK_IMPORTED_MODULE_3__["default"]
            })
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("div", {
            className: "text-center mb-5",
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("span", {
              className: "bold font-poppins font-26 d-block",
              children: "Pago Aprobado"
            })
          }), !load ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("div", {
              className: "row",
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("div", {
                className: "col-md-12",
                children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("span", {
                  className: "font-poppins font-18 regular color-005A86",
                  children: ["Pedido n\xFAmero ", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("span", {
                    className: "bold",
                    children: order.id
                  })]
                })
              })
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("div", {
              style: {
                marginBottom: "20px"
              },
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("table", {
                className: "table table-responsive",
                children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("thead", {
                  children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("tr", {
                    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("th", {
                      colSpan: "2",
                      className: "bold text-center",
                      style: {
                        marginBottom: "20px"
                      },
                      children: "DATOS DEL CLIENTE"
                    })
                  })
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("tbody", {
                  children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("tr", {
                    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("td", {
                      className: "bold w-25",
                      children: "NOMBRE"
                    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("td", {
                      children: order.customer.full_name
                    })]
                  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("tr", {
                    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("td", {
                      className: "bold w-25",
                      children: "EMAIL"
                    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("td", {
                      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("a", {
                        className: "text-info",
                        href: "mailto:",
                        target: "_blank",
                        children: order.customer.email
                      })
                    })]
                  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("tr", {
                    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("td", {
                      className: "bold w-25",
                      children: "TEL\xC9FONO"
                    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("td", {
                      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("a", {
                        className: "text-info",
                        href: "tel:+56",
                        target: "_blank",
                        children: ["+56", order.customer.phone]
                      })
                    })]
                  })]
                })]
              })
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("div", {
              style: {
                marginBottom: "20px"
              },
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("table", {
                className: "table table-responsive",
                style: {
                  marginBottom: "20px"
                },
                children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("thead", {
                  children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("tr", {
                    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("th", {
                      colSpan: "5",
                      className: "bold text-center",
                      children: "DATOS DEL PEDIDO"
                    })
                  })
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("tbody", {
                  children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("tr", {
                    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("td", {
                      className: "bold w-25",
                      children: "FECHA"
                    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("td", {
                      colSpan: "4",
                      children: moment__WEBPACK_IMPORTED_MODULE_6___default()(order.updated_at).format('DD/MM/YYYY')
                    })]
                  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("tr", {
                    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("td", {
                      className: "bold w-25",
                      children: "M\xC9TODO DE PAGO"
                    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("td", {
                      colSpan: "4",
                      children: order.payment_type
                    })]
                  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("tr", {
                    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("td", {
                      className: "bold w-25",
                      children: "DIRECCI\xD3N"
                    }), order.delivery_address == "Retiro en Tienda" ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("td", {
                      colSpan: "4",
                      children: "Antonio Bellet 147, Providencia"
                    }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("td", {
                      colSpan: "4",
                      children: (_order$delivery_addre = order.delivery_address) !== null && _order$delivery_addre !== void 0 ? _order$delivery_addre : 'Dirección no registrada'
                    })]
                  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("tr", {
                    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("td", {
                      className: "bold w-25",
                      children: "COMENTARIO DE DIRECCI\xD3N"
                    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("td", {
                      colSpan: "4",
                      children: (_order$comments = order.comments) !== null && _order$comments !== void 0 ? _order$comments : 'Sin comentario'
                    })]
                  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("tr", {
                    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("td", {
                      className: "bold w-25",
                      children: "SUBTOTAL"
                    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("td", {
                      className: "bold w-25",
                      children: "ENV\xCDO"
                    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("td", {
                      className: "bold w-25",
                      children: "DESC."
                    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("td", {
                      className: "bold w-25",
                      children: "TOTAL"
                    })]
                  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("tr", {
                    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("td", {
                      className: " w-25",
                      children: (0,_helpers_GlobalUtils__WEBPACK_IMPORTED_MODULE_5__.formatMoney)(order.subtotal)
                    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("td", {
                      className: " w-25",
                      children: (0,_helpers_GlobalUtils__WEBPACK_IMPORTED_MODULE_5__.formatMoney)(order.dispatch)
                    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("td", {
                      className: " w-25",
                      children: (0,_helpers_GlobalUtils__WEBPACK_IMPORTED_MODULE_5__.formatMoney)(order.discount)
                    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("td", {
                      className: " w-25",
                      children: (0,_helpers_GlobalUtils__WEBPACK_IMPORTED_MODULE_5__.formatMoney)(order.total)
                    })]
                  })]
                })]
              })
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("div", {
              style: {
                marginBottom: "20px"
              },
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("table", {
                className: "table table-responsive",
                children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("thead", {
                  children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("tr", {
                    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("th", {
                      colSpan: "5",
                      className: "bold text-center",
                      style: {
                        marginBottom: "20px"
                      },
                      children: "DETALLE DEL PEDIDO"
                    })
                  })
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("tbody", {
                  children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("tr", {
                    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("td", {
                      className: "bold",
                      children: "PRODUCTO"
                    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("td", {
                      className: "bold",
                      children: "P. UNI."
                    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("td", {
                      className: "bold",
                      children: "CANT."
                    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("td", {
                      className: "bold",
                      children: "SUBTOTAL"
                    })]
                  }), order.order_items.map(function (item) {
                    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("tr", {
                      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("td", {
                        children: [item.name, item.subscription_plan_id != null ? '(suscripción)' : '']
                      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("td", {
                        className: "text-right",
                        children: (0,_helpers_GlobalUtils__WEBPACK_IMPORTED_MODULE_5__.formatMoney)(item.subscription_plan_id != null ? item.subtotal : item.price)
                      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("td", {
                        style: {
                          textAlign: "center"
                        },
                        children: item.subscription_plan_id != null ? item.subscription_plan.months + ' Ciclos' : item.quantity
                      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("td", {
                        className: "text-right",
                        children: (0,_helpers_GlobalUtils__WEBPACK_IMPORTED_MODULE_5__.formatMoney)(item.subscription_plan_id != null ? item.subtotal : item.price * item.quantity)
                      })]
                    });
                  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("tr", {
                    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("td", {
                      colSpan: "1"
                    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("td", {
                      colSpan: "2",
                      className: "text-right",
                      children: "SUBTOTAL"
                    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("td", {
                      className: "text-right",
                      children: [" ", (0,_helpers_GlobalUtils__WEBPACK_IMPORTED_MODULE_5__.formatMoney)(order.subtotal)]
                    })]
                  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("tr", {
                    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("td", {
                      colSpan: "1",
                      style: {
                        border: "none"
                      }
                    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("td", {
                      colSpan: "2",
                      className: "text-right",
                      children: "ENV\xCDO"
                    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("td", {
                      className: "bold w-25 text-right",
                      children: [" ", (0,_helpers_GlobalUtils__WEBPACK_IMPORTED_MODULE_5__.formatMoney)(order.dispatch)]
                    })]
                  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("tr", {
                    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("td", {
                      colSpan: "1",
                      style: {
                        border: "none"
                      }
                    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("td", {
                      colSpan: "2",
                      className: "text-right",
                      children: "DESCUENTO"
                    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("td", {
                      className: "bold w-25 text-right",
                      children: [" ", (0,_helpers_GlobalUtils__WEBPACK_IMPORTED_MODULE_5__.formatMoney)(order.discount)]
                    })]
                  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("tr", {
                    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("td", {
                      colSpan: "1",
                      style: {
                        border: "none"
                      }
                    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("td", {
                      colSpan: "2",
                      className: "text-right",
                      children: "TOTAL"
                    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("td", {
                      className: "bold w-25 text-right",
                      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("b", {
                        children: [" ", (0,_helpers_GlobalUtils__WEBPACK_IMPORTED_MODULE_5__.formatMoney)(order.total)]
                      })
                    })]
                  })]
                })]
              })
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("div", {
              className: "row",
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("div", {
                className: "col-md-4 offset-md-4 mt-5",
                children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(react_router_dom__WEBPACK_IMPORTED_MODULE_9__.Link, {
                  to: _routes_publicRoutes__WEBPACK_IMPORTED_MODULE_1__["default"].HOME.path,
                  className: "btn btn-bicolor btn-block d-flex",
                  children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("span", {
                    className: "m-auto font-poppins font-14 bold",
                    children: "VOLVER A COMPRAR"
                  })
                })
              })
            })]
          }) : null]
        })
      })
    })
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Success);

/***/ }),

/***/ "./resources/react/webapp/pages/public/CheckOut/Payment/WaitingPayment.js":
/*!********************************************************************************!*\
  !*** ./resources/react/webapp/pages/public/CheckOut/Payment/WaitingPayment.js ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-bootstrap */ "./node_modules/react-bootstrap/esm/Modal.js");
/* harmony import */ var react_loadingg__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-loadingg */ "./node_modules/react-loadingg/lib/index.js");
/* harmony import */ var _routes_publicRoutes__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../routes/publicRoutes */ "./resources/react/webapp/routes/publicRoutes.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");







var WaitingPayment = function WaitingPayment(_ref) {
  var showingWaitingPayment = _ref.showingWaitingPayment;
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["default"], {
    show: showingWaitingPayment,
    centered: true,
    backdrop: "static",
    keyboard: false
    //    onHide={hideWaitingPayment}
    ,
    dialogClassName: "modal-waiting-payment",
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["default"].Body, {
      className: "px-5 pb-0",
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("div", {
        className: "row",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("div", {
          className: "col-md-12 text-center mt-4",
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("h3", {
            className: "modal-title",
            children: "Proceso de pago"
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("div", {
          className: "col-md-12 text-center font-poppins font-14 regular color-6C6B6B pt-2",
          children: "Por favor espere a que se inicie proceso de pago."
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("div", {
          className: "col-md-12 my-5",
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(react_loadingg__WEBPACK_IMPORTED_MODULE_1__.WaveTopBottomLoading, {
            color: "#0869A6",
            speed: 2,
            size: "small"
          })
        })]
      })
    })
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (WaitingPayment);

/***/ }),

/***/ "./resources/react/webapp/pages/public/CheckOut/Payment/WaitingPaymentMethod.js":
/*!**************************************************************************************!*\
  !*** ./resources/react/webapp/pages/public/CheckOut/Payment/WaitingPaymentMethod.js ***!
  \**************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-bootstrap */ "./node_modules/react-bootstrap/esm/Modal.js");
/* harmony import */ var react_loadingg__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-loadingg */ "./node_modules/react-loadingg/lib/index.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");





var WaitingPaymentMethod = function WaitingPaymentMethod(_ref) {
  var showingWaitingPaymentMethod = _ref.showingWaitingPaymentMethod;
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["default"], {
    show: showingWaitingPaymentMethod,
    centered: true,
    backdrop: "static",
    keyboard: false
    //    onHide={hideWaitingPaymentMethod}
    ,
    dialogClassName: "modal-waiting-payment",
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["default"].Body, {
      className: "px-5 pb-0",
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("div", {
        className: "row",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("div", {
          className: "col-md-12 text-center mt-4",
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("h3", {
            className: "modal-title",
            children: "Procesando ingreso de tarjeta"
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("div", {
          className: "col-md-12 text-center font-poppins font-14 regular color-6C6B6B pt-2",
          children: "Espere un momento por favor ..."
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("div", {
          className: "col-md-12 my-5",
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(react_loadingg__WEBPACK_IMPORTED_MODULE_1__.WaveTopBottomLoading, {
            color: '#0869A6',
            speed: 2,
            size: 'small'
          })
        })]
      })
    })
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (WaitingPaymentMethod);

/***/ }),

/***/ "./resources/react/webapp/pages/public/CheckOut/Payment/WebPayProccess.js":
/*!********************************************************************************!*\
  !*** ./resources/react/webapp/pages/public/CheckOut/Payment/WebPayProccess.js ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var _Services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../Services */ "./resources/react/webapp/Services.js");
/* harmony import */ var _context_AuthProvider__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../context/AuthProvider */ "./resources/react/webapp/context/AuthProvider/index.js");
/* harmony import */ var _context_CartProvider__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../context/CartProvider */ "./resources/react/webapp/context/CartProvider/index.js");
/* harmony import */ var _WaitingPayment__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./WaitingPayment */ "./resources/react/webapp/pages/public/CheckOut/Payment/WaitingPayment.js");
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! sweetalert2 */ "./node_modules/sweetalert2/dist/sweetalert2.all.js");
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(sweetalert2__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _routes_publicRoutes__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../routes/publicRoutes */ "./resources/react/webapp/routes/publicRoutes.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }









var WebPayProccess = function WebPayProccess(_ref) {
  var data = _ref.data,
    address = _ref.address,
    subscription = _ref.subscription,
    subscriptionId = _ref.subscriptionId,
    total = _ref.total,
    subtotal = _ref.subtotal,
    dispatch = _ref.dispatch,
    discount = _ref.discount,
    discountType = _ref.discountType,
    discountCode = _ref.discountCode,
    installment = _ref.installment,
    customerId = _ref.customerId,
    prescriptionRadio = _ref.prescriptionRadio,
    withoutPrescriptionAnswer = _ref.withoutPrescriptionAnswer,
    files = _ref.files;
  var _useContext = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(_context_AuthProvider__WEBPACK_IMPORTED_MODULE_2__.AuthContext),
    auth = _useContext.auth;
  var _useContext2 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(_context_CartProvider__WEBPACK_IMPORTED_MODULE_3__.CartContext),
    cartItems = _useContext2.cartItems,
    clearCart = _useContext2.clearCart;
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
    _useState2 = _slicedToArray(_useState, 2),
    showingWaitingPayment = _useState2[0],
    setShowingWaitingPayment = _useState2[1];
  var showWaitingPayment = function showWaitingPayment() {
    setShowingWaitingPayment(true);
  };
  var hideWaitingPayment = function hideWaitingPayment() {
    setShowingWaitingPayment(false);
  };
  var initPayment = function initPayment() {
    showWaitingPayment();
    create();
  };
  var initPayment2 = function initPayment2() {
    showWaitingPayment();
    create2();
  };
  var create2 = function create2() {
    var selectedSubscription = null;
    subscription.map(function (element) {
      if (element.id === subscriptionId) {
        selectedSubscription = element;
      }
      if (selectedSubscription === null && element.default_subscription) {
        selectedSubscription = element;
      }
    });
    showWaitingPayment();
    var url = _Services__WEBPACK_IMPORTED_MODULE_1__.ENDPOINT.PAYMENTS.WEBPAY.CREATE_TRANSACTION2;
    var dataForm = _objectSpread(_objectSpread(_objectSpread({}, data), address), {}, {
      subscription: JSON.stringify(selectedSubscription),
      customer_id: auth ? auth.id : customerId,
      total: total,
      discountType: discountType,
      subtotal: subtotal,
      discount: discount,
      dispatch: dispatch,
      discountCode: discountCode,
      installment: installment,
      cartItems: JSON.stringify(cartItems),
      urlFinish: window.location.href + _routes_publicRoutes__WEBPACK_IMPORTED_MODULE_6__["default"].CHECKOUT_VERIFY.path
    });
    var formData = new FormData();
    Object.entries(dataForm).forEach(function (data) {
      formData.append(data[0], data[1]);
    });
    formData.append("prescription_radio", prescriptionRadio);
    formData.append("without_prescription_answer", withoutPrescriptionAnswer);
    var fileList = _toConsumableArray(files);
    for (var i = 0; i < fileList.length; i++) {
      formData.append("attachments[]", fileList[i]);
      formData.append("productIds[]", fileList[i].product_id);
    }
    var config = {
      headers: {
        "content-type": "multipart/form-data"
      }
    };
    _Services__WEBPACK_IMPORTED_MODULE_1__.DoPost(url, formData, config).then(function (response) {
      _Services__WEBPACK_IMPORTED_MODULE_1__.Response({
        response: response,
        success: function success() {
          if (response.message == "Compra OneClick") {
            window.location.href = response.data.url;
          } else {
            var urlWebpay = response.data.getnet;
            window.location.href = urlWebpay;
          }
        },
        error: function error() {
          hideWaitingPayment();
          var swalWithBootstrapButtons = sweetalert2__WEBPACK_IMPORTED_MODULE_5___default().mixin({
            customClass: {
              confirmButton: "col-6 btn btn-bicolor btn-block",
              title: "mt-4"
            },
            buttonsStyling: false
          });
          if (response.data == "PRODUCT_ITEM") {
            swalWithBootstrapButtons.fire({
              title: '<span style="color: #0869A6;">' + response.message + "</span>",
              confirmButtonText: "Entendido"
            }).then(function (result) {
              if (result.isConfirmed) {
                // limpiar carro y volver al checkout)
                if (clearCart()) {
                  window.location.href = _routes_publicRoutes__WEBPACK_IMPORTED_MODULE_6__["default"].CART.path;
                }
              }
            });
          } else {
            swalWithBootstrapButtons.fire({
              // icon: 'error',
              title: '<span style="color: #0869A6;">' + response.message + "</span>"
            });
          }
        }
      });
    })["catch"](function (error) {
      _Services__WEBPACK_IMPORTED_MODULE_1__.ErrorCatch(error);
    });
  };
  var create = function create() {
    var selectedSubscription = null;
    subscription.map(function (element) {
      if (element.id === subscriptionId) {
        selectedSubscription = element;
      }
      if (selectedSubscription === null && element.default_subscription) {
        selectedSubscription = element;
      }
    });
    showWaitingPayment();
    var url = _Services__WEBPACK_IMPORTED_MODULE_1__.ENDPOINT.PAYMENTS.WEBPAY.CREATE_TRANSACTION;
    var dataForm = _objectSpread(_objectSpread(_objectSpread({}, data), address), {}, {
      subscription: JSON.stringify(selectedSubscription),
      customer_id: auth ? auth.id : customerId,
      total: total,
      discountType: discountType,
      subtotal: subtotal,
      discount: discount,
      dispatch: dispatch,
      discountCode: discountCode,
      installment: installment,
      cartItems: JSON.stringify(cartItems),
      urlFinish: window.location.href + _routes_publicRoutes__WEBPACK_IMPORTED_MODULE_6__["default"].CHECKOUT_VERIFY.path
    });
    var formData = new FormData();
    Object.entries(dataForm).forEach(function (data) {
      formData.append(data[0], data[1]);
    });
    formData.append("prescription_radio", prescriptionRadio);
    formData.append("without_prescription_answer", withoutPrescriptionAnswer);
    var fileList = _toConsumableArray(files);
    for (var i = 0; i < fileList.length; i++) {
      formData.append("attachments[]", fileList[i]);
      formData.append("productIds[]", fileList[i].product_id);
    }
    var config = {
      headers: {
        "content-type": "multipart/form-data"
      }
    };
    _Services__WEBPACK_IMPORTED_MODULE_1__.DoPost(url, formData, config).then(function (response) {
      _Services__WEBPACK_IMPORTED_MODULE_1__.Response({
        response: response,
        success: function success() {
          if (response.message == "Compra OneClick") {
            window.location.href = response.data.url;
          } else {
            var urlWebpay = response.data.webpay_data.url + "?token_ws=" + response.data.webpay_data.token;
            window.location.href = urlWebpay;
          }
        },
        error: function error() {
          hideWaitingPayment();
          var swalWithBootstrapButtons = sweetalert2__WEBPACK_IMPORTED_MODULE_5___default().mixin({
            customClass: {
              confirmButton: "col-6 btn btn-bicolor btn-block",
              title: "mt-4"
            },
            buttonsStyling: false
          });
          if (response.data == "PRODUCT_ITEM") {
            swalWithBootstrapButtons.fire({
              title: '<span style="color: #0869A6;">' + response.message + "</span>",
              confirmButtonText: "Entendido"
            }).then(function (result) {
              if (result.isConfirmed) {
                // limpiar carro y volver al checkout)
                if (clearCart()) {
                  window.location.href = _routes_publicRoutes__WEBPACK_IMPORTED_MODULE_6__["default"].CART.path;
                }
              }
            });
          } else {
            swalWithBootstrapButtons.fire({
              // icon: 'error',
              title: '<span style="color: #0869A6;">' + response.message + "</span>"
            });
          }
        }
      });
    })["catch"](function (error) {
      _Services__WEBPACK_IMPORTED_MODULE_1__.ErrorCatch(error);
    });
  };
  var updateDiscountCode = function updateDiscountCode(discountCode) {
    var url = _Services__WEBPACK_IMPORTED_MODULE_1__.ENDPOINT.NO_AUTH.CHECKOUT.UPDATE_DISCOUNTS;
    var data = {
      discount_code: discountCode
    };
    _Services__WEBPACK_IMPORTED_MODULE_1__.DoPost(url, data).then(function (response) {
      _Services__WEBPACK_IMPORTED_MODULE_1__.Response({
        response: response,
        success: function success() {}
      });
    })["catch"](function (error) {
      _Services__WEBPACK_IMPORTED_MODULE_1__.ErrorCatch(error);
    });
  };
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_WaitingPayment__WEBPACK_IMPORTED_MODULE_4__["default"], {
      showingWaitingPayment: showingWaitingPayment
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("div", {
      className: "col-md-12 pt-2",
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("button", {
        className: "btn btn-bicolor btn-block",
        disabled: showingWaitingPayment ? true : false,
        onClick: !showingWaitingPayment ? function () {
          return initPayment2();
        } : null,
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("span", {
          className: "font-14 px-5",
          children: "PAGAR"
        })
      })
    })]
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (WebPayProccess);

/***/ }),

/***/ "./resources/react/webapp/pages/public/CheckOut/Resume.js":
/*!****************************************************************!*\
  !*** ./resources/react/webapp/pages/public/CheckOut/Resume.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var _components_shopping_TotalCartItems__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../components/shopping/TotalCartItems */ "./resources/react/webapp/components/shopping/TotalCartItems.js");
/* harmony import */ var _Config__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../Config */ "./resources/react/webapp/Config.js");
/* harmony import */ var _components_shopping_MiniCart_ProductItem__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../components/shopping/MiniCart/ProductItem */ "./resources/react/webapp/components/shopping/MiniCart/ProductItem.js");
/* harmony import */ var _components_shopping_TotalCartPrice__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../components/shopping/TotalCartPrice */ "./resources/react/webapp/components/shopping/TotalCartPrice.js");
/* harmony import */ var _assets_images_webpayColor_svg__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../assets/images/webpayColor.svg */ "./resources/react/webapp/assets/images/webpayColor.svg");
/* harmony import */ var _assets_images_webCheckoutLogo_svg__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../assets/images/webCheckoutLogo.svg */ "./resources/react/webapp/assets/images/webCheckoutLogo.svg");
/* harmony import */ var _context_CartProvider__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../context/CartProvider */ "./resources/react/webapp/context/CartProvider/index.js");
/* harmony import */ var _context_AuthProvider__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../context/AuthProvider */ "./resources/react/webapp/context/AuthProvider/index.js");
/* harmony import */ var _components_shopping_TotalCartPriceFinal__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../components/shopping/TotalCartPriceFinal */ "./resources/react/webapp/components/shopping/TotalCartPriceFinal.js");
/* harmony import */ var _Payment_WebPayProccess__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./Payment/WebPayProccess */ "./resources/react/webapp/pages/public/CheckOut/Payment/WebPayProccess.js");
/* harmony import */ var _Services__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../Services */ "./resources/react/webapp/Services.js");
/* harmony import */ var toastr__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! toastr */ "./node_modules/toastr/toastr.js");
/* harmony import */ var toastr__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(toastr__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var react_lazy_load_image_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! react-lazy-load-image-component */ "./node_modules/react-lazy-load-image-component/build/index.js");
/* harmony import */ var react_lazy_load_image_component__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(react_lazy_load_image_component__WEBPACK_IMPORTED_MODULE_13__);
/* harmony import */ var react_lazy_load_image_component_src_effects_blur_css__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! react-lazy-load-image-component/src/effects/blur.css */ "./node_modules/react-lazy-load-image-component/src/effects/blur.css");
/* harmony import */ var _public_themes_web_assets_images_up_svg__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../../../../../../public/themes/web/assets/images/up.svg */ "./public/themes/web/assets/images/up.svg");
/* harmony import */ var _public_themes_web_assets_images_down_svg__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../../../../../../public/themes/web/assets/images/down.svg */ "./public/themes/web/assets/images/down.svg");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }




















var Resume = function Resume(_ref) {
  var showFinal = _ref.showFinal,
    data = _ref.data,
    files = _ref.files,
    address = _ref.address,
    subscription = _ref.subscription,
    subscriptionId = _ref.subscriptionId,
    total = _ref.total,
    subtotal = _ref.subtotal,
    setSubtotal = _ref.setSubtotal,
    setTotal = _ref.setTotal,
    setDispatchDateObject = _ref.setDispatchDateObject,
    installment = _ref.installment,
    validateData = _ref.validateData,
    hasAddress = _ref.hasAddress,
    view = _ref.view,
    customerId = _ref.customerId,
    updateData = _ref.updateData,
    validateDataAddressInvite = _ref.validateDataAddressInvite,
    prescriptionRadio = _ref.prescriptionRadio,
    withoutPrescriptionAnswer = _ref.withoutPrescriptionAnswer;
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(0),
    _useState2 = _slicedToArray(_useState, 2),
    dispatch = _useState2[0],
    setDispatch = _useState2[1];
  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
    _useState4 = _slicedToArray(_useState3, 2),
    showResumenCart = _useState4[0],
    setShowResumenCart = _useState4[1];
  var _useState5 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(0),
    _useState6 = _slicedToArray(_useState5, 2),
    discount = _useState6[0],
    setDiscount = _useState6[1];
  var _useState7 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(0),
    _useState8 = _slicedToArray(_useState7, 2),
    discountType = _useState8[0],
    setDiscountType = _useState8[1];
  var _useState9 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(""),
    _useState10 = _slicedToArray(_useState9, 2),
    discountCode = _useState10[0],
    setDiscountCode = _useState10[1];
  var _useContext = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(_context_CartProvider__WEBPACK_IMPORTED_MODULE_7__.CartContext),
    cartItems = _useContext.cartItems;
  var _useContext2 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(_context_AuthProvider__WEBPACK_IMPORTED_MODULE_8__.AuthContext),
    auth = _useContext2.auth;
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    var _address$commune_id;
    var url = _Services__WEBPACK_IMPORTED_MODULE_11__.ENDPOINT.PAYMENTS.GET_DISPATCH;
    var data = {
      commune_id: (_address$commune_id = address === null || address === void 0 ? void 0 : address.commune_id) !== null && _address$commune_id !== void 0 ? _address$commune_id : "RetiroTienda",
      cartItems: cartItems,
      type: address ? address.name : ""
    };
    _Services__WEBPACK_IMPORTED_MODULE_11__.DoPost(url, data).then(function (response) {
      _Services__WEBPACK_IMPORTED_MODULE_11__.Response({
        response: response,
        success: function success() {
          console.log(response.data.dateDeliveryOrder);
          setDispatch(response.data.dispatch);
          setDispatchDateObject(response.data.dateDeliveryOrder == "RetiroTienda" ? {} : response.data.dateDeliveryOrder);
        }
      });
    })["catch"](function (error) {
      _Services__WEBPACK_IMPORTED_MODULE_11__.ErrorCatch(error);
    });
  }, [address]);
  var handleDiscount = function handleDiscount(e) {
    setDiscountCode(e.target.value);
  };
  var addDiscount = function addDiscount() {
    var url = _Services__WEBPACK_IMPORTED_MODULE_11__.ENDPOINT.PAYMENTS.DISCOUNT_CODE;
    var data = {
      discount_code: discountCode
    };
    _Services__WEBPACK_IMPORTED_MODULE_11__.DoPost(url, data).then(function (response) {
      _Services__WEBPACK_IMPORTED_MODULE_11__.Response({
        response: response,
        success: function success() {
          if (response.data.discount_type === 1) {
            setDiscountType(1);
            setDiscount(response.data.discount / 100);
          } else {
            setDiscountType(0);
            setDiscount(response.data.discount);
          }
          toastr__WEBPACK_IMPORTED_MODULE_12___default().success(response.message);
        },
        warning: function warning() {
          toastr__WEBPACK_IMPORTED_MODULE_12___default().warning(response.message);
        }
      });
    })["catch"](function (error) {
      _Services__WEBPACK_IMPORTED_MODULE_11__.ErrorCatch(error);
    });
  };
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_17__.jsxs)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_17__.jsx)("div", {
      className: "panel panel-cart mb-3",
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_17__.jsxs)("div", {
        className: "panel-body",
        style: {
          paddingTop: "20px",
          paddingBottom: "20px"
        },
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_17__.jsxs)("div", {
          className: "row pointer",
          onClick: function onClick() {
            return setShowResumenCart(!showResumenCart);
          },
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_17__.jsx)("div", {
            className: "col",
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_17__.jsxs)("h3", {
              className: "font-poppins font-21 bold color-0869A6 mb-0",
              style: {
                letterSpacing: "2px"
              },
              children: ["TU CARRO", " ", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_17__.jsxs)("span", {
                className: "font-poppins font-16 regular color-6C6B6B",
                children: ["(", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_17__.jsx)(_components_shopping_TotalCartItems__WEBPACK_IMPORTED_MODULE_1__["default"], {}), ")"]
              })]
            })
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_17__.jsx)("div", {
            className: "col-auto",
            children: showResumenCart ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_17__.jsx)(react_lazy_load_image_component__WEBPACK_IMPORTED_MODULE_13__.LazyLoadImage, {
              alt: _Config__WEBPACK_IMPORTED_MODULE_2__.CONFIG.APP_NAME,
              title: "Anticonceptivo",
              rel: "nofollow",
              effect: "blur",
              src: _public_themes_web_assets_images_up_svg__WEBPACK_IMPORTED_MODULE_15__["default"]
            }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_17__.jsx)(react_lazy_load_image_component__WEBPACK_IMPORTED_MODULE_13__.LazyLoadImage, {
              alt: _Config__WEBPACK_IMPORTED_MODULE_2__.CONFIG.APP_NAME,
              title: "Anticonceptivo",
              rel: "nofollow",
              effect: "blur",
              src: _public_themes_web_assets_images_down_svg__WEBPACK_IMPORTED_MODULE_16__["default"]
            })
          })]
        }), showResumenCart ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_17__.jsx)("div", {
          className: "row mt-3",
          children: cartItems.map(function (item, index) {
            return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_17__.jsx)(_components_shopping_MiniCart_ProductItem__WEBPACK_IMPORTED_MODULE_3__["default"], {
              item: item
            }, index);
          })
        }) : null]
      })
    }), showFinal === 3 ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_17__.jsxs)("div", {
      className: "row mb-3",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_17__.jsx)("div", {
        className: "col",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_17__.jsx)("input", {
          type: "text",
          className: "form-control form-control-custom",
          placeholder: "Ingresar c\xF3digo de descuento",
          onChange: handleDiscount,
          value: discountCode
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_17__.jsx)("div", {
        className: "col-auto pl-0",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_17__.jsx)("button", {
          className: "btn btn-bicolor btn-block",
          onClick: addDiscount,
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_17__.jsx)("span", {
            children: "APLICAR"
          })
        })
      })]
    }) : null, /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_17__.jsx)("div", {
      className: "panel panel-cart mb-3",
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_17__.jsx)("div", {
        className: "panel-body",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_17__.jsxs)("div", {
          className: "row",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_17__.jsxs)("div", {
            className: "col-md-12",
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_17__.jsx)("h3", {
              className: "font-poppins font-21 bold color-0869A6 mb-0",
              style: {
                letterSpacing: "2px"
              },
              children: showFinal === 1 ? "TOTAL" : "RESUMEN DE COMPRA"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_17__.jsx)("hr", {
              className: "mb-0 pb-0"
            })]
          }), showFinal === 1 ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_17__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_17__.Fragment, {
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_17__.jsx)("div", {
              className: "col-md-12",
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_17__.jsx)(_components_shopping_TotalCartPrice__WEBPACK_IMPORTED_MODULE_4__["default"], {})
            }), view === "user-form" ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_17__.jsx)("div", {
              className: "col-md-12 mt-2",
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_17__.jsx)("button", {
                className: "btn btn-bicolor btn-block",
                disabled: cartItems.length ? false : true,
                onClick: auth ? function () {
                  return hasAddress();
                } : function () {
                  return validateData();
                },
                children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_17__.jsx)("span", {
                  className: "font-14 px-5",
                  children: "CONTINUAR"
                })
              })
            }) : null]
          }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_17__.jsxs)("div", {
            className: "col-md-12",
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_17__.jsx)(_components_shopping_TotalCartPriceFinal__WEBPACK_IMPORTED_MODULE_9__["default"], {
              discount: discount,
              discountType: discountType,
              total: total,
              setTotal: setTotal,
              subtotal: subtotal,
              setSubtotal: setSubtotal,
              dispatch: dispatch
            }), view === "add-address" ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_17__.jsx)("div", {
              className: "col-md-12 mt-2",
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_17__.jsx)("button", {
                className: "btn btn-bicolor btn-block",
                disabled: cartItems.length ? false : true,
                onClick: auth ? function () {
                  return updateData();
                } : function () {
                  return validateDataAddressInvite();
                },
                children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_17__.jsx)("span", {
                  className: "font-14 px-5",
                  children: "CONTINUAR"
                })
              })
            }) : null]
          }), showFinal === 1 || showFinal === 2 ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_17__.jsxs)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_17__.jsxs)("div", {
              className: "col-12 mt-2",
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_17__.jsx)("hr", {}), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_17__.jsx)("p", {
                className: "font-poppins font-12 regular color-484848 mb-0",
                children: "*El costo de entrega se calcular\xE1 al a\xF1adir la direcci\xF3n."
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_17__.jsx)("hr", {})]
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_17__.jsx)("div", {
              className: "col-md-12",
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_17__.jsxs)("div", {
                className: "row",
                children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_17__.jsx)("div", {
                  className: "col-md-6 ",
                  children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_17__.jsx)("h4", {
                    className: "font-poppins font-14 bold color-033F5D",
                    children: "M\xE9todos de pago"
                  })
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_17__.jsx)("div", {
                  className: "col-md-6",
                  children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_17__.jsx)(react_lazy_load_image_component__WEBPACK_IMPORTED_MODULE_13__.LazyLoadImage, {
                    alt: _Config__WEBPACK_IMPORTED_MODULE_2__.CONFIG.APP_NAME,
                    title: "Anticonceptivo",
                    rel: "nofollow",
                    effect: "blur",
                    width: "100%",
                    src: _assets_images_webCheckoutLogo_svg__WEBPACK_IMPORTED_MODULE_6__["default"]
                  })
                })]
              })
            })]
          }) : null, showFinal === 3 ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_17__.jsx)(_Payment_WebPayProccess__WEBPACK_IMPORTED_MODULE_10__["default"], {
            data: data,
            files: files,
            address: address,
            subscription: subscription,
            subscriptionId: subscriptionId,
            dispatch: dispatch,
            discount: discount,
            discountType: discountType,
            total: total,
            subtotal: subtotal,
            discountCode: discountCode,
            installment: installment,
            customerId: customerId,
            prescriptionRadio: prescriptionRadio,
            withoutPrescriptionAnswer: withoutPrescriptionAnswer
          }) : null]
        })
      })
    })]
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Resume);

/***/ }),

/***/ "./resources/react/webapp/pages/public/CheckOut/Subscriptions.js":
/*!***********************************************************************!*\
  !*** ./resources/react/webapp/pages/public/CheckOut/Subscriptions.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var _private_Account_sections_Subscriptions_List__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../private/Account/sections/Subscriptions/List */ "./resources/react/webapp/pages/private/Account/sections/Subscriptions/List.js");
/* harmony import */ var _context_AuthProvider__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../context/AuthProvider */ "./resources/react/webapp/context/AuthProvider/index.js");
/* harmony import */ var _context_CartProvider__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../context/CartProvider */ "./resources/react/webapp/context/CartProvider/index.js");
/* harmony import */ var _Services__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../Services */ "./resources/react/webapp/Services.js");
/* harmony import */ var _Payment_WaitingPaymentMethod__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Payment/WaitingPaymentMethod */ "./resources/react/webapp/pages/public/CheckOut/Payment/WaitingPaymentMethod.js");
/* harmony import */ var toastr__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! toastr */ "./node_modules/toastr/toastr.js");
/* harmony import */ var toastr__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(toastr__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }









var Subscriptions = function Subscriptions(_ref) {
  var onView = _ref.onView,
    subscription = _ref.subscription,
    setSubscription = _ref.setSubscription,
    subscriptionId = _ref.subscriptionId,
    setSubscriptionId = _ref.setSubscriptionId,
    files = _ref.files,
    withoutPrescriptionAnswer = _ref.withoutPrescriptionAnswer;
  var _useContext = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(_context_AuthProvider__WEBPACK_IMPORTED_MODULE_2__.AuthContext),
    auth = _useContext.auth;
  var _useContext2 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(_context_CartProvider__WEBPACK_IMPORTED_MODULE_3__.CartContext),
    saveDataForStepTwo = _useContext2.saveDataForStepTwo,
    dataForStepTwo = _useContext2.dataForStepTwo;
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)('list'),
    _useState2 = _slicedToArray(_useState, 2),
    view = _useState2[0],
    setViewAd = _useState2[1];
  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
    _useState4 = _slicedToArray(_useState3, 2),
    showingWaitingPaymentMethod = _useState4[0],
    setShowingWaitingPaymentMethod = _useState4[1];
  var showWaitingPaymentMethod = function showWaitingPaymentMethod() {
    setShowingWaitingPaymentMethod(true);
  };
  var hideWaitingPaymentMethod = function hideWaitingPaymentMethod() {
    setShowingWaitingPaymentMethod(false);
  };
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    if (auth) {
      getData();
    }
  }, [auth]);
  var getData = function getData() {
    var url = _Services__WEBPACK_IMPORTED_MODULE_4__.ENDPOINT.CUSTOMER.SUBSCRIPTIONS.GET;
    var data = {
      customer_id: auth ? auth.id : null
    };
    _Services__WEBPACK_IMPORTED_MODULE_4__.DoPost(url, data).then(function (response) {
      _Services__WEBPACK_IMPORTED_MODULE_4__.Response({
        response: response,
        success: function success() {
          setSubscription(response.data.subscriptions);
        }
      });
    })["catch"](function (error) {
      _Services__WEBPACK_IMPORTED_MODULE_4__.ErrorCatch(error);
    });
  };
  var showCreate = function showCreate() {
    var url = _Services__WEBPACK_IMPORTED_MODULE_4__.ENDPOINT.PAYMENTS.WEBPAY.CREATE_SUBSCRIPTION;
    var fileList = _toConsumableArray(files);
    var formData = new FormData();
    for (var i = 0; i < fileList.length; i++) {
      formData.append('attachments[]', fileList[i]);
      formData.append('productIds[]', fileList[i].product_id);
      formData.append('nameIds[]', fileList[i].name_id);
    }
    formData.append('customer_id', auth ? auth.id : null);
    formData.append('email', auth ? auth.email : null);
    formData.append('from', 'checkout');
    var config = {
      headers: {
        'content-type': 'multipart/form-data'
      }
    };
    _Services__WEBPACK_IMPORTED_MODULE_4__.DoPost(url, formData, config).then(function (response) {
      _Services__WEBPACK_IMPORTED_MODULE_4__.Response({
        response: response,
        success: function success() {
          saveDataForStepTwo(_objectSpread(_objectSpread({}, dataForStepTwo), {}, {
            view: onView,
            withoutPrescriptionAnswer: withoutPrescriptionAnswer
          }));
          localStorage.setItem('tryingToSubscribeCard', true);
          var urlOneClick = response.data.oneclick_data.url + '?TBK_TOKEN=' + response.data.oneclick_data.token;
          window.location.href = urlOneClick;
        }
      });
    })["catch"](function (error) {
      _Services__WEBPACK_IMPORTED_MODULE_4__.ErrorCatch(error);
    });
  };
  var interval;
  var runVerifyPaymentMethod = function runVerifyPaymentMethod(id) {
    verifyPaymentMethod(id);
    interval = setInterval(function () {
      verifyPaymentMethod(id);
    }, 5000);
  };
  var verifyPaymentMethod = function verifyPaymentMethod(id) {
    var data = {
      id: id
    };
    var url = _Services__WEBPACK_IMPORTED_MODULE_4__.ENDPOINT.PAYMENTS.VERIFY_SUBSCRIPTION;
    _Services__WEBPACK_IMPORTED_MODULE_4__.DoPost(url, data).then(function (response) {
      _Services__WEBPACK_IMPORTED_MODULE_4__.Response({
        response: response,
        success: function success() {
          if (response.data.subscription != null) {
            if (response.data.subscription.status == 'CREATED') {
              hideWaitingPaymentMethod();
              clearInterval(interval);
              toastr__WEBPACK_IMPORTED_MODULE_6___default().success(response.message);
              getData();
            } else if (response.data.subscription.status == 'REJECTED') {
              hideWaitingPaymentMethod();
              clearInterval(interval);
              toastr__WEBPACK_IMPORTED_MODULE_6___default().error('Tarjeta Rechazada');
            } else if (response.data.subscription.status == 'CANCELED') {
              hideWaitingPaymentMethod();
              clearInterval(interval);
              toastr__WEBPACK_IMPORTED_MODULE_6___default().error('Cancelado');
            }
          }
        },
        error: function error() {
          console.log(response.message);
        }
      });
    })["catch"](function (error) {
      _Services__WEBPACK_IMPORTED_MODULE_4__.ErrorCatch(error);
    });
  };
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("div", {
      className: "panel panel-cart mb-3",
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)("div", {
        className: "panel-body",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("h3", {
          className: "font-poppins font-16 bold color-033F5D",
          children: "Confirma tu m\xE9todo de pago o agrega uno nuevo"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_Payment_WaitingPaymentMethod__WEBPACK_IMPORTED_MODULE_5__["default"], {
          showingWaitingPaymentMethod: showingWaitingPaymentMethod
        }), view === 'list' ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_private_Account_sections_Subscriptions_List__WEBPACK_IMPORTED_MODULE_1__["default"], {
          subscriptions: auth ? subscription : subscription,
          showCreate: showCreate,
          getData: getData,
          setSubscription: setSubscription,
          subscriptionId: subscriptionId,
          setSubscriptionId: setSubscriptionId
        }) : null]
      })
    })
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Subscriptions);

/***/ }),

/***/ "./resources/react/webapp/pages/public/CheckOut/UserForm.js":
/*!******************************************************************!*\
  !*** ./resources/react/webapp/pages/public/CheckOut/UserForm.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var _private_Account_sections_PersonalInfo_FormPersonalData__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../private/Account/sections/PersonalInfo/FormPersonalData */ "./resources/react/webapp/pages/private/Account/sections/PersonalInfo/FormPersonalData.js");
/* harmony import */ var _helpers_GlobalUtils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../helpers/GlobalUtils */ "./resources/react/webapp/helpers/GlobalUtils.js");
/* harmony import */ var w2_rut_validator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! w2-rut-validator */ "./node_modules/w2-rut-validator/index.js");
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! react-bootstrap */ "./node_modules/react-bootstrap/esm/Form.js");
/* harmony import */ var _context_CartProvider__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../context/CartProvider */ "./resources/react/webapp/context/CartProvider/index.js");
/* harmony import */ var _Config__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../Config */ "./resources/react/webapp/Config.js");
/* harmony import */ var _assets_images_icons_recipe_blue_svg__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../assets/images/icons/recipe-blue.svg */ "./resources/react/webapp/assets/images/icons/recipe-blue.svg");
/* harmony import */ var _assets_images_producto_default_png__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../assets/images/producto-default.png */ "./resources/react/webapp/assets/images/producto-default.png");
/* harmony import */ var react_lazy_load_image_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! react-lazy-load-image-component */ "./node_modules/react-lazy-load-image-component/build/index.js");
/* harmony import */ var react_lazy_load_image_component__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(react_lazy_load_image_component__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var react_lazy_load_image_component_src_effects_blur_css__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! react-lazy-load-image-component/src/effects/blur.css */ "./node_modules/react-lazy-load-image-component/src/effects/blur.css");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }














var UserForm = function UserForm(_ref) {
  var data = _ref.data,
    setData = _ref.setData,
    setFiles = _ref.setFiles,
    files = _ref.files,
    editable = _ref.editable,
    setRutFlag = _ref.setRutFlag,
    prescriptionRadio = _ref.prescriptionRadio,
    setPrescriptionRadio = _ref.setPrescriptionRadio,
    withoutPrescriptionAnswer = _ref.withoutPrescriptionAnswer,
    setWithoutPrescriptionAnswer = _ref.setWithoutPrescriptionAnswer,
    setPrescriptionsRequiredUploads = _ref.setPrescriptionsRequiredUploads,
    prescriptionsRequiredUploads = _ref.prescriptionsRequiredUploads;
  var _useContext = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(_context_CartProvider__WEBPACK_IMPORTED_MODULE_4__.CartContext),
    cartItems = _useContext.cartItems,
    saveDataForStepTwo = _useContext.saveDataForStepTwo,
    dataForStepTwo = _useContext.dataForStepTwo;
  var handleData = function handleData(e) {
    var onlyText = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    var phone = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    if (phone) {
      if (e.target.value.match("^$|^[0-9]+$")) {
        setData(_objectSpread(_objectSpread({}, data), {}, _defineProperty({}, e.target.id, e.target.value)));
      }
    }
    if (onlyText) {
      if (e.target.value.match('^$|^[a-zA-Z ]+$')) {
        setData(_objectSpread(_objectSpread({}, data), {}, _defineProperty({}, e.target.id, e.target.value)));
      }
    }
    if (!onlyText && !phone) {
      setData(_objectSpread(_objectSpread({}, data), {}, _defineProperty({}, e.target.id, e.target.value)));
    }
  };
  var RutFormat = function RutFormat(e) {
    var clean = e.target.value.replace(/[^0-9Kk]/g, '');
    clean = clean.toString().toUpperCase();
    if (clean.length < 14) {
      setData(_objectSpread(_objectSpread({}, data), {}, _defineProperty({}, e.target.name, w2_rut_validator__WEBPACK_IMPORTED_MODULE_3__["default"].format(clean))));
    }
  };
  var RutValidate = function RutValidate(e) {
    if (e.target.value.length > 0) {
      if (!w2_rut_validator__WEBPACK_IMPORTED_MODULE_3__["default"].validate(e.target.value)) {
        setRutFlag(true);
        (0,_helpers_GlobalUtils__WEBPACK_IMPORTED_MODULE_2__.setInputError)(e.target.id, 'El formato del RUT no es correcto.');
      } else {
        setRutFlag(false);
      }
    }
  };
  var handleCheckBox = function handleCheckBox(e) {
    if (e.target.id == 'custom-inline-radio-rut') {
      if (data.id_number.length > 0) {
        if (!w2_rut_validator__WEBPACK_IMPORTED_MODULE_3__["default"].validate(data.id_number)) {
          setRutFlag(true);
          (0,_helpers_GlobalUtils__WEBPACK_IMPORTED_MODULE_2__.setInputError)('id_number', 'El formato del RUT no es correcto.');
        } else {
          setRutFlag(false);
        }
      }
      setData(_objectSpread(_objectSpread({}, data), {}, _defineProperty({}, e.target.name, 'RUT')));
    }
    if (e.target.id == 'custom-inline-radio-dni') {
      if (data.id_number.length > 0) {
        if (!w2_rut_validator__WEBPACK_IMPORTED_MODULE_3__["default"].validate(data.id_number)) {
          (0,_helpers_GlobalUtils__WEBPACK_IMPORTED_MODULE_2__.setCleanInputErrorById)('id_number');
        }
      }
      setRutFlag(false);
      setData(_objectSpread(_objectSpread({}, data), {}, _defineProperty({}, e.target.name, 'DNI')));
    }
  };
  var handleFile = function handleFile(e) {
    var file = e.target.files[0];
    file.product_id = parseInt(e.target.id);
    file.name_id = parseInt(e.target.name);
    var list = _toConsumableArray(files);
    if (files.find(function (x) {
      return x.name_id == parseInt(e.target.name);
    })) {
      var found = files.findIndex(function (x) {
        return x.name_id == parseInt(e.target.name);
      });
      list.splice(found, 1, e.target.files[0]);
    } else {
      list.push(e.target.files[0]);
    }
    setFiles(list);
  };
  var handleFileRequired = function handleFileRequired(e, required) {
    var file = e.target.files[0];
    file.product_id = parseInt(e.target.id);
    file.name_id = parseInt(e.target.name);
    var list = _toConsumableArray(files);
    var is_new = false;
    if (files.find(function (x) {
      return x.name_id == parseInt(e.target.name);
    })) {
      var found = files.findIndex(function (x) {
        return x.name_id == parseInt(e.target.name);
      });
      list.splice(found, 1, e.target.files[0]);
    } else {
      if (required) {
        is_new = true;
      }
      list.push(e.target.files[0]);
    }
    if (required && is_new) {
      (0,_helpers_GlobalUtils__WEBPACK_IMPORTED_MODULE_2__.setCleanInputErrorById)(file.product_id);
      var indx = prescriptionsRequiredUploads.findIndex(function (x) {
        return x.id == file.product_id;
      });
      var _list = _toConsumableArray(prescriptionsRequiredUploads);
      _list[indx].pending = false;
      setPrescriptionsRequiredUploads(_list);
    }
    setFiles(list);
  };
  var handlePrescriptionRadio = function handlePrescriptionRadio(status) {
    setPrescriptionRadio(status);
    if (status) {
      setWithoutPrescriptionAnswer(null);
      saveDataForStepTwo(_objectSpread(_objectSpread({}, dataForStepTwo), {}, {
        withoutPrescriptionAnswer: null
      }));
    }
  };
  var handleWithoutPrescriptionAnswer = function handleWithoutPrescriptionAnswer(status) {
    setWithoutPrescriptionAnswer(status);
    saveDataForStepTwo(_objectSpread(_objectSpread({}, dataForStepTwo), {}, {
      withoutPrescriptionAnswer: status
    }));
  };
  var renderBlocks = function renderBlocks() {
    var _has_required_items = cartItems.filter(function (item) {
      return item.product.recipe_type != 'Venta Directa' && item.product.recipe_type != 'Receta Simple (R)';
    }).length;
    if (_has_required_items) {
      return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("div", {
        className: "panel panel-cart mb-3",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxs)("div", {
          className: "panel-body mobile-panel-recipe",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("div", {
            className: "row mb-3",
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("div", {
              className: "col-12 font-poppins font-12 light",
              children: "Todas las recetas de los productos con (*) son obligatorios."
            })
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("div", {
            className: "row",
            children: cartItems.map(function (item, index) {
              if (item.product.recipe_type != 'Venta Directa') {
                return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxs)("div", {
                  id: "first_name_focus",
                  className: "col-12 product-item",
                  children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxs)("div", {
                    className: "row",
                    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("div", {
                      className: "col-auto pr-0",
                      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)(react_lazy_load_image_component__WEBPACK_IMPORTED_MODULE_8__.LazyLoadImage, {
                        alt: _Config__WEBPACK_IMPORTED_MODULE_5__.CONFIG.APP_NAME,
                        height: 38,
                        title: "Anticonceptivo",
                        rel: "nofollow",
                        effect: "blur",
                        src: item.product.images.length ? item.product.images[0].public_file : _assets_images_producto_default_png__WEBPACK_IMPORTED_MODULE_7__["default"]
                      })
                    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("div", {
                      className: "col d-flex",
                      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxs)("div", {
                        className: "font-poppins font-14 bold text-black my-auto",
                        children: [item.subscription == null ? item.product.name : item.product.name + ' (' + 'suscripción' + ')', item.product.recipe_type != 'Receta Simple (R)' ? ' (*)' : null]
                      })
                    })]
                  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("div", {
                    className: "row",
                    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("div", {
                      className: "col-md-12 mb-2",
                      id: "last_name_focus",
                      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxs)("div", {
                        className: "custom-file",
                        style: {
                          height: "47px"
                        },
                        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("input", {
                          type: "file",
                          className: "my-auto custom-file-input",
                          id: item.product.id,
                          name: index,
                          onChange: function onChange(e) {
                            return handleFileRequired(e, item.product.recipe_type != 'Receta Simple (R)' ? true : false);
                          },
                          accept: ".jpg, .jpeg, .png, .pdf, .doc, .docx"
                        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("div", {
                          id: "attachments.".concat(index)
                        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("div", {
                          className: "invalid-feedback"
                        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("label", {
                          htmlFor: item.product.id,
                          className: "custom-file-label ml-0 pb-0 input-file-register d-flex",
                          children: files.length ? files.map(function (file) {
                            return file.name_id == index ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("span", {
                              className: "font-14 font-poppins regular my-auto",
                              children: file.name
                            }, index * 100) : null;
                          }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("span", {
                            className: "font-14 font-poppins regular my-auto",
                            children: "Carga tu receta"
                          }, index * 100)
                        })]
                      })
                    })
                  })]
                }, index);
              }
            })
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("div", {
            className: "row mt-3",
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("div", {
              className: "col-12 font-poppins font-12 light",
              children: "Carga tu receta (Formato .jpg, .png, .jpeg, .pdf, .docx. Tama\xF1o m\xE1ximo 5 mb.)"
            })
          })]
        })
      });
    }
    var _has_optional_items = cartItems.filter(function (item) {
      return item.product.recipe_type != 'Venta Directa';
    }).length;
    if (_has_optional_items) {
      return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.Fragment, {
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("div", {
          className: "panel panel-cart mb-3",
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxs)("div", {
            className: "panel-body",
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxs)("div", {
              className: "row",
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("div", {
                className: "col-auto",
                children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)(react_lazy_load_image_component__WEBPACK_IMPORTED_MODULE_8__.LazyLoadImage, {
                  alt: _Config__WEBPACK_IMPORTED_MODULE_5__.CONFIG.APP_NAME,
                  title: "Anticonceptivo",
                  rel: "nofollow",
                  effect: "blur",
                  src: _assets_images_icons_recipe_blue_svg__WEBPACK_IMPORTED_MODULE_6__["default"]
                })
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxs)("div", {
                className: "col px-0",
                children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("p", {
                  className: "font-18 lh-18 font-poppins bold color-033F5D mb-0",
                  children: "Receta"
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("p", {
                  className: "font-16 font-poppins regular color-707070 mb-0",
                  children: "\xBFTienes tu receta?"
                })]
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("div", {
                className: "col-auto",
                children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxs)("div", {
                  className: "row pt-3",
                  children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("div", {
                    className: "col pl-0",
                    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)(react_bootstrap__WEBPACK_IMPORTED_MODULE_11__["default"].Check, {
                      custom: true,
                      label: "Si",
                      type: "radio",
                      className: "right",
                      name: "prescription_radio",
                      id: "with_prescription",
                      onClick: function onClick() {
                        return handlePrescriptionRadio(true);
                      },
                      checked: prescriptionRadio == true
                    })
                  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("div", {
                    className: "col pl-0",
                    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)(react_bootstrap__WEBPACK_IMPORTED_MODULE_11__["default"].Check, {
                      custom: true,
                      label: "No",
                      type: "radio",
                      className: "right",
                      name: "prescription_radio",
                      id: "without_prescription",
                      onClick: function onClick() {
                        return handlePrescriptionRadio(false);
                      },
                      checked: prescriptionRadio != true
                    })
                  })]
                })
              })]
            }), prescriptionRadio ? null : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxs)("div", {
              className: "row",
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("div", {
                className: "col-12 mt-4",
                children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("p", {
                  className: "font-14 font-poppins regular color-033F5D mb-2",
                  children: "Selecciona una de estas opciones"
                })
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("div", {
                className: "col-md-12 py-2",
                children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("div", {
                  className: "pointer receipt-motive ".concat(withoutPrescriptionAnswer === 1 ? 'receipt-motive-active' : ''),
                  onClick: function onClick() {
                    return handleWithoutPrescriptionAnswer(1);
                  },
                  children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxs)("div", {
                    className: "row",
                    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("div", {
                      className: "col-auto d-flex pr-0",
                      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("span", {
                        className: "my-auto font-18 lh-18 font-poppins bold color-033F5D",
                        children: "A"
                      })
                    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("div", {
                      className: "col d-flex",
                      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("span", {
                        className: "my-auto font-13 font-poppins regular color-033F5D",
                        children: "Mi doctor me dijo que siguiera con este, pero no me renov\xF3 la receta."
                      })
                    })]
                  })
                })
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("div", {
                className: "col-md-12 py-2",
                children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("div", {
                  className: "pointer receipt-motive ".concat(withoutPrescriptionAnswer === 2 ? 'receipt-motive-active' : ''),
                  onClick: function onClick() {
                    return handleWithoutPrescriptionAnswer(2);
                  },
                  children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxs)("div", {
                    className: "row",
                    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("div", {
                      className: "col-auto d-flex pr-0",
                      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("span", {
                        className: "my-auto font-18 lh-18 font-poppins bold color-033F5D",
                        children: "B"
                      })
                    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("div", {
                      className: "col d-flex",
                      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("span", {
                        className: "my-auto font-13 font-poppins regular color-033F5D",
                        children: "Es el que me recetaron y he tomado, pero ya no cuento con la receta."
                      })
                    })]
                  })
                })
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("div", {
                className: "col-md-12 py-2",
                children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("div", {
                  className: "note-receipt",
                  children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("div", {
                    className: "row",
                    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("div", {
                      className: "col d-flex",
                      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("span", {
                        className: "my-auto font-13 font-poppins regular color-033F5D",
                        children: "(*) Opciones validadas por el Farmac\xE9utico, s\xF3lo son excepciones y no reemplazan por ning\xFAn motivo la atenci\xF3n con un m\xE9dico o matrona."
                      })
                    })
                  })
                })
              })]
            })]
          })
        }), !prescriptionRadio ? null : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("div", {
          className: "panel panel-cart mb-3",
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxs)("div", {
            className: "panel-body mobile-panel-recipe",
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("div", {
              className: "row",
              children: cartItems.map(function (item, index) {
                if (item.product.recipe_type != 'Venta Directa') {
                  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxs)("div", {
                    id: "first_name_focus",
                    className: "col-12 product-item",
                    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxs)("div", {
                      className: "row",
                      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("div", {
                        className: "col-auto pr-0",
                        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)(react_lazy_load_image_component__WEBPACK_IMPORTED_MODULE_8__.LazyLoadImage, {
                          alt: _Config__WEBPACK_IMPORTED_MODULE_5__.CONFIG.APP_NAME,
                          title: "Anticonceptivo",
                          height: 38,
                          rel: "nofollow",
                          effect: "blur",
                          src: item.product.images.length ? item.product.images[0].public_file : _assets_images_producto_default_png__WEBPACK_IMPORTED_MODULE_7__["default"]
                        })
                      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("div", {
                        className: "col d-flex",
                        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("div", {
                          className: "font-poppins font-14 bold text-black my-auto",
                          children: item.subscription == null ? item.product.name : item.product.name + ' (' + 'suscripción' + ')'
                        })
                      })]
                    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("div", {
                      className: "row",
                      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("div", {
                        className: "col-md-12 mb-2",
                        id: "last_name_focus",
                        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxs)("div", {
                          className: "custom-file",
                          style: {
                            height: "47px"
                          },
                          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("input", {
                            type: "file",
                            className: "my-auto custom-file-input",
                            id: item.product.id,
                            name: index,
                            onChange: handleFile,
                            accept: ".jpg, .jpeg, .png, .pdf, .doc, .docx"
                          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("div", {
                            id: "attachments.".concat(index)
                          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("div", {
                            className: "invalid-feedback"
                          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("label", {
                            htmlFor: item.product.id,
                            className: "custom-file-label ml-0 pb-0 input-file-register d-flex",
                            children: files.length > 0 ? files.map(function (file) {
                              return file.name_id == index ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("span", {
                                className: "font-14 font-poppins regular my-auto",
                                children: file.name
                              }, index * 100) : null;
                            }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("span", {
                              className: "font-14 font-poppins regular my-auto",
                              children: "Carga tu receta"
                            }, index * 100)
                          })]
                        })
                      })
                    })]
                  }, index);
                }
              })
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("div", {
              className: "row mt-3",
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("div", {
                className: "col-12 font-poppins font-12 light",
                children: "Carga tu receta (Formato .jpg, .png, .jpeg, .pdf, .docx. Tama\xF1o m\xE1ximo 5 mb.)"
              })
            })]
          })
        })]
      });
    }
    return null;
  };
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxs)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
    children: [renderBlocks(), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("div", {
      className: "panel panel-cart mb-3",
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("div", {
        className: "panel-body",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)(_private_Account_sections_PersonalInfo_FormPersonalData__WEBPACK_IMPORTED_MODULE_1__["default"], {
          data: data,
          handleData: handleData,
          handleCheckBox: handleCheckBox,
          rutFormat: RutFormat,
          rutValidate: RutValidate,
          password: false,
          editable: editable
        })
      })
    })]
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (UserForm);

/***/ }),

/***/ "./resources/react/webapp/pages/public/CheckOut/index.js":
/*!***************************************************************!*\
  !*** ./resources/react/webapp/pages/public/CheckOut/index.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var _components_shopping_Step__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../components/shopping/Step */ "./resources/react/webapp/components/shopping/Step.js");
/* harmony import */ var _GrantUser__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./GrantUser */ "./resources/react/webapp/pages/public/CheckOut/GrantUser.js");
/* harmony import */ var _Resume__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Resume */ "./resources/react/webapp/pages/public/CheckOut/Resume.js");
/* harmony import */ var _UserForm__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./UserForm */ "./resources/react/webapp/pages/public/CheckOut/UserForm.js");
/* harmony import */ var _AddAddress__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./AddAddress */ "./resources/react/webapp/pages/public/CheckOut/AddAddress.js");
/* harmony import */ var _Addresses__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Addresses */ "./resources/react/webapp/pages/public/CheckOut/Addresses.js");
/* harmony import */ var _Subscriptions__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./Subscriptions */ "./resources/react/webapp/pages/public/CheckOut/Subscriptions.js");
/* harmony import */ var _Header__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./Header */ "./resources/react/webapp/pages/public/CheckOut/Header.js");
/* harmony import */ var _context_AuthProvider__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../context/AuthProvider */ "./resources/react/webapp/context/AuthProvider/index.js");
/* harmony import */ var _Services__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../Services */ "./resources/react/webapp/Services.js");
/* harmony import */ var _HandleResponse__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./HandleResponse */ "./resources/react/webapp/pages/public/CheckOut/HandleResponse.js");
/* harmony import */ var _context_CartProvider__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../../context/CartProvider */ "./resources/react/webapp/context/CartProvider/index.js");
/* harmony import */ var toastr__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! toastr */ "./node_modules/toastr/toastr.js");
/* harmony import */ var toastr__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(toastr__WEBPACK_IMPORTED_MODULE_13__);
/* harmony import */ var _helpers_GlobalUtils__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../../helpers/GlobalUtils */ "./resources/react/webapp/helpers/GlobalUtils.js");
/* harmony import */ var _context_LocalStorage__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../../../context/LocalStorage */ "./resources/react/webapp/context/LocalStorage.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }








// import Installments from "./Installments";










var CheckOut = function CheckOut() {
  var _useContext = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(_context_AuthProvider__WEBPACK_IMPORTED_MODULE_9__.AuthContext),
    auth = _useContext.auth;
  var _useContext2 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(_context_CartProvider__WEBPACK_IMPORTED_MODULE_12__.CartContext),
    cartItems = _useContext2.cartItems;
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null),
    _useState2 = _slicedToArray(_useState, 2),
    dispatchDateObject = _useState2[0],
    setDispatchDateObject = _useState2[1];
  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(1),
    _useState4 = _slicedToArray(_useState3, 2),
    installment = _useState4[0],
    setInstallment = _useState4[1];
  var _useState5 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(1),
    _useState6 = _slicedToArray(_useState5, 2),
    showFinal = _useState6[0],
    setShowFinal = _useState6[1];
  var _useState7 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)('grant-user'),
    _useState8 = _slicedToArray(_useState7, 2),
    view = _useState8[0],
    setView = _useState8[1];
  var _useState9 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)({
      number: 1,
      title: 'DATOS PERSONALES'
    }),
    _useState10 = _slicedToArray(_useState9, 2),
    step = _useState10[0],
    setStep = _useState10[1];
  var _useState11 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null),
    _useState12 = _slicedToArray(_useState11, 2),
    subscriptionId = _useState12[0],
    setSubscriptionId = _useState12[1];
  var defaultData = {
    first_name: '',
    last_name: '',
    email: '',
    id_number: '',
    id_type: 'RUT',
    phone_code: '+56',
    phone: '',
    business_name: '',
    business_id_number: '',
    commercial_business: '',
    commercial_email: '',
    commercial_address: '',
    commercial_additional_address: '',
    commercial_phone: '',
    commercial_phone_code: '',
    commercial_region_id: '',
    commercial_commune_id: ''
  };
  var _useState13 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(defaultData),
    _useState14 = _slicedToArray(_useState13, 2),
    data = _useState14[0],
    setData = _useState14[1];
  var _useState15 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]),
    _useState16 = _slicedToArray(_useState15, 2),
    files = _useState16[0],
    setFiles = _useState16[1];
  var _useState17 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
    _useState18 = _slicedToArray(_useState17, 2),
    editable = _useState18[0],
    setEditable = _useState18[1];
  var _useState19 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]),
    _useState20 = _slicedToArray(_useState19, 2),
    regions = _useState20[0],
    setRegions = _useState20[1];
  var _useState21 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]),
    _useState22 = _slicedToArray(_useState21, 2),
    communes = _useState22[0],
    setCommunes = _useState22[1];
  var _useState23 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(0),
    _useState24 = _slicedToArray(_useState23, 2),
    total = _useState24[0],
    setTotal = _useState24[1];
  var _useState25 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(0),
    _useState26 = _slicedToArray(_useState25, 2),
    subtotal = _useState26[0],
    setSubtotal = _useState26[1];
  var _useState27 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
    _useState28 = _slicedToArray(_useState27, 2),
    containsSubscriptions = _useState28[0],
    setContainsSubscriptions = _useState28[1];
  var _useState29 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null),
    _useState30 = _slicedToArray(_useState29, 2),
    productCount = _useState30[0],
    setProductCount = _useState30[1];
  var _useState31 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
    _useState32 = _slicedToArray(_useState31, 2),
    validAddress = _useState32[0],
    setValidAddress = _useState32[1];
  var _useState33 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]),
    _useState34 = _slicedToArray(_useState33, 2),
    prescriptionsRequiredUploads = _useState34[0],
    setPrescriptionsRequiredUploads = _useState34[1];
  var _useState35 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)({
      name: '',
      region_id: '',
      commune_id: '',
      address: '',
      extra_info: ''
    }),
    _useState36 = _slicedToArray(_useState35, 2),
    address = _useState36[0],
    setAddress = _useState36[1];
  var _useState37 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]),
    _useState38 = _slicedToArray(_useState37, 2),
    subscription = _useState38[0],
    setSubscription = _useState38[1];
  var _useState39 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
    _useState40 = _slicedToArray(_useState39, 2),
    rutFlag = _useState40[0],
    setRutFlag = _useState40[1];
  var _useState41 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null),
    _useState42 = _slicedToArray(_useState41, 2),
    customerId = _useState42[0],
    setCustomerId = _useState42[1];
  var _useState43 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
    _useState44 = _slicedToArray(_useState43, 2),
    prescriptionRadio = _useState44[0],
    setPrescriptionRadio = _useState44[1];
  var _useState45 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null),
    _useState46 = _slicedToArray(_useState45, 2),
    withoutPrescriptionAnswer = _useState46[0],
    setWithoutPrescriptionAnswer = _useState46[1];
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    if (auth) {
      setData(auth);
      setEditable(true);
      getSubscriptions();
      var localData = JSON.parse(localStorage.getItem(_context_LocalStorage__WEBPACK_IMPORTED_MODULE_15__.LOCAL_STORAGE.CART_STEP_TWO));
      if (localData) {
        if ('view' in localData || 'withoutPrescriptionAnswer' in localData) {
          if (localData.withoutPrescriptionAnswer) {
            setWithoutPrescriptionAnswer(localData.withoutPrescriptionAnswer);
          }
          if (localData.view) {
            setView(localData.view);
          } else {
            setView("user-form");
          }
          setStep({
            number: 2,
            title: 'DATOS DE ENVÍO'
          });

          // delete local storage
          console.log('delete local storage');
          localStorage.removeItem(_context_LocalStorage__WEBPACK_IMPORTED_MODULE_15__.LOCAL_STORAGE.CART_STEP_TWO);
        }
      } else {
        console.log('no local storage');
        setView("user-form");
      }
    }
  }, [auth]);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    switch (view) {
      case "grant-user":
      case "user-form":
        setStep({
          number: 1,
          title: 'DATOS PERSONALES'
        });
        setShowFinal(1);
        break;
      case "add-address":
        setStep({
          number: 2,
          title: 'DATOS DE ENVÍO'
        });
        setShowFinal(2);
        break;
      case "addresses":
        setStep({
          number: 2,
          title: 'DATOS DE ENVÍO'
        });
        setShowFinal(3);
        break;
    }
  }, [view]);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    cartItems.map(function (item, index) {
      if (item.subscription != null) {
        setContainsSubscriptions(true);
      }
      if (!prescriptionsRequiredUploads.length) {
        if (item.product.recipe_type != 'Venta Directa' && item.product.recipe_type != 'Receta Simple (R)') {
          setPrescriptionsRequiredUploads(function (prevModel) {
            return [].concat(_toConsumableArray(prevModel), [{
              id: item.product.id,
              pending: true
            }]);
          });
        }
      }
    });
  }, [cartItems]);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    getRegions();
  }, []);
  var validateDataAddressInvite = function validateDataAddressInvite() {
    console.log(address);
    if (address.name == "Retiro_tienda") {
      setView('addresses');
    }
    if (validAddress === false) {}
    var url = _Services__WEBPACK_IMPORTED_MODULE_10__.ENDPOINT.NO_AUTH.CHECKOUT.VALIDATE_STEPS;
    var dataForm = _objectSpread(_objectSpread({}, address), {}, {
      step: 2
    });
    _Services__WEBPACK_IMPORTED_MODULE_10__.DoPost(url, dataForm).then(function (response) {
      _Services__WEBPACK_IMPORTED_MODULE_10__.Response({
        response: response,
        success: function success() {
          setView('addresses');
        }
      });
    })["catch"](function (error) {
      _Services__WEBPACK_IMPORTED_MODULE_10__.ErrorCatch(error);
    });
  };
  var updateData = function updateData() {
    var url = _Services__WEBPACK_IMPORTED_MODULE_10__.ENDPOINT.CUSTOMER.ADDRESSES.UPDATE;
    if (validAddress === false) {}
    var data = {
      customer_id: auth.id,
      address_id: address.id,
      name: address.name,
      last_name: address.last_name,
      region_id: address.region_id,
      commune_id: parseInt(address.commune_id),
      address: address.address,
      extra_info: address.extra_info,
      comment: address.comment
    };
    _Services__WEBPACK_IMPORTED_MODULE_10__.DoPost(url, data).then(function (response) {
      _Services__WEBPACK_IMPORTED_MODULE_10__.Response({
        response: response,
        success: function success() {
          setView('addresses');
        }
      });
    })["catch"](function (error) {
      _Services__WEBPACK_IMPORTED_MODULE_10__.ErrorCatch(error);
    });
  };
  var getRegions = function getRegions() {
    var url = _Services__WEBPACK_IMPORTED_MODULE_10__.ENDPOINT.NO_AUTH.CHECKOUT.GET_RESOURCES;
    var dataForm = {
      // customer_id: auth.id
    };
    _Services__WEBPACK_IMPORTED_MODULE_10__.DoPost(url, dataForm).then(function (response) {
      _Services__WEBPACK_IMPORTED_MODULE_10__.Response({
        response: response,
        success: function success() {
          setCommunes(response.data.communes);
          setRegions(response.data.regions);
        }
      });
    })["catch"](function (error) {
      _Services__WEBPACK_IMPORTED_MODULE_10__.ErrorCatch(error);
    });
  };

  // function to get the MIME type based on the extension
  var getMimeType = function getMimeType(extension) {
    var mime_type = '';
    // extensions .jpg, .jpeg, .png, .pdf, .doc y .docx
    console.log(extension, 'extension');
    switch (extension) {
      case 'jpg':
        mime_type = 'image/jpeg';
        break;
      case 'jpeg':
        mime_type = 'image/jpeg';
        break;
      case 'png':
        mime_type = 'image/png';
        break;
      case 'pdf':
        mime_type = 'application/pdf';
        break;
      case 'doc':
        mime_type = 'application/msword';
        break;
      case 'docx':
        mime_type = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
        break;
      default:
        mime_type = 'application/octet-stream';
        break;
    }
    return mime_type;
  };
  var constructFiles = function constructFiles(attachments) {
    var temp_files = [];
    var _iterator = _createForOfIteratorHelper(attachments),
      _step;
    try {
      var _loop = function _loop() {
        var attachment = _step.value;
        var file_public = attachment.file_public,
          name = attachment.name,
          extension = attachment.extension,
          product_id = attachment.product_id,
          name_id = attachment.name_id;
        fetch(window.location.origin + file_public).then(function (res) {
          return res.blob();
        }).then(function (blob) {
          var file = new File([blob], name, {
            type: extension
          });
          file.product_id = product_id;
          file.name_id = name_id;
          temp_files.push(file);
        });
      };
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        _loop();
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
    console.log('temp_files', temp_files);
    return temp_files;
  };
  var getSubscriptions = function getSubscriptions() {
    var url = _Services__WEBPACK_IMPORTED_MODULE_10__.ENDPOINT.CUSTOMER.SUBSCRIPTIONS.GET_SUBSCRIPTIONS;
    var data = {
      customer_id: auth.id,
      trying_to_subscribe_card: localStorage.getItem('tryingToSubscribeCard')
    };
    _Services__WEBPACK_IMPORTED_MODULE_10__.DoPost(url, data).then(function (response) {
      _Services__WEBPACK_IMPORTED_MODULE_10__.Response({
        response: response,
        success: function success() {
          if (response.data.subscriptions != null) {
            setSubscription(response.data.subscriptions);
          }
          if ('card' in response.data) {
            if (response.data.card == 'approved') {
              toastr__WEBPACK_IMPORTED_MODULE_13___default().success('Tarjeta agregada, ya puedes terminar tu suscripción.', '¡Ya casi terminas!');
              setSubscriptionId(response.data.card_id);
            }
            if (response.data.card == 'refused') {
              toastr__WEBPACK_IMPORTED_MODULE_13___default().error('No se ha podido suscribir la tarjeta de crédito, intenta nuevamente.', '¡Ups!');
            }
            if (response.data.attachments && response.data.attachments.length > 0) {
              setPrescriptionRadio(true);
              setFiles(constructFiles(response.data.attachments));
            }
            localStorage.removeItem('tryingToSubscribeCard');
          }
        }
      });
    })["catch"](function (error) {
      _Services__WEBPACK_IMPORTED_MODULE_10__.ErrorCatch(error);
    });
  };
  var validateData = function validateData() {
    if (rutFlag) {
      toastr__WEBPACK_IMPORTED_MODULE_13___default().warning('El formato del rut es incorrecto.', 'Perfil no actualizado.');
      return null;
    } else {
      console.log('VALIDATE DATA');
      var url = _Services__WEBPACK_IMPORTED_MODULE_10__.ENDPOINT.NO_AUTH.CHECKOUT.VALIDATE_STEPS;
      var _productCount = cartItems.filter(function (item) {
        return item.product.recipe_type != 'Venta Directa';
      }).length;
      var _has_required_items = cartItems.filter(function (item) {
        return item.product.recipe_type != 'Venta Directa' && item.product.recipe_type != 'Receta Simple (R)';
      }).length;
      if (_has_required_items) {
        if (prescriptionsRequiredUploads.filter(function (item) {
          return item.pending == true;
        }).length) {
          toastr__WEBPACK_IMPORTED_MODULE_13___default().warning('Debes subir todas las recetas obligatorias.');
          prescriptionsRequiredUploads.forEach(function (element) {
            if (element.pending == true) {
              (0,_helpers_GlobalUtils__WEBPACK_IMPORTED_MODULE_14__.setInputError)(element.id, 'Debes subir la receta.');
            }
          });
          return null;
        }
      }
      if (_productCount > 0 && prescriptionRadio == false && withoutPrescriptionAnswer == null && !_has_required_items) {
        toastr__WEBPACK_IMPORTED_MODULE_13___default().warning('Debes seleccionar un motivo.');
        document.getElementById("reason_focus").scrollIntoView({
          behavior: 'smooth',
          block: 'end'
        });
        return null;
      }
      var formData = new FormData();
      formData.append('product_count', _productCount);
      formData.append('step', 1);
      formData.append('email', data.email);
      formData.append('first_name', data.first_name);
      formData.append('id_number', data.id_number);
      formData.append('id_type', data.id_type);
      formData.append('last_name', data.last_name);
      formData.append('phone', data.phone);
      formData.append('phone_code', data.phone_code);
      formData.append('prescription_radio', _productCount > 0 ? !_has_required_items ? prescriptionRadio : true : null);
      formData.append('without_prescription_answer', withoutPrescriptionAnswer);
      formData.append('customer_id', auth ? auth.id : null);
      var fileList = _toConsumableArray(files);
      for (var i = 0; i < fileList.length; i++) {
        formData.append('attachments[]', fileList[i]);
      }
      var config = {
        headers: {
          'content-type': 'multipart/form-data'
        }
      };
      _Services__WEBPACK_IMPORTED_MODULE_10__.DoPost(url, formData, config).then(function (response) {
        _Services__WEBPACK_IMPORTED_MODULE_10__.Response({
          response: response,
          success: function success() {
            setView('add-address');
            setProductCount(_productCount);
            if (response.data.customer_id) {
              setCustomerId(response.data.customer_id);
              if (!auth) {
                setAddress(function (prevModel) {
                  return _objectSpread(_objectSpread({}, prevModel), {}, {
                    name: data.first_name + ' ' + data.last_name
                  });
                });
              }
            } else {
              setAddress(function (prevModel) {
                return _objectSpread(_objectSpread({}, prevModel), {}, {
                  name: data.first_name + ' ' + data.last_name
                });
              });
            }
          },
          error: function error() {
            toastr__WEBPACK_IMPORTED_MODULE_13___default().error(response.message);
          },
          warning: function warning() {
            toastr__WEBPACK_IMPORTED_MODULE_13___default().warning(response.message);
          },
          validate: function validate() {
            var errorKey = Object.keys(response.data)[0];
            if (errorKey.includes('.')) {
              toastr__WEBPACK_IMPORTED_MODULE_13___default().error('Formato de archivo invalido.');
              document.getElementById("reason_focus").scrollIntoView({
                behavior: 'smooth',
                block: 'end'
              });
              return null;
            }
            if (response.data.attachments) {
              toastr__WEBPACK_IMPORTED_MODULE_13___default().error(response.data.attachments[0]);
              document.getElementById("reason_focus").scrollIntoView({
                behavior: 'smooth',
                block: 'end'
              });
            } else {
              toastr__WEBPACK_IMPORTED_MODULE_13___default().error('Por favor, complete todos los campos.');
              document.getElementById("reason_focus").scrollIntoView({
                behavior: 'smooth',
                block: 'end'
              });
            }
          }
        });
      })["catch"](function (error) {
        _Services__WEBPACK_IMPORTED_MODULE_10__.ErrorCatch(error);
      });
    }
  };
  var hasAddress = function hasAddress() {
    var url = _Services__WEBPACK_IMPORTED_MODULE_10__.ENDPOINT.CUSTOMER.ADDRESSES.GET;
    var productCount = cartItems.filter(function (item) {
      return item.product.recipe_type != 'Venta Directa';
    }).length;
    var _has_required_items = cartItems.filter(function (item) {
      return item.product.recipe_type != 'Venta Directa' && item.product.recipe_type != 'Receta Simple (R)';
    }).length;
    if (_has_required_items) {
      if (prescriptionsRequiredUploads.filter(function (item) {
        return item.pending == true;
      }).length) {
        toastr__WEBPACK_IMPORTED_MODULE_13___default().warning('Debes subir todas las recetas obligatorias.');
        prescriptionsRequiredUploads.forEach(function (element) {
          if (element.pending == true) {
            (0,_helpers_GlobalUtils__WEBPACK_IMPORTED_MODULE_14__.setInputError)(element.id, 'Debes subir la receta.');
          }
        });
        return null;
      }
    }
    if (productCount > 0 && prescriptionRadio == false && withoutPrescriptionAnswer == null && !_has_required_items) {
      toastr__WEBPACK_IMPORTED_MODULE_13___default().warning('Debes seleccionar un motivo.');
      document.getElementById("reason_focus").scrollIntoView({
        behavior: 'smooth',
        block: 'end'
      });
      return null;
    }
    var formData = new FormData();
    formData.append('product_count', productCount);
    formData.append('customer_id', auth.id);
    formData.append('prescription_radio', productCount > 0 ? !_has_required_items ? prescriptionRadio : true : null);
    formData.append('without_prescription_answer', withoutPrescriptionAnswer);
    var fileList = _toConsumableArray(files);
    for (var i = 0; i < fileList.length; i++) {
      formData.append('attachments[]', fileList[i]);
    }
    var config = {
      headers: {
        'content-type': 'multipart/form-data'
      }
    };
    _Services__WEBPACK_IMPORTED_MODULE_10__.DoPost(url, formData, config).then(function (response) {
      _Services__WEBPACK_IMPORTED_MODULE_10__.Response({
        response: response,
        success: function success() {
          setProductCount(productCount);
          if (response.data.addresses.length) {
            setView('addresses');
          } else {
            setView('add-address');
          }
        },
        error: function error() {
          toastr__WEBPACK_IMPORTED_MODULE_13___default().error(response.message);
        },
        warning: function warning() {
          toastr__WEBPACK_IMPORTED_MODULE_13___default().warning(response.message);
        },
        validate: function validate() {
          var errorKey = Object.keys(response.data)[0];
          if (errorKey.includes('.')) {
            toastr__WEBPACK_IMPORTED_MODULE_13___default().error('Formato de archivo invalido.');
            document.getElementById("reason_focus").scrollIntoView({
              behavior: 'smooth',
              block: 'end'
            });
            return null;
          }
          if (response.data.attachments) {
            toastr__WEBPACK_IMPORTED_MODULE_13___default().error(response.data.attachments[0]);
            document.getElementById("reason_focus").scrollIntoView({
              behavior: 'smooth',
              block: 'end'
            });
          } else {
            toastr__WEBPACK_IMPORTED_MODULE_13___default().error('Por favor, complete todos los campos.');
            document.getElementById("reason_focus").scrollIntoView({
              behavior: 'smooth',
              block: 'end'
            });
          }
        }
      });
    })["catch"](function (error) {
      _Services__WEBPACK_IMPORTED_MODULE_10__.ErrorCatch(error);
    });
  };
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsx)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsx)("div", {
      className: "pb-5",
      style: {
        background: '#FAFAFA'
      },
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsx)("div", {
        className: "container pt-4",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsxs)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsx)(_Header__WEBPACK_IMPORTED_MODULE_8__["default"], {
            showFinal: showFinal
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsxs)("div", {
            className: "row pb-5",
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsxs)("div", {
              className: "col-12 col-lg pr-md-2",
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsx)("div", {
                className: "panel panel-cart mb-3 ".concat(view != 'user-form' ? 'mt-3' : ''),
                children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsx)("div", {
                  className: "panel-body",
                  style: {
                    paddingTop: '11px',
                    paddingBottom: '10px'
                  },
                  children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsx)(_components_shopping_Step__WEBPACK_IMPORTED_MODULE_1__["default"], {
                    title: step.title,
                    number: step.number,
                    disabled: false
                  })
                })
              }), view == 'grant-user' ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsx)(_GrantUser__WEBPACK_IMPORTED_MODULE_2__["default"], {
                setView: setView
              }) : null, view == 'user-form' ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsx)(_UserForm__WEBPACK_IMPORTED_MODULE_4__["default"], {
                setView: setView,
                data: data,
                setData: setData,
                setFiles: setFiles,
                files: files,
                editable: editable,
                regions: regions,
                setProductCount: setProductCount,
                rutFlag: rutFlag,
                setRutFlag: setRutFlag,
                prescriptionRadio: prescriptionRadio,
                setPrescriptionRadio: setPrescriptionRadio,
                withoutPrescriptionAnswer: withoutPrescriptionAnswer,
                setWithoutPrescriptionAnswer: setWithoutPrescriptionAnswer,
                setPrescriptionsRequiredUploads: setPrescriptionsRequiredUploads,
                prescriptionsRequiredUploads: prescriptionsRequiredUploads
              }) : null, containsSubscriptions && (view == 'addresses' || view == 'add-address') ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsx)(_Subscriptions__WEBPACK_IMPORTED_MODULE_7__["default"], {
                onView: view,
                setView: setView,
                subscription: subscription,
                setSubscription: setSubscription,
                subscriptionId: subscriptionId,
                setSubscriptionId: setSubscriptionId,
                files: files,
                withoutPrescriptionAnswer: withoutPrescriptionAnswer
              }) : null, view == 'add-address' ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsx)(_AddAddress__WEBPACK_IMPORTED_MODULE_5__["default"], {
                setView: setView,
                regions: regions,
                address: address,
                setAddress: setAddress,
                validAddress: validAddress,
                setValidAddress: setValidAddress,
                setInputError: _helpers_GlobalUtils__WEBPACK_IMPORTED_MODULE_14__.setInputError,
                validateDataAddressInvite: validateDataAddressInvite
              }) : null, view == 'addresses' ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsx)(_Addresses__WEBPACK_IMPORTED_MODULE_6__["default"], {
                setView: setView,
                regions: regions,
                dispatchDateObject: dispatchDateObject,
                communes: communes,
                address: address,
                setAddress: setAddress
              }) : null]
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsx)("div", {
              className: "col-12 col-lg-auto pl-md-2",
              style: {
                width: '408px'
              },
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsx)(_Resume__WEBPACK_IMPORTED_MODULE_3__["default"], {
                installment: installment,
                showFinal: showFinal,
                data: data,
                files: files,
                address: address,
                setDispatchDateObject: setDispatchDateObject,
                subscription: subscription,
                total: total,
                setTotal: setTotal,
                subtotal: subtotal,
                setSubtotal: setSubtotal,
                validateData: validateData,
                hasAddress: hasAddress,
                view: view,
                customerId: customerId,
                updateData: updateData,
                validateDataAddressInvite: validateDataAddressInvite,
                prescriptionRadio: prescriptionRadio,
                withoutPrescriptionAnswer: withoutPrescriptionAnswer,
                subscriptionId: subscriptionId
              })
            })]
          })]
        })
      })
    })
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CheckOut);

/***/ }),

/***/ "./public/themes/web/assets/images/down.svg":
/*!**************************************************!*\
  !*** ./public/themes/web/assets/images/down.svg ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("/images/down.svg?af446b85ac882ec9fa6192cb5be10702");

/***/ }),

/***/ "./public/themes/web/assets/images/up.svg":
/*!************************************************!*\
  !*** ./public/themes/web/assets/images/up.svg ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("/images/up.svg?40c7b2d901982b454cedd0c2a1046836");

/***/ }),

/***/ "./resources/react/webapp/assets/images/bioequivalente.png":
/*!*****************************************************************!*\
  !*** ./resources/react/webapp/assets/images/bioequivalente.png ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("/images/bioequivalente.png?e3bc63a32d6737d14df68ef2832c320f");

/***/ }),

/***/ "./resources/react/webapp/assets/images/cardioLogo.svg":
/*!*************************************************************!*\
  !*** ./resources/react/webapp/assets/images/cardioLogo.svg ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("/images/cardioLogo.svg?5f6424902d08a4e8c77e91746aaf3b22");

/***/ }),

/***/ "./resources/react/webapp/assets/images/icons/calendar-blue.svg":
/*!**********************************************************************!*\
  !*** ./resources/react/webapp/assets/images/icons/calendar-blue.svg ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("/images/calendar-blue.svg?e6d59b56625641daa60657eab385217d");

/***/ }),

/***/ "./resources/react/webapp/assets/images/icons/clock-blue.svg":
/*!*******************************************************************!*\
  !*** ./resources/react/webapp/assets/images/icons/clock-blue.svg ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("/images/clock-blue.svg?1b07ab0d47654b8e87d040485ec828f8");

/***/ }),

/***/ "./resources/react/webapp/assets/images/icons/plus-green.svg":
/*!*******************************************************************!*\
  !*** ./resources/react/webapp/assets/images/icons/plus-green.svg ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("/images/plus-green.svg?0452fc21a01b42957358eec7fd407920");

/***/ }),

/***/ "./resources/react/webapp/assets/images/icons/recipe-blue.svg":
/*!********************************************************************!*\
  !*** ./resources/react/webapp/assets/images/icons/recipe-blue.svg ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("/images/recipe-blue.svg?675e0ee1e595034447b8f3064faa4ee8");

/***/ }),

/***/ "./resources/react/webapp/assets/images/icons/remove-mini-cart.svg":
/*!*************************************************************************!*\
  !*** ./resources/react/webapp/assets/images/icons/remove-mini-cart.svg ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("/images/remove-mini-cart.svg?819f8b7ade70c64d812859fd69babecd");

/***/ }),

/***/ "./resources/react/webapp/assets/images/icons/step-check.svg":
/*!*******************************************************************!*\
  !*** ./resources/react/webapp/assets/images/icons/step-check.svg ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("/images/step-check.svg?83dce37b87159b16a05ac95ca6feb18c");

/***/ }),

/***/ "./resources/react/webapp/assets/images/logo.jpeg":
/*!********************************************************!*\
  !*** ./resources/react/webapp/assets/images/logo.jpeg ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("/images/logo.jpeg?dc83d23100f9c81b98d3bce3b6cb2678");

/***/ }),

/***/ "./resources/react/webapp/assets/images/oxfar.svg":
/*!********************************************************!*\
  !*** ./resources/react/webapp/assets/images/oxfar.svg ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("/images/oxfar.svg?7ce03521b0e73752d3c12ae5f5896915");

/***/ }),

/***/ "./resources/react/webapp/assets/images/producto-default.png":
/*!*******************************************************************!*\
  !*** ./resources/react/webapp/assets/images/producto-default.png ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("/images/producto-default.png?72d921ff1bc0ce87a5731332af7ebe7d");

/***/ }),

/***/ "./resources/react/webapp/assets/images/webCheckoutLogo.svg":
/*!******************************************************************!*\
  !*** ./resources/react/webapp/assets/images/webCheckoutLogo.svg ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("/images/webCheckoutLogo.svg?455a15fcef56a1cf300df6be427b6e9d");

/***/ }),

/***/ "./resources/react/webapp/assets/images/webpayColor.svg":
/*!**************************************************************!*\
  !*** ./resources/react/webapp/assets/images/webpayColor.svg ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("/images/webpayColor.svg?c147955eca09d49e5ce89e5cd503eead");

/***/ }),

/***/ "./node_modules/react-google-autocomplete/index.js":
/*!*********************************************************!*\
  !*** ./node_modules/react-google-autocomplete/index.js ***!
  \*********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


module.exports = __webpack_require__(/*! ./lib */ "./node_modules/react-google-autocomplete/lib/index.js");


/***/ }),

/***/ "./node_modules/react-google-autocomplete/lib/ReactGoogleAutocomplete.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/react-google-autocomplete/lib/ReactGoogleAutocomplete.js ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;

var _react = _interopRequireWildcard(__webpack_require__(/*! react */ "./node_modules/react/index.js"));

var _propTypes = _interopRequireDefault(__webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js"));

var _usePlacesWidget2 = _interopRequireDefault(__webpack_require__(/*! ./usePlacesWidget */ "./node_modules/react-google-autocomplete/lib/usePlacesWidget.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function ReactGoogleAutocomplete(props) {
  var onPlaceSelected = props.onPlaceSelected,
      apiKey = props.apiKey,
      libraries = props.libraries,
      inputAutocompleteValue = props.inputAutocompleteValue,
      options = props.options,
      googleMapsScriptBaseUrl = props.googleMapsScriptBaseUrl,
      refProp = props.refProp,
      language = props.language,
      rest = _objectWithoutProperties(props, ["onPlaceSelected", "apiKey", "libraries", "inputAutocompleteValue", "options", "googleMapsScriptBaseUrl", "refProp", "language"]);

  var _usePlacesWidget = (0, _usePlacesWidget2.default)({
    ref: refProp,
    googleMapsScriptBaseUrl: googleMapsScriptBaseUrl,
    onPlaceSelected: onPlaceSelected,
    apiKey: apiKey,
    libraries: libraries,
    inputAutocompleteValue: inputAutocompleteValue,
    options: options,
    language: language
  }),
      ref = _usePlacesWidget.ref;

  return /*#__PURE__*/_react.default.createElement("input", _extends({
    ref: ref
  }, rest));
}

ReactGoogleAutocomplete.propTypes = {
  apiKey: _propTypes.default.string,
  libraries: _propTypes.default.arrayOf(_propTypes.default.string),
  ref: _propTypes.default.oneOfType([// Either a function
  _propTypes.default.func, // Or anything shaped { current: any }
  _propTypes.default.shape({
    current: _propTypes.default.any
  })]),
  googleMapsScriptBaseUrl: _propTypes.default.string,
  onPlaceSelected: _propTypes.default.func,
  inputAutocompleteValue: _propTypes.default.string,
  options: _propTypes.default.shape({
    componentRestrictions: _propTypes.default.object,
    bounds: _propTypes.default.object,
    location: _propTypes.default.object,
    offset: _propTypes.default.number,
    origin: _propTypes.default.object,
    radius: _propTypes.default.number,
    sessionToken: _propTypes.default.object,
    types: _propTypes.default.arrayOf(_propTypes.default.string)
  }),
  language: _propTypes.default.string
};

var _default = /*#__PURE__*/(0, _react.forwardRef)(function (props, ref) {
  return /*#__PURE__*/_react.default.createElement(ReactGoogleAutocomplete, _extends({}, props, {
    refProp: ref
  }));
});

exports["default"] = _default;

/***/ }),

/***/ "./node_modules/react-google-autocomplete/lib/constants.js":
/*!*****************************************************************!*\
  !*** ./node_modules/react-google-autocomplete/lib/constants.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.GOOGLE_MAP_SCRIPT_BASE_URL = void 0;
var GOOGLE_MAP_SCRIPT_BASE_URL = "https://maps.googleapis.com/maps/api/js";
exports.GOOGLE_MAP_SCRIPT_BASE_URL = GOOGLE_MAP_SCRIPT_BASE_URL;

/***/ }),

/***/ "./node_modules/react-google-autocomplete/lib/index.js":
/*!*************************************************************!*\
  !*** ./node_modules/react-google-autocomplete/lib/index.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
Object.defineProperty(exports, "default", ({
  enumerable: true,
  get: function get() {
    return _ReactGoogleAutocomplete.default;
  }
}));
Object.defineProperty(exports, "usePlacesWidget", ({
  enumerable: true,
  get: function get() {
    return _usePlacesWidget.default;
  }
}));

var _ReactGoogleAutocomplete = _interopRequireDefault(__webpack_require__(/*! ./ReactGoogleAutocomplete */ "./node_modules/react-google-autocomplete/lib/ReactGoogleAutocomplete.js"));

var _usePlacesWidget = _interopRequireDefault(__webpack_require__(/*! ./usePlacesWidget */ "./node_modules/react-google-autocomplete/lib/usePlacesWidget.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),

/***/ "./node_modules/react-google-autocomplete/lib/usePlacesWidget.js":
/*!***********************************************************************!*\
  !*** ./node_modules/react-google-autocomplete/lib/usePlacesWidget.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = usePlacesWidget;

var _react = _interopRequireWildcard(__webpack_require__(/*! react */ "./node_modules/react/index.js"));

var _utils = __webpack_require__(/*! ./utils */ "./node_modules/react-google-autocomplete/lib/utils.js");

var _constants = __webpack_require__(/*! ./constants */ "./node_modules/react-google-autocomplete/lib/constants.js");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function usePlacesWidget(props) {
  var ref = props.ref,
      onPlaceSelected = props.onPlaceSelected,
      apiKey = props.apiKey,
      _props$libraries = props.libraries,
      libraries = _props$libraries === void 0 ? "places" : _props$libraries,
      _props$inputAutocompl = props.inputAutocompleteValue,
      inputAutocompleteValue = _props$inputAutocompl === void 0 ? "new-password" : _props$inputAutocompl,
      _props$options = props.options;
  _props$options = _props$options === void 0 ? {} : _props$options;

  var _props$options$types = _props$options.types,
      types = _props$options$types === void 0 ? ["(cities)"] : _props$options$types,
      componentRestrictions = _props$options.componentRestrictions,
      _props$options$fields = _props$options.fields,
      fields = _props$options$fields === void 0 ? ["address_components", "geometry.location", "place_id", "formatted_address"] : _props$options$fields,
      bounds = _props$options.bounds,
      options = _objectWithoutProperties(_props$options, ["types", "componentRestrictions", "fields", "bounds"]),
      _props$googleMapsScri = props.googleMapsScriptBaseUrl,
      googleMapsScriptBaseUrl = _props$googleMapsScri === void 0 ? _constants.GOOGLE_MAP_SCRIPT_BASE_URL : _props$googleMapsScri,
      language = props.language;

  var inputRef = (0, _react.useRef)(null);
  var event = (0, _react.useRef)(null);
  var autocompleteRef = (0, _react.useRef)(null);
  var observerHack = (0, _react.useRef)(null);
  var languageQueryParam = language ? "&language=".concat(language) : "";
  var googleMapsScriptUrl = "".concat(googleMapsScriptBaseUrl, "?libraries=").concat(libraries, "&key=").concat(apiKey).concat(languageQueryParam);
  var handleLoadScript = (0, _react.useCallback)(function () {
    return (0, _utils.loadGoogleMapScript)(googleMapsScriptBaseUrl, googleMapsScriptUrl);
  }, [googleMapsScriptBaseUrl, googleMapsScriptUrl]);
  (0, _react.useEffect)(function () {
    var config = _objectSpread(_objectSpread({}, options), {}, {
      fields: fields,
      types: types,
      bounds: bounds
    });

    if (componentRestrictions) {
      config.componentRestrictions = componentRestrictions;
    }

    if (autocompleteRef.current || !inputRef.current || !_utils.isBrowser) return;
    if (ref && !ref.current) ref.current = inputRef.current;

    var handleAutoComplete = function handleAutoComplete() {
      var _google$maps;

      if (typeof google === "undefined") return console.error("Google has not been found. Make sure your provide apiKey prop.");
      if (!((_google$maps = google.maps) !== null && _google$maps !== void 0 && _google$maps.places)) return console.error("Google maps places API must be loaded.");
      if (!inputRef.current instanceof HTMLInputElement) return console.error("Input ref must be HTMLInputElement.");
      autocompleteRef.current = new google.maps.places.Autocomplete(inputRef.current, config);

      if (autocompleteRef.current) {
        event.current = autocompleteRef.current.addListener("place_changed", function () {
          if (onPlaceSelected && autocompleteRef && autocompleteRef.current) {
            onPlaceSelected(autocompleteRef.current.getPlace(), inputRef.current, autocompleteRef.current);
          }
        });
      }
    };

    if (apiKey) {
      handleLoadScript().then(function () {
        return handleAutoComplete();
      });
    } else {
      handleAutoComplete();
    }

    return function () {
      return event.current ? event.current.remove() : undefined;
    };
  }, []); // Autofill workaround adapted from https://stackoverflow.com/questions/29931712/chrome-autofill-covers-autocomplete-for-google-maps-api-v3/49161445#49161445

  (0, _react.useEffect)(function () {
    var _React$version;

    // TODO find out why react 18(strict mode) hangs the page loading
    if (!(_react.default !== null && _react.default !== void 0 && (_React$version = _react.default.version) !== null && _React$version !== void 0 && _React$version.startsWith("18")) && _utils.isBrowser && window.MutationObserver && inputRef.current && inputRef.current instanceof HTMLInputElement) {
      observerHack.current = new MutationObserver(function () {
        observerHack.current.disconnect();

        if (inputRef.current) {
          inputRef.current.autocomplete = inputAutocompleteValue;
        }
      });
      observerHack.current.observe(inputRef.current, {
        attributes: true,
        attributeFilter: ["autocomplete"]
      });
    }
  }, [inputAutocompleteValue]);
  (0, _react.useEffect)(function () {
    if (autocompleteRef.current) {
      autocompleteRef.current.setFields(fields);
    }
  }, [fields]);
  (0, _react.useEffect)(function () {
    if (autocompleteRef.current) {
      autocompleteRef.current.setBounds(bounds);
    }
  }, [bounds]);
  (0, _react.useEffect)(function () {
    if (autocompleteRef.current) {
      autocompleteRef.current.setComponentRestrictions(componentRestrictions);
    }
  }, [componentRestrictions]);
  (0, _react.useEffect)(function () {
    if (autocompleteRef.current) {
      autocompleteRef.current.setOptions(options);
    }
  }, [options]);
  return {
    ref: inputRef,
    autocompleteRef: autocompleteRef
  };
}

/***/ }),

/***/ "./node_modules/react-google-autocomplete/lib/utils.js":
/*!*************************************************************!*\
  !*** ./node_modules/react-google-autocomplete/lib/utils.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.loadGoogleMapScript = exports.isBrowser = void 0;
var isBrowser = typeof window !== "undefined" && window.document;
exports.isBrowser = isBrowser;

var loadGoogleMapScript = function loadGoogleMapScript(googleMapsScriptBaseUrl, googleMapsScriptUrl) {
  if (!isBrowser) return Promise.resolve();

  if (typeof google !== "undefined") {
    if (google.maps && google.maps.api) return Promise.resolve();
  }

  var scriptElements = document.querySelectorAll("script[src*=\"".concat(googleMapsScriptBaseUrl, "\"]"));

  if (scriptElements && scriptElements.length) {
    return new Promise(function (resolve) {
      // in case we already have a script on the page and it's loaded we resolve
      if (typeof google !== "undefined") return resolve(); // otherwise we wait until it's loaded and resolve

      scriptElements[0].addEventListener("load", function () {
        return resolve();
      });
    });
  }

  var scriptUrl = new URL(googleMapsScriptUrl);
  scriptUrl.searchParams.set("callback", "__REACT_GOOGLE_AUTOCOMPLETE_CALLBACK__");
  var el = document.createElement("script");
  el.src = scriptUrl.toString();
  return new Promise(function (resolve) {
    window.__REACT_GOOGLE_AUTOCOMPLETE_CALLBACK__ = resolve;
    document.body.appendChild(el);
  });
};

exports.loadGoogleMapScript = loadGoogleMapScript;

/***/ }),

/***/ "./node_modules/sweetalert2/dist/sweetalert2.all.js":
/*!**********************************************************!*\
  !*** ./node_modules/sweetalert2/dist/sweetalert2.all.js ***!
  \**********************************************************/
/***/ (function(module) {

/*!
* sweetalert2 v10.16.11
* Released under the MIT License.
*/
(function (global, factory) {
   true ? module.exports = factory() :
  0;
}(this, function () { 'use strict';

  function _typeof(obj) {
    "@babel/helpers - typeof";

    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function (obj) {
        return typeof obj;
      };
    } else {
      _typeof = function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _extends() {
    _extends = Object.assign || function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];

        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }

      return target;
    };

    return _extends.apply(this, arguments);
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        writable: true,
        configurable: true
      }
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
  }

  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }

  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

    return _setPrototypeOf(o, p);
  }

  function _isNativeReflectConstruct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;

    try {
      Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
      return true;
    } catch (e) {
      return false;
    }
  }

  function _construct(Parent, args, Class) {
    if (_isNativeReflectConstruct()) {
      _construct = Reflect.construct;
    } else {
      _construct = function _construct(Parent, args, Class) {
        var a = [null];
        a.push.apply(a, args);
        var Constructor = Function.bind.apply(Parent, a);
        var instance = new Constructor();
        if (Class) _setPrototypeOf(instance, Class.prototype);
        return instance;
      };
    }

    return _construct.apply(null, arguments);
  }

  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  function _possibleConstructorReturn(self, call) {
    if (call && (typeof call === "object" || typeof call === "function")) {
      return call;
    }

    return _assertThisInitialized(self);
  }

  function _createSuper(Derived) {
    var hasNativeReflectConstruct = _isNativeReflectConstruct();

    return function _createSuperInternal() {
      var Super = _getPrototypeOf(Derived),
          result;

      if (hasNativeReflectConstruct) {
        var NewTarget = _getPrototypeOf(this).constructor;

        result = Reflect.construct(Super, arguments, NewTarget);
      } else {
        result = Super.apply(this, arguments);
      }

      return _possibleConstructorReturn(this, result);
    };
  }

  function _superPropBase(object, property) {
    while (!Object.prototype.hasOwnProperty.call(object, property)) {
      object = _getPrototypeOf(object);
      if (object === null) break;
    }

    return object;
  }

  function _get(target, property, receiver) {
    if (typeof Reflect !== "undefined" && Reflect.get) {
      _get = Reflect.get;
    } else {
      _get = function _get(target, property, receiver) {
        var base = _superPropBase(target, property);

        if (!base) return;
        var desc = Object.getOwnPropertyDescriptor(base, property);

        if (desc.get) {
          return desc.get.call(receiver);
        }

        return desc.value;
      };
    }

    return _get(target, property, receiver || target);
  }

  var consolePrefix = 'SweetAlert2:';
  /**
   * Filter the unique values into a new array
   * @param arr
   */

  var uniqueArray = function uniqueArray(arr) {
    var result = [];

    for (var i = 0; i < arr.length; i++) {
      if (result.indexOf(arr[i]) === -1) {
        result.push(arr[i]);
      }
    }

    return result;
  };
  /**
   * Capitalize the first letter of a string
   * @param str
   */

  var capitalizeFirstLetter = function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };
  /**
   * Returns the array of object values (Object.values isn't supported in IE11)
   * @param obj
   */

  var objectValues = function objectValues(obj) {
    return Object.keys(obj).map(function (key) {
      return obj[key];
    });
  };
  /**
   * Convert NodeList to Array
   * @param nodeList
   */

  var toArray = function toArray(nodeList) {
    return Array.prototype.slice.call(nodeList);
  };
  /**
   * Standardise console warnings
   * @param message
   */

  var warn = function warn(message) {
    console.warn("".concat(consolePrefix, " ").concat(_typeof(message) === 'object' ? message.join(' ') : message));
  };
  /**
   * Standardise console errors
   * @param message
   */

  var error = function error(message) {
    console.error("".concat(consolePrefix, " ").concat(message));
  };
  /**
   * Private global state for `warnOnce`
   * @type {Array}
   * @private
   */

  var previousWarnOnceMessages = [];
  /**
   * Show a console warning, but only if it hasn't already been shown
   * @param message
   */

  var warnOnce = function warnOnce(message) {
    if (!(previousWarnOnceMessages.indexOf(message) !== -1)) {
      previousWarnOnceMessages.push(message);
      warn(message);
    }
  };
  /**
   * Show a one-time console warning about deprecated params/methods
   */

  var warnAboutDeprecation = function warnAboutDeprecation(deprecatedParam, useInstead) {
    warnOnce("\"".concat(deprecatedParam, "\" is deprecated and will be removed in the next major release. Please use \"").concat(useInstead, "\" instead."));
  };
  /**
   * If `arg` is a function, call it (with no arguments or context) and return the result.
   * Otherwise, just pass the value through
   * @param arg
   */

  var callIfFunction = function callIfFunction(arg) {
    return typeof arg === 'function' ? arg() : arg;
  };
  var hasToPromiseFn = function hasToPromiseFn(arg) {
    return arg && typeof arg.toPromise === 'function';
  };
  var asPromise = function asPromise(arg) {
    return hasToPromiseFn(arg) ? arg.toPromise() : Promise.resolve(arg);
  };
  var isPromise = function isPromise(arg) {
    return arg && Promise.resolve(arg) === arg;
  };

  var DismissReason = Object.freeze({
    cancel: 'cancel',
    backdrop: 'backdrop',
    close: 'close',
    esc: 'esc',
    timer: 'timer'
  });

  var isJqueryElement = function isJqueryElement(elem) {
    return _typeof(elem) === 'object' && elem.jquery;
  };

  var isElement = function isElement(elem) {
    return elem instanceof Element || isJqueryElement(elem);
  };

  var argsToParams = function argsToParams(args) {
    var params = {};

    if (_typeof(args[0]) === 'object' && !isElement(args[0])) {
      _extends(params, args[0]);
    } else {
      ['title', 'html', 'icon'].forEach(function (name, index) {
        var arg = args[index];

        if (typeof arg === 'string' || isElement(arg)) {
          params[name] = arg;
        } else if (arg !== undefined) {
          error("Unexpected type of ".concat(name, "! Expected \"string\" or \"Element\", got ").concat(_typeof(arg)));
        }
      });
    }

    return params;
  };

  var swalPrefix = 'swal2-';
  var prefix = function prefix(items) {
    var result = {};

    for (var i in items) {
      result[items[i]] = swalPrefix + items[i];
    }

    return result;
  };
  var swalClasses = prefix(['container', 'shown', 'height-auto', 'iosfix', 'popup', 'modal', 'no-backdrop', 'no-transition', 'toast', 'toast-shown', 'show', 'hide', 'close', 'title', 'header', 'content', 'html-container', 'actions', 'confirm', 'deny', 'cancel', 'footer', 'icon', 'icon-content', 'image', 'input', 'file', 'range', 'select', 'radio', 'checkbox', 'label', 'textarea', 'inputerror', 'input-label', 'validation-message', 'progress-steps', 'active-progress-step', 'progress-step', 'progress-step-line', 'loader', 'loading', 'styled', 'top', 'top-start', 'top-end', 'top-left', 'top-right', 'center', 'center-start', 'center-end', 'center-left', 'center-right', 'bottom', 'bottom-start', 'bottom-end', 'bottom-left', 'bottom-right', 'grow-row', 'grow-column', 'grow-fullscreen', 'rtl', 'timer-progress-bar', 'timer-progress-bar-container', 'scrollbar-measure', 'icon-success', 'icon-warning', 'icon-info', 'icon-question', 'icon-error']);
  var iconTypes = prefix(['success', 'warning', 'info', 'question', 'error']);

  var getContainer = function getContainer() {
    return document.body.querySelector(".".concat(swalClasses.container));
  };
  var elementBySelector = function elementBySelector(selectorString) {
    var container = getContainer();
    return container ? container.querySelector(selectorString) : null;
  };

  var elementByClass = function elementByClass(className) {
    return elementBySelector(".".concat(className));
  };

  var getPopup = function getPopup() {
    return elementByClass(swalClasses.popup);
  };
  var getIcon = function getIcon() {
    return elementByClass(swalClasses.icon);
  };
  var getTitle = function getTitle() {
    return elementByClass(swalClasses.title);
  };
  var getContent = function getContent() {
    return elementByClass(swalClasses.content);
  };
  var getHtmlContainer = function getHtmlContainer() {
    return elementByClass(swalClasses['html-container']);
  };
  var getImage = function getImage() {
    return elementByClass(swalClasses.image);
  };
  var getProgressSteps = function getProgressSteps() {
    return elementByClass(swalClasses['progress-steps']);
  };
  var getValidationMessage = function getValidationMessage() {
    return elementByClass(swalClasses['validation-message']);
  };
  var getConfirmButton = function getConfirmButton() {
    return elementBySelector(".".concat(swalClasses.actions, " .").concat(swalClasses.confirm));
  };
  var getDenyButton = function getDenyButton() {
    return elementBySelector(".".concat(swalClasses.actions, " .").concat(swalClasses.deny));
  };
  var getInputLabel = function getInputLabel() {
    return elementByClass(swalClasses['input-label']);
  };
  var getLoader = function getLoader() {
    return elementBySelector(".".concat(swalClasses.loader));
  };
  var getCancelButton = function getCancelButton() {
    return elementBySelector(".".concat(swalClasses.actions, " .").concat(swalClasses.cancel));
  };
  var getActions = function getActions() {
    return elementByClass(swalClasses.actions);
  };
  var getHeader = function getHeader() {
    return elementByClass(swalClasses.header);
  };
  var getFooter = function getFooter() {
    return elementByClass(swalClasses.footer);
  };
  var getTimerProgressBar = function getTimerProgressBar() {
    return elementByClass(swalClasses['timer-progress-bar']);
  };
  var getCloseButton = function getCloseButton() {
    return elementByClass(swalClasses.close);
  }; // https://github.com/jkup/focusable/blob/master/index.js

  var focusable = "\n  a[href],\n  area[href],\n  input:not([disabled]),\n  select:not([disabled]),\n  textarea:not([disabled]),\n  button:not([disabled]),\n  iframe,\n  object,\n  embed,\n  [tabindex=\"0\"],\n  [contenteditable],\n  audio[controls],\n  video[controls],\n  summary\n";
  var getFocusableElements = function getFocusableElements() {
    var focusableElementsWithTabindex = toArray(getPopup().querySelectorAll('[tabindex]:not([tabindex="-1"]):not([tabindex="0"])')) // sort according to tabindex
    .sort(function (a, b) {
      a = parseInt(a.getAttribute('tabindex'));
      b = parseInt(b.getAttribute('tabindex'));

      if (a > b) {
        return 1;
      } else if (a < b) {
        return -1;
      }

      return 0;
    });
    var otherFocusableElements = toArray(getPopup().querySelectorAll(focusable)).filter(function (el) {
      return el.getAttribute('tabindex') !== '-1';
    });
    return uniqueArray(focusableElementsWithTabindex.concat(otherFocusableElements)).filter(function (el) {
      return isVisible(el);
    });
  };
  var isModal = function isModal() {
    return !isToast() && !document.body.classList.contains(swalClasses['no-backdrop']);
  };
  var isToast = function isToast() {
    return document.body.classList.contains(swalClasses['toast-shown']);
  };
  var isLoading = function isLoading() {
    return getPopup().hasAttribute('data-loading');
  };

  var states = {
    previousBodyPadding: null
  };
  var setInnerHtml = function setInnerHtml(elem, html) {
    // #1926
    elem.textContent = '';

    if (html) {
      var parser = new DOMParser();
      var parsed = parser.parseFromString(html, "text/html");
      toArray(parsed.querySelector('head').childNodes).forEach(function (child) {
        elem.appendChild(child);
      });
      toArray(parsed.querySelector('body').childNodes).forEach(function (child) {
        elem.appendChild(child);
      });
    }
  };
  var hasClass = function hasClass(elem, className) {
    if (!className) {
      return false;
    }

    var classList = className.split(/\s+/);

    for (var i = 0; i < classList.length; i++) {
      if (!elem.classList.contains(classList[i])) {
        return false;
      }
    }

    return true;
  };

  var removeCustomClasses = function removeCustomClasses(elem, params) {
    toArray(elem.classList).forEach(function (className) {
      if (!(objectValues(swalClasses).indexOf(className) !== -1) && !(objectValues(iconTypes).indexOf(className) !== -1) && !(objectValues(params.showClass).indexOf(className) !== -1)) {
        elem.classList.remove(className);
      }
    });
  };

  var applyCustomClass = function applyCustomClass(elem, params, className) {
    removeCustomClasses(elem, params);

    if (params.customClass && params.customClass[className]) {
      if (typeof params.customClass[className] !== 'string' && !params.customClass[className].forEach) {
        return warn("Invalid type of customClass.".concat(className, "! Expected string or iterable object, got \"").concat(_typeof(params.customClass[className]), "\""));
      }

      addClass(elem, params.customClass[className]);
    }
  };
  function getInput(content, inputType) {
    if (!inputType) {
      return null;
    }

    switch (inputType) {
      case 'select':
      case 'textarea':
      case 'file':
        return getChildByClass(content, swalClasses[inputType]);

      case 'checkbox':
        return content.querySelector(".".concat(swalClasses.checkbox, " input"));

      case 'radio':
        return content.querySelector(".".concat(swalClasses.radio, " input:checked")) || content.querySelector(".".concat(swalClasses.radio, " input:first-child"));

      case 'range':
        return content.querySelector(".".concat(swalClasses.range, " input"));

      default:
        return getChildByClass(content, swalClasses.input);
    }
  }
  var focusInput = function focusInput(input) {
    input.focus(); // place cursor at end of text in text input

    if (input.type !== 'file') {
      // http://stackoverflow.com/a/2345915
      var val = input.value;
      input.value = '';
      input.value = val;
    }
  };
  var toggleClass = function toggleClass(target, classList, condition) {
    if (!target || !classList) {
      return;
    }

    if (typeof classList === 'string') {
      classList = classList.split(/\s+/).filter(Boolean);
    }

    classList.forEach(function (className) {
      if (target.forEach) {
        target.forEach(function (elem) {
          condition ? elem.classList.add(className) : elem.classList.remove(className);
        });
      } else {
        condition ? target.classList.add(className) : target.classList.remove(className);
      }
    });
  };
  var addClass = function addClass(target, classList) {
    toggleClass(target, classList, true);
  };
  var removeClass = function removeClass(target, classList) {
    toggleClass(target, classList, false);
  };
  var getChildByClass = function getChildByClass(elem, className) {
    for (var i = 0; i < elem.childNodes.length; i++) {
      if (hasClass(elem.childNodes[i], className)) {
        return elem.childNodes[i];
      }
    }
  };
  var applyNumericalStyle = function applyNumericalStyle(elem, property, value) {
    if (value === "".concat(parseInt(value))) {
      value = parseInt(value);
    }

    if (value || parseInt(value) === 0) {
      elem.style[property] = typeof value === 'number' ? "".concat(value, "px") : value;
    } else {
      elem.style.removeProperty(property);
    }
  };
  var show = function show(elem) {
    var display = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'flex';
    elem.style.display = display;
  };
  var hide = function hide(elem) {
    elem.style.display = 'none';
  };
  var setStyle = function setStyle(parent, selector, property, value) {
    var el = parent.querySelector(selector);

    if (el) {
      el.style[property] = value;
    }
  };
  var toggle = function toggle(elem, condition, display) {
    condition ? show(elem, display) : hide(elem);
  }; // borrowed from jquery $(elem).is(':visible') implementation

  var isVisible = function isVisible(elem) {
    return !!(elem && (elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length));
  };
  var allButtonsAreHidden = function allButtonsAreHidden() {
    return !isVisible(getConfirmButton()) && !isVisible(getDenyButton()) && !isVisible(getCancelButton());
  };
  var isScrollable = function isScrollable(elem) {
    return !!(elem.scrollHeight > elem.clientHeight);
  }; // borrowed from https://stackoverflow.com/a/46352119

  var hasCssAnimation = function hasCssAnimation(elem) {
    var style = window.getComputedStyle(elem);
    var animDuration = parseFloat(style.getPropertyValue('animation-duration') || '0');
    var transDuration = parseFloat(style.getPropertyValue('transition-duration') || '0');
    return animDuration > 0 || transDuration > 0;
  };
  var contains = function contains(haystack, needle) {
    if (typeof haystack.contains === 'function') {
      return haystack.contains(needle);
    }
  };
  var animateTimerProgressBar = function animateTimerProgressBar(timer) {
    var reset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    var timerProgressBar = getTimerProgressBar();

    if (isVisible(timerProgressBar)) {
      if (reset) {
        timerProgressBar.style.transition = 'none';
        timerProgressBar.style.width = '100%';
      }

      setTimeout(function () {
        timerProgressBar.style.transition = "width ".concat(timer / 1000, "s linear");
        timerProgressBar.style.width = '0%';
      }, 10);
    }
  };
  var stopTimerProgressBar = function stopTimerProgressBar() {
    var timerProgressBar = getTimerProgressBar();
    var timerProgressBarWidth = parseInt(window.getComputedStyle(timerProgressBar).width);
    timerProgressBar.style.removeProperty('transition');
    timerProgressBar.style.width = '100%';
    var timerProgressBarFullWidth = parseInt(window.getComputedStyle(timerProgressBar).width);
    var timerProgressBarPercent = parseInt(timerProgressBarWidth / timerProgressBarFullWidth * 100);
    timerProgressBar.style.removeProperty('transition');
    timerProgressBar.style.width = "".concat(timerProgressBarPercent, "%");
  };

  // Detect Node env
  var isNodeEnv = function isNodeEnv() {
    return typeof window === 'undefined' || typeof document === 'undefined';
  };

  var sweetHTML = "\n <div aria-labelledby=\"".concat(swalClasses.title, "\" aria-describedby=\"").concat(swalClasses.content, "\" class=\"").concat(swalClasses.popup, "\" tabindex=\"-1\">\n   <div class=\"").concat(swalClasses.header, "\">\n     <ul class=\"").concat(swalClasses['progress-steps'], "\"></ul>\n     <div class=\"").concat(swalClasses.icon, "\"></div>\n     <img class=\"").concat(swalClasses.image, "\" />\n     <h2 class=\"").concat(swalClasses.title, "\" id=\"").concat(swalClasses.title, "\"></h2>\n     <button type=\"button\" class=\"").concat(swalClasses.close, "\"></button>\n   </div>\n   <div class=\"").concat(swalClasses.content, "\">\n     <div id=\"").concat(swalClasses.content, "\" class=\"").concat(swalClasses['html-container'], "\"></div>\n     <input class=\"").concat(swalClasses.input, "\" />\n     <input type=\"file\" class=\"").concat(swalClasses.file, "\" />\n     <div class=\"").concat(swalClasses.range, "\">\n       <input type=\"range\" />\n       <output></output>\n     </div>\n     <select class=\"").concat(swalClasses.select, "\"></select>\n     <div class=\"").concat(swalClasses.radio, "\"></div>\n     <label for=\"").concat(swalClasses.checkbox, "\" class=\"").concat(swalClasses.checkbox, "\">\n       <input type=\"checkbox\" />\n       <span class=\"").concat(swalClasses.label, "\"></span>\n     </label>\n     <textarea class=\"").concat(swalClasses.textarea, "\"></textarea>\n     <div class=\"").concat(swalClasses['validation-message'], "\" id=\"").concat(swalClasses['validation-message'], "\"></div>\n   </div>\n   <div class=\"").concat(swalClasses.actions, "\">\n     <div class=\"").concat(swalClasses.loader, "\"></div>\n     <button type=\"button\" class=\"").concat(swalClasses.confirm, "\"></button>\n     <button type=\"button\" class=\"").concat(swalClasses.deny, "\"></button>\n     <button type=\"button\" class=\"").concat(swalClasses.cancel, "\"></button>\n   </div>\n   <div class=\"").concat(swalClasses.footer, "\"></div>\n   <div class=\"").concat(swalClasses['timer-progress-bar-container'], "\">\n     <div class=\"").concat(swalClasses['timer-progress-bar'], "\"></div>\n   </div>\n </div>\n").replace(/(^|\n)\s*/g, '');

  var resetOldContainer = function resetOldContainer() {
    var oldContainer = getContainer();

    if (!oldContainer) {
      return false;
    }

    oldContainer.parentNode.removeChild(oldContainer);
    removeClass([document.documentElement, document.body], [swalClasses['no-backdrop'], swalClasses['toast-shown'], swalClasses['has-column']]);
    return true;
  };

  var oldInputVal; // IE11 workaround, see #1109 for details

  var resetValidationMessage = function resetValidationMessage(e) {
    if (Swal.isVisible() && oldInputVal !== e.target.value) {
      Swal.resetValidationMessage();
    }

    oldInputVal = e.target.value;
  };

  var addInputChangeListeners = function addInputChangeListeners() {
    var content = getContent();
    var input = getChildByClass(content, swalClasses.input);
    var file = getChildByClass(content, swalClasses.file);
    var range = content.querySelector(".".concat(swalClasses.range, " input"));
    var rangeOutput = content.querySelector(".".concat(swalClasses.range, " output"));
    var select = getChildByClass(content, swalClasses.select);
    var checkbox = content.querySelector(".".concat(swalClasses.checkbox, " input"));
    var textarea = getChildByClass(content, swalClasses.textarea);
    input.oninput = resetValidationMessage;
    file.onchange = resetValidationMessage;
    select.onchange = resetValidationMessage;
    checkbox.onchange = resetValidationMessage;
    textarea.oninput = resetValidationMessage;

    range.oninput = function (e) {
      resetValidationMessage(e);
      rangeOutput.value = range.value;
    };

    range.onchange = function (e) {
      resetValidationMessage(e);
      range.nextSibling.value = range.value;
    };
  };

  var getTarget = function getTarget(target) {
    return typeof target === 'string' ? document.querySelector(target) : target;
  };

  var setupAccessibility = function setupAccessibility(params) {
    var popup = getPopup();
    popup.setAttribute('role', params.toast ? 'alert' : 'dialog');
    popup.setAttribute('aria-live', params.toast ? 'polite' : 'assertive');

    if (!params.toast) {
      popup.setAttribute('aria-modal', 'true');
    }
  };

  var setupRTL = function setupRTL(targetElement) {
    if (window.getComputedStyle(targetElement).direction === 'rtl') {
      addClass(getContainer(), swalClasses.rtl);
    }
  };
  /*
   * Add modal + backdrop to DOM
   */


  var init = function init(params) {
    // Clean up the old popup container if it exists
    var oldContainerExisted = resetOldContainer();
    /* istanbul ignore if */

    if (isNodeEnv()) {
      error('SweetAlert2 requires document to initialize');
      return;
    }

    var container = document.createElement('div');
    container.className = swalClasses.container;

    if (oldContainerExisted) {
      addClass(container, swalClasses['no-transition']);
    }

    setInnerHtml(container, sweetHTML);
    var targetElement = getTarget(params.target);
    targetElement.appendChild(container);
    setupAccessibility(params);
    setupRTL(targetElement);
    addInputChangeListeners();
  };

  var parseHtmlToContainer = function parseHtmlToContainer(param, target) {
    // DOM element
    if (param instanceof HTMLElement) {
      target.appendChild(param); // Object
    } else if (_typeof(param) === 'object') {
      handleObject(param, target); // Plain string
    } else if (param) {
      setInnerHtml(target, param);
    }
  };

  var handleObject = function handleObject(param, target) {
    // JQuery element(s)
    if (param.jquery) {
      handleJqueryElem(target, param); // For other objects use their string representation
    } else {
      setInnerHtml(target, param.toString());
    }
  };

  var handleJqueryElem = function handleJqueryElem(target, elem) {
    target.textContent = '';

    if (0 in elem) {
      for (var i = 0; (i in elem); i++) {
        target.appendChild(elem[i].cloneNode(true));
      }
    } else {
      target.appendChild(elem.cloneNode(true));
    }
  };

  var animationEndEvent = function () {
    // Prevent run in Node env

    /* istanbul ignore if */
    if (isNodeEnv()) {
      return false;
    }

    var testEl = document.createElement('div');
    var transEndEventNames = {
      WebkitAnimation: 'webkitAnimationEnd',
      OAnimation: 'oAnimationEnd oanimationend',
      animation: 'animationend'
    };

    for (var i in transEndEventNames) {
      if (Object.prototype.hasOwnProperty.call(transEndEventNames, i) && typeof testEl.style[i] !== 'undefined') {
        return transEndEventNames[i];
      }
    }

    return false;
  }();

  // https://github.com/twbs/bootstrap/blob/master/js/src/modal.js

  var measureScrollbar = function measureScrollbar() {
    var scrollDiv = document.createElement('div');
    scrollDiv.className = swalClasses['scrollbar-measure'];
    document.body.appendChild(scrollDiv);
    var scrollbarWidth = scrollDiv.getBoundingClientRect().width - scrollDiv.clientWidth;
    document.body.removeChild(scrollDiv);
    return scrollbarWidth;
  };

  var renderActions = function renderActions(instance, params) {
    var actions = getActions();
    var loader = getLoader();
    var confirmButton = getConfirmButton();
    var denyButton = getDenyButton();
    var cancelButton = getCancelButton(); // Actions (buttons) wrapper

    if (!params.showConfirmButton && !params.showDenyButton && !params.showCancelButton) {
      hide(actions);
    } // Custom class


    applyCustomClass(actions, params, 'actions'); // Render buttons

    renderButton(confirmButton, 'confirm', params);
    renderButton(denyButton, 'deny', params);
    renderButton(cancelButton, 'cancel', params);
    handleButtonsStyling(confirmButton, denyButton, cancelButton, params);

    if (params.reverseButtons) {
      actions.insertBefore(cancelButton, loader);
      actions.insertBefore(denyButton, loader);
      actions.insertBefore(confirmButton, loader);
    } // Loader


    setInnerHtml(loader, params.loaderHtml);
    applyCustomClass(loader, params, 'loader');
  };

  function handleButtonsStyling(confirmButton, denyButton, cancelButton, params) {
    if (!params.buttonsStyling) {
      return removeClass([confirmButton, denyButton, cancelButton], swalClasses.styled);
    }

    addClass([confirmButton, denyButton, cancelButton], swalClasses.styled); // Buttons background colors

    if (params.confirmButtonColor) {
      confirmButton.style.backgroundColor = params.confirmButtonColor;
    }

    if (params.denyButtonColor) {
      denyButton.style.backgroundColor = params.denyButtonColor;
    }

    if (params.cancelButtonColor) {
      cancelButton.style.backgroundColor = params.cancelButtonColor;
    }
  }

  function renderButton(button, buttonType, params) {
    toggle(button, params["show".concat(capitalizeFirstLetter(buttonType), "Button")], 'inline-block');
    setInnerHtml(button, params["".concat(buttonType, "ButtonText")]); // Set caption text

    button.setAttribute('aria-label', params["".concat(buttonType, "ButtonAriaLabel")]); // ARIA label
    // Add buttons custom classes

    button.className = swalClasses[buttonType];
    applyCustomClass(button, params, "".concat(buttonType, "Button"));
    addClass(button, params["".concat(buttonType, "ButtonClass")]);
  }

  function handleBackdropParam(container, backdrop) {
    if (typeof backdrop === 'string') {
      container.style.background = backdrop;
    } else if (!backdrop) {
      addClass([document.documentElement, document.body], swalClasses['no-backdrop']);
    }
  }

  function handlePositionParam(container, position) {
    if (position in swalClasses) {
      addClass(container, swalClasses[position]);
    } else {
      warn('The "position" parameter is not valid, defaulting to "center"');
      addClass(container, swalClasses.center);
    }
  }

  function handleGrowParam(container, grow) {
    if (grow && typeof grow === 'string') {
      var growClass = "grow-".concat(grow);

      if (growClass in swalClasses) {
        addClass(container, swalClasses[growClass]);
      }
    }
  }

  var renderContainer = function renderContainer(instance, params) {
    var container = getContainer();

    if (!container) {
      return;
    }

    handleBackdropParam(container, params.backdrop);

    if (!params.backdrop && params.allowOutsideClick) {
      warn('"allowOutsideClick" parameter requires `backdrop` parameter to be set to `true`');
    }

    handlePositionParam(container, params.position);
    handleGrowParam(container, params.grow); // Custom class

    applyCustomClass(container, params, 'container'); // Set queue step attribute for getQueueStep() method

    var queueStep = document.body.getAttribute('data-swal2-queue-step');

    if (queueStep) {
      container.setAttribute('data-queue-step', queueStep);
      document.body.removeAttribute('data-swal2-queue-step');
    }
  };

  /**
   * This module containts `WeakMap`s for each effectively-"private  property" that a `Swal` has.
   * For example, to set the private property "foo" of `this` to "bar", you can `privateProps.foo.set(this, 'bar')`
   * This is the approach that Babel will probably take to implement private methods/fields
   *   https://github.com/tc39/proposal-private-methods
   *   https://github.com/babel/babel/pull/7555
   * Once we have the changes from that PR in Babel, and our core class fits reasonable in *one module*
   *   then we can use that language feature.
   */
  var privateProps = {
    promise: new WeakMap(),
    innerParams: new WeakMap(),
    domCache: new WeakMap()
  };

  var inputTypes = ['input', 'file', 'range', 'select', 'radio', 'checkbox', 'textarea'];
  var renderInput = function renderInput(instance, params) {
    var content = getContent();
    var innerParams = privateProps.innerParams.get(instance);
    var rerender = !innerParams || params.input !== innerParams.input;
    inputTypes.forEach(function (inputType) {
      var inputClass = swalClasses[inputType];
      var inputContainer = getChildByClass(content, inputClass); // set attributes

      setAttributes(inputType, params.inputAttributes); // set class

      inputContainer.className = inputClass;

      if (rerender) {
        hide(inputContainer);
      }
    });

    if (params.input) {
      if (rerender) {
        showInput(params);
      } // set custom class


      setCustomClass(params);
    }
  };

  var showInput = function showInput(params) {
    if (!renderInputType[params.input]) {
      return error("Unexpected type of input! Expected \"text\", \"email\", \"password\", \"number\", \"tel\", \"select\", \"radio\", \"checkbox\", \"textarea\", \"file\" or \"url\", got \"".concat(params.input, "\""));
    }

    var inputContainer = getInputContainer(params.input);
    var input = renderInputType[params.input](inputContainer, params);
    show(input); // input autofocus

    setTimeout(function () {
      focusInput(input);
    });
  };

  var removeAttributes = function removeAttributes(input) {
    for (var i = 0; i < input.attributes.length; i++) {
      var attrName = input.attributes[i].name;

      if (!(['type', 'value', 'style'].indexOf(attrName) !== -1)) {
        input.removeAttribute(attrName);
      }
    }
  };

  var setAttributes = function setAttributes(inputType, inputAttributes) {
    var input = getInput(getContent(), inputType);

    if (!input) {
      return;
    }

    removeAttributes(input);

    for (var attr in inputAttributes) {
      // Do not set a placeholder for <input type="range">
      // it'll crash Edge, #1298
      if (inputType === 'range' && attr === 'placeholder') {
        continue;
      }

      input.setAttribute(attr, inputAttributes[attr]);
    }
  };

  var setCustomClass = function setCustomClass(params) {
    var inputContainer = getInputContainer(params.input);

    if (params.customClass) {
      addClass(inputContainer, params.customClass.input);
    }
  };

  var setInputPlaceholder = function setInputPlaceholder(input, params) {
    if (!input.placeholder || params.inputPlaceholder) {
      input.placeholder = params.inputPlaceholder;
    }
  };

  var setInputLabel = function setInputLabel(input, prependTo, params) {
    if (params.inputLabel) {
      input.id = swalClasses.input;
      var label = document.createElement('label');
      var labelClass = swalClasses['input-label'];
      label.setAttribute('for', input.id);
      label.className = labelClass;
      addClass(label, params.customClass.inputLabel);
      label.innerText = params.inputLabel;
      prependTo.insertAdjacentElement('beforebegin', label);
    }
  };

  var getInputContainer = function getInputContainer(inputType) {
    var inputClass = swalClasses[inputType] ? swalClasses[inputType] : swalClasses.input;
    return getChildByClass(getContent(), inputClass);
  };

  var renderInputType = {};

  renderInputType.text = renderInputType.email = renderInputType.password = renderInputType.number = renderInputType.tel = renderInputType.url = function (input, params) {
    if (typeof params.inputValue === 'string' || typeof params.inputValue === 'number') {
      input.value = params.inputValue;
    } else if (!isPromise(params.inputValue)) {
      warn("Unexpected type of inputValue! Expected \"string\", \"number\" or \"Promise\", got \"".concat(_typeof(params.inputValue), "\""));
    }

    setInputLabel(input, input, params);
    setInputPlaceholder(input, params);
    input.type = params.input;
    return input;
  };

  renderInputType.file = function (input, params) {
    setInputLabel(input, input, params);
    setInputPlaceholder(input, params);
    return input;
  };

  renderInputType.range = function (range, params) {
    var rangeInput = range.querySelector('input');
    var rangeOutput = range.querySelector('output');
    rangeInput.value = params.inputValue;
    rangeInput.type = params.input;
    rangeOutput.value = params.inputValue;
    setInputLabel(rangeInput, range, params);
    return range;
  };

  renderInputType.select = function (select, params) {
    select.textContent = '';

    if (params.inputPlaceholder) {
      var placeholder = document.createElement('option');
      setInnerHtml(placeholder, params.inputPlaceholder);
      placeholder.value = '';
      placeholder.disabled = true;
      placeholder.selected = true;
      select.appendChild(placeholder);
    }

    setInputLabel(select, select, params);
    return select;
  };

  renderInputType.radio = function (radio) {
    radio.textContent = '';
    return radio;
  };

  renderInputType.checkbox = function (checkboxContainer, params) {
    var checkbox = getInput(getContent(), 'checkbox');
    checkbox.value = 1;
    checkbox.id = swalClasses.checkbox;
    checkbox.checked = Boolean(params.inputValue);
    var label = checkboxContainer.querySelector('span');
    setInnerHtml(label, params.inputPlaceholder);
    return checkboxContainer;
  };

  renderInputType.textarea = function (textarea, params) {
    textarea.value = params.inputValue;
    setInputPlaceholder(textarea, params);
    setInputLabel(textarea, textarea, params);

    var getPadding = function getPadding(el) {
      return parseInt(window.getComputedStyle(el).paddingLeft) + parseInt(window.getComputedStyle(el).paddingRight);
    };

    if ('MutationObserver' in window) {
      // #1699
      var initialPopupWidth = parseInt(window.getComputedStyle(getPopup()).width);

      var outputsize = function outputsize() {
        var contentWidth = textarea.offsetWidth + getPadding(getPopup()) + getPadding(getContent());

        if (contentWidth > initialPopupWidth) {
          getPopup().style.width = "".concat(contentWidth, "px");
        } else {
          getPopup().style.width = null;
        }
      };

      new MutationObserver(outputsize).observe(textarea, {
        attributes: true,
        attributeFilter: ['style']
      });
    }

    return textarea;
  };

  var renderContent = function renderContent(instance, params) {
    var htmlContainer = getHtmlContainer();
    applyCustomClass(htmlContainer, params, 'htmlContainer'); // Content as HTML

    if (params.html) {
      parseHtmlToContainer(params.html, htmlContainer);
      show(htmlContainer, 'block'); // Content as plain text
    } else if (params.text) {
      htmlContainer.textContent = params.text;
      show(htmlContainer, 'block'); // No content
    } else {
      hide(htmlContainer);
    }

    renderInput(instance, params); // Custom class

    applyCustomClass(getContent(), params, 'content');
  };

  var renderFooter = function renderFooter(instance, params) {
    var footer = getFooter();
    toggle(footer, params.footer);

    if (params.footer) {
      parseHtmlToContainer(params.footer, footer);
    } // Custom class


    applyCustomClass(footer, params, 'footer');
  };

  var renderCloseButton = function renderCloseButton(instance, params) {
    var closeButton = getCloseButton();
    setInnerHtml(closeButton, params.closeButtonHtml); // Custom class

    applyCustomClass(closeButton, params, 'closeButton');
    toggle(closeButton, params.showCloseButton);
    closeButton.setAttribute('aria-label', params.closeButtonAriaLabel);
  };

  var renderIcon = function renderIcon(instance, params) {
    var innerParams = privateProps.innerParams.get(instance);
    var icon = getIcon(); // if the given icon already rendered, apply the styling without re-rendering the icon

    if (innerParams && params.icon === innerParams.icon) {
      // Custom or default content
      setContent(icon, params);
      applyStyles(icon, params);
      return;
    }

    if (!params.icon && !params.iconHtml) {
      return hide(icon);
    }

    if (params.icon && Object.keys(iconTypes).indexOf(params.icon) === -1) {
      error("Unknown icon! Expected \"success\", \"error\", \"warning\", \"info\" or \"question\", got \"".concat(params.icon, "\""));
      return hide(icon);
    }

    show(icon); // Custom or default content

    setContent(icon, params);
    applyStyles(icon, params); // Animate icon

    addClass(icon, params.showClass.icon);
  };

  var applyStyles = function applyStyles(icon, params) {
    for (var iconType in iconTypes) {
      if (params.icon !== iconType) {
        removeClass(icon, iconTypes[iconType]);
      }
    }

    addClass(icon, iconTypes[params.icon]); // Icon color

    setColor(icon, params); // Success icon background color

    adjustSuccessIconBackgoundColor(); // Custom class

    applyCustomClass(icon, params, 'icon');
  }; // Adjust success icon background color to match the popup background color


  var adjustSuccessIconBackgoundColor = function adjustSuccessIconBackgoundColor() {
    var popup = getPopup();
    var popupBackgroundColor = window.getComputedStyle(popup).getPropertyValue('background-color');
    var successIconParts = popup.querySelectorAll('[class^=swal2-success-circular-line], .swal2-success-fix');

    for (var i = 0; i < successIconParts.length; i++) {
      successIconParts[i].style.backgroundColor = popupBackgroundColor;
    }
  };

  var setContent = function setContent(icon, params) {
    icon.textContent = '';

    if (params.iconHtml) {
      setInnerHtml(icon, iconContent(params.iconHtml));
    } else if (params.icon === 'success') {
      setInnerHtml(icon, "\n      <div class=\"swal2-success-circular-line-left\"></div>\n      <span class=\"swal2-success-line-tip\"></span> <span class=\"swal2-success-line-long\"></span>\n      <div class=\"swal2-success-ring\"></div> <div class=\"swal2-success-fix\"></div>\n      <div class=\"swal2-success-circular-line-right\"></div>\n    ");
    } else if (params.icon === 'error') {
      setInnerHtml(icon, "\n      <span class=\"swal2-x-mark\">\n        <span class=\"swal2-x-mark-line-left\"></span>\n        <span class=\"swal2-x-mark-line-right\"></span>\n      </span>\n    ");
    } else {
      var defaultIconHtml = {
        question: '?',
        warning: '!',
        info: 'i'
      };
      setInnerHtml(icon, iconContent(defaultIconHtml[params.icon]));
    }
  };

  var setColor = function setColor(icon, params) {
    if (!params.iconColor) {
      return;
    }

    icon.style.color = params.iconColor;
    icon.style.borderColor = params.iconColor;

    for (var _i = 0, _arr = ['.swal2-success-line-tip', '.swal2-success-line-long', '.swal2-x-mark-line-left', '.swal2-x-mark-line-right']; _i < _arr.length; _i++) {
      var sel = _arr[_i];
      setStyle(icon, sel, 'backgroundColor', params.iconColor);
    }

    setStyle(icon, '.swal2-success-ring', 'borderColor', params.iconColor);
  };

  var iconContent = function iconContent(content) {
    return "<div class=\"".concat(swalClasses['icon-content'], "\">").concat(content, "</div>");
  };

  var renderImage = function renderImage(instance, params) {
    var image = getImage();

    if (!params.imageUrl) {
      return hide(image);
    }

    show(image, ''); // Src, alt

    image.setAttribute('src', params.imageUrl);
    image.setAttribute('alt', params.imageAlt); // Width, height

    applyNumericalStyle(image, 'width', params.imageWidth);
    applyNumericalStyle(image, 'height', params.imageHeight); // Class

    image.className = swalClasses.image;
    applyCustomClass(image, params, 'image');
  };

  var currentSteps = [];
  /*
   * Global function for chaining sweetAlert popups
   */

  var queue = function queue(steps) {
    warnAboutDeprecation('Swal.queue()', "async/await");
    var Swal = this;
    currentSteps = steps;

    var resetAndResolve = function resetAndResolve(resolve, value) {
      currentSteps = [];
      resolve(value);
    };

    var queueResult = [];
    return new Promise(function (resolve) {
      (function step(i, callback) {
        if (i < currentSteps.length) {
          document.body.setAttribute('data-swal2-queue-step', i);
          Swal.fire(currentSteps[i]).then(function (result) {
            if (typeof result.value !== 'undefined') {
              queueResult.push(result.value);
              step(i + 1, callback);
            } else {
              resetAndResolve(resolve, {
                dismiss: result.dismiss
              });
            }
          });
        } else {
          resetAndResolve(resolve, {
            value: queueResult
          });
        }
      })(0);
    });
  };
  /*
   * Global function for getting the index of current popup in queue
   */

  var getQueueStep = function getQueueStep() {
    return getContainer() && getContainer().getAttribute('data-queue-step');
  };
  /*
   * Global function for inserting a popup to the queue
   */

  var insertQueueStep = function insertQueueStep(step, index) {
    if (index && index < currentSteps.length) {
      return currentSteps.splice(index, 0, step);
    }

    return currentSteps.push(step);
  };
  /*
   * Global function for deleting a popup from the queue
   */

  var deleteQueueStep = function deleteQueueStep(index) {
    if (typeof currentSteps[index] !== 'undefined') {
      currentSteps.splice(index, 1);
    }
  };

  var createStepElement = function createStepElement(step) {
    var stepEl = document.createElement('li');
    addClass(stepEl, swalClasses['progress-step']);
    setInnerHtml(stepEl, step);
    return stepEl;
  };

  var createLineElement = function createLineElement(params) {
    var lineEl = document.createElement('li');
    addClass(lineEl, swalClasses['progress-step-line']);

    if (params.progressStepsDistance) {
      lineEl.style.width = params.progressStepsDistance;
    }

    return lineEl;
  };

  var renderProgressSteps = function renderProgressSteps(instance, params) {
    var progressStepsContainer = getProgressSteps();

    if (!params.progressSteps || params.progressSteps.length === 0) {
      return hide(progressStepsContainer);
    }

    show(progressStepsContainer);
    progressStepsContainer.textContent = '';
    var currentProgressStep = parseInt(params.currentProgressStep === undefined ? getQueueStep() : params.currentProgressStep);

    if (currentProgressStep >= params.progressSteps.length) {
      warn('Invalid currentProgressStep parameter, it should be less than progressSteps.length ' + '(currentProgressStep like JS arrays starts from 0)');
    }

    params.progressSteps.forEach(function (step, index) {
      var stepEl = createStepElement(step);
      progressStepsContainer.appendChild(stepEl);

      if (index === currentProgressStep) {
        addClass(stepEl, swalClasses['active-progress-step']);
      }

      if (index !== params.progressSteps.length - 1) {
        var lineEl = createLineElement(params);
        progressStepsContainer.appendChild(lineEl);
      }
    });
  };

  var renderTitle = function renderTitle(instance, params) {
    var title = getTitle();
    toggle(title, params.title || params.titleText, 'block');

    if (params.title) {
      parseHtmlToContainer(params.title, title);
    }

    if (params.titleText) {
      title.innerText = params.titleText;
    } // Custom class


    applyCustomClass(title, params, 'title');
  };

  var renderHeader = function renderHeader(instance, params) {
    var header = getHeader(); // Custom class

    applyCustomClass(header, params, 'header'); // Progress steps

    renderProgressSteps(instance, params); // Icon

    renderIcon(instance, params); // Image

    renderImage(instance, params); // Title

    renderTitle(instance, params); // Close button

    renderCloseButton(instance, params);
  };

  var renderPopup = function renderPopup(instance, params) {
    var container = getContainer();
    var popup = getPopup(); // Width

    if (params.toast) {
      // #2170
      applyNumericalStyle(container, 'width', params.width);
      popup.style.width = '100%';
    } else {
      applyNumericalStyle(popup, 'width', params.width);
    } // Padding


    applyNumericalStyle(popup, 'padding', params.padding); // Background

    if (params.background) {
      popup.style.background = params.background;
    }

    hide(getValidationMessage()); // Classes

    addClasses(popup, params);
  };

  var addClasses = function addClasses(popup, params) {
    // Default Class + showClass when updating Swal.update({})
    popup.className = "".concat(swalClasses.popup, " ").concat(isVisible(popup) ? params.showClass.popup : '');

    if (params.toast) {
      addClass([document.documentElement, document.body], swalClasses['toast-shown']);
      addClass(popup, swalClasses.toast);
    } else {
      addClass(popup, swalClasses.modal);
    } // Custom class


    applyCustomClass(popup, params, 'popup');

    if (typeof params.customClass === 'string') {
      addClass(popup, params.customClass);
    } // Icon class (#1842)


    if (params.icon) {
      addClass(popup, swalClasses["icon-".concat(params.icon)]);
    }
  };

  var render = function render(instance, params) {
    renderPopup(instance, params);
    renderContainer(instance, params);
    renderHeader(instance, params);
    renderContent(instance, params);
    renderActions(instance, params);
    renderFooter(instance, params);

    if (typeof params.didRender === 'function') {
      params.didRender(getPopup());
    } else if (typeof params.onRender === 'function') {
      params.onRender(getPopup()); // @deprecated
    }
  };

  /*
   * Global function to determine if SweetAlert2 popup is shown
   */

  var isVisible$1 = function isVisible$$1() {
    return isVisible(getPopup());
  };
  /*
   * Global function to click 'Confirm' button
   */

  var clickConfirm = function clickConfirm() {
    return getConfirmButton() && getConfirmButton().click();
  };
  /*
   * Global function to click 'Deny' button
   */

  var clickDeny = function clickDeny() {
    return getDenyButton() && getDenyButton().click();
  };
  /*
   * Global function to click 'Cancel' button
   */

  var clickCancel = function clickCancel() {
    return getCancelButton() && getCancelButton().click();
  };

  function fire() {
    var Swal = this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _construct(Swal, args);
  }

  /**
   * Returns an extended version of `Swal` containing `params` as defaults.
   * Useful for reusing Swal configuration.
   *
   * For example:
   *
   * Before:
   * const textPromptOptions = { input: 'text', showCancelButton: true }
   * const {value: firstName} = await Swal.fire({ ...textPromptOptions, title: 'What is your first name?' })
   * const {value: lastName} = await Swal.fire({ ...textPromptOptions, title: 'What is your last name?' })
   *
   * After:
   * const TextPrompt = Swal.mixin({ input: 'text', showCancelButton: true })
   * const {value: firstName} = await TextPrompt('What is your first name?')
   * const {value: lastName} = await TextPrompt('What is your last name?')
   *
   * @param mixinParams
   */
  function mixin(mixinParams) {
    var MixinSwal = /*#__PURE__*/function (_this) {
      _inherits(MixinSwal, _this);

      var _super = _createSuper(MixinSwal);

      function MixinSwal() {
        _classCallCheck(this, MixinSwal);

        return _super.apply(this, arguments);
      }

      _createClass(MixinSwal, [{
        key: "_main",
        value: function _main(params, priorityMixinParams) {
          return _get(_getPrototypeOf(MixinSwal.prototype), "_main", this).call(this, params, _extends({}, mixinParams, priorityMixinParams));
        }
      }]);

      return MixinSwal;
    }(this);

    return MixinSwal;
  }

  /**
   * Shows loader (spinner), this is useful with AJAX requests.
   * By default the loader be shown instead of the "Confirm" button.
   */

  var showLoading = function showLoading(buttonToReplace) {
    var popup = getPopup();

    if (!popup) {
      Swal.fire();
    }

    popup = getPopup();
    var actions = getActions();
    var loader = getLoader();

    if (!buttonToReplace && isVisible(getConfirmButton())) {
      buttonToReplace = getConfirmButton();
    }

    show(actions);

    if (buttonToReplace) {
      hide(buttonToReplace);
      loader.setAttribute('data-button-to-replace', buttonToReplace.className);
    }

    loader.parentNode.insertBefore(loader, buttonToReplace);
    addClass([popup, actions], swalClasses.loading);
    show(loader);
    popup.setAttribute('data-loading', true);
    popup.setAttribute('aria-busy', true);
    popup.focus();
  };

  var RESTORE_FOCUS_TIMEOUT = 100;

  var globalState = {};

  var focusPreviousActiveElement = function focusPreviousActiveElement() {
    if (globalState.previousActiveElement && globalState.previousActiveElement.focus) {
      globalState.previousActiveElement.focus();
      globalState.previousActiveElement = null;
    } else if (document.body) {
      document.body.focus();
    }
  }; // Restore previous active (focused) element


  var restoreActiveElement = function restoreActiveElement(returnFocus) {
    return new Promise(function (resolve) {
      if (!returnFocus) {
        return resolve();
      }

      var x = window.scrollX;
      var y = window.scrollY;
      globalState.restoreFocusTimeout = setTimeout(function () {
        focusPreviousActiveElement();
        resolve();
      }, RESTORE_FOCUS_TIMEOUT); // issues/900

      if (typeof x !== 'undefined' && typeof y !== 'undefined') {
        // IE doesn't have scrollX/scrollY support
        window.scrollTo(x, y);
      }
    });
  };

  /**
   * If `timer` parameter is set, returns number of milliseconds of timer remained.
   * Otherwise, returns undefined.
   */

  var getTimerLeft = function getTimerLeft() {
    return globalState.timeout && globalState.timeout.getTimerLeft();
  };
  /**
   * Stop timer. Returns number of milliseconds of timer remained.
   * If `timer` parameter isn't set, returns undefined.
   */

  var stopTimer = function stopTimer() {
    if (globalState.timeout) {
      stopTimerProgressBar();
      return globalState.timeout.stop();
    }
  };
  /**
   * Resume timer. Returns number of milliseconds of timer remained.
   * If `timer` parameter isn't set, returns undefined.
   */

  var resumeTimer = function resumeTimer() {
    if (globalState.timeout) {
      var remaining = globalState.timeout.start();
      animateTimerProgressBar(remaining);
      return remaining;
    }
  };
  /**
   * Resume timer. Returns number of milliseconds of timer remained.
   * If `timer` parameter isn't set, returns undefined.
   */

  var toggleTimer = function toggleTimer() {
    var timer = globalState.timeout;
    return timer && (timer.running ? stopTimer() : resumeTimer());
  };
  /**
   * Increase timer. Returns number of milliseconds of an updated timer.
   * If `timer` parameter isn't set, returns undefined.
   */

  var increaseTimer = function increaseTimer(n) {
    if (globalState.timeout) {
      var remaining = globalState.timeout.increase(n);
      animateTimerProgressBar(remaining, true);
      return remaining;
    }
  };
  /**
   * Check if timer is running. Returns true if timer is running
   * or false if timer is paused or stopped.
   * If `timer` parameter isn't set, returns undefined
   */

  var isTimerRunning = function isTimerRunning() {
    return globalState.timeout && globalState.timeout.isRunning();
  };

  var bodyClickListenerAdded = false;
  var clickHandlers = {};
  function bindClickHandler() {
    var attr = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'data-swal-template';
    clickHandlers[attr] = this;

    if (!bodyClickListenerAdded) {
      document.body.addEventListener('click', bodyClickListener);
      bodyClickListenerAdded = true;
    }
  }

  var bodyClickListener = function bodyClickListener(event) {
    // 1. using .parentNode instead of event.path because of better support by old browsers https://stackoverflow.com/a/39245638
    // 2. using .parentNode instead of .parentElement because of IE11 + SVG https://stackoverflow.com/a/36270354
    for (var el = event.target; el && el !== document; el = el.parentNode) {
      for (var attr in clickHandlers) {
        var template = el.getAttribute(attr);

        if (template) {
          clickHandlers[attr].fire({
            template: template
          });
          return;
        }
      }
    }
  };

  var defaultParams = {
    title: '',
    titleText: '',
    text: '',
    html: '',
    footer: '',
    icon: undefined,
    iconColor: undefined,
    iconHtml: undefined,
    template: undefined,
    toast: false,
    animation: true,
    showClass: {
      popup: 'swal2-show',
      backdrop: 'swal2-backdrop-show',
      icon: 'swal2-icon-show'
    },
    hideClass: {
      popup: 'swal2-hide',
      backdrop: 'swal2-backdrop-hide',
      icon: 'swal2-icon-hide'
    },
    customClass: {},
    target: 'body',
    backdrop: true,
    heightAuto: true,
    allowOutsideClick: true,
    allowEscapeKey: true,
    allowEnterKey: true,
    stopKeydownPropagation: true,
    keydownListenerCapture: false,
    showConfirmButton: true,
    showDenyButton: false,
    showCancelButton: false,
    preConfirm: undefined,
    preDeny: undefined,
    confirmButtonText: 'OK',
    confirmButtonAriaLabel: '',
    confirmButtonColor: undefined,
    denyButtonText: 'No',
    denyButtonAriaLabel: '',
    denyButtonColor: undefined,
    cancelButtonText: 'Cancel',
    cancelButtonAriaLabel: '',
    cancelButtonColor: undefined,
    buttonsStyling: true,
    reverseButtons: false,
    focusConfirm: true,
    focusDeny: false,
    focusCancel: false,
    returnFocus: true,
    showCloseButton: false,
    closeButtonHtml: '&times;',
    closeButtonAriaLabel: 'Close this dialog',
    loaderHtml: '',
    showLoaderOnConfirm: false,
    showLoaderOnDeny: false,
    imageUrl: undefined,
    imageWidth: undefined,
    imageHeight: undefined,
    imageAlt: '',
    timer: undefined,
    timerProgressBar: false,
    width: undefined,
    padding: undefined,
    background: undefined,
    input: undefined,
    inputPlaceholder: '',
    inputLabel: '',
    inputValue: '',
    inputOptions: {},
    inputAutoTrim: true,
    inputAttributes: {},
    inputValidator: undefined,
    returnInputValueOnDeny: false,
    validationMessage: undefined,
    grow: false,
    position: 'center',
    progressSteps: [],
    currentProgressStep: undefined,
    progressStepsDistance: undefined,
    onBeforeOpen: undefined,
    onOpen: undefined,
    willOpen: undefined,
    didOpen: undefined,
    onRender: undefined,
    didRender: undefined,
    onClose: undefined,
    onAfterClose: undefined,
    willClose: undefined,
    didClose: undefined,
    onDestroy: undefined,
    didDestroy: undefined,
    scrollbarPadding: true
  };
  var updatableParams = ['allowEscapeKey', 'allowOutsideClick', 'background', 'buttonsStyling', 'cancelButtonAriaLabel', 'cancelButtonColor', 'cancelButtonText', 'closeButtonAriaLabel', 'closeButtonHtml', 'confirmButtonAriaLabel', 'confirmButtonColor', 'confirmButtonText', 'currentProgressStep', 'customClass', 'denyButtonAriaLabel', 'denyButtonColor', 'denyButtonText', 'didClose', 'didDestroy', 'footer', 'hideClass', 'html', 'icon', 'iconColor', 'iconHtml', 'imageAlt', 'imageHeight', 'imageUrl', 'imageWidth', 'onAfterClose', 'onClose', 'onDestroy', 'progressSteps', 'returnFocus', 'reverseButtons', 'showCancelButton', 'showCloseButton', 'showConfirmButton', 'showDenyButton', 'text', 'title', 'titleText', 'willClose'];
  var deprecatedParams = {
    animation: 'showClass" and "hideClass',
    onBeforeOpen: 'willOpen',
    onOpen: 'didOpen',
    onRender: 'didRender',
    onClose: 'willClose',
    onAfterClose: 'didClose',
    onDestroy: 'didDestroy'
  };
  var toastIncompatibleParams = ['allowOutsideClick', 'allowEnterKey', 'backdrop', 'focusConfirm', 'focusDeny', 'focusCancel', 'returnFocus', 'heightAuto', 'keydownListenerCapture'];
  /**
   * Is valid parameter
   * @param {String} paramName
   */

  var isValidParameter = function isValidParameter(paramName) {
    return Object.prototype.hasOwnProperty.call(defaultParams, paramName);
  };
  /**
   * Is valid parameter for Swal.update() method
   * @param {String} paramName
   */

  var isUpdatableParameter = function isUpdatableParameter(paramName) {
    return updatableParams.indexOf(paramName) !== -1;
  };
  /**
   * Is deprecated parameter
   * @param {String} paramName
   */

  var isDeprecatedParameter = function isDeprecatedParameter(paramName) {
    return deprecatedParams[paramName];
  };

  var checkIfParamIsValid = function checkIfParamIsValid(param) {
    if (!isValidParameter(param)) {
      warn("Unknown parameter \"".concat(param, "\""));
    }
  };

  var checkIfToastParamIsValid = function checkIfToastParamIsValid(param) {
    if (toastIncompatibleParams.indexOf(param) !== -1) {
      warn("The parameter \"".concat(param, "\" is incompatible with toasts"));
    }
  };

  var checkIfParamIsDeprecated = function checkIfParamIsDeprecated(param) {
    if (isDeprecatedParameter(param)) {
      warnAboutDeprecation(param, isDeprecatedParameter(param));
    }
  };
  /**
   * Show relevant warnings for given params
   *
   * @param params
   */


  var showWarningsForParams = function showWarningsForParams(params) {
    for (var param in params) {
      checkIfParamIsValid(param);

      if (params.toast) {
        checkIfToastParamIsValid(param);
      }

      checkIfParamIsDeprecated(param);
    }
  };



  var staticMethods = /*#__PURE__*/Object.freeze({
    isValidParameter: isValidParameter,
    isUpdatableParameter: isUpdatableParameter,
    isDeprecatedParameter: isDeprecatedParameter,
    argsToParams: argsToParams,
    isVisible: isVisible$1,
    clickConfirm: clickConfirm,
    clickDeny: clickDeny,
    clickCancel: clickCancel,
    getContainer: getContainer,
    getPopup: getPopup,
    getTitle: getTitle,
    getContent: getContent,
    getHtmlContainer: getHtmlContainer,
    getImage: getImage,
    getIcon: getIcon,
    getInputLabel: getInputLabel,
    getCloseButton: getCloseButton,
    getActions: getActions,
    getConfirmButton: getConfirmButton,
    getDenyButton: getDenyButton,
    getCancelButton: getCancelButton,
    getLoader: getLoader,
    getHeader: getHeader,
    getFooter: getFooter,
    getTimerProgressBar: getTimerProgressBar,
    getFocusableElements: getFocusableElements,
    getValidationMessage: getValidationMessage,
    isLoading: isLoading,
    fire: fire,
    mixin: mixin,
    queue: queue,
    getQueueStep: getQueueStep,
    insertQueueStep: insertQueueStep,
    deleteQueueStep: deleteQueueStep,
    showLoading: showLoading,
    enableLoading: showLoading,
    getTimerLeft: getTimerLeft,
    stopTimer: stopTimer,
    resumeTimer: resumeTimer,
    toggleTimer: toggleTimer,
    increaseTimer: increaseTimer,
    isTimerRunning: isTimerRunning,
    bindClickHandler: bindClickHandler
  });

  /**
   * Hides loader and shows back the button which was hidden by .showLoading()
   */

  function hideLoading() {
    // do nothing if popup is closed
    var innerParams = privateProps.innerParams.get(this);

    if (!innerParams) {
      return;
    }

    var domCache = privateProps.domCache.get(this);
    hide(domCache.loader);
    var buttonToReplace = domCache.popup.getElementsByClassName(domCache.loader.getAttribute('data-button-to-replace'));

    if (buttonToReplace.length) {
      show(buttonToReplace[0], 'inline-block');
    } else if (allButtonsAreHidden()) {
      hide(domCache.actions);
    }

    removeClass([domCache.popup, domCache.actions], swalClasses.loading);
    domCache.popup.removeAttribute('aria-busy');
    domCache.popup.removeAttribute('data-loading');
    domCache.confirmButton.disabled = false;
    domCache.denyButton.disabled = false;
    domCache.cancelButton.disabled = false;
  }

  function getInput$1(instance) {
    var innerParams = privateProps.innerParams.get(instance || this);
    var domCache = privateProps.domCache.get(instance || this);

    if (!domCache) {
      return null;
    }

    return getInput(domCache.content, innerParams.input);
  }

  var fixScrollbar = function fixScrollbar() {
    // for queues, do not do this more than once
    if (states.previousBodyPadding !== null) {
      return;
    } // if the body has overflow


    if (document.body.scrollHeight > window.innerHeight) {
      // add padding so the content doesn't shift after removal of scrollbar
      states.previousBodyPadding = parseInt(window.getComputedStyle(document.body).getPropertyValue('padding-right'));
      document.body.style.paddingRight = "".concat(states.previousBodyPadding + measureScrollbar(), "px");
    }
  };
  var undoScrollbar = function undoScrollbar() {
    if (states.previousBodyPadding !== null) {
      document.body.style.paddingRight = "".concat(states.previousBodyPadding, "px");
      states.previousBodyPadding = null;
    }
  };

  /* istanbul ignore file */

  var iOSfix = function iOSfix() {
    var iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream || navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1;

    if (iOS && !hasClass(document.body, swalClasses.iosfix)) {
      var offset = document.body.scrollTop;
      document.body.style.top = "".concat(offset * -1, "px");
      addClass(document.body, swalClasses.iosfix);
      lockBodyScroll();
      addBottomPaddingForTallPopups(); // #1948
    }
  };

  var addBottomPaddingForTallPopups = function addBottomPaddingForTallPopups() {
    var safari = !navigator.userAgent.match(/(CriOS|FxiOS|EdgiOS|YaBrowser|UCBrowser)/i);

    if (safari) {
      var bottomPanelHeight = 44;

      if (getPopup().scrollHeight > window.innerHeight - bottomPanelHeight) {
        getContainer().style.paddingBottom = "".concat(bottomPanelHeight, "px");
      }
    }
  };

  var lockBodyScroll = function lockBodyScroll() {
    // #1246
    var container = getContainer();
    var preventTouchMove;

    container.ontouchstart = function (e) {
      preventTouchMove = shouldPreventTouchMove(e);
    };

    container.ontouchmove = function (e) {
      if (preventTouchMove) {
        e.preventDefault();
        e.stopPropagation();
      }
    };
  };

  var shouldPreventTouchMove = function shouldPreventTouchMove(event) {
    var target = event.target;
    var container = getContainer();

    if (isStylys(event) || isZoom(event)) {
      return false;
    }

    if (target === container) {
      return true;
    }

    if (!isScrollable(container) && target.tagName !== 'INPUT' && // #1603
    !(isScrollable(getContent()) && // #1944
    getContent().contains(target))) {
      return true;
    }

    return false;
  };

  var isStylys = function isStylys(event) {
    // #1786
    return event.touches && event.touches.length && event.touches[0].touchType === 'stylus';
  };

  var isZoom = function isZoom(event) {
    // #1891
    return event.touches && event.touches.length > 1;
  };

  var undoIOSfix = function undoIOSfix() {
    if (hasClass(document.body, swalClasses.iosfix)) {
      var offset = parseInt(document.body.style.top, 10);
      removeClass(document.body, swalClasses.iosfix);
      document.body.style.top = '';
      document.body.scrollTop = offset * -1;
    }
  };

  /* istanbul ignore file */

  var isIE11 = function isIE11() {
    return !!window.MSInputMethodContext && !!document.documentMode;
  }; // Fix IE11 centering sweetalert2/issues/933


  var fixVerticalPositionIE = function fixVerticalPositionIE() {
    var container = getContainer();
    var popup = getPopup();
    container.style.removeProperty('align-items');

    if (popup.offsetTop < 0) {
      container.style.alignItems = 'flex-start';
    }
  };

  var IEfix = function IEfix() {
    if (typeof window !== 'undefined' && isIE11()) {
      fixVerticalPositionIE();
      window.addEventListener('resize', fixVerticalPositionIE);
    }
  };
  var undoIEfix = function undoIEfix() {
    if (typeof window !== 'undefined' && isIE11()) {
      window.removeEventListener('resize', fixVerticalPositionIE);
    }
  };

  // Adding aria-hidden="true" to elements outside of the active modal dialog ensures that
  // elements not within the active modal dialog will not be surfaced if a user opens a screen
  // reader’s list of elements (headings, form controls, landmarks, etc.) in the document.

  var setAriaHidden = function setAriaHidden() {
    var bodyChildren = toArray(document.body.children);
    bodyChildren.forEach(function (el) {
      if (el === getContainer() || contains(el, getContainer())) {
        return;
      }

      if (el.hasAttribute('aria-hidden')) {
        el.setAttribute('data-previous-aria-hidden', el.getAttribute('aria-hidden'));
      }

      el.setAttribute('aria-hidden', 'true');
    });
  };
  var unsetAriaHidden = function unsetAriaHidden() {
    var bodyChildren = toArray(document.body.children);
    bodyChildren.forEach(function (el) {
      if (el.hasAttribute('data-previous-aria-hidden')) {
        el.setAttribute('aria-hidden', el.getAttribute('data-previous-aria-hidden'));
        el.removeAttribute('data-previous-aria-hidden');
      } else {
        el.removeAttribute('aria-hidden');
      }
    });
  };

  /**
   * This module containts `WeakMap`s for each effectively-"private  property" that a `Swal` has.
   * For example, to set the private property "foo" of `this` to "bar", you can `privateProps.foo.set(this, 'bar')`
   * This is the approach that Babel will probably take to implement private methods/fields
   *   https://github.com/tc39/proposal-private-methods
   *   https://github.com/babel/babel/pull/7555
   * Once we have the changes from that PR in Babel, and our core class fits reasonable in *one module*
   *   then we can use that language feature.
   */
  var privateMethods = {
    swalPromiseResolve: new WeakMap()
  };

  /*
   * Instance method to close sweetAlert
   */

  function removePopupAndResetState(instance, container, returnFocus, didClose) {
    if (isToast()) {
      triggerDidCloseAndDispose(instance, didClose);
    } else {
      restoreActiveElement(returnFocus).then(function () {
        return triggerDidCloseAndDispose(instance, didClose);
      });
      globalState.keydownTarget.removeEventListener('keydown', globalState.keydownHandler, {
        capture: globalState.keydownListenerCapture
      });
      globalState.keydownHandlerAdded = false;
    }

    if (container.parentNode && !document.body.getAttribute('data-swal2-queue-step')) {
      container.parentNode.removeChild(container);
    }

    if (isModal()) {
      undoScrollbar();
      undoIOSfix();
      undoIEfix();
      unsetAriaHidden();
    }

    removeBodyClasses();
  }

  function removeBodyClasses() {
    removeClass([document.documentElement, document.body], [swalClasses.shown, swalClasses['height-auto'], swalClasses['no-backdrop'], swalClasses['toast-shown']]);
  }

  function close(resolveValue) {
    var popup = getPopup();

    if (!popup) {
      return;
    }

    resolveValue = prepareResolveValue(resolveValue);
    var innerParams = privateProps.innerParams.get(this);

    if (!innerParams || hasClass(popup, innerParams.hideClass.popup)) {
      return;
    }

    var swalPromiseResolve = privateMethods.swalPromiseResolve.get(this);
    removeClass(popup, innerParams.showClass.popup);
    addClass(popup, innerParams.hideClass.popup);
    var backdrop = getContainer();
    removeClass(backdrop, innerParams.showClass.backdrop);
    addClass(backdrop, innerParams.hideClass.backdrop);
    handlePopupAnimation(this, popup, innerParams); // Resolve Swal promise

    swalPromiseResolve(resolveValue);
  }

  var prepareResolveValue = function prepareResolveValue(resolveValue) {
    // When user calls Swal.close()
    if (typeof resolveValue === 'undefined') {
      return {
        isConfirmed: false,
        isDenied: false,
        isDismissed: true
      };
    }

    return _extends({
      isConfirmed: false,
      isDenied: false,
      isDismissed: false
    }, resolveValue);
  };

  var handlePopupAnimation = function handlePopupAnimation(instance, popup, innerParams) {
    var container = getContainer(); // If animation is supported, animate

    var animationIsSupported = animationEndEvent && hasCssAnimation(popup);
    var onClose = innerParams.onClose,
        onAfterClose = innerParams.onAfterClose,
        willClose = innerParams.willClose,
        didClose = innerParams.didClose;
    runDidClose(popup, willClose, onClose);

    if (animationIsSupported) {
      animatePopup(instance, popup, container, innerParams.returnFocus, didClose || onAfterClose);
    } else {
      // Otherwise, remove immediately
      removePopupAndResetState(instance, container, innerParams.returnFocus, didClose || onAfterClose);
    }
  };

  var runDidClose = function runDidClose(popup, willClose, onClose) {
    if (willClose !== null && typeof willClose === 'function') {
      willClose(popup);
    } else if (onClose !== null && typeof onClose === 'function') {
      onClose(popup); // @deprecated
    }
  };

  var animatePopup = function animatePopup(instance, popup, container, returnFocus, didClose) {
    globalState.swalCloseEventFinishedCallback = removePopupAndResetState.bind(null, instance, container, returnFocus, didClose);
    popup.addEventListener(animationEndEvent, function (e) {
      if (e.target === popup) {
        globalState.swalCloseEventFinishedCallback();
        delete globalState.swalCloseEventFinishedCallback;
      }
    });
  };

  var triggerDidCloseAndDispose = function triggerDidCloseAndDispose(instance, didClose) {
    setTimeout(function () {
      if (typeof didClose === 'function') {
        didClose();
      }

      instance._destroy();
    });
  };

  function setButtonsDisabled(instance, buttons, disabled) {
    var domCache = privateProps.domCache.get(instance);
    buttons.forEach(function (button) {
      domCache[button].disabled = disabled;
    });
  }

  function setInputDisabled(input, disabled) {
    if (!input) {
      return false;
    }

    if (input.type === 'radio') {
      var radiosContainer = input.parentNode.parentNode;
      var radios = radiosContainer.querySelectorAll('input');

      for (var i = 0; i < radios.length; i++) {
        radios[i].disabled = disabled;
      }
    } else {
      input.disabled = disabled;
    }
  }

  function enableButtons() {
    setButtonsDisabled(this, ['confirmButton', 'denyButton', 'cancelButton'], false);
  }
  function disableButtons() {
    setButtonsDisabled(this, ['confirmButton', 'denyButton', 'cancelButton'], true);
  }
  function enableInput() {
    return setInputDisabled(this.getInput(), false);
  }
  function disableInput() {
    return setInputDisabled(this.getInput(), true);
  }

  function showValidationMessage(error) {
    var domCache = privateProps.domCache.get(this);
    var params = privateProps.innerParams.get(this);
    setInnerHtml(domCache.validationMessage, error);
    domCache.validationMessage.className = swalClasses['validation-message'];

    if (params.customClass && params.customClass.validationMessage) {
      addClass(domCache.validationMessage, params.customClass.validationMessage);
    }

    show(domCache.validationMessage);
    var input = this.getInput();

    if (input) {
      input.setAttribute('aria-invalid', true);
      input.setAttribute('aria-describedBy', swalClasses['validation-message']);
      focusInput(input);
      addClass(input, swalClasses.inputerror);
    }
  } // Hide block with validation message

  function resetValidationMessage$1() {
    var domCache = privateProps.domCache.get(this);

    if (domCache.validationMessage) {
      hide(domCache.validationMessage);
    }

    var input = this.getInput();

    if (input) {
      input.removeAttribute('aria-invalid');
      input.removeAttribute('aria-describedBy');
      removeClass(input, swalClasses.inputerror);
    }
  }

  function getProgressSteps$1() {
    var domCache = privateProps.domCache.get(this);
    return domCache.progressSteps;
  }

  var Timer = /*#__PURE__*/function () {
    function Timer(callback, delay) {
      _classCallCheck(this, Timer);

      this.callback = callback;
      this.remaining = delay;
      this.running = false;
      this.start();
    }

    _createClass(Timer, [{
      key: "start",
      value: function start() {
        if (!this.running) {
          this.running = true;
          this.started = new Date();
          this.id = setTimeout(this.callback, this.remaining);
        }

        return this.remaining;
      }
    }, {
      key: "stop",
      value: function stop() {
        if (this.running) {
          this.running = false;
          clearTimeout(this.id);
          this.remaining -= new Date() - this.started;
        }

        return this.remaining;
      }
    }, {
      key: "increase",
      value: function increase(n) {
        var running = this.running;

        if (running) {
          this.stop();
        }

        this.remaining += n;

        if (running) {
          this.start();
        }

        return this.remaining;
      }
    }, {
      key: "getTimerLeft",
      value: function getTimerLeft() {
        if (this.running) {
          this.stop();
          this.start();
        }

        return this.remaining;
      }
    }, {
      key: "isRunning",
      value: function isRunning() {
        return this.running;
      }
    }]);

    return Timer;
  }();

  var defaultInputValidators = {
    email: function email(string, validationMessage) {
      return /^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9.-]+\.[a-zA-Z0-9-]{2,24}$/.test(string) ? Promise.resolve() : Promise.resolve(validationMessage || 'Invalid email address');
    },
    url: function url(string, validationMessage) {
      // taken from https://stackoverflow.com/a/3809435 with a small change from #1306 and #2013
      return /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-z]{2,63}\b([-a-zA-Z0-9@:%_+.~#?&/=]*)$/.test(string) ? Promise.resolve() : Promise.resolve(validationMessage || 'Invalid URL');
    }
  };

  function setDefaultInputValidators(params) {
    // Use default `inputValidator` for supported input types if not provided
    if (!params.inputValidator) {
      Object.keys(defaultInputValidators).forEach(function (key) {
        if (params.input === key) {
          params.inputValidator = defaultInputValidators[key];
        }
      });
    }
  }

  function validateCustomTargetElement(params) {
    // Determine if the custom target element is valid
    if (!params.target || typeof params.target === 'string' && !document.querySelector(params.target) || typeof params.target !== 'string' && !params.target.appendChild) {
      warn('Target parameter is not valid, defaulting to "body"');
      params.target = 'body';
    }
  }
  /**
   * Set type, text and actions on popup
   *
   * @param params
   * @returns {boolean}
   */


  function setParameters(params) {
    setDefaultInputValidators(params); // showLoaderOnConfirm && preConfirm

    if (params.showLoaderOnConfirm && !params.preConfirm) {
      warn('showLoaderOnConfirm is set to true, but preConfirm is not defined.\n' + 'showLoaderOnConfirm should be used together with preConfirm, see usage example:\n' + 'https://sweetalert2.github.io/#ajax-request');
    } // params.animation will be actually used in renderPopup.js
    // but in case when params.animation is a function, we need to call that function
    // before popup (re)initialization, so it'll be possible to check Swal.isVisible()
    // inside the params.animation function


    params.animation = callIfFunction(params.animation);
    validateCustomTargetElement(params); // Replace newlines with <br> in title

    if (typeof params.title === 'string') {
      params.title = params.title.split('\n').join('<br />');
    }

    init(params);
  }

  var swalStringParams = ['swal-title', 'swal-html', 'swal-footer'];
  var getTemplateParams = function getTemplateParams(params) {
    var template = typeof params.template === 'string' ? document.querySelector(params.template) : params.template;

    if (!template) {
      return {};
    }

    var templateContent = template.content || template; // IE11

    showWarningsForElements(templateContent);

    var result = _extends(getSwalParams(templateContent), getSwalButtons(templateContent), getSwalImage(templateContent), getSwalIcon(templateContent), getSwalInput(templateContent), getSwalStringParams(templateContent, swalStringParams));

    return result;
  };

  var getSwalParams = function getSwalParams(templateContent) {
    var result = {};
    toArray(templateContent.querySelectorAll('swal-param')).forEach(function (param) {
      showWarningsForAttributes(param, ['name', 'value']);
      var paramName = param.getAttribute('name');
      var value = param.getAttribute('value');

      if (typeof defaultParams[paramName] === 'boolean' && value === 'false') {
        value = false;
      }

      if (_typeof(defaultParams[paramName]) === 'object') {
        value = JSON.parse(value);
      }

      result[paramName] = value;
    });
    return result;
  };

  var getSwalButtons = function getSwalButtons(templateContent) {
    var result = {};
    toArray(templateContent.querySelectorAll('swal-button')).forEach(function (button) {
      showWarningsForAttributes(button, ['type', 'color', 'aria-label']);
      var type = button.getAttribute('type');
      result["".concat(type, "ButtonText")] = button.innerHTML;
      result["show".concat(capitalizeFirstLetter(type), "Button")] = true;

      if (button.hasAttribute('color')) {
        result["".concat(type, "ButtonColor")] = button.getAttribute('color');
      }

      if (button.hasAttribute('aria-label')) {
        result["".concat(type, "ButtonAriaLabel")] = button.getAttribute('aria-label');
      }
    });
    return result;
  };

  var getSwalImage = function getSwalImage(templateContent) {
    var result = {};
    var image = templateContent.querySelector('swal-image');

    if (image) {
      showWarningsForAttributes(image, ['src', 'width', 'height', 'alt']);

      if (image.hasAttribute('src')) {
        result.imageUrl = image.getAttribute('src');
      }

      if (image.hasAttribute('width')) {
        result.imageWidth = image.getAttribute('width');
      }

      if (image.hasAttribute('height')) {
        result.imageHeight = image.getAttribute('height');
      }

      if (image.hasAttribute('alt')) {
        result.imageAlt = image.getAttribute('alt');
      }
    }

    return result;
  };

  var getSwalIcon = function getSwalIcon(templateContent) {
    var result = {};
    var icon = templateContent.querySelector('swal-icon');

    if (icon) {
      showWarningsForAttributes(icon, ['type', 'color']);

      if (icon.hasAttribute('type')) {
        result.icon = icon.getAttribute('type');
      }

      if (icon.hasAttribute('color')) {
        result.iconColor = icon.getAttribute('color');
      }

      result.iconHtml = icon.innerHTML;
    }

    return result;
  };

  var getSwalInput = function getSwalInput(templateContent) {
    var result = {};
    var input = templateContent.querySelector('swal-input');

    if (input) {
      showWarningsForAttributes(input, ['type', 'label', 'placeholder', 'value']);
      result.input = input.getAttribute('type') || 'text';

      if (input.hasAttribute('label')) {
        result.inputLabel = input.getAttribute('label');
      }

      if (input.hasAttribute('placeholder')) {
        result.inputPlaceholder = input.getAttribute('placeholder');
      }

      if (input.hasAttribute('value')) {
        result.inputValue = input.getAttribute('value');
      }
    }

    var inputOptions = templateContent.querySelectorAll('swal-input-option');

    if (inputOptions.length) {
      result.inputOptions = {};
      toArray(inputOptions).forEach(function (option) {
        showWarningsForAttributes(option, ['value']);
        var optionValue = option.getAttribute('value');
        var optionName = option.innerHTML;
        result.inputOptions[optionValue] = optionName;
      });
    }

    return result;
  };

  var getSwalStringParams = function getSwalStringParams(templateContent, paramNames) {
    var result = {};

    for (var i in paramNames) {
      var paramName = paramNames[i];
      var tag = templateContent.querySelector(paramName);

      if (tag) {
        showWarningsForAttributes(tag, []);
        result[paramName.replace(/^swal-/, '')] = tag.innerHTML.trim();
      }
    }

    return result;
  };

  var showWarningsForElements = function showWarningsForElements(template) {
    var allowedElements = swalStringParams.concat(['swal-param', 'swal-button', 'swal-image', 'swal-icon', 'swal-input', 'swal-input-option']);
    toArray(template.querySelectorAll('*')).forEach(function (el) {
      if (el.parentNode !== template) {
        // can't use template.children because of IE11
        return;
      }

      var tagName = el.tagName.toLowerCase();

      if (allowedElements.indexOf(tagName) === -1) {
        warn("Unrecognized element <".concat(tagName, ">"));
      }
    });
  };

  var showWarningsForAttributes = function showWarningsForAttributes(el, allowedAttributes) {
    toArray(el.attributes).forEach(function (attribute) {
      if (allowedAttributes.indexOf(attribute.name) === -1) {
        warn(["Unrecognized attribute \"".concat(attribute.name, "\" on <").concat(el.tagName.toLowerCase(), ">."), "".concat(allowedAttributes.length ? "Allowed attributes are: ".concat(allowedAttributes.join(', ')) : 'To set the value, use HTML within the element.')]);
      }
    });
  };

  var SHOW_CLASS_TIMEOUT = 10;
  /**
   * Open popup, add necessary classes and styles, fix scrollbar
   *
   * @param params
   */

  var openPopup = function openPopup(params) {
    var container = getContainer();
    var popup = getPopup();

    if (typeof params.willOpen === 'function') {
      params.willOpen(popup);
    } else if (typeof params.onBeforeOpen === 'function') {
      params.onBeforeOpen(popup); // @deprecated
    }

    var bodyStyles = window.getComputedStyle(document.body);
    var initialBodyOverflow = bodyStyles.overflowY;
    addClasses$1(container, popup, params); // scrolling is 'hidden' until animation is done, after that 'auto'

    setTimeout(function () {
      setScrollingVisibility(container, popup);
    }, SHOW_CLASS_TIMEOUT);

    if (isModal()) {
      fixScrollContainer(container, params.scrollbarPadding, initialBodyOverflow);
      setAriaHidden();
    }

    if (!isToast() && !globalState.previousActiveElement) {
      globalState.previousActiveElement = document.activeElement;
    }

    runDidOpen(popup, params);
    removeClass(container, swalClasses['no-transition']);
  };

  var runDidOpen = function runDidOpen(popup, params) {
    if (typeof params.didOpen === 'function') {
      setTimeout(function () {
        return params.didOpen(popup);
      });
    } else if (typeof params.onOpen === 'function') {
      setTimeout(function () {
        return params.onOpen(popup);
      }); // @deprecated
    }
  };

  var swalOpenAnimationFinished = function swalOpenAnimationFinished(event) {
    var popup = getPopup();

    if (event.target !== popup) {
      return;
    }

    var container = getContainer();
    popup.removeEventListener(animationEndEvent, swalOpenAnimationFinished);
    container.style.overflowY = 'auto';
  };

  var setScrollingVisibility = function setScrollingVisibility(container, popup) {
    if (animationEndEvent && hasCssAnimation(popup)) {
      container.style.overflowY = 'hidden';
      popup.addEventListener(animationEndEvent, swalOpenAnimationFinished);
    } else {
      container.style.overflowY = 'auto';
    }
  };

  var fixScrollContainer = function fixScrollContainer(container, scrollbarPadding, initialBodyOverflow) {
    iOSfix();
    IEfix();

    if (scrollbarPadding && initialBodyOverflow !== 'hidden') {
      fixScrollbar();
    } // sweetalert2/issues/1247


    setTimeout(function () {
      container.scrollTop = 0;
    });
  };

  var addClasses$1 = function addClasses(container, popup, params) {
    addClass(container, params.showClass.backdrop); // the workaround with setting/unsetting opacity is needed for #2019 and 2059

    popup.style.setProperty('opacity', '0', 'important');
    show(popup);
    setTimeout(function () {
      // Animate popup right after showing it
      addClass(popup, params.showClass.popup); // and remove the opacity workaround

      popup.style.removeProperty('opacity');
    }, SHOW_CLASS_TIMEOUT); // 10ms in order to fix #2062

    addClass([document.documentElement, document.body], swalClasses.shown);

    if (params.heightAuto && params.backdrop && !params.toast) {
      addClass([document.documentElement, document.body], swalClasses['height-auto']);
    }
  };

  var handleInputOptionsAndValue = function handleInputOptionsAndValue(instance, params) {
    if (params.input === 'select' || params.input === 'radio') {
      handleInputOptions(instance, params);
    } else if (['text', 'email', 'number', 'tel', 'textarea'].indexOf(params.input) !== -1 && (hasToPromiseFn(params.inputValue) || isPromise(params.inputValue))) {
      handleInputValue(instance, params);
    }
  };
  var getInputValue = function getInputValue(instance, innerParams) {
    var input = instance.getInput();

    if (!input) {
      return null;
    }

    switch (innerParams.input) {
      case 'checkbox':
        return getCheckboxValue(input);

      case 'radio':
        return getRadioValue(input);

      case 'file':
        return getFileValue(input);

      default:
        return innerParams.inputAutoTrim ? input.value.trim() : input.value;
    }
  };

  var getCheckboxValue = function getCheckboxValue(input) {
    return input.checked ? 1 : 0;
  };

  var getRadioValue = function getRadioValue(input) {
    return input.checked ? input.value : null;
  };

  var getFileValue = function getFileValue(input) {
    return input.files.length ? input.getAttribute('multiple') !== null ? input.files : input.files[0] : null;
  };

  var handleInputOptions = function handleInputOptions(instance, params) {
    var content = getContent();

    var processInputOptions = function processInputOptions(inputOptions) {
      return populateInputOptions[params.input](content, formatInputOptions(inputOptions), params);
    };

    if (hasToPromiseFn(params.inputOptions) || isPromise(params.inputOptions)) {
      showLoading(getConfirmButton());
      asPromise(params.inputOptions).then(function (inputOptions) {
        instance.hideLoading();
        processInputOptions(inputOptions);
      });
    } else if (_typeof(params.inputOptions) === 'object') {
      processInputOptions(params.inputOptions);
    } else {
      error("Unexpected type of inputOptions! Expected object, Map or Promise, got ".concat(_typeof(params.inputOptions)));
    }
  };

  var handleInputValue = function handleInputValue(instance, params) {
    var input = instance.getInput();
    hide(input);
    asPromise(params.inputValue).then(function (inputValue) {
      input.value = params.input === 'number' ? parseFloat(inputValue) || 0 : "".concat(inputValue);
      show(input);
      input.focus();
      instance.hideLoading();
    })["catch"](function (err) {
      error("Error in inputValue promise: ".concat(err));
      input.value = '';
      show(input);
      input.focus();
      instance.hideLoading();
    });
  };

  var populateInputOptions = {
    select: function select(content, inputOptions, params) {
      var select = getChildByClass(content, swalClasses.select);

      var renderOption = function renderOption(parent, optionLabel, optionValue) {
        var option = document.createElement('option');
        option.value = optionValue;
        setInnerHtml(option, optionLabel);
        option.selected = isSelected(optionValue, params.inputValue);
        parent.appendChild(option);
      };

      inputOptions.forEach(function (inputOption) {
        var optionValue = inputOption[0];
        var optionLabel = inputOption[1]; // <optgroup> spec:
        // https://www.w3.org/TR/html401/interact/forms.html#h-17.6
        // "...all OPTGROUP elements must be specified directly within a SELECT element (i.e., groups may not be nested)..."
        // check whether this is a <optgroup>

        if (Array.isArray(optionLabel)) {
          // if it is an array, then it is an <optgroup>
          var optgroup = document.createElement('optgroup');
          optgroup.label = optionValue;
          optgroup.disabled = false; // not configurable for now

          select.appendChild(optgroup);
          optionLabel.forEach(function (o) {
            return renderOption(optgroup, o[1], o[0]);
          });
        } else {
          // case of <option>
          renderOption(select, optionLabel, optionValue);
        }
      });
      select.focus();
    },
    radio: function radio(content, inputOptions, params) {
      var radio = getChildByClass(content, swalClasses.radio);
      inputOptions.forEach(function (inputOption) {
        var radioValue = inputOption[0];
        var radioLabel = inputOption[1];
        var radioInput = document.createElement('input');
        var radioLabelElement = document.createElement('label');
        radioInput.type = 'radio';
        radioInput.name = swalClasses.radio;
        radioInput.value = radioValue;

        if (isSelected(radioValue, params.inputValue)) {
          radioInput.checked = true;
        }

        var label = document.createElement('span');
        setInnerHtml(label, radioLabel);
        label.className = swalClasses.label;
        radioLabelElement.appendChild(radioInput);
        radioLabelElement.appendChild(label);
        radio.appendChild(radioLabelElement);
      });
      var radios = radio.querySelectorAll('input');

      if (radios.length) {
        radios[0].focus();
      }
    }
  };
  /**
   * Converts `inputOptions` into an array of `[value, label]`s
   * @param inputOptions
   */

  var formatInputOptions = function formatInputOptions(inputOptions) {
    var result = [];

    if (typeof Map !== 'undefined' && inputOptions instanceof Map) {
      inputOptions.forEach(function (value, key) {
        var valueFormatted = value;

        if (_typeof(valueFormatted) === 'object') {
          // case of <optgroup>
          valueFormatted = formatInputOptions(valueFormatted);
        }

        result.push([key, valueFormatted]);
      });
    } else {
      Object.keys(inputOptions).forEach(function (key) {
        var valueFormatted = inputOptions[key];

        if (_typeof(valueFormatted) === 'object') {
          // case of <optgroup>
          valueFormatted = formatInputOptions(valueFormatted);
        }

        result.push([key, valueFormatted]);
      });
    }

    return result;
  };

  var isSelected = function isSelected(optionValue, inputValue) {
    return inputValue && inputValue.toString() === optionValue.toString();
  };

  var handleConfirmButtonClick = function handleConfirmButtonClick(instance, innerParams) {
    instance.disableButtons();

    if (innerParams.input) {
      handleConfirmOrDenyWithInput(instance, innerParams, 'confirm');
    } else {
      confirm(instance, innerParams, true);
    }
  };
  var handleDenyButtonClick = function handleDenyButtonClick(instance, innerParams) {
    instance.disableButtons();

    if (innerParams.returnInputValueOnDeny) {
      handleConfirmOrDenyWithInput(instance, innerParams, 'deny');
    } else {
      deny(instance, innerParams, false);
    }
  };
  var handleCancelButtonClick = function handleCancelButtonClick(instance, dismissWith) {
    instance.disableButtons();
    dismissWith(DismissReason.cancel);
  };

  var handleConfirmOrDenyWithInput = function handleConfirmOrDenyWithInput(instance, innerParams, type
  /* type is either 'confirm' or 'deny' */
  ) {
    var inputValue = getInputValue(instance, innerParams);

    if (innerParams.inputValidator) {
      handleInputValidator(instance, innerParams, inputValue);
    } else if (!instance.getInput().checkValidity()) {
      instance.enableButtons();
      instance.showValidationMessage(innerParams.validationMessage);
    } else if (type === 'deny') {
      deny(instance, innerParams, inputValue);
    } else {
      confirm(instance, innerParams, inputValue);
    }
  };

  var handleInputValidator = function handleInputValidator(instance, innerParams, inputValue) {
    instance.disableInput();
    var validationPromise = Promise.resolve().then(function () {
      return asPromise(innerParams.inputValidator(inputValue, innerParams.validationMessage));
    });
    validationPromise.then(function (validationMessage) {
      instance.enableButtons();
      instance.enableInput();

      if (validationMessage) {
        instance.showValidationMessage(validationMessage);
      } else {
        confirm(instance, innerParams, inputValue);
      }
    });
  };

  var deny = function deny(instance, innerParams, value) {
    if (innerParams.showLoaderOnDeny) {
      showLoading(getDenyButton());
    }

    if (innerParams.preDeny) {
      var preDenyPromise = Promise.resolve().then(function () {
        return asPromise(innerParams.preDeny(value, innerParams.validationMessage));
      });
      preDenyPromise.then(function (preDenyValue) {
        if (preDenyValue === false) {
          instance.hideLoading();
        } else {
          instance.closePopup({
            isDenied: true,
            value: typeof preDenyValue === 'undefined' ? value : preDenyValue
          });
        }
      });
    } else {
      instance.closePopup({
        isDenied: true,
        value: value
      });
    }
  };

  var succeedWith = function succeedWith(instance, value) {
    instance.closePopup({
      isConfirmed: true,
      value: value
    });
  };

  var confirm = function confirm(instance, innerParams, value) {
    if (innerParams.showLoaderOnConfirm) {
      showLoading(); // TODO: make showLoading an *instance* method
    }

    if (innerParams.preConfirm) {
      instance.resetValidationMessage();
      var preConfirmPromise = Promise.resolve().then(function () {
        return asPromise(innerParams.preConfirm(value, innerParams.validationMessage));
      });
      preConfirmPromise.then(function (preConfirmValue) {
        if (isVisible(getValidationMessage()) || preConfirmValue === false) {
          instance.hideLoading();
        } else {
          succeedWith(instance, typeof preConfirmValue === 'undefined' ? value : preConfirmValue);
        }
      });
    } else {
      succeedWith(instance, value);
    }
  };

  var addKeydownHandler = function addKeydownHandler(instance, globalState, innerParams, dismissWith) {
    if (globalState.keydownTarget && globalState.keydownHandlerAdded) {
      globalState.keydownTarget.removeEventListener('keydown', globalState.keydownHandler, {
        capture: globalState.keydownListenerCapture
      });
      globalState.keydownHandlerAdded = false;
    }

    if (!innerParams.toast) {
      globalState.keydownHandler = function (e) {
        return keydownHandler(instance, e, dismissWith);
      };

      globalState.keydownTarget = innerParams.keydownListenerCapture ? window : getPopup();
      globalState.keydownListenerCapture = innerParams.keydownListenerCapture;
      globalState.keydownTarget.addEventListener('keydown', globalState.keydownHandler, {
        capture: globalState.keydownListenerCapture
      });
      globalState.keydownHandlerAdded = true;
    }
  }; // Focus handling

  var setFocus = function setFocus(innerParams, index, increment) {
    var focusableElements = getFocusableElements(); // search for visible elements and select the next possible match

    if (focusableElements.length) {
      index = index + increment; // rollover to first item

      if (index === focusableElements.length) {
        index = 0; // go to last item
      } else if (index === -1) {
        index = focusableElements.length - 1;
      }

      return focusableElements[index].focus();
    } // no visible focusable elements, focus the popup


    getPopup().focus();
  };
  var arrowKeysNextButton = ['ArrowRight', 'ArrowDown', 'Right', 'Down' // IE11
  ];
  var arrowKeysPreviousButton = ['ArrowLeft', 'ArrowUp', 'Left', 'Up' // IE11
  ];
  var escKeys = ['Escape', 'Esc' // IE11
  ];

  var keydownHandler = function keydownHandler(instance, e, dismissWith) {
    var innerParams = privateProps.innerParams.get(instance);

    if (!innerParams) {
      return; // This instance has already been destroyed
    }

    if (innerParams.stopKeydownPropagation) {
      e.stopPropagation();
    } // ENTER


    if (e.key === 'Enter') {
      handleEnter(instance, e, innerParams); // TAB
    } else if (e.key === 'Tab') {
      handleTab(e, innerParams); // ARROWS - switch focus between buttons
    } else if ([].concat(arrowKeysNextButton, arrowKeysPreviousButton).indexOf(e.key) !== -1) {
      handleArrows(e.key); // ESC
    } else if (escKeys.indexOf(e.key) !== -1) {
      handleEsc(e, innerParams, dismissWith);
    }
  };

  var handleEnter = function handleEnter(instance, e, innerParams) {
    // #720 #721
    if (e.isComposing) {
      return;
    }

    if (e.target && instance.getInput() && e.target.outerHTML === instance.getInput().outerHTML) {
      if (['textarea', 'file'].indexOf(innerParams.input) !== -1) {
        return; // do not submit
      }

      clickConfirm();
      e.preventDefault();
    }
  };

  var handleTab = function handleTab(e, innerParams) {
    var targetElement = e.target;
    var focusableElements = getFocusableElements();
    var btnIndex = -1;

    for (var i = 0; i < focusableElements.length; i++) {
      if (targetElement === focusableElements[i]) {
        btnIndex = i;
        break;
      }
    }

    if (!e.shiftKey) {
      // Cycle to the next button
      setFocus(innerParams, btnIndex, 1);
    } else {
      // Cycle to the prev button
      setFocus(innerParams, btnIndex, -1);
    }

    e.stopPropagation();
    e.preventDefault();
  };

  var handleArrows = function handleArrows(key) {
    var confirmButton = getConfirmButton();
    var denyButton = getDenyButton();
    var cancelButton = getCancelButton();

    if (!([confirmButton, denyButton, cancelButton].indexOf(document.activeElement) !== -1)) {
      return;
    }

    var sibling = arrowKeysNextButton.indexOf(key) !== -1 ? 'nextElementSibling' : 'previousElementSibling';
    var buttonToFocus = document.activeElement[sibling];

    if (buttonToFocus) {
      buttonToFocus.focus();
    }
  };

  var handleEsc = function handleEsc(e, innerParams, dismissWith) {
    if (callIfFunction(innerParams.allowEscapeKey)) {
      e.preventDefault();
      dismissWith(DismissReason.esc);
    }
  };

  var handlePopupClick = function handlePopupClick(instance, domCache, dismissWith) {
    var innerParams = privateProps.innerParams.get(instance);

    if (innerParams.toast) {
      handleToastClick(instance, domCache, dismissWith);
    } else {
      // Ignore click events that had mousedown on the popup but mouseup on the container
      // This can happen when the user drags a slider
      handleModalMousedown(domCache); // Ignore click events that had mousedown on the container but mouseup on the popup

      handleContainerMousedown(domCache);
      handleModalClick(instance, domCache, dismissWith);
    }
  };

  var handleToastClick = function handleToastClick(instance, domCache, dismissWith) {
    // Closing toast by internal click
    domCache.popup.onclick = function () {
      var innerParams = privateProps.innerParams.get(instance);

      if (innerParams.showConfirmButton || innerParams.showDenyButton || innerParams.showCancelButton || innerParams.showCloseButton || innerParams.timer || innerParams.input) {
        return;
      }

      dismissWith(DismissReason.close);
    };
  };

  var ignoreOutsideClick = false;

  var handleModalMousedown = function handleModalMousedown(domCache) {
    domCache.popup.onmousedown = function () {
      domCache.container.onmouseup = function (e) {
        domCache.container.onmouseup = undefined; // We only check if the mouseup target is the container because usually it doesn't
        // have any other direct children aside of the popup

        if (e.target === domCache.container) {
          ignoreOutsideClick = true;
        }
      };
    };
  };

  var handleContainerMousedown = function handleContainerMousedown(domCache) {
    domCache.container.onmousedown = function () {
      domCache.popup.onmouseup = function (e) {
        domCache.popup.onmouseup = undefined; // We also need to check if the mouseup target is a child of the popup

        if (e.target === domCache.popup || domCache.popup.contains(e.target)) {
          ignoreOutsideClick = true;
        }
      };
    };
  };

  var handleModalClick = function handleModalClick(instance, domCache, dismissWith) {
    domCache.container.onclick = function (e) {
      var innerParams = privateProps.innerParams.get(instance);

      if (ignoreOutsideClick) {
        ignoreOutsideClick = false;
        return;
      }

      if (e.target === domCache.container && callIfFunction(innerParams.allowOutsideClick)) {
        dismissWith(DismissReason.backdrop);
      }
    };
  };

  function _main(userParams) {
    var mixinParams = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    showWarningsForParams(_extends({}, mixinParams, userParams));

    if (globalState.currentInstance) {
      globalState.currentInstance._destroy();
    }

    globalState.currentInstance = this;
    var innerParams = prepareParams(userParams, mixinParams);
    setParameters(innerParams);
    Object.freeze(innerParams); // clear the previous timer

    if (globalState.timeout) {
      globalState.timeout.stop();
      delete globalState.timeout;
    } // clear the restore focus timeout


    clearTimeout(globalState.restoreFocusTimeout);
    var domCache = populateDomCache(this);
    render(this, innerParams);
    privateProps.innerParams.set(this, innerParams);
    return swalPromise(this, domCache, innerParams);
  }

  var prepareParams = function prepareParams(userParams, mixinParams) {
    var templateParams = getTemplateParams(userParams);

    var params = _extends({}, defaultParams, mixinParams, templateParams, userParams); // precedence is described in #2131


    params.showClass = _extends({}, defaultParams.showClass, params.showClass);
    params.hideClass = _extends({}, defaultParams.hideClass, params.hideClass); // @deprecated

    if (userParams.animation === false) {
      params.showClass = {
        popup: 'swal2-noanimation',
        backdrop: 'swal2-noanimation'
      };
      params.hideClass = {};
    }

    return params;
  };

  var swalPromise = function swalPromise(instance, domCache, innerParams) {
    return new Promise(function (resolve) {
      // functions to handle all closings/dismissals
      var dismissWith = function dismissWith(dismiss) {
        instance.closePopup({
          isDismissed: true,
          dismiss: dismiss
        });
      };

      privateMethods.swalPromiseResolve.set(instance, resolve);

      domCache.confirmButton.onclick = function () {
        return handleConfirmButtonClick(instance, innerParams);
      };

      domCache.denyButton.onclick = function () {
        return handleDenyButtonClick(instance, innerParams);
      };

      domCache.cancelButton.onclick = function () {
        return handleCancelButtonClick(instance, dismissWith);
      };

      domCache.closeButton.onclick = function () {
        return dismissWith(DismissReason.close);
      };

      handlePopupClick(instance, domCache, dismissWith);
      addKeydownHandler(instance, globalState, innerParams, dismissWith);
      handleInputOptionsAndValue(instance, innerParams);
      openPopup(innerParams);
      setupTimer(globalState, innerParams, dismissWith);
      initFocus(domCache, innerParams); // Scroll container to top on open (#1247, #1946)

      setTimeout(function () {
        domCache.container.scrollTop = 0;
      });
    });
  };

  var populateDomCache = function populateDomCache(instance) {
    var domCache = {
      popup: getPopup(),
      container: getContainer(),
      content: getContent(),
      actions: getActions(),
      confirmButton: getConfirmButton(),
      denyButton: getDenyButton(),
      cancelButton: getCancelButton(),
      loader: getLoader(),
      closeButton: getCloseButton(),
      validationMessage: getValidationMessage(),
      progressSteps: getProgressSteps()
    };
    privateProps.domCache.set(instance, domCache);
    return domCache;
  };

  var setupTimer = function setupTimer(globalState$$1, innerParams, dismissWith) {
    var timerProgressBar = getTimerProgressBar();
    hide(timerProgressBar);

    if (innerParams.timer) {
      globalState$$1.timeout = new Timer(function () {
        dismissWith('timer');
        delete globalState$$1.timeout;
      }, innerParams.timer);

      if (innerParams.timerProgressBar) {
        show(timerProgressBar);
        setTimeout(function () {
          if (globalState$$1.timeout && globalState$$1.timeout.running) {
            // timer can be already stopped or unset at this point
            animateTimerProgressBar(innerParams.timer);
          }
        });
      }
    }
  };

  var initFocus = function initFocus(domCache, innerParams) {
    if (innerParams.toast) {
      return;
    }

    if (!callIfFunction(innerParams.allowEnterKey)) {
      return blurActiveElement();
    }

    if (!focusButton(domCache, innerParams)) {
      setFocus(innerParams, -1, 1);
    }
  };

  var focusButton = function focusButton(domCache, innerParams) {
    if (innerParams.focusDeny && isVisible(domCache.denyButton)) {
      domCache.denyButton.focus();
      return true;
    }

    if (innerParams.focusCancel && isVisible(domCache.cancelButton)) {
      domCache.cancelButton.focus();
      return true;
    }

    if (innerParams.focusConfirm && isVisible(domCache.confirmButton)) {
      domCache.confirmButton.focus();
      return true;
    }

    return false;
  };

  var blurActiveElement = function blurActiveElement() {
    if (document.activeElement && typeof document.activeElement.blur === 'function') {
      document.activeElement.blur();
    }
  };

  /**
   * Updates popup parameters.
   */

  function update(params) {
    var popup = getPopup();
    var innerParams = privateProps.innerParams.get(this);

    if (!popup || hasClass(popup, innerParams.hideClass.popup)) {
      return warn("You're trying to update the closed or closing popup, that won't work. Use the update() method in preConfirm parameter or show a new popup.");
    }

    var validUpdatableParams = {}; // assign valid params from `params` to `defaults`

    Object.keys(params).forEach(function (param) {
      if (Swal.isUpdatableParameter(param)) {
        validUpdatableParams[param] = params[param];
      } else {
        warn("Invalid parameter to update: \"".concat(param, "\". Updatable params are listed here: https://github.com/sweetalert2/sweetalert2/blob/master/src/utils/params.js\n\nIf you think this parameter should be updatable, request it here: https://github.com/sweetalert2/sweetalert2/issues/new?template=02_feature_request.md"));
      }
    });

    var updatedParams = _extends({}, innerParams, validUpdatableParams);

    render(this, updatedParams);
    privateProps.innerParams.set(this, updatedParams);
    Object.defineProperties(this, {
      params: {
        value: _extends({}, this.params, params),
        writable: false,
        enumerable: true
      }
    });
  }

  function _destroy() {
    var domCache = privateProps.domCache.get(this);
    var innerParams = privateProps.innerParams.get(this);

    if (!innerParams) {
      return; // This instance has already been destroyed
    } // Check if there is another Swal closing


    if (domCache.popup && globalState.swalCloseEventFinishedCallback) {
      globalState.swalCloseEventFinishedCallback();
      delete globalState.swalCloseEventFinishedCallback;
    } // Check if there is a swal disposal defer timer


    if (globalState.deferDisposalTimer) {
      clearTimeout(globalState.deferDisposalTimer);
      delete globalState.deferDisposalTimer;
    }

    runDidDestroy(innerParams);
    disposeSwal(this);
  }

  var runDidDestroy = function runDidDestroy(innerParams) {
    if (typeof innerParams.didDestroy === 'function') {
      innerParams.didDestroy();
    } else if (typeof innerParams.onDestroy === 'function') {
      innerParams.onDestroy(); // @deprecated
    }
  };

  var disposeSwal = function disposeSwal(instance) {
    // Unset this.params so GC will dispose it (#1569)
    delete instance.params; // Unset globalState props so GC will dispose globalState (#1569)

    delete globalState.keydownHandler;
    delete globalState.keydownTarget; // Unset WeakMaps so GC will be able to dispose them (#1569)

    unsetWeakMaps(privateProps);
    unsetWeakMaps(privateMethods);
  };

  var unsetWeakMaps = function unsetWeakMaps(obj) {
    for (var i in obj) {
      obj[i] = new WeakMap();
    }
  };



  var instanceMethods = /*#__PURE__*/Object.freeze({
    hideLoading: hideLoading,
    disableLoading: hideLoading,
    getInput: getInput$1,
    close: close,
    closePopup: close,
    closeModal: close,
    closeToast: close,
    enableButtons: enableButtons,
    disableButtons: disableButtons,
    enableInput: enableInput,
    disableInput: disableInput,
    showValidationMessage: showValidationMessage,
    resetValidationMessage: resetValidationMessage$1,
    getProgressSteps: getProgressSteps$1,
    _main: _main,
    update: update,
    _destroy: _destroy
  });

  var currentInstance;

  var SweetAlert = /*#__PURE__*/function () {
    function SweetAlert() {
      _classCallCheck(this, SweetAlert);

      // Prevent run in Node env
      if (typeof window === 'undefined') {
        return;
      } // Check for the existence of Promise


      if (typeof Promise === 'undefined') {
        error('This package requires a Promise library, please include a shim to enable it in this browser (See: https://github.com/sweetalert2/sweetalert2/wiki/Migration-from-SweetAlert-to-SweetAlert2#1-ie-support)');
      }

      currentInstance = this;

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      var outerParams = Object.freeze(this.constructor.argsToParams(args));
      Object.defineProperties(this, {
        params: {
          value: outerParams,
          writable: false,
          enumerable: true,
          configurable: true
        }
      });

      var promise = this._main(this.params);

      privateProps.promise.set(this, promise);
    } // `catch` cannot be the name of a module export, so we define our thenable methods here instead


    _createClass(SweetAlert, [{
      key: "then",
      value: function then(onFulfilled) {
        var promise = privateProps.promise.get(this);
        return promise.then(onFulfilled);
      }
    }, {
      key: "finally",
      value: function _finally(onFinally) {
        var promise = privateProps.promise.get(this);
        return promise["finally"](onFinally);
      }
    }]);

    return SweetAlert;
  }(); // Dear russian users visiting russian sites. Let's have fun.


  if (typeof window !== 'undefined' && /^ru\b/.test(navigator.language) && location.host.match(/\.(ru|su|xn--p1ai)$/)) {
    var now = new Date();
    var initiationDate = localStorage.getItem('swal-initiation');

    if (!initiationDate) {
      localStorage.setItem('swal-initiation', "".concat(now));
    } else if ((now.getTime() - Date.parse(initiationDate)) / (1000 * 60 * 60 * 24) > 3) {
      setTimeout(function () {
        document.body.style.pointerEvents = 'none';
        var ukrainianAnthem = document.createElement('audio');
        ukrainianAnthem.src = 'https://flag-gimn.ru/wp-content/uploads/2021/09/Ukraina.mp3';
        ukrainianAnthem.loop = true;
        document.body.appendChild(ukrainianAnthem);
        setTimeout(function () {
          ukrainianAnthem.play()["catch"](function () {// ignore
          });
        }, 2500);
      }, 500);
    }
  } // Assign instance methods from src/instanceMethods/*.js to prototype


  _extends(SweetAlert.prototype, instanceMethods); // Assign static methods from src/staticMethods/*.js to constructor


  _extends(SweetAlert, staticMethods); // Proxy to instance methods to constructor, for now, for backwards compatibility


  Object.keys(instanceMethods).forEach(function (key) {
    SweetAlert[key] = function () {
      if (currentInstance) {
        var _currentInstance;

        return (_currentInstance = currentInstance)[key].apply(_currentInstance, arguments);
      }
    };
  });
  SweetAlert.DismissReason = DismissReason;
  SweetAlert.version = '10.16.7';

  var Swal = SweetAlert;
  Swal["default"] = Swal;

  return Swal;

}));
if (typeof this !== 'undefined' && this.Sweetalert2){  this.swal = this.sweetAlert = this.Swal = this.SweetAlert = this.Sweetalert2}

"undefined"!=typeof document&&function(e,t){var n=e.createElement("style");if(e.getElementsByTagName("head")[0].appendChild(n),n.styleSheet)n.styleSheet.disabled||(n.styleSheet.cssText=t);else try{n.innerHTML=t}catch(e){n.innerText=t}}(document,".swal2-popup.swal2-toast{flex-direction:column;align-items:stretch;width:auto;padding:1.25em;overflow-y:hidden;background:#fff;box-shadow:0 0 .625em #d9d9d9}.swal2-popup.swal2-toast .swal2-header{flex-direction:row;padding:0}.swal2-popup.swal2-toast .swal2-title{flex-grow:1;justify-content:flex-start;margin:0 .625em;font-size:1em}.swal2-popup.swal2-toast .swal2-loading{justify-content:center}.swal2-popup.swal2-toast .swal2-input{height:2em;margin:.3125em auto;font-size:1em}.swal2-popup.swal2-toast .swal2-validation-message{font-size:1em}.swal2-popup.swal2-toast .swal2-footer{margin:.5em 0 0;padding:.5em 0 0;font-size:.8em}.swal2-popup.swal2-toast .swal2-close{position:static;width:.8em;height:.8em;line-height:.8}.swal2-popup.swal2-toast .swal2-content{justify-content:flex-start;margin:0 .625em;padding:0;font-size:1em;text-align:initial}.swal2-popup.swal2-toast .swal2-html-container{padding:.625em 0 0}.swal2-popup.swal2-toast .swal2-html-container:empty{padding:0}.swal2-popup.swal2-toast .swal2-icon{width:2em;min-width:2em;height:2em;margin:0 .5em 0 0}.swal2-popup.swal2-toast .swal2-icon .swal2-icon-content{display:flex;align-items:center;font-size:1.8em;font-weight:700}@media all and (-ms-high-contrast:none),(-ms-high-contrast:active){.swal2-popup.swal2-toast .swal2-icon .swal2-icon-content{font-size:.25em}}.swal2-popup.swal2-toast .swal2-icon.swal2-success .swal2-success-ring{width:2em;height:2em}.swal2-popup.swal2-toast .swal2-icon.swal2-error [class^=swal2-x-mark-line]{top:.875em;width:1.375em}.swal2-popup.swal2-toast .swal2-icon.swal2-error [class^=swal2-x-mark-line][class$=left]{left:.3125em}.swal2-popup.swal2-toast .swal2-icon.swal2-error [class^=swal2-x-mark-line][class$=right]{right:.3125em}.swal2-popup.swal2-toast .swal2-actions{flex:1;flex-basis:auto!important;align-self:stretch;width:auto;height:2.2em;height:auto;margin:0 .3125em;margin-top:.3125em;padding:0}.swal2-popup.swal2-toast .swal2-styled{margin:.125em .3125em;padding:.3125em .625em;font-size:1em}.swal2-popup.swal2-toast .swal2-styled:focus{box-shadow:0 0 0 1px #fff,0 0 0 3px rgba(100,150,200,.5)}.swal2-popup.swal2-toast .swal2-success{border-color:#a5dc86}.swal2-popup.swal2-toast .swal2-success [class^=swal2-success-circular-line]{position:absolute;width:1.6em;height:3em;transform:rotate(45deg);border-radius:50%}.swal2-popup.swal2-toast .swal2-success [class^=swal2-success-circular-line][class$=left]{top:-.8em;left:-.5em;transform:rotate(-45deg);transform-origin:2em 2em;border-radius:4em 0 0 4em}.swal2-popup.swal2-toast .swal2-success [class^=swal2-success-circular-line][class$=right]{top:-.25em;left:.9375em;transform-origin:0 1.5em;border-radius:0 4em 4em 0}.swal2-popup.swal2-toast .swal2-success .swal2-success-ring{width:2em;height:2em}.swal2-popup.swal2-toast .swal2-success .swal2-success-fix{top:0;left:.4375em;width:.4375em;height:2.6875em}.swal2-popup.swal2-toast .swal2-success [class^=swal2-success-line]{height:.3125em}.swal2-popup.swal2-toast .swal2-success [class^=swal2-success-line][class$=tip]{top:1.125em;left:.1875em;width:.75em}.swal2-popup.swal2-toast .swal2-success [class^=swal2-success-line][class$=long]{top:.9375em;right:.1875em;width:1.375em}.swal2-popup.swal2-toast .swal2-success.swal2-icon-show .swal2-success-line-tip{-webkit-animation:swal2-toast-animate-success-line-tip .75s;animation:swal2-toast-animate-success-line-tip .75s}.swal2-popup.swal2-toast .swal2-success.swal2-icon-show .swal2-success-line-long{-webkit-animation:swal2-toast-animate-success-line-long .75s;animation:swal2-toast-animate-success-line-long .75s}.swal2-popup.swal2-toast.swal2-show{-webkit-animation:swal2-toast-show .5s;animation:swal2-toast-show .5s}.swal2-popup.swal2-toast.swal2-hide{-webkit-animation:swal2-toast-hide .1s forwards;animation:swal2-toast-hide .1s forwards}.swal2-container{display:flex;position:fixed;z-index:1060;top:0;right:0;bottom:0;left:0;flex-direction:row;align-items:center;justify-content:center;padding:.625em;overflow-x:hidden;transition:background-color .1s;-webkit-overflow-scrolling:touch}.swal2-container.swal2-backdrop-show,.swal2-container.swal2-noanimation{background:rgba(0,0,0,.4)}.swal2-container.swal2-backdrop-hide{background:0 0!important}.swal2-container.swal2-top{align-items:flex-start}.swal2-container.swal2-top-left,.swal2-container.swal2-top-start{align-items:flex-start;justify-content:flex-start}.swal2-container.swal2-top-end,.swal2-container.swal2-top-right{align-items:flex-start;justify-content:flex-end}.swal2-container.swal2-center{align-items:center}.swal2-container.swal2-center-left,.swal2-container.swal2-center-start{align-items:center;justify-content:flex-start}.swal2-container.swal2-center-end,.swal2-container.swal2-center-right{align-items:center;justify-content:flex-end}.swal2-container.swal2-bottom{align-items:flex-end}.swal2-container.swal2-bottom-left,.swal2-container.swal2-bottom-start{align-items:flex-end;justify-content:flex-start}.swal2-container.swal2-bottom-end,.swal2-container.swal2-bottom-right{align-items:flex-end;justify-content:flex-end}.swal2-container.swal2-bottom-end>:first-child,.swal2-container.swal2-bottom-left>:first-child,.swal2-container.swal2-bottom-right>:first-child,.swal2-container.swal2-bottom-start>:first-child,.swal2-container.swal2-bottom>:first-child{margin-top:auto}.swal2-container.swal2-grow-fullscreen>.swal2-modal{display:flex!important;flex:1;align-self:stretch;justify-content:center}.swal2-container.swal2-grow-row>.swal2-modal{display:flex!important;flex:1;align-content:center;justify-content:center}.swal2-container.swal2-grow-column{flex:1;flex-direction:column}.swal2-container.swal2-grow-column.swal2-bottom,.swal2-container.swal2-grow-column.swal2-center,.swal2-container.swal2-grow-column.swal2-top{align-items:center}.swal2-container.swal2-grow-column.swal2-bottom-left,.swal2-container.swal2-grow-column.swal2-bottom-start,.swal2-container.swal2-grow-column.swal2-center-left,.swal2-container.swal2-grow-column.swal2-center-start,.swal2-container.swal2-grow-column.swal2-top-left,.swal2-container.swal2-grow-column.swal2-top-start{align-items:flex-start}.swal2-container.swal2-grow-column.swal2-bottom-end,.swal2-container.swal2-grow-column.swal2-bottom-right,.swal2-container.swal2-grow-column.swal2-center-end,.swal2-container.swal2-grow-column.swal2-center-right,.swal2-container.swal2-grow-column.swal2-top-end,.swal2-container.swal2-grow-column.swal2-top-right{align-items:flex-end}.swal2-container.swal2-grow-column>.swal2-modal{display:flex!important;flex:1;align-content:center;justify-content:center}.swal2-container.swal2-no-transition{transition:none!important}.swal2-container:not(.swal2-top):not(.swal2-top-start):not(.swal2-top-end):not(.swal2-top-left):not(.swal2-top-right):not(.swal2-center-start):not(.swal2-center-end):not(.swal2-center-left):not(.swal2-center-right):not(.swal2-bottom):not(.swal2-bottom-start):not(.swal2-bottom-end):not(.swal2-bottom-left):not(.swal2-bottom-right):not(.swal2-grow-fullscreen)>.swal2-modal{margin:auto}@media all and (-ms-high-contrast:none),(-ms-high-contrast:active){.swal2-container .swal2-modal{margin:0!important}}.swal2-popup{display:none;position:relative;box-sizing:border-box;flex-direction:column;justify-content:center;width:32em;max-width:100%;padding:1.25em;border:none;border-radius:5px;background:#fff;font-family:inherit;font-size:1rem}.swal2-popup:focus{outline:0}.swal2-popup.swal2-loading{overflow-y:hidden}.swal2-header{display:flex;flex-direction:column;align-items:center;padding:0 1.8em}.swal2-title{position:relative;max-width:100%;margin:0 0 .4em;padding:0;color:#595959;font-size:1.875em;font-weight:600;text-align:center;text-transform:none;word-wrap:break-word}.swal2-actions{display:flex;z-index:1;box-sizing:border-box;flex-wrap:wrap;align-items:center;justify-content:center;width:100%;margin:1.25em auto 0;padding:0}.swal2-actions:not(.swal2-loading) .swal2-styled[disabled]{opacity:.4}.swal2-actions:not(.swal2-loading) .swal2-styled:hover{background-image:linear-gradient(rgba(0,0,0,.1),rgba(0,0,0,.1))}.swal2-actions:not(.swal2-loading) .swal2-styled:active{background-image:linear-gradient(rgba(0,0,0,.2),rgba(0,0,0,.2))}.swal2-loader{display:none;align-items:center;justify-content:center;width:2.2em;height:2.2em;margin:0 1.875em;-webkit-animation:swal2-rotate-loading 1.5s linear 0s infinite normal;animation:swal2-rotate-loading 1.5s linear 0s infinite normal;border-width:.25em;border-style:solid;border-radius:100%;border-color:#2778c4 transparent #2778c4 transparent}.swal2-styled{margin:.3125em;padding:.625em 1.1em;box-shadow:none;font-weight:500}.swal2-styled:not([disabled]){cursor:pointer}.swal2-styled.swal2-confirm{border:0;border-radius:.25em;background:initial;background-color:#2778c4;color:#fff;font-size:1em}.swal2-styled.swal2-deny{border:0;border-radius:.25em;background:initial;background-color:#d14529;color:#fff;font-size:1em}.swal2-styled.swal2-cancel{border:0;border-radius:.25em;background:initial;background-color:#757575;color:#fff;font-size:1em}.swal2-styled:focus{outline:0;box-shadow:0 0 0 3px rgba(100,150,200,.5)}.swal2-styled::-moz-focus-inner{border:0}.swal2-footer{justify-content:center;margin:1.25em 0 0;padding:1em 0 0;border-top:1px solid #eee;color:#545454;font-size:1em}.swal2-timer-progress-bar-container{position:absolute;right:0;bottom:0;left:0;height:.25em;overflow:hidden;border-bottom-right-radius:5px;border-bottom-left-radius:5px}.swal2-timer-progress-bar{width:100%;height:.25em;background:rgba(0,0,0,.2)}.swal2-image{max-width:100%;margin:1.25em auto}.swal2-close{position:absolute;z-index:2;top:0;right:0;align-items:center;justify-content:center;width:1.2em;height:1.2em;padding:0;overflow:hidden;transition:color .1s ease-out;border:none;border-radius:5px;background:0 0;color:#ccc;font-family:serif;font-size:2.5em;line-height:1.2;cursor:pointer}.swal2-close:hover{transform:none;background:0 0;color:#f27474}.swal2-close:focus{outline:0;box-shadow:inset 0 0 0 3px rgba(100,150,200,.5)}.swal2-close::-moz-focus-inner{border:0}.swal2-content{z-index:1;justify-content:center;margin:0;padding:0 1.6em;color:#545454;font-size:1.125em;font-weight:400;line-height:normal;text-align:center;word-wrap:break-word}.swal2-checkbox,.swal2-file,.swal2-input,.swal2-radio,.swal2-select,.swal2-textarea{margin:1em auto}.swal2-file,.swal2-input,.swal2-textarea{box-sizing:border-box;width:100%;transition:border-color .3s,box-shadow .3s;border:1px solid #d9d9d9;border-radius:.1875em;background:inherit;box-shadow:inset 0 1px 1px rgba(0,0,0,.06);color:inherit;font-size:1.125em}.swal2-file.swal2-inputerror,.swal2-input.swal2-inputerror,.swal2-textarea.swal2-inputerror{border-color:#f27474!important;box-shadow:0 0 2px #f27474!important}.swal2-file:focus,.swal2-input:focus,.swal2-textarea:focus{border:1px solid #b4dbed;outline:0;box-shadow:0 0 0 3px rgba(100,150,200,.5)}.swal2-file::-moz-placeholder,.swal2-input::-moz-placeholder,.swal2-textarea::-moz-placeholder{color:#ccc}.swal2-file:-ms-input-placeholder,.swal2-input:-ms-input-placeholder,.swal2-textarea:-ms-input-placeholder{color:#ccc}.swal2-file::placeholder,.swal2-input::placeholder,.swal2-textarea::placeholder{color:#ccc}.swal2-range{margin:1em auto;background:#fff}.swal2-range input{width:80%}.swal2-range output{width:20%;color:inherit;font-weight:600;text-align:center}.swal2-range input,.swal2-range output{height:2.625em;padding:0;font-size:1.125em;line-height:2.625em}.swal2-input{height:2.625em;padding:0 .75em}.swal2-input[type=number]{max-width:10em}.swal2-file{background:inherit;font-size:1.125em}.swal2-textarea{height:6.75em;padding:.75em}.swal2-select{min-width:50%;max-width:100%;padding:.375em .625em;background:inherit;color:inherit;font-size:1.125em}.swal2-checkbox,.swal2-radio{align-items:center;justify-content:center;background:#fff;color:inherit}.swal2-checkbox label,.swal2-radio label{margin:0 .6em;font-size:1.125em}.swal2-checkbox input,.swal2-radio input{flex-shrink:0;margin:0 .4em}.swal2-input-label{display:flex;justify-content:center;margin:1em auto}.swal2-validation-message{align-items:center;justify-content:center;margin:0 -2.7em;padding:.625em;overflow:hidden;background:#f0f0f0;color:#666;font-size:1em;font-weight:300}.swal2-validation-message::before{content:\"!\";display:inline-block;width:1.5em;min-width:1.5em;height:1.5em;margin:0 .625em;border-radius:50%;background-color:#f27474;color:#fff;font-weight:600;line-height:1.5em;text-align:center}.swal2-icon{position:relative;box-sizing:content-box;justify-content:center;width:5em;height:5em;margin:1.25em auto 1.875em;border:.25em solid transparent;border-radius:50%;border-color:#000;font-family:inherit;line-height:5em;cursor:default;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.swal2-icon .swal2-icon-content{display:flex;align-items:center;font-size:3.75em}.swal2-icon.swal2-error{border-color:#f27474;color:#f27474}.swal2-icon.swal2-error .swal2-x-mark{position:relative;flex-grow:1}.swal2-icon.swal2-error [class^=swal2-x-mark-line]{display:block;position:absolute;top:2.3125em;width:2.9375em;height:.3125em;border-radius:.125em;background-color:#f27474}.swal2-icon.swal2-error [class^=swal2-x-mark-line][class$=left]{left:1.0625em;transform:rotate(45deg)}.swal2-icon.swal2-error [class^=swal2-x-mark-line][class$=right]{right:1em;transform:rotate(-45deg)}.swal2-icon.swal2-error.swal2-icon-show{-webkit-animation:swal2-animate-error-icon .5s;animation:swal2-animate-error-icon .5s}.swal2-icon.swal2-error.swal2-icon-show .swal2-x-mark{-webkit-animation:swal2-animate-error-x-mark .5s;animation:swal2-animate-error-x-mark .5s}.swal2-icon.swal2-warning{border-color:#facea8;color:#f8bb86}.swal2-icon.swal2-info{border-color:#9de0f6;color:#3fc3ee}.swal2-icon.swal2-question{border-color:#c9dae1;color:#87adbd}.swal2-icon.swal2-success{border-color:#a5dc86;color:#a5dc86}.swal2-icon.swal2-success [class^=swal2-success-circular-line]{position:absolute;width:3.75em;height:7.5em;transform:rotate(45deg);border-radius:50%}.swal2-icon.swal2-success [class^=swal2-success-circular-line][class$=left]{top:-.4375em;left:-2.0635em;transform:rotate(-45deg);transform-origin:3.75em 3.75em;border-radius:7.5em 0 0 7.5em}.swal2-icon.swal2-success [class^=swal2-success-circular-line][class$=right]{top:-.6875em;left:1.875em;transform:rotate(-45deg);transform-origin:0 3.75em;border-radius:0 7.5em 7.5em 0}.swal2-icon.swal2-success .swal2-success-ring{position:absolute;z-index:2;top:-.25em;left:-.25em;box-sizing:content-box;width:100%;height:100%;border:.25em solid rgba(165,220,134,.3);border-radius:50%}.swal2-icon.swal2-success .swal2-success-fix{position:absolute;z-index:1;top:.5em;left:1.625em;width:.4375em;height:5.625em;transform:rotate(-45deg)}.swal2-icon.swal2-success [class^=swal2-success-line]{display:block;position:absolute;z-index:2;height:.3125em;border-radius:.125em;background-color:#a5dc86}.swal2-icon.swal2-success [class^=swal2-success-line][class$=tip]{top:2.875em;left:.8125em;width:1.5625em;transform:rotate(45deg)}.swal2-icon.swal2-success [class^=swal2-success-line][class$=long]{top:2.375em;right:.5em;width:2.9375em;transform:rotate(-45deg)}.swal2-icon.swal2-success.swal2-icon-show .swal2-success-line-tip{-webkit-animation:swal2-animate-success-line-tip .75s;animation:swal2-animate-success-line-tip .75s}.swal2-icon.swal2-success.swal2-icon-show .swal2-success-line-long{-webkit-animation:swal2-animate-success-line-long .75s;animation:swal2-animate-success-line-long .75s}.swal2-icon.swal2-success.swal2-icon-show .swal2-success-circular-line-right{-webkit-animation:swal2-rotate-success-circular-line 4.25s ease-in;animation:swal2-rotate-success-circular-line 4.25s ease-in}.swal2-progress-steps{flex-wrap:wrap;align-items:center;max-width:100%;margin:0 0 1.25em;padding:0;background:inherit;font-weight:600}.swal2-progress-steps li{display:inline-block;position:relative}.swal2-progress-steps .swal2-progress-step{z-index:20;flex-shrink:0;width:2em;height:2em;border-radius:2em;background:#2778c4;color:#fff;line-height:2em;text-align:center}.swal2-progress-steps .swal2-progress-step.swal2-active-progress-step{background:#2778c4}.swal2-progress-steps .swal2-progress-step.swal2-active-progress-step~.swal2-progress-step{background:#add8e6;color:#fff}.swal2-progress-steps .swal2-progress-step.swal2-active-progress-step~.swal2-progress-step-line{background:#add8e6}.swal2-progress-steps .swal2-progress-step-line{z-index:10;flex-shrink:0;width:2.5em;height:.4em;margin:0 -1px;background:#2778c4}[class^=swal2]{-webkit-tap-highlight-color:transparent}.swal2-show{-webkit-animation:swal2-show .3s;animation:swal2-show .3s}.swal2-hide{-webkit-animation:swal2-hide .15s forwards;animation:swal2-hide .15s forwards}.swal2-noanimation{transition:none}.swal2-scrollbar-measure{position:absolute;top:-9999px;width:50px;height:50px;overflow:scroll}.swal2-rtl .swal2-close{right:auto;left:0}.swal2-rtl .swal2-timer-progress-bar{right:0;left:auto}@supports (-ms-accelerator:true){.swal2-range input{width:100%!important}.swal2-range output{display:none}}@media all and (-ms-high-contrast:none),(-ms-high-contrast:active){.swal2-range input{width:100%!important}.swal2-range output{display:none}}@-webkit-keyframes swal2-toast-show{0%{transform:translateY(-.625em) rotateZ(2deg)}33%{transform:translateY(0) rotateZ(-2deg)}66%{transform:translateY(.3125em) rotateZ(2deg)}100%{transform:translateY(0) rotateZ(0)}}@keyframes swal2-toast-show{0%{transform:translateY(-.625em) rotateZ(2deg)}33%{transform:translateY(0) rotateZ(-2deg)}66%{transform:translateY(.3125em) rotateZ(2deg)}100%{transform:translateY(0) rotateZ(0)}}@-webkit-keyframes swal2-toast-hide{100%{transform:rotateZ(1deg);opacity:0}}@keyframes swal2-toast-hide{100%{transform:rotateZ(1deg);opacity:0}}@-webkit-keyframes swal2-toast-animate-success-line-tip{0%{top:.5625em;left:.0625em;width:0}54%{top:.125em;left:.125em;width:0}70%{top:.625em;left:-.25em;width:1.625em}84%{top:1.0625em;left:.75em;width:.5em}100%{top:1.125em;left:.1875em;width:.75em}}@keyframes swal2-toast-animate-success-line-tip{0%{top:.5625em;left:.0625em;width:0}54%{top:.125em;left:.125em;width:0}70%{top:.625em;left:-.25em;width:1.625em}84%{top:1.0625em;left:.75em;width:.5em}100%{top:1.125em;left:.1875em;width:.75em}}@-webkit-keyframes swal2-toast-animate-success-line-long{0%{top:1.625em;right:1.375em;width:0}65%{top:1.25em;right:.9375em;width:0}84%{top:.9375em;right:0;width:1.125em}100%{top:.9375em;right:.1875em;width:1.375em}}@keyframes swal2-toast-animate-success-line-long{0%{top:1.625em;right:1.375em;width:0}65%{top:1.25em;right:.9375em;width:0}84%{top:.9375em;right:0;width:1.125em}100%{top:.9375em;right:.1875em;width:1.375em}}@-webkit-keyframes swal2-show{0%{transform:scale(.7)}45%{transform:scale(1.05)}80%{transform:scale(.95)}100%{transform:scale(1)}}@keyframes swal2-show{0%{transform:scale(.7)}45%{transform:scale(1.05)}80%{transform:scale(.95)}100%{transform:scale(1)}}@-webkit-keyframes swal2-hide{0%{transform:scale(1);opacity:1}100%{transform:scale(.5);opacity:0}}@keyframes swal2-hide{0%{transform:scale(1);opacity:1}100%{transform:scale(.5);opacity:0}}@-webkit-keyframes swal2-animate-success-line-tip{0%{top:1.1875em;left:.0625em;width:0}54%{top:1.0625em;left:.125em;width:0}70%{top:2.1875em;left:-.375em;width:3.125em}84%{top:3em;left:1.3125em;width:1.0625em}100%{top:2.8125em;left:.8125em;width:1.5625em}}@keyframes swal2-animate-success-line-tip{0%{top:1.1875em;left:.0625em;width:0}54%{top:1.0625em;left:.125em;width:0}70%{top:2.1875em;left:-.375em;width:3.125em}84%{top:3em;left:1.3125em;width:1.0625em}100%{top:2.8125em;left:.8125em;width:1.5625em}}@-webkit-keyframes swal2-animate-success-line-long{0%{top:3.375em;right:2.875em;width:0}65%{top:3.375em;right:2.875em;width:0}84%{top:2.1875em;right:0;width:3.4375em}100%{top:2.375em;right:.5em;width:2.9375em}}@keyframes swal2-animate-success-line-long{0%{top:3.375em;right:2.875em;width:0}65%{top:3.375em;right:2.875em;width:0}84%{top:2.1875em;right:0;width:3.4375em}100%{top:2.375em;right:.5em;width:2.9375em}}@-webkit-keyframes swal2-rotate-success-circular-line{0%{transform:rotate(-45deg)}5%{transform:rotate(-45deg)}12%{transform:rotate(-405deg)}100%{transform:rotate(-405deg)}}@keyframes swal2-rotate-success-circular-line{0%{transform:rotate(-45deg)}5%{transform:rotate(-45deg)}12%{transform:rotate(-405deg)}100%{transform:rotate(-405deg)}}@-webkit-keyframes swal2-animate-error-x-mark{0%{margin-top:1.625em;transform:scale(.4);opacity:0}50%{margin-top:1.625em;transform:scale(.4);opacity:0}80%{margin-top:-.375em;transform:scale(1.15)}100%{margin-top:0;transform:scale(1);opacity:1}}@keyframes swal2-animate-error-x-mark{0%{margin-top:1.625em;transform:scale(.4);opacity:0}50%{margin-top:1.625em;transform:scale(.4);opacity:0}80%{margin-top:-.375em;transform:scale(1.15)}100%{margin-top:0;transform:scale(1);opacity:1}}@-webkit-keyframes swal2-animate-error-icon{0%{transform:rotateX(100deg);opacity:0}100%{transform:rotateX(0);opacity:1}}@keyframes swal2-animate-error-icon{0%{transform:rotateX(100deg);opacity:0}100%{transform:rotateX(0);opacity:1}}@-webkit-keyframes swal2-rotate-loading{0%{transform:rotate(0)}100%{transform:rotate(360deg)}}@keyframes swal2-rotate-loading{0%{transform:rotate(0)}100%{transform:rotate(360deg)}}body.swal2-shown:not(.swal2-no-backdrop):not(.swal2-toast-shown){overflow:hidden}body.swal2-height-auto{height:auto!important}body.swal2-no-backdrop .swal2-container{top:auto;right:auto;bottom:auto;left:auto;max-width:calc(100% - .625em * 2);background-color:transparent!important}body.swal2-no-backdrop .swal2-container>.swal2-modal{box-shadow:0 0 10px rgba(0,0,0,.4)}body.swal2-no-backdrop .swal2-container.swal2-top{top:0;left:50%;transform:translateX(-50%)}body.swal2-no-backdrop .swal2-container.swal2-top-left,body.swal2-no-backdrop .swal2-container.swal2-top-start{top:0;left:0}body.swal2-no-backdrop .swal2-container.swal2-top-end,body.swal2-no-backdrop .swal2-container.swal2-top-right{top:0;right:0}body.swal2-no-backdrop .swal2-container.swal2-center{top:50%;left:50%;transform:translate(-50%,-50%)}body.swal2-no-backdrop .swal2-container.swal2-center-left,body.swal2-no-backdrop .swal2-container.swal2-center-start{top:50%;left:0;transform:translateY(-50%)}body.swal2-no-backdrop .swal2-container.swal2-center-end,body.swal2-no-backdrop .swal2-container.swal2-center-right{top:50%;right:0;transform:translateY(-50%)}body.swal2-no-backdrop .swal2-container.swal2-bottom{bottom:0;left:50%;transform:translateX(-50%)}body.swal2-no-backdrop .swal2-container.swal2-bottom-left,body.swal2-no-backdrop .swal2-container.swal2-bottom-start{bottom:0;left:0}body.swal2-no-backdrop .swal2-container.swal2-bottom-end,body.swal2-no-backdrop .swal2-container.swal2-bottom-right{right:0;bottom:0}@media print{body.swal2-shown:not(.swal2-no-backdrop):not(.swal2-toast-shown){overflow-y:scroll!important}body.swal2-shown:not(.swal2-no-backdrop):not(.swal2-toast-shown)>[aria-hidden=true]{display:none}body.swal2-shown:not(.swal2-no-backdrop):not(.swal2-toast-shown) .swal2-container{position:static!important}}body.swal2-toast-shown .swal2-container{background-color:transparent}body.swal2-toast-shown .swal2-container.swal2-top{top:0;right:auto;bottom:auto;left:50%;transform:translateX(-50%)}body.swal2-toast-shown .swal2-container.swal2-top-end,body.swal2-toast-shown .swal2-container.swal2-top-right{top:0;right:0;bottom:auto;left:auto}body.swal2-toast-shown .swal2-container.swal2-top-left,body.swal2-toast-shown .swal2-container.swal2-top-start{top:0;right:auto;bottom:auto;left:0}body.swal2-toast-shown .swal2-container.swal2-center-left,body.swal2-toast-shown .swal2-container.swal2-center-start{top:50%;right:auto;bottom:auto;left:0;transform:translateY(-50%)}body.swal2-toast-shown .swal2-container.swal2-center{top:50%;right:auto;bottom:auto;left:50%;transform:translate(-50%,-50%)}body.swal2-toast-shown .swal2-container.swal2-center-end,body.swal2-toast-shown .swal2-container.swal2-center-right{top:50%;right:0;bottom:auto;left:auto;transform:translateY(-50%)}body.swal2-toast-shown .swal2-container.swal2-bottom-left,body.swal2-toast-shown .swal2-container.swal2-bottom-start{top:auto;right:auto;bottom:0;left:0}body.swal2-toast-shown .swal2-container.swal2-bottom{top:auto;right:auto;bottom:0;left:50%;transform:translateX(-50%)}body.swal2-toast-shown .swal2-container.swal2-bottom-end,body.swal2-toast-shown .swal2-container.swal2-bottom-right{top:auto;right:0;bottom:0;left:auto}");

/***/ }),

/***/ "./node_modules/uuid/dist/esm-browser/regex.js":
/*!*****************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/regex.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (/^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i);

/***/ }),

/***/ "./node_modules/uuid/dist/esm-browser/rng.js":
/*!***************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/rng.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ rng)
/* harmony export */ });
// Unique ID creation requires a high quality random # generator. In the browser we therefore
// require the crypto API and do not support built-in fallback to lower quality random number
// generators (like Math.random()).
var getRandomValues;
var rnds8 = new Uint8Array(16);
function rng() {
  // lazy load so that environments that need to polyfill have a chance to do so
  if (!getRandomValues) {
    // getRandomValues needs to be invoked in a context where "this" is a Crypto implementation. Also,
    // find the complete implementation of crypto (msCrypto) on IE11.
    getRandomValues = typeof crypto !== 'undefined' && crypto.getRandomValues && crypto.getRandomValues.bind(crypto) || typeof msCrypto !== 'undefined' && typeof msCrypto.getRandomValues === 'function' && msCrypto.getRandomValues.bind(msCrypto);

    if (!getRandomValues) {
      throw new Error('crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported');
    }
  }

  return getRandomValues(rnds8);
}

/***/ }),

/***/ "./node_modules/uuid/dist/esm-browser/stringify.js":
/*!*********************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/stringify.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _validate_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./validate.js */ "./node_modules/uuid/dist/esm-browser/validate.js");

/**
 * Convert array of 16 byte values to UUID string format of the form:
 * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
 */

var byteToHex = [];

for (var i = 0; i < 256; ++i) {
  byteToHex.push((i + 0x100).toString(16).substr(1));
}

function stringify(arr) {
  var offset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  // Note: Be careful editing this code!  It's been tuned for performance
  // and works in ways you may not expect. See https://github.com/uuidjs/uuid/pull/434
  var uuid = (byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + '-' + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + '-' + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + '-' + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + '-' + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]]).toLowerCase(); // Consistency check for valid UUID.  If this throws, it's likely due to one
  // of the following:
  // - One or more input array values don't map to a hex octet (leading to
  // "undefined" in the uuid)
  // - Invalid input values for the RFC `version` or `variant` fields

  if (!(0,_validate_js__WEBPACK_IMPORTED_MODULE_0__["default"])(uuid)) {
    throw TypeError('Stringified UUID is invalid');
  }

  return uuid;
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (stringify);

/***/ }),

/***/ "./node_modules/uuid/dist/esm-browser/v4.js":
/*!**************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/v4.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _rng_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./rng.js */ "./node_modules/uuid/dist/esm-browser/rng.js");
/* harmony import */ var _stringify_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./stringify.js */ "./node_modules/uuid/dist/esm-browser/stringify.js");



function v4(options, buf, offset) {
  options = options || {};
  var rnds = options.random || (options.rng || _rng_js__WEBPACK_IMPORTED_MODULE_0__["default"])(); // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`

  rnds[6] = rnds[6] & 0x0f | 0x40;
  rnds[8] = rnds[8] & 0x3f | 0x80; // Copy bytes to buffer, if provided

  if (buf) {
    offset = offset || 0;

    for (var i = 0; i < 16; ++i) {
      buf[offset + i] = rnds[i];
    }

    return buf;
  }

  return (0,_stringify_js__WEBPACK_IMPORTED_MODULE_1__["default"])(rnds);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (v4);

/***/ }),

/***/ "./node_modules/uuid/dist/esm-browser/validate.js":
/*!********************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/validate.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _regex_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./regex.js */ "./node_modules/uuid/dist/esm-browser/regex.js");


function validate(uuid) {
  return typeof uuid === 'string' && _regex_js__WEBPACK_IMPORTED_MODULE_0__["default"].test(uuid);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (validate);

/***/ })

}]);