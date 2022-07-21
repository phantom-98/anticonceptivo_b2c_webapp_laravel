"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_react_webapp_pages_public_Cart_index_js"],{

/***/ "./resources/react/webapp/components/shopping/ProductItemList.js":
/*!***********************************************************************!*\
  !*** ./resources/react/webapp/components/shopping/ProductItemList.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var _Config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../Config */ "./resources/react/webapp/Config.js");
/* harmony import */ var _helpers_GlobalUtils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../helpers/GlobalUtils */ "./resources/react/webapp/helpers/GlobalUtils.js");
/* harmony import */ var _general_Icon__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../general/Icon */ "./resources/react/webapp/components/general/Icon.js");
/* harmony import */ var _assets_images_icons_remove_mini_cart_svg__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../assets/images/icons/remove-mini-cart.svg */ "./resources/react/webapp/assets/images/icons/remove-mini-cart.svg");
/* harmony import */ var _context_CartProvider__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../context/CartProvider */ "./resources/react/webapp/context/CartProvider/index.js");
/* harmony import */ var _QuantityInput__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./QuantityInput */ "./resources/react/webapp/components/shopping/QuantityInput.js");
/* harmony import */ var _assets_images_producto_default_png__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../assets/images/producto-default.png */ "./resources/react/webapp/assets/images/producto-default.png");
/* harmony import */ var react_lazy_load_image_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! react-lazy-load-image-component */ "./node_modules/react-lazy-load-image-component/build/index.js");
/* harmony import */ var react_lazy_load_image_component__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(react_lazy_load_image_component__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var react_lazy_load_image_component_src_effects_blur_css__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! react-lazy-load-image-component/src/effects/blur.css */ "./node_modules/react-lazy-load-image-component/src/effects/blur.css");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }














var ProductItemList = function ProductItemList(_ref) {
  var item = _ref.item;

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
        className: "col-auto pr-0 d-flex",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)(react_lazy_load_image_component__WEBPACK_IMPORTED_MODULE_8__.LazyLoadImage, {
          alt: _Config__WEBPACK_IMPORTED_MODULE_1__.CONFIG.APP_NAME,
          width: 77,
          title: "Anticonceptivo",
          rel: "nofollow",
          effect: "blur",
          src: item.product.images.length ? item.product.images[0].public_file : _assets_images_producto_default_png__WEBPACK_IMPORTED_MODULE_7__["default"]
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxs)("div", {
        className: "col",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxs)("div", {
          className: "row",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("div", {
            className: "col font-poppins font-12 color-009BE8 mb-1",
            children: item.product.sku
          }), item.product.offer_price ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxs)("div", {
            style: {
              color: 'black'
            },
            className: "d-block d-md-none col-auto font-poppins font-12 regular",
            children: ["Precio normal ", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("s", {
              children: (0,_helpers_GlobalUtils__WEBPACK_IMPORTED_MODULE_2__.formatMoney)(item.product.price)
            })]
          }) : null, item.subscription ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("div", {
            className: "d-block d-md-none col-auto font-poppins font-12 regular",
            children: ' (' + (0,_helpers_GlobalUtils__WEBPACK_IMPORTED_MODULE_2__.formatMoney)(item.subscription.price) + ' c/u)'
          }) : null]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxs)("div", {
          className: "row",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("div", {
            className: "col d-flex",
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxs)("div", {
              className: "my-auto",
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("div", {
                className: "font-poppins font-14 bold text-black",
                children: item.subscription == null ? item.product.name : item.product.name + ' (' + 'suscripción' + ')'
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("div", {
                className: "row d-md-none d-flex",
                children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("div", {
                  className: "col pt-2",
                  children: item.subscription != null ? null : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)(_QuantityInput__WEBPACK_IMPORTED_MODULE_6__["default"], {
                    quantity: item.quantity,
                    setQuantity: setQuantity,
                    maxQuantity: item.product.stock >= item.product.subcategory.category.quantity_limit ? item.product.subcategory.category.quantity_limit : item.product.stock
                  })
                })
              })]
            })
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxs)("div", {
            className: "col-auto d-flex pl-0",
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("div", {
              className: "row d-md-flex d-none",
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("div", {
                className: "col-12 col-md-auto d-flex",
                children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxs)("div", {
                  className: "row my-auto",
                  children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("div", {
                    className: "col pt-2",
                    children: item.subscription != null ? null : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)(_QuantityInput__WEBPACK_IMPORTED_MODULE_6__["default"], {
                      quantity: item.quantity,
                      setQuantity: setQuantity,
                      maxQuantity: item.product.stock >= item.product.subcategory.category.quantity_limit ? item.product.subcategory.category.quantity_limit : item.product.stock
                    })
                  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("div", {
                    className: "col-12 col-md-auto d-flex",
                    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxs)("div", {
                      className: "my-auto font-poppins font-23 bold color-009BE8 text-right",
                      children: [item.subscription == null ? (0,_helpers_GlobalUtils__WEBPACK_IMPORTED_MODULE_2__.formatMoney)(item.quantity * (item.product.is_offer ? item.product.offer_price : item.product.price)) : (0,_helpers_GlobalUtils__WEBPACK_IMPORTED_MODULE_2__.formatMoney)(item.subscription.price * item.subscription.quantity * item.quantity) + ' (' + (0,_helpers_GlobalUtils__WEBPACK_IMPORTED_MODULE_2__.formatMoney)(item.subscription.price) + ' c/u)', /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("br", {}), item.product.offer_price ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxs)("div", {
                        style: {
                          color: 'black'
                        },
                        className: "font-poppins font-12 lh-12 regular",
                        children: ["Precio Normal ", (0,_helpers_GlobalUtils__WEBPACK_IMPORTED_MODULE_2__.formatMoney)(item.product.price), " "]
                      }) : null]
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
                })
              })
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("div", {
              className: "row d-md-none d-flex",
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxs)("div", {
                className: "col-12 d-flex",
                style: {
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                },
                children: [item.subscription == null ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("div", {
                  className: "text-right font-poppins font-16 bold color-009BE8 mb-auto",
                  children: (0,_helpers_GlobalUtils__WEBPACK_IMPORTED_MODULE_2__.formatMoney)(item.quantity * (item.product.is_offer ? item.product.offer_price : item.product.price))
                }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("div", {
                  className: "text-right font-poppins font-14 bold color-009BE8 mb-auto",
                  children: (0,_helpers_GlobalUtils__WEBPACK_IMPORTED_MODULE_2__.formatMoney)(item.subscription.price * item.subscription.quantity * item.quantity)
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("div", {
                  className: "text-right pointer mt-auto",
                  onClick: function onClick() {
                    return removeFromCart(item);
                  },
                  children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxs)("div", {
                    className: "font-poppins font-12 light color-A3A3A3",
                    children: ["BORRAR ", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)(_general_Icon__WEBPACK_IMPORTED_MODULE_3__["default"], {
                      style: {
                        width: '18px',
                        marginTop: '-3px'
                      },
                      path: _assets_images_icons_remove_mini_cart_svg__WEBPACK_IMPORTED_MODULE_4__["default"]
                    })]
                  })
                })]
              })
            })]
          })]
        })]
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("div", {
      className: "line"
    })]
  });
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ProductItemList);

/***/ }),

/***/ "./resources/react/webapp/pages/public/Cart/index.js":
/*!***********************************************************!*\
  !*** ./resources/react/webapp/pages/public/Cart/index.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom */ "./node_modules/react-dom/index.js");
/* harmony import */ var _components_shopping_MiniCart_ProductItem__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../components/shopping/MiniCart/ProductItem */ "./resources/react/webapp/components/shopping/MiniCart/ProductItem.js");
/* harmony import */ var _components_shopping_ProductItemList__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../components/shopping/ProductItemList */ "./resources/react/webapp/components/shopping/ProductItemList.js");
/* harmony import */ var _context_CartProvider__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../context/CartProvider */ "./resources/react/webapp/context/CartProvider/index.js");
/* harmony import */ var _components_shopping_TotalCartItems__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../components/shopping/TotalCartItems */ "./resources/react/webapp/components/shopping/TotalCartItems.js");
/* harmony import */ var _components_shopping_TotalCartPrice__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../components/shopping/TotalCartPrice */ "./resources/react/webapp/components/shopping/TotalCartPrice.js");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/esm/react-router-dom.js");
/* harmony import */ var _routes_publicRoutes__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../routes/publicRoutes */ "./resources/react/webapp/routes/publicRoutes.js");
/* harmony import */ var _Config__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../Config */ "./resources/react/webapp/Config.js");
/* harmony import */ var _assets_images_webpayColor_svg__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../assets/images/webpayColor.svg */ "./resources/react/webapp/assets/images/webpayColor.svg");
/* harmony import */ var react_lazy_load_image_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! react-lazy-load-image-component */ "./node_modules/react-lazy-load-image-component/build/index.js");
/* harmony import */ var react_lazy_load_image_component__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(react_lazy_load_image_component__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var react_lazy_load_image_component_src_effects_blur_css__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! react-lazy-load-image-component/src/effects/blur.css */ "./node_modules/react-lazy-load-image-component/src/effects/blur.css");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
















var Cart = function Cart() {
  window.dataLayer = window.dataLayer || [];
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    function gtag2() {
      if (window.location.href.includes("carrito")) {
        dataLayer.push(arguments);
      }
    }

    gtag2('js', new Date());
    gtag2('config', 'AW-10785537269');
  }, []);

  var _useContext = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(_context_CartProvider__WEBPACK_IMPORTED_MODULE_4__.CartContext),
      cartItems = _useContext.cartItems;

  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)("div", {
      className: "pb-5",
      style: {
        background: '#FAFAFA'
      },
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)("div", {
        className: "container pt-4",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsxs)("div", {
          className: "row pb-5",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)("div", {
            className: "col-md-12 mb-3",
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsxs)("h3", {
              className: "font-poppins font-21 bold color-0869A6 checkout-mobile-h3",
              style: {
                letterSpacing: '2px'
              },
              children: ["CARRO DE COMPRAS ", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsxs)("span", {
                className: "font-poppins font-16 regular color-6C6B6B",
                children: ["(", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)(_components_shopping_TotalCartItems__WEBPACK_IMPORTED_MODULE_5__["default"], {}), ")"]
              })]
            })
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)("div", {
            className: "col-12 col-lg pr-md-2 pb-3",
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)("div", {
              className: "panel panel-cart r-cart-items",
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)("div", {
                className: "panel-body",
                children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)("div", {
                  className: "row",
                  children: cartItems.length ? cartItems.map(function (item, index) {
                    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)(_components_shopping_ProductItemList__WEBPACK_IMPORTED_MODULE_3__["default"], {
                      item: item
                    }, index);
                  }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)("div", {
                    className: "col-10 offset-1 alert alert-danger text-center",
                    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)("span", {
                      className: "font-12 font-poppins",
                      children: "Carro sin productos"
                    })
                  })
                })
              })
            })
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)("div", {
            className: "col-12 col-lg-auto pl-md-2 panel-cart-total",
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)("div", {
              className: "panel panel-cart",
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)("div", {
                className: "panel-body",
                children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsxs)("div", {
                  className: "row",
                  children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsxs)("div", {
                    className: "col-md-12",
                    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)("h3", {
                      className: "font-poppins font-21 bold color-0869A6 mb-0",
                      style: {
                        letterSpacing: '2px'
                      },
                      children: "TOTAL"
                    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)("hr", {
                      className: "mb-0 pb-0"
                    })]
                  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)("div", {
                    className: "col-md-12",
                    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)(_components_shopping_TotalCartPrice__WEBPACK_IMPORTED_MODULE_6__["default"], {})
                  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsxs)("div", {
                    className: "col-12 mt-2",
                    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)(react_router_dom__WEBPACK_IMPORTED_MODULE_13__.Link, {
                      to: cartItems.length ? _routes_publicRoutes__WEBPACK_IMPORTED_MODULE_7__["default"].CHECKOUT.path : '#',
                      className: "btn btn-bicolor btn-block d-flex my-2",
                      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)("span", {
                        className: "m-auto font-poppins font-14 bold",
                        children: "CONTINUAR AL PAGO"
                      })
                    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)("p", {
                      className: "font-poppins font-12 regular color-484848",
                      children: "*El costo de entrega se calcular\xE1 al a\xF1adir la direcci\xF3n."
                    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)("hr", {})]
                  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsxs)("div", {
                    className: "col-md-12",
                    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsxs)("div", {
                      className: "row",
                      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)("div", {
                        className: "col-md-6 ",
                        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)("h4", {
                          className: "font-poppins font-14 bold color-033F5D",
                          children: "M\xE9todos de pago"
                        })
                      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)("div", {
                        className: "col-md-6",
                        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)(react_lazy_load_image_component__WEBPACK_IMPORTED_MODULE_10__.LazyLoadImage, {
                          alt: _Config__WEBPACK_IMPORTED_MODULE_8__.CONFIG.APP_NAME,
                          title: "Anticonceptivo",
                          width: '100%',
                          rel: "nofollow",
                          effect: "blur",
                          src: _assets_images_webpayColor_svg__WEBPACK_IMPORTED_MODULE_9__["default"]
                        })
                      })]
                    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)("hr", {})]
                  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsxs)("div", {
                    className: "col-md-12",
                    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)("h4", {
                      className: "font-poppins font-14 bold color-033F5D",
                      children: "Cambios y devoluciones"
                    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)("p", {
                      className: "font-poppins font-12 regular color-484848",
                      children: "Puedes cambiar tus productos en nuestra tienda hasta 30 d\xEDas despu\xE9s de la fecha de compra."
                    })]
                  })]
                })
              })
            })
          })]
        })
      })
    })
  });
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Cart);

/***/ }),

/***/ "./resources/react/webapp/assets/images/webpayColor.svg":
/*!**************************************************************!*\
  !*** ./resources/react/webapp/assets/images/webpayColor.svg ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("/images/webpayColor.svg?0b75d7e0ac3a44f5e67ff6397f854090");

/***/ })

}]);