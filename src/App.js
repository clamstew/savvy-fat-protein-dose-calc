import { useState } from "react";
import styled from "@emotion/styled";
import {
  calcFatProteinUnit,
  calcCKal,
  calcCarbConversion,
  calcInsulinDose,
  calcDuration,
} from "./business-logic";
import useDarkMode from "use-dark-mode";

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

const InputLabel = styled.label({});

const InputNumber = styled.input({
  height: 40,
  textAlign: "center",
  borderWidth: 1,
  padding: 10,
  fontSize: 24,
  width: "90%",
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

function App() {
  const { value: darkMode } = useDarkMode(true);
  console.warn("darkMode", darkMode);

  const [fat, setFat] = useState(20);
  const [protein, setProtein] = useState(30);
  const [icr, setIcr] = useState(30);

  const fatProteinUnit = calcFatProteinUnit(fat, protein);
  const ckal = calcCKal(fatProteinUnit);
  const carbConversion = calcCarbConversion(fatProteinUnit);
  const insulinDose = calcInsulinDose(icr, carbConversion);
  const duration = calcDuration(ckal);

  return (
    <AppWrapper darkMode={darkMode}>
      <Header>Fat protein dose calc</Header>
      <InputWrapper>
        <InputLabel htmlFor="fat">Fat: {fat}</InputLabel>
        <InputNumber
          id="fat"
          type="number"
          defaultValue={fat}
          onChange={(e) => setFat(e.target.value)}
        />
      </InputWrapper>
      <InputWrapper>
        <InputLabel htmlFor="protein">Protein: {protein}</InputLabel>
        <InputNumber
          id="protein"
          type="number"
          defaultValue={protein}
          onChange={(e) => setProtein(e.target.value)}
        />
      </InputWrapper>
      <InputWrapper>
        <InputLabel htmlFor="icr">ICR: 1 unit per {icr}</InputLabel>
        <InputNumber
          id="icr"
          type="number"
          defaultValue={fat}
          onChange={(e) => setIcr(e.target.value)}
        />
      </InputWrapper>

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
    </AppWrapper>
  );
}

export default App;
