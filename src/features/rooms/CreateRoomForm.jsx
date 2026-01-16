import styled from "styled-components";
import FormTitle from "../../ui/FormTitle";
import FormRow, {
  InputFile,
  StyledFormElements,
  Textarea,
} from "../../ui/FormElements";
import { Button, CancelButton } from "../../ui/Button";
import { media } from "../../styles/breakpoints";
import { useForm } from "react-hook-form";
import { useEffect, useRef } from "react";
import useAddEditRoom from "./useAddRoom";

const style = {
  width: "max-content",
};

const StyledForm = styled.form`
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

function CreateRoomForm({ closeModal, room = {}, setFloatMenu }) {
  const nameInputRef = useRef(null);

  const { id: editId, ...editValues } = room;

  const isEditing = editId;

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm({
    defaultValues: { discount: 0, ...editValues },
  });

  const { addEditRoom, isWorking } = useAddEditRoom();

  function onSubmit(data) {
    addEditRoom(
      {
        formData: data,
        id: editId,
      },
      {
        onSuccess: () => {
          reset();
          closeModal?.();
          setFloatMenu?.(false);
        },
        onError: (err) => {
          if (err.message === "A room with this name already exists") {
            setError("name", {
              type: "server",
              message: err.message,
            });
          }
        },
      }
    );
  }

  //focus the first input in the form on open
  useEffect(() => {
    nameInputRef.current?.focus();
  }, []);

  return (
    <StyledForm onSubmit={handleSubmit(onSubmit)}>
      <FormTitle
        head={isEditing ? "Edit Room" : "Add new room"}
        subText={`Please complete this form to ${
          isEditing ? "edit the" : "add a new"
        } room`}
      />

      <StyledFormElements>
        <FormRow label={"Room name"} error={errors.name && errors.name.message}>
          <input
            id={"name"}
            type={"text"}
            disabled={isWorking}
            {...register("name", { required: "This field is required" })}
            placeholder={`Insert room name here...`}
            ref={(e) => {
              register("name").ref(e);
              nameInputRef.current = e;
            }}
          />
        </FormRow>

        <FormRow
          label={"Max capacity"}
          error={errors.maxCapacity && errors.maxCapacity.message}
        >
          <input
            id={"maxCapacity"}
            type={"number"}
            disabled={isWorking}
            {...register("maxCapacity", { required: "This field is required" })}
            placeholder={`Insert room maximum capacity here...`}
          />
        </FormRow>
        <FormRow
          label={"Regular price"}
          error={errors.regularPrice && errors.regularPrice.message}
        >
          <input
            id={"regularPrice"}
            type={"number"}
            disabled={isWorking}
            {...register("regularPrice", {
              required: "This field is required",
              min: {
                value: 1,
                message: "capacity should be atleast 1",
              },
            })}
            placeholder={`Insert room price here...`}
          />
        </FormRow>

        <FormRow
          label={"Discount"}
          error={errors.discount && errors.discount.message}
        >
          <input
            id={"discount"}
            type={"number"}
            disabled={isWorking}
            {...register("discount", { required: "This field is required" })}
            placeholder={`Insert room discount here...`}
          />
        </FormRow>

        <FormRow
          label={"Description for website"}
          error={errors.description && errors.description.message}
        >
          <Textarea
            id={"description"}
            type={"text"}
            disabled={isWorking}
            {...register("description", { required: "This field is required" })}
            placeholder={`Insert room description here...`}
          />
        </FormRow>

        <FormRow
          label={"Room photo"}
          error={errors.image && errors.image.message}
          style={style}
        >
          <InputFile
            disabled={isWorking}
            id={"image"}
            accept="image/*"
            type={"file"}
            {...register("image", {
              required: isEditing ? false : "This field is required",
            })}
          />
        </FormRow>
      </StyledFormElements>

      <StyledButtons>
        <CancelButton
          type="button"
          disabled={isWorking}
          onClick={closeModal}
          fontSize={"1.3rem"}
          padding={".5rem 1rem"}
        >
          Cancel
        </CancelButton>

        <Button
          disabled={isWorking}
          type="submit"
          fontSize={"1.3rem"}
          padding={".5rem 1rem"}
        >
          {isWorking
            ? isEditing
              ? "Editing..."
              : "Adding..."
            : isEditing
            ? "Edit room"
            : "Add room"}
        </Button>
      </StyledButtons>
    </StyledForm>
  );
}

export default CreateRoomForm;
