"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_react_webapp_pages_public_Blog_components_TimeLine_js"],{

/***/ "./resources/react/webapp/pages/public/Blog/components/TimeLine.js":
/*!*************************************************************************!*\
  !*** ./resources/react/webapp/pages/public/Blog/components/TimeLine.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var _components_general_Icon__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../components/general/Icon */ "./resources/react/webapp/components/general/Icon.js");
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! uuid */ "./node_modules/uuid/dist/esm-browser/v4.js");
/* harmony import */ var _Services__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../Services */ "./resources/react/webapp/Services.js");
/* harmony import */ var _components_LazyLoading__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../components/LazyLoading */ "./resources/react/webapp/components/LazyLoading.js");
/* harmony import */ var _components_general_H2Title__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../components/general/H2Title */ "./resources/react/webapp/components/general/H2Title.js");
/* harmony import */ var _context_AppProvider__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../context/AppProvider */ "./resources/react/webapp/context/AppProvider/index.js");
/* harmony import */ var _helpers_vars__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../helpers/vars */ "./resources/react/webapp/helpers/vars.js");
/* harmony import */ var slick_carousel_slick_slick_css__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! slick-carousel/slick/slick.css */ "./node_modules/slick-carousel/slick/slick.css");
/* harmony import */ var slick_carousel_slick_slick_theme_css__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! slick-carousel/slick/slick-theme.css */ "./node_modules/slick-carousel/slick/slick-theme.css");
/* harmony import */ var react_slick__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! react-slick */ "./node_modules/react-slick/lib/index.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _objectDestructuringEmpty(obj) { if (obj == null) throw new TypeError("Cannot destructure undefined"); }















var TimeLine = function TimeLine(_ref) {
  _objectDestructuringEmpty(_ref);

  var _useContext = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(_context_AppProvider__WEBPACK_IMPORTED_MODULE_5__.AppContext),
      breakpoint = _useContext.breakpoint;

  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
      _useState2 = _slicedToArray(_useState, 2),
      loaded = _useState2[0],
      setLoaded = _useState2[1];

  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]),
      _useState4 = _slicedToArray(_useState3, 2),
      timelines = _useState4[0],
      setTimelines = _useState4[1];

  var settings = {
    dots: true,
    fade: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 1500,
    autoplaySpeed: 4500,
    centerMode: true
  };
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    getData();
  }, []);

  var getData = function getData() {
    setLoaded(false);
    var url = _Services__WEBPACK_IMPORTED_MODULE_2__.ENDPOINT.PUBLIC_AREA.HISTORY;
    var data = {};
    _Services__WEBPACK_IMPORTED_MODULE_2__.DoGet(url, data).then(function (response) {
      _Services__WEBPACK_IMPORTED_MODULE_2__.Response({
        response: response,
        success: function success() {
          setTimelines(response.data.time_lines);
        }
      });
      setLoaded(true);
    })["catch"](function (error) {
      _Services__WEBPACK_IMPORTED_MODULE_2__.ErrorCatch(error);
    });
  };

  var TimeLineOne = function TimeLineOne(_ref2) {
    var timeline = _ref2.timeline;
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("div", {
      className: "col-md-2 timeline-item",
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxs)("div", {
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxs)("div", {
          className: "timeline-box",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("div", {
            className: "circle-timeline",
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)(_components_general_Icon__WEBPACK_IMPORTED_MODULE_1__["default"], {
              path: timeline.public_icon
            })
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("div", {
            className: "timeline-line-vertical"
          })]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("div", {
          className: "timeline-year",
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("span", {
            children: timeline.year
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("div", {
          className: "timeline-box",
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxs)("div", {
            className: "timeline-resume",
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("div", {
              dangerouslySetInnerHTML: {
                __html: timeline.description
              }
            }), timeline.post ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("p", {
              className: "font-poppins font-12 bold pointer color-033F5D readMoreHistory",
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("a", {
                href: timeline.post.url,
                children: "LEER M\xC1S"
              })
            }) : null]
          })
        })]
      })
    });
  };

  var TimeLineTwo = function TimeLineTwo(_ref3) {
    var timeline = _ref3.timeline;
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("div", {
      className: "col-md-2 timeline-item",
      style: {
        marginBottom: "50px"
      },
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxs)("div", {
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("div", {
          className: "timeline-box",
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxs)("div", {
            className: "timeline-resume",
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("div", {
              dangerouslySetInnerHTML: {
                __html: timeline.description
              }
            }), timeline.post ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("p", {
              className: "font-poppins font-12 bold pointer color-033F5D readMoreHistory",
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("a", {
                href: timeline.post.url,
                children: "LEER M\xC1S"
              })
            }) : null]
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("div", {
          className: "timeline-year",
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("span", {
            children: timeline.year
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxs)("div", {
          className: "timeline-box",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("div", {
            className: "timeline-line-vertical"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("div", {
            className: "circle-timeline",
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)(_components_general_Icon__WEBPACK_IMPORTED_MODULE_1__["default"], {
              path: timeline.public_icon
            })
          })]
        })]
      })
    });
  };

  var Desktop = function Desktop() {
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("div", {
      className: "row",
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("div", {
        className: "col-md-12",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("div", {
          className: "panel",
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("div", {
            className: "panel-body",
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxs)("div", {
              className: "row",
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("div", {
                className: "col-12 pt-4 mb-5",
                children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)(_components_general_H2Title__WEBPACK_IMPORTED_MODULE_4__["default"], {
                  text: "HISTORIA DE LOS ANTICONCEPTIVOS"
                })
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("div", {
                className: "col-12",
                children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("div", {
                  className: "row no-gutters timeline",
                  children: timelines.map(function (timeline, i) {
                    return i % 2 === 0 ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)(TimeLineOne, {
                      timeline: timeline
                    }, (0,uuid__WEBPACK_IMPORTED_MODULE_11__["default"])()) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)(TimeLineTwo, {
                      timeline: timeline
                    }, (0,uuid__WEBPACK_IMPORTED_MODULE_11__["default"])());
                  })
                })
              })]
            })
          })
        })
      })
    });
  };

  var Mobile = function Mobile() {
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxs)("div", {
      className: "row",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("div", {
        className: "col-12 pt-3 mb-3",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)(_components_general_H2Title__WEBPACK_IMPORTED_MODULE_4__["default"], {
          className: "text-left",
          text: "HISTORIA DE LOS ANTICONCEPTIVOS"
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("div", {
        className: "col-12",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("div", {
          className: "row no-gutters timeline",
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("div", {
            className: "col-12",
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)(react_slick__WEBPACK_IMPORTED_MODULE_9__["default"], _objectSpread(_objectSpread({}, settings), {}, {
              children: timelines.map(function (timeline) {
                return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("div", {
                  className: "card-timeline mt-2 py-4 px-4",
                  children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)(TimeLineOne, {
                    timeline: timeline
                  })
                }, (0,uuid__WEBPACK_IMPORTED_MODULE_11__["default"])());
              })
            }))
          })
        })
      })]
    });
  };

  if (!loaded) return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)(_components_LazyLoading__WEBPACK_IMPORTED_MODULE_3__["default"], {
    height: 200
  });
  return breakpoint === _helpers_vars__WEBPACK_IMPORTED_MODULE_6__.BREAKPOINTS.EXTRA_LARGE || breakpoint === _helpers_vars__WEBPACK_IMPORTED_MODULE_6__.BREAKPOINTS.EXTRA_EXTRA_LARGE ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)(Desktop, {}) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)(Mobile, {});
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (TimeLine);

/***/ })

}]);