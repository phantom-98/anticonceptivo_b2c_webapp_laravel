"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_react_webapp_pages_public_TermsAndConditions_index_js"],{

/***/ "./resources/react/webapp/components/Breadcrumbs.js":
/*!**********************************************************!*\
  !*** ./resources/react/webapp/components/Breadcrumbs.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/esm/react-router-dom.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");



var Breadcrumbs = function Breadcrumbs(_ref) {
  var items = _ref.items;
  //category?
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
    className: "pb-3 w-breadcrumb",
    children: items.map(function (item, index) {
      var url = item.url;
      if (url.includes(':category?')) {
        if (item.slug) {
          url = url.replace(':category?', item.slug);
        } else {
          url = url.replace(':category?', 'pastillas');
        }
      }
      return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(react_router_dom__WEBPACK_IMPORTED_MODULE_2__.Link, {
          className: "font-poppins font-12 regular color-6C6B6B",
          to: url,
          children: item.name
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("span", {
          className: "font-poppins font-12 regular color-6C6B6B mx-1",
          children: index + 1 < items.length ? '>' : ''
        })]
      }, index);
    })
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Breadcrumbs);

/***/ }),

/***/ "./resources/react/webapp/components/general/H3Panel.js":
/*!**************************************************************!*\
  !*** ./resources/react/webapp/components/general/H3Panel.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom */ "./node_modules/react-dom/index.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");



var H3Panel = function H3Panel(_ref) {
  var title = _ref.title,
    _ref$className = _ref.className,
    className = _ref$className === void 0 ? 'mb-3' : _ref$className;
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("div", {
    className: "col-md-12 ".concat(className),
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("h3", {
      className: "font-poppins font-20 bold color-033F5D",
      children: title
    })
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (H3Panel);
if (document.getElementById('H3Panel')) {
  react_dom__WEBPACK_IMPORTED_MODULE_1__.render(/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(H3Panel, {}), document.getElementById('H3Panel'));
}

/***/ }),

/***/ "./resources/react/webapp/pages/public/TermsAndConditions/index.js":
/*!*************************************************************************!*\
  !*** ./resources/react/webapp/pages/public/TermsAndConditions/index.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var _template_BasePanelOne__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../template/BasePanelOne */ "./resources/react/webapp/template/BasePanelOne.js");
/* harmony import */ var _Services__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../Services */ "./resources/react/webapp/Services.js");
/* harmony import */ var _components_general_H3Panel__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../components/general/H3Panel */ "./resources/react/webapp/components/general/H3Panel.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }


// import Terms from "./Terms";
// import Decree3 from "./Decree3";
// import Decree466 from "./Decree466";
// import PUBLIC_ROUTES from "../../../routes/publicRoutes";



var TermsAndConditions = function TermsAndConditions() {
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]),
    _useState2 = _slicedToArray(_useState, 2),
    breadcrumbs = _useState2[0],
    setBreadcrumbs = _useState2[1];
  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)({}),
    _useState4 = _slicedToArray(_useState3, 2),
    sectionSelected = _useState4[0],
    setSectionSelected = _useState4[1];
  var _useState5 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
    _useState6 = _slicedToArray(_useState5, 2),
    loaded = _useState6[0],
    setLoaded = _useState6[1];
  var _useState7 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]),
    _useState8 = _slicedToArray(_useState7, 2),
    sections = _useState8[0],
    setSections = _useState8[1];
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    getData();
  }, []);
  var getData = function getData() {
    var url = _Services__WEBPACK_IMPORTED_MODULE_2__.ENDPOINT.NO_AUTH.TERMS_AND_CONDITIONS.GET_DATA;
    var data = {};
    _Services__WEBPACK_IMPORTED_MODULE_2__.DoGet(url, data).then(function (response) {
      _Services__WEBPACK_IMPORTED_MODULE_2__.Response({
        response: response,
        success: function success() {
          setSections(response.data.sections);
          setSectionSelected(response.data.sections[0]);
          setLoaded(true);
        }
      });
    })["catch"](function (error) {
      _Services__WEBPACK_IMPORTED_MODULE_2__.ErrorCatch(error);
    });
  };

  // const sections = {
  //     TERMS: {
  //         url: 'terminos-y-condiciones',
  //         name: 'Términos y condiciones'
  //     },
  //     DECREE_3: {
  //         url: 'decreto-3',
  //         name: 'Decreto 3'
  //     },
  //     DECREE_466: {
  //         url: 'decreto-466',
  //         name: 'Decreto 466'
  //     },
  // }

  // useEffect(() => {
  //     setSectionSelected(sections.TERMS)
  // }, [])

  // useEffect(() => {
  //     if (sectionSelected) {
  //         Object.keys(sections).map((key, index) => {
  //             if (sectionSelected.url ===  sections[key].url) {
  //                 setBreadcrumbs([
  //                     {
  //                         url: PUBLIC_ROUTES.HOME.path,
  //                         name: 'Inicio'
  //                     },
  //                     sections[key]
  //                 ])
  //             }
  //         })
  //         setLoaded(true)
  //     }
  // }, [sectionSelected])

  // const processRoute = () => {

  //     switch (sectionSelected.url) {
  //         case sections.TERMS.url:
  //             return <Terms/>;
  //         case sections.DECREE_3.url:
  //             return <Decree3/>;
  //         case sections.DECREE_466.url:
  //             return <Decree466/>;
  //         default:
  //             return <Terms/>;
  //     }
  // }

  var onClickSection = function onClickSection(sections, key) {
    if (sections[key].link && sections[key].type === 'Página Externa') {
      window.open(sections[key].link);
    } else {
      setSectionSelected(sections[key]);
    }
  };
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_template_BasePanelOne__WEBPACK_IMPORTED_MODULE_1__["default"], {
    breadcrumbs: breadcrumbs,
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
      className: "row",
      children: loaded ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
          className: "col-md-3",
          children: Object.keys(sections).map(function (key, index) {
            return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
              className: "col-12 mb-2",
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
                onClick: function onClick() {
                  return onClickSection(sections, key);
                },
                style: {
                  textDecoration: 'none'
                },
                children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
                  className: "menu-section ".concat(sections[key].name === sectionSelected.name ? 'active' : ''),
                  children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("span", {
                    className: "menu-section-item",
                    children: sections[key].name
                  })
                })
              })
            }, index);
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
          className: "col-md-9",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_components_general_H3Panel__WEBPACK_IMPORTED_MODULE_3__["default"], {
            className: "pl-0",
            title: "T\xC9RMINOS Y CONDICIONES"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
            dangerouslySetInnerHTML: {
              __html: sectionSelected.description
            }
          })]
        })]
      }) : null
    })
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (TermsAndConditions);

/***/ }),

/***/ "./resources/react/webapp/template/BasePanelOne.js":
/*!*********************************************************!*\
  !*** ./resources/react/webapp/template/BasePanelOne.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var _components_Breadcrumbs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/Breadcrumbs */ "./resources/react/webapp/components/Breadcrumbs.js");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router/esm/react-router.js");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/esm/react-router-dom.js");
/* harmony import */ var _context_AuthProvider__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../context/AuthProvider */ "./resources/react/webapp/context/AuthProvider/index.js");
/* harmony import */ var _context_AppProvider__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../context/AppProvider */ "./resources/react/webapp/context/AppProvider/index.js");
/* harmony import */ var _helpers_vars__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../helpers/vars */ "./resources/react/webapp/helpers/vars.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");







var BasePanelOne = function BasePanelOne(props) {
  var _useContext = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(_context_AppProvider__WEBPACK_IMPORTED_MODULE_3__.AppContext),
    breakpoint = _useContext.breakpoint;
  var _useContext2 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(_context_AuthProvider__WEBPACK_IMPORTED_MODULE_2__.AuthContext),
    logout = _useContext2.logout;
  var location = (0,react_router_dom__WEBPACK_IMPORTED_MODULE_6__.useLocation)();
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div", {
    style: {
      background: '#FAFAFA'
    },
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div", {
      className: "container py-4",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_components_Breadcrumbs__WEBPACK_IMPORTED_MODULE_1__["default"], {
        items: props.breadcrumbs
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div", {
        className: "panel mb-4",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div", {
          className: "responsive-base-panel",
          style: props.style,
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div", {
            className: "row",
            children: [breakpoint === _helpers_vars__WEBPACK_IMPORTED_MODULE_4__.BREAKPOINTS.MEDIUM || breakpoint === _helpers_vars__WEBPACK_IMPORTED_MODULE_4__.BREAKPOINTS.LARGE || breakpoint === _helpers_vars__WEBPACK_IMPORTED_MODULE_4__.BREAKPOINTS.EXTRA_LARGE || breakpoint === _helpers_vars__WEBPACK_IMPORTED_MODULE_4__.BREAKPOINTS.EXTRA_EXTRA_LARGE ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div", {
              className: "col-md-12",
              children: props.title ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("h1", {
                className: "base-panel-one-title",
                children: props.title
              }) : null
            }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.Fragment, {
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div", {
                className: "col",
                children: props.title ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("h1", {
                  className: "base-panel-one-title",
                  style: {
                    marginBottom: 0
                  },
                  children: props.title
                }) : null
              }), location.pathname.includes('/mi-cuenta/') ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div", {
                className: "col-auto d-flex  px-0",
                children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(react_router_dom__WEBPACK_IMPORTED_MODULE_7__.Link, {
                  to: "#",
                  onClick: function onClick() {
                    return logout();
                  },
                  className: "my-auto font-poppins font-14 lh-12 bold pointer text-danger",
                  children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div", {
                    className: "text-right",
                    children: "Cerrar"
                  })
                })
              }) : null]
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div", {
              className: "col-md-12",
              children: props.children
            })]
          })
        })
      })]
    })
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (BasePanelOne);

/***/ })

}]);