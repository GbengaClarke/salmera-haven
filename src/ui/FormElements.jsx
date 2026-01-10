import styled from "styled-components";

export const StyledFormElements = styled.form`
  border: 1px solid var(--color-grey-300);
  padding: 1.2rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
  /* max-width: 40rem; */
  border-radius: var(--border-radius-lg);
  overflow-y: scroll;
`;

const StyledRow = styled.div`
  display: flex;
  flex-direction: column;
  /* column-gap: 3rem; */

  /* align-items: center; */
  justify-content: center;
  color: var(--color-grey-700);
  row-gap: 0.4rem;
  width: ${({ style = "100%" }) => style.width};

  & label {
    font-size: 1.4rem;
    width: max-content;
    cursor: pointer;
  }

  & input {
    font-size: 1rem;
    /* color: var(--color-grey-900); */
    padding: 0.7rem 1rem;
    border: 1.5px solid var(--color-grey-300);
    border-radius: 3px;
    background-color: inherit;
    /* box-shadow: var(--shadow-sm); */
    cursor: pointer;

    &:focus {
      outline: none;
      border: 1.5px solid var(--color-brand-500);
    }
  }
`;

export const Textarea = styled.textarea`
  width: 100%;
  height: 8rem;

  font-size: 1rem;
  /* color: var(--color-grey-900); */
  padding: 0.7rem 1rem;
  border: 1.5px solid var(--color-grey-300);
  border-radius: 3px;
  background-color: inherit;
  /* box-shadow: var(--shadow-sm); */
  cursor: pointer;

  &:focus {
    outline: none;
    border: 1.5px solid var(--color-brand-500);
  }
`;

const StyledError = styled.span`
  font-size: 1rem;
  /* color: var(--color-red-800); */
  color: #d22626;
  opacity: ${({ error }) => (error ? "1" : "0")};
  pointer-events: none;

  transition: opacity 0.25s ease;
`;

export const InputFile = styled.input.attrs({ type: "file" })`
  /* font-size: 1.4rem; */
  border-radius: var(--border-radius-sm);

  &::file-selector-button {
    font: inherit;
    font-weight: 500;
    padding: 0.8rem 1.2rem;
    margin-right: 1.2rem;
    border-radius: var(--border-radius-sm);
    border: none;
    color: var(--color-brand-50);
    background-color: var(--color-brand-600);
    cursor: pointer;
    transition: color 0.2s, background-color 0.2s;

    &:hover {
      background-color: var(--color-brand-700);
    }
  }
`;

function FormRow({ label, children, error, style }) {
  return (
    <StyledRow style={style}>
      {label && <label htmlFor={children.props.id}>{label}</label>}
      {children}
      <StyledError
        error={error}
      >{`${error}! this input is invalid, try again`}</StyledError>
    </StyledRow>
  );
}

export default FormRow;
