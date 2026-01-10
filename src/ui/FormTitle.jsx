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
// const StyledFormName = styled.div`
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
// `;

function FormTitle({ head, subText }) {
  return (
    <StyledFormContainer>
      <Heading as={"h3"}>{head}</Heading>
      <p>{subText}</p>
    </StyledFormContainer>
  );
}

export default FormTitle;
