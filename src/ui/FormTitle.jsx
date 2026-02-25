import styled from "styled-components";
import Heading from "../styles/Heading";

const StyledFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  & h3 {
    color: var(--color-brand-500);
    /* color: var(--color-grey-700); */
  }

  & p {
    color: var(--color-grey-500);
    font-size: 1rem;
  }
`;

function FormTitle({ head, subText }) {
  return (
    <StyledFormContainer>
      <Heading as={"h2"} style={{ color: "var(--color-brand-500)" }}>
        {head}
      </Heading>
      <p style={{ fontSize: "1.4rem" }}>{subText}</p>
    </StyledFormContainer>
  );
}

export default FormTitle;
