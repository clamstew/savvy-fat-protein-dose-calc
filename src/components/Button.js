import styled from "@emotion/styled";

export const Button = styled.button(({ darkMode }) => {
  const styles = {
    border: "none",
    background: "grey",
    color: "white",
    fontWeight: "bold",
    width: "90%",
    height: 50,
    borderRadius: 10,
    padding: 10,
    cursor: "pointer",
    "&:active": {
      transform: "translateY(2px)",
      opacity: "0.6",
    },
    "&:hover": {
      opacity: "0.6",
    },
  };

  if (darkMode) {
    styles.color = "#FFF";
    styles.backgroundColor = "grey";
  }
  return styles;
});
