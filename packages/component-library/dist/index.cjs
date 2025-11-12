"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  Button: () => Button,
  Header: () => Header,
  LoadingSpinner: () => LoadingSpinner,
  RadioGroup: () => RadioGroup,
  SideNav: () => SideNav,
  TextInput: () => TextInput,
  ToggleSwitch: () => ToggleSwitch,
  Typography: () => Typography
});
module.exports = __toCommonJS(index_exports);

// src/lib/primitives/button/button.tsx
var import_react2 = require("react");

// src/utils/cn.ts
function toVal(mix) {
  let str = "";
  if (typeof mix === "string") {
    return mix;
  }
  if (typeof mix === "number") {
    return String(mix);
  }
  if (typeof mix === "object" && mix !== null) {
    if (Array.isArray(mix)) {
      for (const item of mix) {
        if (item) {
          const y = toVal(item);
          if (y) {
            str = str ? `${str} ${y}` : y;
          }
        }
      }
    } else {
      for (const key in mix) {
        if (Object.prototype.hasOwnProperty.call(mix, key) && mix[key]) {
          str = str ? `${str} ${key}` : key;
        }
      }
    }
  }
  return str;
}
function cn(...args) {
  let str = "";
  for (const arg of args) {
    if (arg) {
      const x = toVal(arg);
      if (x) {
        str = str ? `${str} ${x}` : x;
      }
    }
  }
  return str;
}

// src/lib/primitives/loading-spinner/loading-spinner.tsx
var import_react = require("react");
var import_jsx_runtime = require("react/jsx-runtime");
var LoadingSpinner = (0, import_react.forwardRef)(
  ({ size = "md", color = "currentColor", className, ...props }, ref) => {
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      "svg",
      {
        ref,
        className: cn(
          "spinner",
          {
            "spinner-2xs": size === "2xs",
            "spinner-xs": size === "xs",
            "spinner-sm": size === "sm",
            "spinner-md": size === "md",
            "spinner-lg": size === "lg",
            "spinner-xl": size === "xl",
            "spinner-2xl": size === "2xl"
          },
          className
        ),
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: color,
        strokeWidth: 2,
        strokeLinecap: "round",
        strokeLinejoin: "round",
        ...props,
        children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          "circle",
          {
            cx: "12",
            cy: "12",
            r: "10",
            strokeDasharray: "16 47",
            strokeDashoffset: "0"
          }
        )
      }
    );
  }
);
LoadingSpinner.displayName = "LoadingSpinner";

// src/lib/primitives/button/button.tsx
var import_jsx_runtime2 = require("react/jsx-runtime");
var Button = (0, import_react2.forwardRef)(
  ({
    children,
    className,
    variant,
    leftSection,
    rightSection,
    loading,
    disabled,
    ...props
  }, ref) => {
    return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(
      "button",
      {
        ref,
        className: cn(
          "button-root",
          className,
          variant ? `button-${variant}` : void 0
        ),
        disabled: disabled ?? loading,
        ...props,
        children: [
          (loading || leftSection) && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "button-left-icon", children: loading ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(LoadingSpinner, { size: "sm" }) : leftSection }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "button-content", children }),
          rightSection && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "button-right-icon", children: rightSection })
        ]
      }
    );
  }
);
Button.displayName = "Button";

// src/lib/primitives/typography/typography.tsx
var import_react3 = require("react");
var Typography = (0, import_react3.forwardRef)(
  ({ children, ...props }, ref) => {
    const Element = props.as ?? "p";
    return (0, import_react3.createElement)(
      Element,
      { ref, ...props },
      children
    );
  }
);
Typography.displayName = "Typography";

// src/lib/primitives/toggle-switch/toggle-switch.tsx
var import_react4 = require("react");
var import_jsx_runtime3 = require("react/jsx-runtime");
var ToggleSwitch = (0, import_react4.forwardRef)(
  ({ size = "md", label, checkedText, uncheckedText, className, ...props }, ref) => {
    const id = (0, import_react4.useId)();
    return /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "switch-wrapper", children: [
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
        "input",
        {
          ref,
          id,
          type: "checkbox",
          className: "switch-input",
          ...props
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(
        "label",
        {
          htmlFor: id,
          className: cn(
            "switch-track",
            {
              "switch-2xs": size === "2xs",
              "switch-xs": size === "xs",
              "switch-sm": size === "sm",
              "switch-md": size === "md",
              "switch-lg": size === "lg",
              "switch-xl": size === "xl",
              "switch-2xl": size === "2xl"
            },
            className
          ),
          children: [
            uncheckedText && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: "switch-text-off", children: uncheckedText }),
            checkedText && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: "switch-text-on", children: checkedText }),
            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: "switch-thumb" })
          ]
        }
      ),
      label && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("label", { htmlFor: id, className: "switch-label", children: label })
    ] });
  }
);
ToggleSwitch.displayName = "ToggleSwitch";

// src/lib/primitives/inputs/radio-group/radio-group.tsx
var import_react5 = require("react");
var import_jsx_runtime4 = require("react/jsx-runtime");
var RadioGroup = (0, import_react5.forwardRef)(
  ({
    options,
    label,
    error,
    direction = "vertical",
    size = "md",
    className,
    value,
    onChange,
    disabled,
    ...props
  }, ref) => {
    const groupId = (0, import_react5.useId)();
    const generatedIds = (0, import_react5.useMemo)(
      () => options.reduce((acc, option) => {
        acc[option.value] = `${groupId}-${option.value}`;
        return acc;
      }, {}),
      [groupId, options]
    );
    const handleChange = (event) => {
      onChange?.(event);
    };
    return /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("fieldset", { className: "radio-group-fieldset", children: [
      label && /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("legend", { className: "radio-group-label", children: label }),
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
        "div",
        {
          className: cn(
            "radio-group-container",
            {
              "radio-group-horizontal": direction === "horizontal",
              "radio-group-vertical": direction === "vertical",
              "radio-group-sm": size === "sm",
              "radio-group-md": size === "md",
              "radio-group-lg": size === "lg"
            },
            className
          ),
          children: options.map((option) => /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "radio-group-item", children: [
            /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
              "input",
              {
                ref: option.value === value ? ref : void 0,
                id: generatedIds[option.value],
                type: "radio",
                name: groupId,
                value: option.value,
                checked: value === option.value,
                onChange: handleChange,
                disabled: disabled ?? option.disabled,
                className: "radio-input",
                ...props
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
              "label",
              {
                htmlFor: generatedIds[option.value],
                className: "radio-label",
                children: option.label
              }
            )
          ] }, option.value))
        }
      ),
      error && /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "radio-group-error", children: error })
    ] });
  }
);
RadioGroup.displayName = "RadioGroup";

// src/lib/primitives/inputs/text-input/text-input.tsx
var import_react6 = require("react");
var import_jsx_runtime5 = require("react/jsx-runtime");
var TextInput = (0, import_react6.forwardRef)(
  ({ className, ...props }, ref) => {
    return /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("input", { ...props, ref, className: cn("textInput", className) });
  }
);
TextInput.displayName = "TextInput";

// src/lib/components/app-shell/side-nav/side-nav.tsx
var import_jsx_runtime6 = require("react/jsx-runtime");
var SideNav = () => {
  return /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("h1", { children: "Side Nav" }) });
};

// src/lib/components/app-shell/header/header.tsx
var import_jsx_runtime7 = require("react/jsx-runtime");
var Header = () => {
  return /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("h1", { children: "Header" }) });
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Button,
  Header,
  LoadingSpinner,
  RadioGroup,
  SideNav,
  TextInput,
  ToggleSwitch,
  Typography
});
