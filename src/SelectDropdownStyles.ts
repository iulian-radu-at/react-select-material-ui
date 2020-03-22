import {
  colorClearHover,
  colorClearNormal,
  colorFocus,
  colorHover,
  colorNoFocus
} from "./ColorConstants";
import { SelectProps } from "./SelectDropdown";
import { styleFn as StyleFn } from "react-select/src/styles";

const styleControl = (hasInputFocus: boolean = false) => ({
  background: "transparent",
  borderWidth: 0,
  borderBottom: getBorder(hasInputFocus),
  borderRadius: 0,
  boxShadow: "none",
  marginRight: 25,
  "&:hover": {
    boxShadow: "none",
    background: `linear-gradient(to bottom, ${colorHover} 0%, ${colorHover} 100%)`,
    backgroundPosition: "0 100%",
    backgroundRepeat: "no-repeat",
    backgroundSize: "100% 1px",
    transition: "background-size .2s"
  }
});

// FIXME hasInputFocus should produce a 2px border, but such a border moves the content up so we use only 1px
const getBorder = (hasInputFocus: boolean) =>
  hasInputFocus ? `solid 1px ${colorFocus}` : `solid 1px ${colorNoFocus}`;

const styleIndicatorsContainer: React.CSSProperties = {
  position: "absolute",
  right: 0,
  marginLeft: 8,
  marginRight: -25,
  backgroundColor: "transparent",
  height: "100%"
};

const styleClearIndicator = (base: any): React.CSSProperties | any => ({
  color: colorClearNormal,
  margin: "0 4px 0 0",
  padding: 0,
  cursor: "pointer",
  "&:hover": {
    color: colorClearHover
  }
});

const styleDropdownIndicator: React.CSSProperties = {
  margin: "0 0 0 4px",
  padding: 0,
  cursor: "pointer"
};

const styleMenuList: React.CSSProperties = {
  padding: 0
};

const styleNoOptionsMessage: React.CSSProperties = {
  textAlign: "left",
  color: "#ff8080"
};

const styleMultiValueRemove = (isDisabled: boolean = false) => (base: any) => ({
  ...base,
  display: isDisabled ? "none" : base.display
});

const styleValueContainer = (
  isClearable: boolean = false
): React.CSSProperties => ({
  padding: 0,
  marginRight: isClearable ? 25 : 0,
  overflow: "hidden",
  whiteSpace: "nowrap",
  textOverflow: "ellipsis"
});

export const getStyles = (props?: SelectProps, hasInputFocus?: boolean) => {
  const customStyles = props && props.styles ? props.styles : {};
  const isDisabled = props && props.isDisabled ? true : false;
  const isClearable = props && props.isClearable ? true : false;

  return {
    ...customStyles,
    control: mixStyle(styleControl(hasInputFocus), customStyles.control),
    clearIndicator: mixStyle(styleClearIndicator, customStyles.clearIndicator),
    dropdownIndicator: mixStyle(
      styleDropdownIndicator,
      customStyles.dropdownIndicator
    ),
    indicatorsContainer: mixStyle(
      styleIndicatorsContainer,
      customStyles.indicatorsContainer
    ),
    menuList: mixStyle(styleMenuList, customStyles.menuList),
    multiValueRemove: mixStyle(
      styleMultiValueRemove(isDisabled),
      customStyles.multiValueRemove
    ),
    noOptionsMessage: mixStyle(
      styleNoOptionsMessage,
      customStyles.noOptionsMessage
    ),
    valueContainer: mixStyle(
      styleValueContainer(isClearable),
      customStyles.valueContainer
    )
  };
};

const mixStyle = (
  customStyle: React.CSSProperties | StyleFn,
  styleFn?: StyleFn
): StyleFn => (base: any, state: any) => ({
  ...base,
  ...(typeof customStyle === "function"
    ? customStyle(base, state)
    : customStyle),
  ...(styleFn ? styleFn(base, state) : {})
});
