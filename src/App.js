import { useState, useRef } from "react";
import styled from "@emotion/styled";
import {
  calcFatProteinUnit,
  calcCKal,
  calcCarbConversion,
  calcInsulinDose,
  calcDuration,
} from "./business-logic";
// import useDarkMode from "use-dark-mode";
import { MdInput } from "./components/MdInput";
import { Button } from "./components/Button";
import { ButtonLink } from "./components/ButtonLink";
import { Terms } from "./components/Terms";

const ViewWrapper = styled.div({
  background: "black",
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  posistion: "absolute",
});

const AppWrapper = styled.div(({ darkMode, showTerms }) => {
  const styles = {
    color: "#000",
    zIndex: 0,
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

  if (showTerms) {
    styles.opacity = 0;
    styles.display = "none";
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

const ResultsSectionWrapper = styled.div(
  ({ allInputsHaveData, hasRunOnce }) => {
    const fadeOut = {
      visibility: "hidden",
      opacity: 0,
      transition: "visibility 0s 0.3s, opacity 0.3s ease-in-out",
    };

    const fadeIn = {
      visibility: "visible",
      opacity: 1,
      transition: "opacity 0.3s ease-in-out",
    };

    let styles = {
      ...fadeOut,
      maxWidth: 600,
      margin: "0 auto",
    };

    if (hasRunOnce && allInputsHaveData) {
      styles = { ...fadeIn, maxWidth: 600, margin: "0 auto" };
    }

    if (hasRunOnce && !allInputsHaveData) {
      styles = { ...fadeOut, maxWidth: 600, margin: "0 auto" };
    }

    return styles;
  }
);

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

let hasRunOnce = false;

function App() {
  const [showTerms, setShowTerms] = useState(false);
  // const { value: darkMode } = useDarkMode(true);
  const darkMode = true;

  // Input Refs
  const fatInput = useRef(null);
  const proteinInput = useRef(null);
  const icrInput = useRef(null);

  // State
  const [fat, setFat] = useState("");
  const [protein, setProtein] = useState("");
  const [icr, setIcr] = useState("");

  // throttle results from fade out on load
  const allInputsHaveData = fat && protein && icr;
  if (allInputsHaveData) {
    hasRunOnce = true;
  }

  // calculate output
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
    <ViewWrapper>
      {showTerms && <Terms hideTerms={() => setShowTerms(false)} />}
      <AppWrapper darkMode={darkMode} showTerms={showTerms}>
        <Header>🩸🧮 Fat protein dose</Header>
        <InputWrapper>
          <MdInput
            id={"fat"}
            ref={fatInput}
            inputmode={"numeric"}
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
            inputmode={"numeric"}
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
            inputmode={"numeric"}
            type={"number"}
            value={icr}
            onChange={setIcrInput}
            placeholder={"1 unit per"}
            labelText={`ICR`}
          />
        </InputWrapper>

        <ResultsSectionWrapper
          hasRunOnce={hasRunOnce}
          allInputsHaveData={allInputsHaveData}
        >
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

        <div style={{ textAlign: "center" }}>
          <ButtonLink
            style={{ fontSize: 9 }}
            onClick={() => setShowTerms(true)}
          >
            Terms & Conditions
          </ButtonLink>
        </div>
      </AppWrapper>
    </ViewWrapper>
  );
}

export default App;
