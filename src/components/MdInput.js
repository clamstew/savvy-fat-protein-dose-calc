import React from "react";
import styled from "@emotion/styled";
import { Global, css } from "@emotion/react";

// const INPUT_LABEL_COLOR = "";
// const PLACEHOLDER_COLOR = "";

// const INPUT_LABEL_FONT_SIZE = "";

const FormGroup = styled.div({
  marginLeft: "auto",
  marginRight: "auto",
  maxWidth: 400,
  marginBottom: 15,
  position: "relative",
});

const Input = styled.input(({ darkMode }) => {
  const styles = {
    position: "relative",
    display: "block",
    width: "100%",
    border: "none",
    borderBottom: "1px solid #ddd",
    backgroundColor: "transparent",
    margin: "0px auto",
    padding: "20px 0px 0px 0px",
    height: 32,
    outline: "none",
    fontSize: 20,
    color: "rgba(0, 0, 0, 0.8)",
    background: "linear-gradient(to top, #51bbbe 50%, #51bbbe 50%)",
    backgroundPosition: "left bottom",
    backgroundSize: "0 1px",
    backgroundRepeat: "no-repeat",
    transition: "all 0.2s ease-in-out",
    "&:hover, &:focus": {
      borderColor: "#51bbbe",
    },
    "&:focus": {
      backgroundPosition: "left bottom",
      backgroundSize: "100% 1px",
    },
    "&:focus ::-webkit-input-placeholder": {
      color: "transparent",
      fontSize: 0,
    },
  };

  if (darkMode) {
    styles.color = "rgba(255, 255, 255, 0.8)";
  }

  return styles;
});

const Label = styled.label(({ darkMode }) => {
  const styles = {
    position: "absolute",
    top: 0,
    left: 0,
    textAlign: "left",
    display: "block",
    width: "100%",
    height: 52,
    lineHeight: "72px",
    textTransform: "uppercase",
    fontSize: 13,
    fontWeight: 200,
    background: "transparent",
    color: "rgba(0, 0, 0, 0.6)",
    margin: "0px auto",
    cursor: "text",
    transition: "all 0.15s ease-in-out",
    "input:valid + &": {
      height: 20,
      lineHeight: "20px",
      fontSize: 11,
      color: "#51bbbe",
    },
    "input:focus + &": {
      height: 20,
      lineHeight: "20px",
      fontSize: 11,
      color: "#51bbbe",
    },
  };

  if (darkMode) {
    styles.color = "rgba(255, 255, 255, 0.6)";
  }

  return styles;
});

export const MdInput = React.forwardRef((props, ref) => {
  const darkMode = true;

  return (
    <FormGroup>
      <Global
        styles={css`
          ::-webkit-input-placeholder {
            text-align: right;
            color: #ddd;
            font-size: 13px;
            font-weight: 200;
          }
          :-moz-placeholder {
            text-align: right;
            color: #ddd;
            font-size: 13px;
            font-weight: 200;
          }
          ::-moz-placeholder {
            text-align: right;
            color: #ddd;
            font-size: 13px;
            font-weight: 200;
          }
          :-ms-input-placeholder {
            text-align: right;
            color: #ddd;
            font-size: 13px;
            font-weight: 200;
          }

          input:focus ::-webkit-input-placeholder {
            color: transparent;
            font-size: 0;
          }
          input:focus :-moz-placeholder {
            color: transparent;
            font-size: 0;
          }
          input:focus ::-moz-placeholder {
            color: transparent;
            font-size: 0;
          }
          input:focus :-ms-input-placeholder {
            color: transparent;
            font-size: 0;
          }
        `}
      />
      <Input darkMode={darkMode} ref={ref} {...props} required />
      <Label darkMode={darkMode} htmlFor={props.id}>
        {props.labelText}
      </Label>
    </FormGroup>
  );
});
