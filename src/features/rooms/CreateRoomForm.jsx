import styled from "styled-components";
import FormTitle from "../../ui/FormTitle";
import FormRow, {
  InputFile,
  StyledFormElements,
  Textarea,
} from "../../ui/FormElements";
import { Button, CancelButton } from "../../ui/Button";
import { media } from "../../styles/breakpoints";

const style = {
  width: "max-content",
};

const StyledForm = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1.5rem;
  padding: 1.2rem 2rem;
  height: 90dvh;
  max-height: 71rem;
  /* margin: auto; */
  width: 95dvw;
  /* max-width: 40rem; */

  ${media.mobile} {
    height: 95dvh;
    width: 70dvw;
    /* max-width: auto; */
  }
`;

// const StyledForm = styled.div`
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   gap: 1.5rem;
//   padding: 1.2rem 2rem;

//   /* border: 1px solid red; */
//   height: 95dvh;
//   width: auto;
// `;

const StyledButtons = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
`;

function CreateRoomForm({ closeModal }) {
  return (
    <StyledForm>
      <FormTitle
        head={"Add new room"}
        subText={"Please complete this form to add a new room"}
      />

      <StyledFormElements>
        <FormRow label={"Room name"} error={""}>
          <input
            id={"name"}
            type={"text"}
            placeholder={`Insert room name here...`}
          />
        </FormRow>

        <FormRow label={"Max capacity"} error={""}>
          <input
            id={"maxCapacity"}
            type={"number"}
            placeholder={`Insert room maximum capacity here...`}
          />
        </FormRow>
        <FormRow label={"Regular price"} error={""}>
          <input
            id={"reguarPrice"}
            type={"number"}
            placeholder={`Insert room price here...`}
          />
        </FormRow>
        <FormRow label={"Discount"} error={""}>
          <input
            id={"discount"}
            type={"number"}
            placeholder={`Insert room discount here...`}
          />
        </FormRow>
        <FormRow label={"Description for website"} error={""}>
          <Textarea
            id={"description"}
            type={"text"}
            placeholder={`Insert room description here...`}
          />
        </FormRow>

        <FormRow label={"Room photo"} error={""} style={style}>
          <InputFile id={"image"} type={"file"} />
        </FormRow>
      </StyledFormElements>

      <StyledButtons>
        <CancelButton
          onClick={closeModal}
          fontSize={"1.3rem"}
          padding={".5rem 1rem"}
        >
          Cancel
        </CancelButton>
        <Button fontSize={"1.3rem"} padding={".5rem 1rem"}>
          Add room
        </Button>
      </StyledButtons>
    </StyledForm>
  );
}

export default CreateRoomForm;
