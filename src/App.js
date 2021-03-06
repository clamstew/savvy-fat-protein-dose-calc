import { useState, useRef } from "react";
import styled from "@emotion/styled";
import {
  calcFatProteinUnit,
  calcCKal,
  calcCarbConversion,
  calcInsulinDose,
  calcDuration,
} from "./business-logic";
import { MdInput } from "./components/MdInput";
import { ButtonLink } from "./components/ButtonLink";
import { InputWrapper } from "./components/InputWrapper";
import { ResultsViewer } from "./components/Results";
// modals
import { Terms } from "./components/Terms";

import logo from "./assets/logo192.png";

const ViewWrapper = styled.div({
  label: "ViewWrapper",
  background: "rgb(46, 46, 46)",
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  position: "absolute",
});

const AppWrapper = styled.div(({ darkMode, showTerms }) => {
  const styles = {
    label: "AppWrapper",
    color: "#000",
    zIndex: 0,
    backgroundColor: "#FFF",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    // //
    display: "flex",
    minHeight: "100vh",
    flexDirection: "column",
  };

  if (darkMode) {
    styles.color = "#FFF";
    styles.backgroundColor = "rgb(46, 46, 46)";
  }

  if (showTerms) {
    styles.opacity = 0;
    styles.display = "none";
  }

  return styles;
});

const Header = styled.div({
  label: "Header",
  fontSize: 24,
  fontWeight: "bold",
  textAlign: "center",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  "& img": {
    marginRight: 6,
  },
});

const BodyWrapper = styled.div({
  label: "BodyWrapper",
  flex: 1,
});

const FooterWrapper = styled.div({
  textAlign: "center",
  height: 50,
});

const ObviousDisclaimer = styled.div({
  fontSize: 9,
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

  // throttle results from fade out animation on load
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
        <Header>
          <img src={logo} style={{ height: 40 }} alt="Logo" /> Fat protein dose
        </Header>

        <BodyWrapper>
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

          <ResultsViewer
            darkMode={darkMode}
            hasRunOnce={hasRunOnce}
            allInputsHaveData={allInputsHaveData}
            clearInputs={clearInputs}
            // derived values
            fatProteinUnit={fatProteinUnit}
            ckal={ckal}
            carbConversion={carbConversion}
            insulinDose={insulinDose}
            duration={duration}
          />
        </BodyWrapper>

        <FooterWrapper>
          <ObviousDisclaimer>
            Use this site and its output at your own risk.
            <br />
            This is not medical advice.
          </ObviousDisclaimer>
          <ButtonLink
            style={{ fontSize: 9 }}
            onClick={() => setShowTerms(true)}
          >
            Terms & Conditions
          </ButtonLink>
        </FooterWrapper>
      </AppWrapper>
    </ViewWrapper>
  );
}

export default App;
