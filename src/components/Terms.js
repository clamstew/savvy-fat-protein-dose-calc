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

const Link = styled.a({
  color: "white",
  "&:visited": {
    color: "white",
  },
  "&:hover": {
    color: "white",
  },
  "&:active": {
    color: "white",
  },
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
          If you are curious about the calculations that the javascript is
          running on the input data, please visit{" "}
          <Link
            href="https://github.com/clamstew/savvy-fat-protein-dose-calc/blob/main/src/business-logic.js"
            rel="nofollow"
            target="_blank"
          >
            the business-logic javascript
          </Link>{" "}
          in the open-sourced version of the fat-protein.netlify.app website's
          source code. This is not a guareentee that these calculations are
          accurate or even a good way to calculate the results being shown.
          However, the company can show you the calculation methods at this code
          repository, so you can see how these outputs are likely being
          calculated.
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
          The fat-protein.netlify.app website does not store your data outside
          of the html inputs, which are also stored in temporary memory in
          javascript for calculations and results rendering. This temporary
          javascript and html memory should refresh/empty upon a webpage
          reload/refresh. Additionally, the fat-protein.netlify.app website does
          not make any attempt to transmit your data to any other client or
          server, and it's reasonable to believe the data will stay only on your
          computing device. However, enter data into the fat-protein.netlify.app
          website at your own risk, as there is no warranty for this site - see
          further disclaimer below - and websites on the internet can be
          compromised through various exploits. We believe the user is likely as
          secure as a user typically can be on a public website, when https is
          being used, but that assertion is subject to change at any time, and
          without notice.
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
