import { useState, useRef } from "react";
import styled from "@emotion/styled";
// import { Global, css } from "@emotion/react";
import {
  calcFatProteinUnit,
  calcCKal,
  calcCarbConversion,
  calcInsulinDose,
  calcDuration,
} from "./business-logic";
import useDarkMode from "use-dark-mode";
import { MdInput } from "./components/MdInput";

const AppWrapper = styled.div(({ darkMode }) => {
  const styles = {
    color: "#000",
    backgroundColor: "#FFF",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  };

  if (darkMode) {
    styles.color = "#FFF";
    styles.backgroundColor = "#000";
  }

  return styles;
});

const Header = styled.div({
  fontSize: 24,
  fontWeight: "bold",
  textAlign: "center",
});

const InputWrapper = styled.div({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: 66,
  margin: "5px 20px",
});

const ResultsSectionWrapper = styled.div({
  /*
  // https://blog.hubspot.com/website/css-fade-in
  .fade-in-text {
  display: inline-block;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 150px;
  color: black;
  animation: fadeIn linear 7s;
  -webkit-animation: fadeIn linear 7s;
  -moz-animation: fadeIn linear 7s;
  -o-animation: fadeIn linear 7s;
  -ms-animation: fadeIn linear 7s;
}

@keyframes fadeIn {
  0% {opacity:0;}
  100% {opacity:1;}
}

   */
});

const OutputText = styled.div(({ darkMode }) => {
  const styles = {
    fontSize: 24,
    borderBottom: "1px solid #000",
    padding: "10px 24px",
  };

  if (darkMode) {
    styles.borderBottom = "1px solid #FFF";
  }

  return styles;
});

const OutputValue = styled.span({
  display: "inline-block",
  float: "right",
  fontWeight: 800,
});

const Button = styled.button(({ darkMode }) => {
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
    },
  };

  if (darkMode) {
    styles.color = "#FFF";
    styles.backgroundColor = "grey";
  }
  return styles;
});

function App() {
  const { value: darkMode } = useDarkMode(true);

  const fatInput = useRef(null);
  const proteinInput = useRef(null);
  const icrInput = useRef(null);

  const [fat, setFat] = useState("");
  const [protein, setProtein] = useState("");
  const [icr, setIcr] = useState("");

  const fatProteinUnit = calcFatProteinUnit(fat, protein);
  const ckal = calcCKal(fatProteinUnit);
  const carbConversion = calcCarbConversion(fatProteinUnit);
  const insulinDose = calcInsulinDose(icr, carbConversion);
  const duration = calcDuration(ckal);

  const setFatInput = (e) => setFat(e.target.value);
  const setProteinInput = (e) => setProtein(e.target.value);
  const setIcrInput = (e) => setIcr(e.target.value);

  const clearInputs = () => {
    setFat("");
    setProtein("");
    setIcr("");
  };

  return (
    <AppWrapper darkMode={darkMode}>
      <Header>🩸🧮 Fat protein dose</Header>
      <InputWrapper>
        <MdInput
          id={"fat"}
          ref={fatInput}
          type={"number"}
          value={fat}
          onChange={setFatInput}
          placeholder={"enter grams"}
          labelText={`Fat`}
        />
      </InputWrapper>
      <InputWrapper>
        <MdInput
          id={"protein"}
          ref={proteinInput}
          type={"number"}
          value={protein}
          onChange={setProteinInput}
          placeholder={"enter grams"}
          labelText={`Protein`}
        />
      </InputWrapper>
      <InputWrapper>
        <MdInput
          id={"icr"}
          ref={icrInput}
          type={"number"}
          value={icr}
          onChange={setIcrInput}
          placeholder={"1 unit per"}
          labelText={`ICR`}
        />
      </InputWrapper>

      <ResultsSectionWrapper>
        <OutputText darkMode={darkMode}>
          FPU<OutputValue>{fatProteinUnit}</OutputValue>
        </OutputText>
        <OutputText darkMode={darkMode}>
          ckal<OutputValue>{ckal}</OutputValue>
        </OutputText>
        <OutputText darkMode={darkMode}>
          Carb Convertion<OutputValue>{carbConversion}</OutputValue>
        </OutputText>
        <OutputText darkMode={darkMode}>
          Insulin Dose<OutputValue>{insulinDose}</OutputValue>
        </OutputText>
        <OutputText darkMode={darkMode}>
          Duration<OutputValue>{duration}</OutputValue>
        </OutputText>

        <InputWrapper>
          <Button onClick={clearInputs} darkMode={darkMode}>
            Clear
          </Button>
        </InputWrapper>
      </ResultsSectionWrapper>
    </AppWrapper>
  );
}

export default App;
