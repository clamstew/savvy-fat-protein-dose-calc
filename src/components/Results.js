import styled from "@emotion/styled";
import { Button } from "./Button";
import { InputWrapper } from "./InputWrapper";

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

export const ResultsViewer = ({
  darkMode,
  hasRunOnce,
  allInputsHaveData,
  clearInputs,
  // derived values
  fatProteinUnit,
  ckal,
  carbConversion,
  insulinDose,
  duration,
}) => {
  return (
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
        Carb conversion<OutputValue>{carbConversion}</OutputValue>
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
  );
};
