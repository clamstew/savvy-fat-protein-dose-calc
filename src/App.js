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

function Terms({ hideTerms }) {
  return (
    <div
      style={{
        posistion: "absolute",
        top: 0,
        botom: 0,
        left: 0,
        right: 0,
        zIndex: 10,
        background: "black",
        color: "white",
      }}
    >
      <div style={{ margin: "0 auto", maxWidth: 500 }}>
        <h1>Legal Disclaimer</h1>
        <p>
          All information on this site is intended for entertainment purposes
          only. All reasonable efforts have been made to ensure that the
          accuracy of the calculations of fat-protein.netlify.app at the time of
          preparation. Calculated results presented are believed to be reliable
          but is subject to change at any time, and without notice.
        </p>

        <p>
          The fat-protein.netlify.app website may contain links to third party
          websites which are not under the control of fat-protein.netlify.app.
          These links do not indicate explicit or implicit any endorsement,
          approval, recommendation or preference of those third party websites
          or the products and services provided on them. Any use of or access to
          those third party websites or their products and services is solely at
          your own risk.
        </p>

        <p>
          Unless provided otherwise in this Disclaimer, the information on the
          fat-protein.netlify.app website is provided to you on an “AS IS”, “AS
          AVAILABLE” basis without any express or implied warranty of any kind
          and is provided for a general, indicative purpose only. In particular,
          the company does not make any express or implied warranty as to the
          accuracy, fitness for a particular purpose, non-infringement,
          reliability, security, timeliness, completeness or freedom from
          computer virus in relation to such contents. The company accepts no
          liability, obligation or responsibility whatsoever for any loss,
          destruction or damage arising directly or indirectly from or inspect
          of the use of or misuse of or reliance on, any information contained
          on this website or for any inaccuracies, errors omissions,
          misstatements or misrepresentations (whether express or implied) of
          any information relating to the Company.
        </p>

        <p>
          By accessing the fat-protein.netlify.app website or any of its
          webpages, you unconditionally agree to the terms of this Disclaimer
          and as they may be modified and/or supplemented from time to time by
          the company without prior notice to you. Please check this webpage
          regularly for any modifications and/or supplements which may be made.
        </p>

        <a style={{ color: "white" }} href="#" onClick={() => hideTerms()}>
          Back
        </a>
      </div>
    </div>
  );
}

let hasRunOnce = false;

function App() {
  const [showTerms, setShowTerms] = useState(false);
  // const { value: darkMode } = useDarkMode(true);
  const darkMode = true;

  const fatInput = useRef(null);
  const proteinInput = useRef(null);
  const icrInput = useRef(null);

  const [fat, setFat] = useState("");
  const [protein, setProtein] = useState("");
  const [icr, setIcr] = useState("");

  const allInputsHaveData = fat && protein && icr;
  if (allInputsHaveData) {
    hasRunOnce = true;
  }

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
    <div
      style={{
        background: "black",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        posistion: "absolute",
      }}
    >
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
          <a
            style={{ color: "white", fontSize: 9 }}
            href="#"
            onClick={() => setShowTerms(true)}
          >
            Terms & Conditions
          </a>
        </div>
      </AppWrapper>
    </div>
  );
}

export default App;
