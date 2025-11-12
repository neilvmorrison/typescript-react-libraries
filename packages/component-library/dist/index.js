// src/lib/primitives/button/button.tsx
import { forwardRef as forwardRef2 } from "react";

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
import { forwardRef } from "react";
import { jsx } from "react/jsx-runtime";
var LoadingSpinner = forwardRef(
  ({ size = "md", color = "currentColor", className, ...props }, ref) => {
    return /* @__PURE__ */ jsx(
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
        children: /* @__PURE__ */ jsx(
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
import { jsx as jsx2, jsxs } from "react/jsx-runtime";
var Button = forwardRef2(
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
    return /* @__PURE__ */ jsxs(
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
          (loading || leftSection) && /* @__PURE__ */ jsx2("span", { className: "button-left-icon", children: loading ? /* @__PURE__ */ jsx2(LoadingSpinner, { size: "sm" }) : leftSection }),
          /* @__PURE__ */ jsx2("span", { className: "button-content", children }),
          rightSection && /* @__PURE__ */ jsx2("span", { className: "button-right-icon", children: rightSection })
        ]
      }
    );
  }
);
Button.displayName = "Button";

// src/lib/primitives/typography/typography.tsx
import { forwardRef as forwardRef3, createElement } from "react";
var Typography = forwardRef3(
  ({ children, ...props }, ref) => {
    const Element = props.as ?? "p";
    return createElement(
      Element,
      { ref, ...props },
      children
    );
  }
);
Typography.displayName = "Typography";

// src/lib/primitives/toggle-switch/toggle-switch.tsx
import { forwardRef as forwardRef4, useId } from "react";
import { jsx as jsx3, jsxs as jsxs2 } from "react/jsx-runtime";
var ToggleSwitch = forwardRef4(
  ({ size = "md", label, checkedText, uncheckedText, className, ...props }, ref) => {
    const id = useId();
    return /* @__PURE__ */ jsxs2("div", { className: "switch-wrapper", children: [
      /* @__PURE__ */ jsx3(
        "input",
        {
          ref,
          id,
          type: "checkbox",
          className: "switch-input",
          ...props
        }
      ),
      /* @__PURE__ */ jsxs2(
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
            uncheckedText && /* @__PURE__ */ jsx3("span", { className: "switch-text-off", children: uncheckedText }),
            checkedText && /* @__PURE__ */ jsx3("span", { className: "switch-text-on", children: checkedText }),
            /* @__PURE__ */ jsx3("span", { className: "switch-thumb" })
          ]
        }
      ),
      label && /* @__PURE__ */ jsx3("label", { htmlFor: id, className: "switch-label", children: label })
    ] });
  }
);
ToggleSwitch.displayName = "ToggleSwitch";

// src/lib/primitives/inputs/radio-group/radio-group.tsx
import { forwardRef as forwardRef5, useId as useId2, useMemo } from "react";
import { jsx as jsx4, jsxs as jsxs3 } from "react/jsx-runtime";
var RadioGroup = forwardRef5(
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
    const groupId = useId2();
    const generatedIds = useMemo(
      () => options.reduce((acc, option) => {
        acc[option.value] = `${groupId}-${option.value}`;
        return acc;
      }, {}),
      [groupId, options]
    );
    const handleChange = (event) => {
      onChange?.(event);
    };
    return /* @__PURE__ */ jsxs3("fieldset", { className: "radio-group-fieldset", children: [
      label && /* @__PURE__ */ jsx4("legend", { className: "radio-group-label", children: label }),
      /* @__PURE__ */ jsx4(
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
          children: options.map((option) => /* @__PURE__ */ jsxs3("div", { className: "radio-group-item", children: [
            /* @__PURE__ */ jsx4(
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
            /* @__PURE__ */ jsx4(
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
      error && /* @__PURE__ */ jsx4("div", { className: "radio-group-error", children: error })
    ] });
  }
);
RadioGroup.displayName = "RadioGroup";

// src/lib/primitives/inputs/text-input/text-input.tsx
import { forwardRef as forwardRef6 } from "react";
import { jsx as jsx5 } from "react/jsx-runtime";
var TextInput = forwardRef6(
  ({ className, ...props }, ref) => {
    return /* @__PURE__ */ jsx5("input", { ...props, ref, className: cn("textInput", className) });
  }
);
TextInput.displayName = "TextInput";

// src/lib/components/app-shell/side-nav/side-nav.tsx
import { jsx as jsx6 } from "react/jsx-runtime";
var SideNav = () => {
  return /* @__PURE__ */ jsx6("div", { children: /* @__PURE__ */ jsx6("h1", { children: "Side Nav" }) });
};

// src/lib/components/app-shell/header/header.tsx
import { jsx as jsx7 } from "react/jsx-runtime";
var Header = () => {
  return /* @__PURE__ */ jsx7("div", { children: /* @__PURE__ */ jsx7("h1", { children: "Header" }) });
};
export {
  Button,
  Header,
  LoadingSpinner,
  RadioGroup,
  SideNav,
  TextInput,
  ToggleSwitch,
  Typography
};
