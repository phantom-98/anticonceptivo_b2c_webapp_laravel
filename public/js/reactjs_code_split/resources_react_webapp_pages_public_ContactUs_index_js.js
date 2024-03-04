"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_react_webapp_pages_public_ContactUs_index_js"],{

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
  react_dom__WEBPACK_IMPORTED_MODULE_1__.render( /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(H3Panel, {}), document.getElementById('H3Panel'));
}

/***/ }),

/***/ "./resources/react/webapp/pages/public/ContactUs/ContactForm.js":
/*!**********************************************************************!*\
  !*** ./resources/react/webapp/pages/public/ContactUs/ContactForm.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! react-bootstrap */ "./node_modules/react-bootstrap/esm/Form.js");
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! react-bootstrap */ "./node_modules/react-bootstrap/esm/Modal.js");
/* harmony import */ var _Services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../Services */ "./resources/react/webapp/Services.js");
/* harmony import */ var toastr__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! toastr */ "./node_modules/toastr/toastr.js");
/* harmony import */ var toastr__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(toastr__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _TermsAndConditions_Terms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../TermsAndConditions/Terms */ "./resources/react/webapp/pages/public/TermsAndConditions/Terms.js");
/* harmony import */ var _CorporateResponsibility_PrivacyPolicies__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../CorporateResponsibility/PrivacyPolicies */ "./resources/react/webapp/pages/public/CorporateResponsibility/PrivacyPolicies/index.js");
/* harmony import */ var _components_general_CloseModal__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../components/general/CloseModal */ "./resources/react/webapp/components/general/CloseModal.js");
/* harmony import */ var _helpers_GlobalUtils__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../helpers/GlobalUtils */ "./resources/react/webapp/helpers/GlobalUtils.js");
/* harmony import */ var _DynamicPath__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./DynamicPath */ "./resources/react/webapp/pages/public/ContactUs/DynamicPath.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
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











var ContactForm = function ContactForm() {
  var defaultModel = {
    // contact_issue_id: '',
    contact_first_name: '',
    contact_last_name: '',
    contact_order_id: '',
    contact_email: '',
    contact_phone_code: '+56',
    contact_phone: '',
    contact_message: '',
    contact_subject_parent: '',
    contact_accept_terms: '0'
  };
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(true),
    _useState2 = _slicedToArray(_useState, 2),
    loading = _useState2[0],
    setLoading = _useState2[1];
  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(defaultModel),
    _useState4 = _slicedToArray(_useState3, 2),
    model = _useState4[0],
    setModel = _useState4[1];
  var _useState5 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]),
    _useState6 = _slicedToArray(_useState5, 2),
    nestedFields = _useState6[0],
    setNestedFields = _useState6[1];
  var _useState7 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]),
    _useState8 = _slicedToArray(_useState7, 2),
    list = _useState8[0],
    setList = _useState8[1];
  var _useState9 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]),
    _useState10 = _slicedToArray(_useState9, 2),
    path = _useState10[0],
    setPath = _useState10[1];
  var _useState11 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)({}),
    _useState12 = _slicedToArray(_useState11, 2),
    privacyPolicy = _useState12[0],
    setPrivacyPolicy = _useState12[1];
  // const [contactIssues, setContactIssues] = useState([]);

  var _useState13 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
    _useState14 = _slicedToArray(_useState13, 2),
    handleTermsModal = _useState14[0],
    setHandleTermsModal = _useState14[1];
  var _useState15 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
    _useState16 = _slicedToArray(_useState15, 2),
    handlePrivacyPoliceModal = _useState16[0],
    setHandlePrivacyPoliceModal = _useState16[1];
  var showTermsModal = function showTermsModal() {
    return setHandleTermsModal(true);
  };
  var hideTermsModal = function hideTermsModal() {
    return setHandleTermsModal(false);
  };
  var showPrivacyPoliceModal = function showPrivacyPoliceModal() {
    return setHandlePrivacyPoliceModal(true);
  };
  var hidePrivacyPoliceModal = function hidePrivacyPoliceModal() {
    return setHandlePrivacyPoliceModal(false);
  };
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    getResources();
  }, []);
  var getResources = function getResources() {
    _Services__WEBPACK_IMPORTED_MODULE_1__.DoPost(_Services__WEBPACK_IMPORTED_MODULE_1__.ENDPOINT.PUBLIC_AREA.CONTACT.GET_RESOURCES, {}).then(function (response) {
      _Services__WEBPACK_IMPORTED_MODULE_1__.Response({
        response: response,
        success: function success() {
          // setContactIssues(response.data.contact_issues)
          setNestedFields(response.data.nested_fields);
          setList(response.data.list);
          setPrivacyPolicy(response.data.privacy_policy);
          setLoading(false);
        }
      });
    })["catch"](function (error) {
      _Services__WEBPACK_IMPORTED_MODULE_1__.ErrorCatch(error);
    });
  };
  var handleParent = function handleParent(e, index) {
    var found = list.find(function (x) {
      return x.id == e.target.value;
    });
    found['question'] = 'Asunto';
    found['answer'] = found.name;
    setModel(_objectSpread(_objectSpread({}, model), {}, _defineProperty({}, e.target.name, e.target.value)));
    setPath([found]);
  };
  var handleData = function handleData(e) {
    var isRadio = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    if (isRadio) {
      setModel(_objectSpread(_objectSpread({}, model), {}, _defineProperty({}, 'contact_accept_terms', e.target.value == '0' ? '1' : '0')));
    } else {
      setModel(_objectSpread(_objectSpread({}, model), {}, _defineProperty({}, e.target.name, e.target.value)));
    }
  };
  var handleInputs = function handleInputs(e, parentId, inputId) {
    var tempPath = path;
    var foundIndex = path.findIndex(function (p) {
      return p.id == parentId;
    });
    var found = path[foundIndex];
    var nestedFieldQuestions = found.nested_field_questions;
    var nestedIndex = nestedFieldQuestions.findIndex(function (nfq) {
      return nfq.id == inputId;
    });
    nestedFieldQuestions[nestedIndex]['question'] = nestedFieldQuestions[nestedIndex].name;
    nestedFieldQuestions[nestedIndex]['answer'] = e.target.value;
    found['nested_field_questions'] = nestedFieldQuestions;
    tempPath[foundIndex] = found;
    setPath(tempPath);
  };
  var sendData = function sendData() {
    var url = _Services__WEBPACK_IMPORTED_MODULE_1__.ENDPOINT.PUBLIC_AREA.CONTACT.SEND;
    var fields = [];
    path.map(function (p) {
      fields.push({
        question: p.question,
        answer: p.answer
      });
      if (p.nested_field_questions) {
        p.nested_field_questions.map(function (nf) {
          if ('question' in nf && 'answer' in nf) {
            fields.push({
              question: nf.question,
              answer: nf.answer
            });
          }
        });
      }
    });
    var data = _objectSpread(_objectSpread({}, model), {}, {
      dynamic_fields: fields
    });
    _Services__WEBPACK_IMPORTED_MODULE_1__.DoPost(url, data).then(function (response) {
      _Services__WEBPACK_IMPORTED_MODULE_1__.Response({
        response: response,
        success: function success() {
          toastr__WEBPACK_IMPORTED_MODULE_2___default().success(response.message);
          setModel(defaultModel);
          setPath([]);
        },
        error: function error() {
          toastr__WEBPACK_IMPORTED_MODULE_2___default().error(response.message);
        },
        warning: function warning() {
          toastr__WEBPACK_IMPORTED_MODULE_2___default().warning(response.message);
        }
      });
    })["catch"](function (error) {
      _Services__WEBPACK_IMPORTED_MODULE_1__.ErrorCatch(error);
    });
  };
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("div", {
    className: "row",
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("div", {
      className: "col-md-6",
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("div", {
        className: "form-group",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("label", {
          htmlFor: "contact_first_name",
          children: "Nombres"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("input", {
          type: "text",
          className: "form-control form-control-custom",
          id: "contact_first_name",
          name: "contact_first_name",
          placeholder: "Nombres",
          onChange: handleData,
          value: model.contact_first_name,
          onFocus: _helpers_GlobalUtils__WEBPACK_IMPORTED_MODULE_6__.setCleanInputError
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("div", {
          className: "invalid-feedback"
        })]
      })
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("div", {
      className: "col-md-6",
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("div", {
        className: "form-group",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("label", {
          htmlFor: "contact_last_name",
          children: "Apellidos"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("input", {
          type: "text",
          className: "form-control form-control-custom",
          id: "contact_last_name",
          name: "contact_last_name",
          placeholder: "Apellidos",
          onChange: handleData,
          value: model.contact_last_name,
          onFocus: _helpers_GlobalUtils__WEBPACK_IMPORTED_MODULE_6__.setCleanInputError
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("div", {
          className: "invalid-feedback"
        })]
      })
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("div", {
      className: "col-md-6",
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("div", {
        className: "form-group",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("label", {
          htmlFor: "contact_email",
          children: "E-Mail"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("input", {
          type: "email",
          className: "form-control form-control-custom",
          id: "contact_email",
          name: "contact_email",
          placeholder: "E-Mail",
          onChange: handleData,
          value: model.contact_email,
          onFocus: _helpers_GlobalUtils__WEBPACK_IMPORTED_MODULE_6__.setCleanInputError
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("div", {
          className: "invalid-feedback"
        })]
      })
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("div", {
      className: "col-md-6",
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("div", {
        className: "row",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("div", {
          className: "col-md-3",
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("div", {
            className: "form-group",
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("label", {
              htmlFor: "contact_phone_code",
              children: "C\xF3digo"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("select", {
              className: "form-control form-control-custom pl-2",
              id: "contact_phone_code",
              name: "contact_phone_code",
              onChange: handleData,
              value: model.contact_phone_code,
              onFocus: _helpers_GlobalUtils__WEBPACK_IMPORTED_MODULE_6__.setCleanInputError,
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("option", {
                value: "+56",
                children: "+56"
              })
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("div", {
              className: "invalid-feedback"
            })]
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("div", {
          className: "col-md-9",
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("div", {
            className: "form-group",
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("label", {
              htmlFor: "contact_phone",
              children: "Tel\xE9fono"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("input", {
              type: "text",
              className: "form-control form-control-custom",
              id: "contact_phone",
              name: "contact_phone",
              placeholder: "9 8765 4321",
              maxLength: "15",
              onChange: handleData,
              value: model.contact_phone,
              onFocus: _helpers_GlobalUtils__WEBPACK_IMPORTED_MODULE_6__.setCleanInputError
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("div", {
              className: "invalid-feedback"
            })]
          })
        })]
      })
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("div", {
      className: "col-md-6",
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("div", {
        className: "form-group",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("label", {
          htmlFor: "contact_order_id",
          children: "\xBFCu\xE1l es el n\xFAmero de tu orden? (Si es que aplica)"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("input", {
          type: "text",
          className: "form-control form-control-custom",
          id: "contact_order_id",
          name: "contact_order_id",
          placeholder: "N\xBA de orden Ej: 293",
          onChange: handleData,
          value: model.contact_order_id,
          onFocus: _helpers_GlobalUtils__WEBPACK_IMPORTED_MODULE_6__.setCleanInputError
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("div", {
          className: "invalid-feedback"
        })]
      })
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_DynamicPath__WEBPACK_IMPORTED_MODULE_7__["default"], {
      loading: loading,
      model: model,
      handleParent: handleParent,
      handleInputs: handleInputs,
      nestedFields: nestedFields,
      path: path,
      setPath: setPath,
      list: list
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("div", {
      className: "col-md-12",
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("div", {
        className: "form-group",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("label", {
          htmlFor: "contact_message",
          children: "Mensaje"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("textarea", {
          rows: "7",
          className: "form-control form-control-custom",
          id: "contact_message",
          name: "contact_message",
          placeholder: "Mensaje",
          onChange: handleData,
          value: model.contact_message,
          onFocus: _helpers_GlobalUtils__WEBPACK_IMPORTED_MODULE_6__.setCleanInputError
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("div", {
          className: "invalid-feedback"
        })]
      })
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("div", {
      className: "col-md-12 mt-3",
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("div", {
        className: "row",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("div", {
          className: "col-md-12",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(react_bootstrap__WEBPACK_IMPORTED_MODULE_9__["default"].Check, {
            custom: true,
            type: "checkbox",
            id: "contact_accept_terms",
            value: model.contact_accept_terms,
            onFocus: _helpers_GlobalUtils__WEBPACK_IMPORTED_MODULE_6__.setCleanInputError,
            onChange: function onChange(e) {
              return handleData(e, true);
            },
            label: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("span", {
              className: "font-inter font-12 regular color-707070",
              children: ["Aceptar ", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("span", {
                className: "link pointer",
                onClick: function onClick() {
                  return showTermsModal();
                },
                children: "T\xE9rminos y condiciones"
              }), " y ", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("span", {
                className: "link pointer",
                onClick: function onClick() {
                  return showPrivacyPoliceModal();
                },
                children: "Pol\xEDticas de privacidad"
              })]
            })
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("div", {
            className: "invalid-feedback"
          })]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("div", {
          className: "col-md-12 mt-4 text-center",
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("button", {
            type: "button",
            className: "btn btn-bicolor px-5",
            onClick: function onClick() {
              return sendData();
            },
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("span", {
              className: "px-5",
              children: "ENVIAR"
            })
          })
        })]
      })
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)(react_bootstrap__WEBPACK_IMPORTED_MODULE_10__["default"], {
      show: handleTermsModal,
      centered: true,
      backdrop: "static",
      keyboard: false,
      onHide: hideTermsModal,
      dialogClassName: "modal-new-claim",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(react_bootstrap__WEBPACK_IMPORTED_MODULE_10__["default"].Header, {
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_components_general_CloseModal__WEBPACK_IMPORTED_MODULE_5__["default"], {
          hideModal: hideTermsModal
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(react_bootstrap__WEBPACK_IMPORTED_MODULE_10__["default"].Body, {
        className: "px-5",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("div", {
          className: "row",
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("div", {
            className: "col-12",
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_TermsAndConditions_Terms__WEBPACK_IMPORTED_MODULE_3__["default"], {})
          })
        })
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)(react_bootstrap__WEBPACK_IMPORTED_MODULE_10__["default"], {
      show: handlePrivacyPoliceModal,
      centered: true,
      backdrop: "static",
      keyboard: false,
      onHide: hidePrivacyPoliceModal,
      dialogClassName: "modal-new-claim",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(react_bootstrap__WEBPACK_IMPORTED_MODULE_10__["default"].Header, {
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_components_general_CloseModal__WEBPACK_IMPORTED_MODULE_5__["default"], {
          hideModal: hidePrivacyPoliceModal
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(react_bootstrap__WEBPACK_IMPORTED_MODULE_10__["default"].Body, {
        className: "px-5",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("div", {
          className: "row",
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("div", {
            className: "col-12",
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_CorporateResponsibility_PrivacyPolicies__WEBPACK_IMPORTED_MODULE_4__["default"], {
              privacyPolicy: privacyPolicy
            })
          })
        })
      })]
    })]
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ContactForm);

/***/ }),

/***/ "./resources/react/webapp/pages/public/ContactUs/DynamicPath.js":
/*!**********************************************************************!*\
  !*** ./resources/react/webapp/pages/public/ContactUs/DynamicPath.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var _helpers_GlobalUtils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../helpers/GlobalUtils */ "./resources/react/webapp/helpers/GlobalUtils.js");
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! uuid */ "./node_modules/uuid/dist/esm-browser/v4.js");
/* harmony import */ var _Nested__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Nested */ "./resources/react/webapp/pages/public/ContactUs/Nested.js");
/* harmony import */ var _components_LazyLoading__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../components/LazyLoading */ "./resources/react/webapp/components/LazyLoading.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");







var DynamicPath = function DynamicPath(_ref) {
  var loading = _ref.loading,
    model = _ref.model,
    handleParent = _ref.handleParent,
    nestedFields = _ref.nestedFields,
    path = _ref.path,
    setPath = _ref.setPath,
    list = _ref.list,
    handleInputs = _ref.handleInputs;
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
    children: [!loading ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
      className: "col-md-12",
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
        className: "form-group",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("label", {
          htmlFor: "contact_subject_parent",
          children: "Asunto"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("select", {
          className: "form-control form-control-custom pl-2",
          name: "contact_subject_parent",
          id: "contact_subject_parent",
          onChange: handleParent,
          value: model.contact_subject_parent,
          onFocus: _helpers_GlobalUtils__WEBPACK_IMPORTED_MODULE_1__.setCleanInputError,
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("option", {
            value: '',
            disabled: true,
            selected: true,
            children: "Seleccione"
          }), nestedFields.map(function (parent) {
            var parentId = (0,uuid__WEBPACK_IMPORTED_MODULE_5__["default"])();
            return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("option", {
              selected: path.find(function (x) {
                return x.id == parent.id;
              }),
              value: parent.id,
              children: parent.name
            }, parentId);
          })]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
          className: "invalid-feedback"
        })]
      })
    }) : null, !loading ? path.length ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
      className: "col-md-12",
      children: path.map(function (parent, index) {
        var parentChild = (0,uuid__WEBPACK_IMPORTED_MODULE_5__["default"])();
        return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
          children: [parent.nested_field_questions.map(function (element, index) {
            var elementKey = (0,uuid__WEBPACK_IMPORTED_MODULE_5__["default"])();
            return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
              className: "form-group",
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("label", {
                htmlFor: "",
                children: element.name
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("input", {
                type: "text",
                className: "form-control form-control-custom",
                id: "",
                name: "",
                placeholder: "",
                value: element.answer,
                onChange: function onChange(e) {
                  return handleInputs(e, parent.id, element.id);
                }
              })]
            }, elementKey);
          }), parent.children.length ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_Nested__WEBPACK_IMPORTED_MODULE_2__["default"], {
            children: parent.children,
            path: path,
            setPath: setPath,
            list: list,
            parent: parent
          }) : null]
        }, parentChild);
      })
    }) : null : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_components_LazyLoading__WEBPACK_IMPORTED_MODULE_3__["default"], {})]
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (DynamicPath);

/***/ }),

/***/ "./resources/react/webapp/pages/public/ContactUs/Nested.js":
/*!*****************************************************************!*\
  !*** ./resources/react/webapp/pages/public/ContactUs/Nested.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! uuid */ "./node_modules/uuid/dist/esm-browser/v4.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");




var Nested = function Nested(_ref) {
  var children = _ref.children,
    path = _ref.path,
    setPath = _ref.setPath,
    list = _ref.list,
    parent = _ref.parent;
  var handleChildren = function handleChildren(e) {
    var found = list.find(function (x) {
      return x.id == e.target.value;
    });
    var temp_path = [];
    var position = -1;
    var isNew = true;
    path.every(function (element, index) {
      position = element.children.findIndex(function (pa) {
        return pa.id == found.id;
      });
      found['question'] = path.find(function (p) {
        return p.id == found.parent_id;
      }).group_title;
      found['answer'] = found.name;
      temp_path.push(element);
      if (index + 1 != path.length && position != -1) {
        temp_path.push(found);
        isNew = false;
        return isNew;
      }
      return isNew;
    });
    if (isNew) {
      temp_path.push(found);
    }
    setPath(temp_path);
  };
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("div", {
    className: "form-group",
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("label", {
      htmlFor: parent.group_title,
      children: parent.group_title
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("select", {
      className: "form-control form-control-custom pl-2",
      name: "select_id_".concat(parent.id),
      id: parent.group_title,
      onChange: handleChildren,
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("option", {
        value: '',
        disabled: true,
        selected: true,
        children: "Seleccione"
      }), children.map(function (ch, index) {
        var childKey = (0,uuid__WEBPACK_IMPORTED_MODULE_2__["default"])();
        return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("option", {
          selected: path.find(function (x) {
            return x.id == ch.id;
          }),
          value: ch.id,
          children: ch.name
        }, childKey);
      })]
    })]
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Nested);

/***/ }),

/***/ "./resources/react/webapp/pages/public/ContactUs/index.js":
/*!****************************************************************!*\
  !*** ./resources/react/webapp/pages/public/ContactUs/index.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var _template_BasePanelOne__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../template/BasePanelOne */ "./resources/react/webapp/template/BasePanelOne.js");
/* harmony import */ var _routes_publicRoutes__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../routes/publicRoutes */ "./resources/react/webapp/routes/publicRoutes.js");
/* harmony import */ var _ContactForm__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ContactForm */ "./resources/react/webapp/pages/public/ContactUs/ContactForm.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");





var ContactUs = function ContactUs() {
  var breadcrumbs = [{
    url: _routes_publicRoutes__WEBPACK_IMPORTED_MODULE_2__["default"].HOME.path,
    name: "Inicio"
  }, {
    url: _routes_publicRoutes__WEBPACK_IMPORTED_MODULE_2__["default"].CONTACT_US.path,
    name: _routes_publicRoutes__WEBPACK_IMPORTED_MODULE_2__["default"].CONTACT_US.title
  }];
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_template_BasePanelOne__WEBPACK_IMPORTED_MODULE_1__["default"], {
    breadcrumbs: breadcrumbs,
    title: _routes_publicRoutes__WEBPACK_IMPORTED_MODULE_2__["default"].CONTACT_US.title,
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
      className: "row",
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
        className: "col",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_ContactForm__WEBPACK_IMPORTED_MODULE_3__["default"], {})
      })
    })
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ContactUs);

/***/ }),

/***/ "./resources/react/webapp/pages/public/CorporateResponsibility/PrivacyPolicies/index.js":
/*!**********************************************************************************************!*\
  !*** ./resources/react/webapp/pages/public/CorporateResponsibility/PrivacyPolicies/index.js ***!
  \**********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var _components_general_H3Panel__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../components/general/H3Panel */ "./resources/react/webapp/components/general/H3Panel.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");




var PrivacyPolicies = function PrivacyPolicies(_ref) {
  var privacyPolicy = _ref.privacyPolicy;
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("div", {
    className: "row",
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_components_general_H3Panel__WEBPACK_IMPORTED_MODULE_1__["default"], {
      title: "POL\xCDTICAS DE PRIVACIDAD"
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("div", {
      className: "col-md-12",
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("div", {
        dangerouslySetInnerHTML: {
          __html: privacyPolicy.description
        }
      })
    })]
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (PrivacyPolicies);

/***/ }),

/***/ "./resources/react/webapp/pages/public/TermsAndConditions/Terms.js":
/*!*************************************************************************!*\
  !*** ./resources/react/webapp/pages/public/TermsAndConditions/Terms.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var _components_general_H3Panel__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../components/general/H3Panel */ "./resources/react/webapp/components/general/H3Panel.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");




var Terms = function Terms() {
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("div", {
    className: "row",
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_components_general_H3Panel__WEBPACK_IMPORTED_MODULE_1__["default"], {
      title: "T\xC9RMINOS Y CONDICIONES"
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("div", {
      className: "col-md-12 mb-3",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("h4", {
        className: "font-poppins font-14 bold color-484848",
        children: "1. ASPECTOS GENERALES SOBRE T\xC9RMINOS Y CONDICIONES"
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("p", {
        className: "font-poppins font-14 regular color-484848",
        children: "Los presentes T\xE9rminos y Condiciones se entender\xE1n aplicables a todas las compras que sean realizadas por medio del sitio web www.anticonceptivo.cl. El acceso al sitio web, su uso y todas las transacciones realizadas por medio de \xE9l, implican la aceptaci\xF3n estos T\xE9rminos y Condiciones."
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("p", {
        className: "font-poppins font-14 regular color-484848",
        children: "El uso y la realizaci\xF3n de transacciones a trav\xE9s del sitio web atribuye la condici\xF3n de usuario del tal y e implica la aceptaci\xF3n de todas y cada una de las disposiciones de estos T\xE9rminos y Condiciones. Sin embargo, algunos servicios ofrecidos a los usuarios pueden sujetarse a condiciones particulares, las que se informar\xE1n debidamente a trav\xE9s de las correspondientes Condiciones Particulares."
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("div", {
      className: "col-md-12 mb-3",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("h4", {
        className: "font-poppins font-14 bold color-484848",
        children: "2. CONDICIONES DE ACCESO Y UTILIZACI\xD3N DEL SITIO WWW.ANTICONCEPTIVO.CL"
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("h4", {
        className: "font-poppins font-14 bold color-484848",
        children: "2.1 Car\xE1cter gratuito del acceso y utilizaci\xF3n del sitio web"
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("p", {
        className: "font-poppins font-14 regular color-484848",
        children: "El acceso y uso del sitio web www.anticonceptivo.cl, tiene car\xE1cter gratuito para los usuarios. No obstante lo anterior, algunos de los servicios suministrados por el sitio o por terceros a trav\xE9s de \xE9l, pueden estar sujetos al pago de un precio o tarifa en la forma que se determine y publicite en las correspondientes Condiciones Particulares."
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("h4", {
        className: "font-poppins font-14 bold color-484848",
        children: "2.2 Usuario del sitio web"
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("p", {
        className: "font-poppins font-14 regular color-484848",
        children: "El servicio brindado a trav\xE9s del sitio web www.anticonceptivo.cl, puede ser utilizado por mayores de 18 a\xF1os, que hayan aceptado los presentes T\xE9rminos y Condiciones."
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("p", {
        className: "font-poppins font-14 regular color-484848",
        children: "El Usuario se obliga a proporcionar informaci\xF3n veraz e \xEDntegra para la compra de productos a trav\xE9s del sitio, siendo el usuario el \xFAnico responsable de la inexactitud y falsedad de la informaci\xF3n y datos que proporcione."
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("p", {
        className: "font-poppins font-14 regular color-484848",
        children: "Las compras que realicen los usuarios a trav\xE9s del sitio web, pueden realizarse como usuarios registrados o como invitados:"
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("p", {
        className: "font-poppins font-14 regular color-484848",
        children: "\u2022 Usuario registrado: los usuarios del sitio web podr\xE1n crear una cuenta en el sitio web www.anticonceptivo.cl, registrando los datos que sean solicitados y creando un usuario y clave de uso personal para ello. La clave creada es de uso personal e intransferible, y su entrega o utilizaci\xF3n por terceras personas, no implicar\xE1 responsabilidad alguna para K&G SPA y/o ASOCIACI\xD3N DE FARMAC\xC9UTICOS SPA. Los datos personales que sean proporcionados por el usuario ser\xE1n protegidos y tratados de conformidad a la Ley N\xBA19.628 y la normativa asociada aplicable."
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("p", {
        className: "font-poppins font-14 regular color-484848",
        children: "Es obligaci\xF3n del usuario el resguardo adecuado de su usuario y clave secreta. En caso de extrav\xEDo, robo, hurto, mal uso o cuaquier otra eventualidad respecto a tales datos, el usuario deber\xE1 contactar a atenci\xF3n al cliente de www.anticonceptivo.cl, tan pronto tome conocimiento de la circunstancia que aplique en su caso."
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("p", {
        className: "font-poppins font-14 regular color-484848",
        children: "\u2022 Usuario invitado: los usuarios del sitio web podr\xE1n realizar transacciones tambi\xE9n sin registrarse. Esto, a trav\xE9s de la opci\xF3n habilitada en el sitio de comprar \u201Ccomo invitado\u201D. Para ello, se solicitar\xE1n al usuario invitado ciertos datos personales al momento de la compra, los que ser\xE1n protegidos y tratados de conformidad a la Ley N\xBA19.628 y normativa asociada aplicable."
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("div", {
      className: "col-md-12 mb-3",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("h4", {
        className: "font-poppins font-14 bold color-484848",
        children: "3. FUNCIONAMIENTO Y DISPONIBILIDAD DEL SITIO WEB WWW.ANTICONCEPTIVO.CL"
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("p", {
        className: "font-poppins font-14 regular color-484848",
        children: "K&G SPA no garantiza la disponibilidad y continuidad permanente del funcionamiento del portal web www.anticonceptivo.cl ni los servicios prestados a trav\xE9s de \xE9l. En los casos que corresponda, se informar\xE1 de posibles interrupciones en dicha continuidad de funcionamiento y prestaci\xF3n de servicios."
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("p", {
        className: "font-poppins font-14 regular color-484848",
        children: "K&G SPA. establece asimismo, que podr\xE1 limitar los horarios de funcionamiento del portal o de los servicios asociados a \xE9l, como tambi\xE9n respecto de las transacciones realizadas por su intermedio, o restringir o limitar compras de productos que se asocien a distintas promociones publicitadas en el sitio web, lo que ser\xE1 informado en las correspondientes Condiciones Particulares."
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("div", {
      className: "col-md-12 mb-3",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("h4", {
        className: "font-poppins font-14 bold color-484848",
        children: "4. MEDIOS DE PAGO"
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("p", {
        className: "font-poppins font-14 regular color-484848",
        children: "Los productos adquiridos a trav\xE9s del sitio web, deber\xE1n ser pagados a trav\xE9s de la plataforma habilitada de Transbank Webpay, utilizando para ello los siguientes medios de pago:"
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("p", {
        className: "font-poppins font-14 regular color-484848",
        children: "\u2022 Tarjetas de D\xE9bito y de Cr\xE9dito VISA, MasterCard, Magna, American Express y Diners emitidas en Chile o en el extranjero."
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("p", {
        className: "font-poppins font-14 regular color-484848",
        children: "Toda transacci\xF3n efectuada en el sitio web y la aceptaci\xF3n de compra que derive de una transacci\xF3n estar\xE1 sujeta a la aprobaci\xF3n previa o validaci\xF3n de la transacci\xF3n, lo que ser\xE1 requisito para la formaci\xF3n del consentimiento necesarios para la compraventa y a las condiciones informadas para una promoci\xF3n en espec\xEDfico."
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("p", {
        className: "font-poppins font-14 regular color-484848",
        children: "Para validar la transacci\xF3n, se deber\xE1 verificar que se dispone de los productos en stock, el medio de pago ofrecido por el usuario y que los datos proporcionados por el usuario en el sitio web coinciden con los de la orden de compra respectiva."
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("p", {
        className: "font-poppins font-14 regular color-484848",
        children: "Una vez validada la transacci\xF3n, se enviar\xE1 al usuario la confirmaci\xF3n de la compra y la boleta electr\xF3nica correspondiente a la direcci\xF3n de correo electr\xF3nico proporcionada en el sitio web. Desde el env\xEDo al correo electr\xF3nico proporcionado por el usuario se entiende perfeccionado el consentimiento."
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("div", {
      className: "col-md-12 mb-3",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("h4", {
        className: "font-poppins font-14 bold color-484848",
        children: "5. DESPACHO Y ENTREGA DE PRODUCTOS COMPRADOS A TRAV\xC9S DE WWW.ANTICONCEPTIVO.CL"
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("p", {
        className: "font-poppins font-14 regular color-484848",
        children: "Las compras realizadas a trav\xE9s del sitio web www.anticonceptivo.cl, ser\xE1n entregados al usuario, seg\xFAn su elecci\xF3n al momento de la compra en el sitio, a trav\xE9s de la modalidad de despacho de domicilio o retiro en farmacia."
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("p", {
        className: "font-poppins font-14 regular color-484848",
        children: "Para el caso de elegir la opci\xF3n de despacho a domicilio, es responsabilidad del usuario el ingreso y declaraci\xF3n de la direcci\xF3n correcta y completa para que los productos puedan ser entregados sin inconvenientes dentro de los plazos pactados."
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("p", {
        className: "font-poppins font-14 regular color-484848",
        children: "La cobertura de despacho realizada es la siguiente: agregar."
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("p", {
        className: "font-poppins font-14 regular color-484848",
        children: "El transporte de los productos farmac\xE9uticos se realizar\xE1 dando cumplimiento a la normativa sanitaria vigente, con el fin de mantener la calidad y seguridad de ellos."
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("p", {
        className: "font-poppins font-14 regular color-484848",
        children: "Para el caso de elegir la opci\xF3n de retiro en farmacia, una vez que el pedido se encuentre listo para ser retirado, el usuario recibir\xE1 un correo electr\xF3nico denominado \u201Ctu compra est\xE1 lista\u201D. Para realizar el retiro del o los productos, el cliente debe presentarse en el establecimiento farmac\xE9utico indicado en el portal web con su respectivo \u201CN\xFAmero de retiro\u201D. Si el pedido incluye la compra de productos farmac\xE9uticos, de acuerdo con la condici\xF3n de venta de cada cual seg\xFAn la normativa sanitaria, se solicitar\xE1 la presentaci\xF3n de la receta m\xE9dica original con el fin de verificar e inutilizarla. Si no se presenta la receta m\xE9dica en caso de ser requerida por la normativa sanitaria, se proceder\xE1 a anular la compra."
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("div", {
      className: "col-md-12 mb-3",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("h4", {
        className: "font-poppins font-14 bold color-484848",
        children: "6. CAMBIOS Y DEVOLUCIONES"
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("p", {
        className: "font-poppins font-14 regular color-484848",
        children: "Para realizar cambios o devoluciones de productos adquiridos a trav\xE9s del sitio web www.anticonceptivo.cl, los productos deben encontrarse en su caja o empaque original, en el mismo estado en que fueron enviados o retirados por el usuario, conservando la integridad del empaque o caja y sus sellos originales intactos."
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("p", {
        className: "font-poppins font-14 regular color-484848",
        children: "Puede ejercerse el derecho de cambio o devoluci\xF3n del producto dentro de los 30 d\xEDas siguientes a la compra del mismo, o dentro del plazo informado dentro de cada promoci\xF3n, en el caso de que le sea aplicable."
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("p", {
        className: "font-poppins font-14 regular color-484848",
        children: "Para ejercer el cambio o devoluci\xF3n, el producto pasar\xE1 por un control de calidad,y de no ser aceptado, no podr\xE1 realizarse el cambio o devoluci\xF3n."
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("p", {
        className: "font-poppins font-14 regular color-484848",
        children: "Para gestionar el cambio o devoluci\xF3n el usuario deber\xE1 comunicarse con nuestro Centro de Atenci\xF3n al Cliente al correo electr\xF3nico: xxxxxxx."
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("div", {
      className: "col-md-12 mb-3",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("h4", {
        className: "font-poppins font-14 bold color-484848",
        children: "7. PROTECCI\xD3N DE DATOS PERSONALES"
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("p", {
        className: "font-poppins font-14 regular color-484848",
        children: "Los datos personales que sean proporcionados por el usuario a trav\xE9s del sitio web www.anticonceptivo.cl, ser\xE1n utilizados para procesar la compra, coordinar y efectuar el despacho de los productos adquiridos. En ese contexto, es que los datos personales proporcionados por el usuario podr\xE1n ser puestos a disposici\xF3n de terceros con la finalidad de llevar a cabo el proceso de despacho de los productos, cuando as\xED corresponda."
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("p", {
        className: "font-poppins font-14 regular color-484848",
        children: "No obstante lo anterior, se adoptar\xE1n todas las medidas que correspondan para la protecci\xF3n y no divulgaci\xF3n de datos de dicho car\xE1cter, as\xED como para impedir el uso no autorizado de tales. Los datos proporcionados podr\xE1n ser utilizados por K&G SPA. a trav\xE9s del sitio web www.anticonceptivo.cl de forma interna para el env\xEDo de publicidad y campa\xF1as, con fines estad\xEDsticos y para la obtenci\xF3n de perfiles de usuario que permitan mejorar los productos ofrecidos a la venta a trav\xE9s del sitio web. De igual forma, el usuario acepta que K&G SPA., pueda contactarlo con el objetivo de ejecutar servicios de post venta y realizaci\xF3n de encuestas sobre experiencias de compras."
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("p", {
        className: "font-poppins font-14 regular color-484848",
        children: "En el sitio web www.anticonceptivo.cl, se utilizan cookies para mejorar la experiencia del usuario. El usuario podr\xE1 deshabilitar el almacenamiento de cookies del sitio web por medio de su respectivo navegador de internet."
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("div", {
      className: "col-md-12 mb-3",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("h4", {
        className: "font-poppins font-14 bold color-484848",
        children: "8. COMUNICACIONES"
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("h4", {
        className: "font-poppins font-14 bold color-484848",
        children: "8.1. Comunicaciones promocionales de www.anticonceptivo.cl"
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("p", {
        className: "font-poppins font-14 regular color-484848",
        children: "Toda comunicaci\xF3n promocional o de car\xE1cter publicitario que sea enviada a sus usuarios por el portal web www.anticonceptivo.cl, mediante correo electr\xF3nico identificar\xE1 de forma clara como remitente al sitio web www.anticonceptivo.cl, y en el asunto indicar\xE1 a que se refiere la comunicaci\xF3n enviada."
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("p", {
        className: "font-poppins font-14 regular color-484848",
        children: "Los usuarios podr\xE1n solicitar la suspensi\xF3n de los env\xEDos de estas comunicaciones mediante un link que ser\xE1 incluido en cada correo electr\xF3nico."
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("h4", {
        className: "font-poppins font-14 bold color-484848",
        children: "8.2. Comunicaciones rec\xEDprocas"
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("p", {
        className: "font-poppins font-14 regular color-484848",
        children: "Las comunicaciones y notificaciones por parte de www.anticonceptivo.cl a los usuarios del sitio web, podr\xE1n realizarse a trav\xE9s de los siguientes medios: correo electr\xF3nico que hubiere proporcionado el usuario en el sitio web, llamados, SMS o whatsapp al n\xFAmero telef\xF3nico proporcionado por el usuario en el sitio web y redes sociales."
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("p", {
        className: "font-poppins font-14 regular color-484848",
        children: "Las comunicaciones por parte de los usuarios al sitio web www.anticonceptivo.cl, podr\xE1n realizarse a trav\xE9s de los siguientes medios: agregar."
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("div", {
      className: "col-md-12 mb-3",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("h4", {
        className: "font-poppins font-14 bold color-484848",
        children: "9. DISPENSACI\xD3N DE PRODUCTOS FARMAC\xC9UTICOS"
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("p", {
        className: "font-poppins font-14 regular color-484848",
        children: "El expendio de los productos farmac\xE9uticos se har\xE1 de acuerdo a las condiciones de venta aprobadas en los respectivos registros sanitarios y rotuladas en su envase, las cuales pueden ser:"
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("p", {
        className: "font-poppins font-14 regular color-484848",
        children: ["\u2022 Venta Directa, es decir, sin receta = VD ", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("br", {}), "\u2022 Venta bajo receta simple = R"]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("p", {
        className: "font-poppins font-14 regular color-484848",
        children: "En los casos en que sea procedente, el expendio se har\xE1 conforme a la respectiva receta y solo para consumidores finales. (Norma: DS. 466/1984, MINSAL)."
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("p", {
        className: "font-poppins font-14 regular color-484848",
        children: "Se entender\xE1 por Medicamentos de Venta Directa, aquellos que no necesitan de receta m\xE9dica para su expendio."
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("p", {
        className: "font-poppins font-14 regular color-484848",
        children: "El sitio web www.anticonceptivo.cl, solo vender\xE1 a sus usuarios aquellos productos farmac\xE9uticos que requieran receta m\xE9dica, previo env\xEDo de la receta m\xE9dica a trav\xE9s de la Plataforma al momento de realizar la compra. Para ello, el Usuario deber\xE1 cargar una imagen de la receta m\xE9dica a trav\xE9s del sitio web, receta que ser\xE1 validada por parte de un profesional qu\xEDmico farmac\xE9utico que se encuentre habilitado."
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("div", {
      className: "col-md-12 mb-3",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("h4", {
        className: "font-poppins font-14 bold color-484848",
        children: "10. MODIFICACIONES"
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("p", {
        className: "font-poppins font-14 regular color-484848",
        children: "El sitio web www.anticonceptivo.cl podr\xE1 modificar los presentes T\xE9rminos y Condiciones en cualquier momento. Dichas modificaciones o adiciones entrar\xE1n en vigencia de forma inmediata y se entender\xE1n incorporadas en los presentes T\xE9rminos y Condiciones en lo que no fueren contrarias."
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("div", {
      className: "col-md-12 mb-3",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("h4", {
        className: "font-poppins font-14 bold color-484848",
        children: "11. NORMATIVA Y JURISDICCI\xD3N APLICABLE"
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("p", {
        className: "font-poppins font-14 regular color-484848",
        children: "Los presentes T\xE9rminos y Condiciones se rigen en todos y cada uno de sus alcances por la ley chilena, en especial por lo dispuesto en la Ley N\xBA19.496 de protecci\xF3n de los derechos a los consumidores y la reglamentaci\xF3n sanitaria vigente."
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("p", {
        className: "font-poppins font-14 regular color-484848",
        children: "Asimismo, las partes de estos T\xE9rminos y Condiciones (K&G SPA.) y el usuario, fijan como domicilio la ciudad de Santiago de Chile y se someten a la jurisdicci\xF3n de sus Tribunales Ordinarios de Justicia."
      })]
    })]
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Terms);

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

/***/ }),

/***/ "./node_modules/uuid/dist/esm-browser/regex.js":
/*!*****************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/regex.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

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