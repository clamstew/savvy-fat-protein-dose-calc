import { useState } from "react";
import styled from "@emotion/styled";
import {
  calcFatProteinUnit,
  calcCKal,
  calcCarbConversion,
  calcInsulinDose,
  calcDuration,
} from "./business-logic";

const AppWrapper = styled.div({
  color: "#FFF",
  backgroundColor: "#000",
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
});

const Header = styled.div({
  fontSize: 24,
});

const InputNumber = styled.input({
  height: 40,
  margin: 12,
  borderWidth: 1,
  padding: 10,
  fontSize: 24,
});

const OutputText = styled.div({
  fontSize: 24,
  borderBottom: "1px solid white",
  padding: "10px 0",
});

function App() {
  const [fat, setFat] = useState(20);
  const [protein, setProtein] = useState(30);
  const [icr, setIcr] = useState(30);

  const fatProteinUnit = calcFatProteinUnit(fat, protein);
  const ckal = calcCKal(fatProteinUnit);
  const carbConversion = calcCarbConversion(fatProteinUnit);
  const insulinDose = calcInsulinDose(icr, carbConversion);
  const duration = calcDuration(ckal);

  return (
    <AppWrapper>
      <Header>Fat protein dose</Header>
      <div>Fat: {fat}</div>
      <div>
        <InputNumber
          type="number"
          defaultValue={fat}
          onChange={(e) => setFat(e.target.value)}
        />
      </div>
      <div>Protein: {protein}</div>
      <div>
        <InputNumber
          type="number"
          defaultValue={protein}
          onChange={(e) => setProtein(e.target.value)}
        />
      </div>
      <div>ICR: 1 unit per {icr}</div>
      <div>
        <InputNumber
          type="number"
          defaultValue={fat}
          onChange={(e) => setIcr(e.target.value)}
        />
      </div>

      <OutputText>FPU: {fatProteinUnit}</OutputText>
      <OutputText>ckal: {ckal}</OutputText>
      <OutputText>Carb Convertion: {carbConversion}</OutputText>
      <OutputText>Insulin Dose: {insulinDose}</OutputText>
      <OutputText>Duration: {duration}</OutputText>
    </AppWrapper>
  );
}

export default App;
