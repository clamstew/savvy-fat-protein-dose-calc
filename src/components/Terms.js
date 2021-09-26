import styled from "@emotion/styled";
import { Button } from "./Button";

const TermsWrapper = styled.div({
  posistion: "absolute",
  top: 0,
  botom: 0,
  left: 0,
  right: 0,
  zIndex: 10,
  color: "white",
});

const TermsInnerWrapper = styled.div({
  margin: "0 auto",
  maxWidth: 500,
});

export function Terms({ hideTerms }) {
  return (
    <TermsWrapper>
      <TermsInnerWrapper>
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

        <div style={{ textAlign: "center" }}>
          <Button onClick={() => hideTerms()}>Close</Button>
        </div>
      </TermsInnerWrapper>
    </TermsWrapper>
  );
}
