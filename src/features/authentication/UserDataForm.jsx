import { useForm } from "react-hook-form";
import styled from "styled-components";
import FormRow, { InputFile } from "../../ui/FormElements";
import { Button, CancelButton } from "../../ui/Button";
import useGetUser from "./useGetUser";

export const Container = styled.div`
  width: 100%;

  padding: 0.5rem 0;

  box-shadow: var(--shadow-sd);

  & h5 {
    text-align: left;
    color: var(--color-grey-700);
    font-weight: 500;
    margin-bottom: 1rem;
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 2rem;
  background-color: var(--color-grey-100);
  border-radius: var(--border-radius-md);

  & div {
    text-align: left;
  }
`;

export const ButtonsCont = styled.div`
  display: flex;
  align-items: center;
  margin-left: auto;
  gap: 1rem;
  margin-top: 2rem;
`;

function UserDataForm({ isUpdatingUser, updateUser }) {
  const {
    user: { user_metadata: userData },
    isPending,
  } = useGetUser();

  const isWorking = isUpdatingUser || isPending;

  const { fullName, email } = userData;

  const {
    register,
    handleSubmit,
    resetField,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      fullName,
      email,
    },
  });

  function onSubmit({ fullName, avatar }) {
    updateUser(
      { fullName, avatar },
      {
        onSuccess: () => {
          resetField("avatar");
        },
      }
    );
  }

  return (
    <Container>
      <h5>Edit user information</h5>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormRow label={"Full Name"} error={errors?.fullName?.message}>
          <input
            disabled={isWorking}
            type="text"
            id="fullName"
            {...register("fullName", {
              required: "This field is required",
            })}
          />
        </FormRow>

        <FormRow label={"Email address"} error={errors?.email?.message}>
          <input
            disabled
            type="email"
            id="email"
            value={email}
            {...register("email", {
              required: "This field is required",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "provide a valid email address",
              },
            })}
          />
        </FormRow>
        <FormRow>
          <InputFile
            disabled={isWorking}
            id={"avatar"}
            accept="image/*"
            type={"file"}
            {...register("avatar", {
              required: false,
            })}
          />
        </FormRow>

        <ButtonsCont type="horizontal">
          <CancelButton onClick={reset} type="reset" disabled={isWorking}>
            Clear
          </CancelButton>

          <Button disabled={isWorking} type="submit">
            Update details
          </Button>
        </ButtonsCont>
      </Form>
    </Container>
  );
}

export default UserDataForm;
