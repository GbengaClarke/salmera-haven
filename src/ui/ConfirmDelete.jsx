import styled from "styled-components";
import { Button, CancelButton } from "./Button";

const StyledConfirmDelete = styled.div`
  width: 40rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 2rem;

  & p {
    color: var(--color-grey-500);
    margin-bottom: 1.2rem;
    font-family: "Raleway", sans-serif;
    hyphens: none;
  }

  & div {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

const StyledH3 = styled.h3`
  font-size: 1.8rem;
  font-weight: 600;
  color: var(--color-brand-500);
`;

function ConfirmDelete({
  resourceName,
  onConfirm,
  disabled,
  closeModal,
  setFloatMenu,
  message,
}) {
  function handleClick() {
    onConfirm();
    closeModal();
    setFloatMenu?.(false);
  }

  // console.log(message === "confirmCheckout");

  if (message === "confirmCheckout")
    return (
      <StyledConfirmDelete>
        <StyledH3>Check out {resourceName}</StyledH3>
        <p>Are you sure you want to check out {resourceName}?</p>

        <div>
          <CancelButton disabled={disabled} onClick={closeModal}>
            No
          </CancelButton>
          <Button
            bgc={"var(--color-red-700)"}
            disabled={disabled}
            onClick={handleClick}
          >
            Yes
          </Button>
        </div>
      </StyledConfirmDelete>
    );

  return (
    <StyledConfirmDelete>
      <StyledH3>Delete {resourceName}</StyledH3>
      <p>
        Are you sure you want to delete this {resourceName} permanently? This
        action cannot be undone.
      </p>

      <div>
        <CancelButton disabled={disabled} onClick={closeModal}>
          Cancel
        </CancelButton>
        <Button
          bgc={"var(--color-red-700)"}
          disabled={disabled}
          onClick={handleClick}
        >
          Delete
        </Button>
      </div>
    </StyledConfirmDelete>
  );
}

export default ConfirmDelete;
