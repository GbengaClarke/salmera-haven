import { useForm } from "react-hook-form";
import FormRow from "../../ui/FormElements";
import { Button, CancelButton } from "../../ui/Button";
import { ButtonsCont, Container, Form } from "./UserDataForm";
import styled from "styled-components";

const GuestHint = styled.p`
  font-size: 1.2rem;
  color: var(--color-silver-700);
  margin-top: -1rem;
  margin-bottom: 1.2rem;
  font-style: italic;
`;

function ChangePasswordForm({ isUpdatingUser, updateUser, user }) {
  const isGuest = user?.email === "test@demo.com";

  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm();

  function onSubmit({ password }) {
    if (isGuest) return;

    updateUser(
      { password },
      {
        onSuccess: () => {
          reset();
        },
      }
    );
  }

  return (
    <Container>
      <h5>Change password</h5>

      {isGuest && (
        <GuestHint>
          Note: Password changes are disabled for guest accounts. Please create
          your own account on the &apos;User&apos; page to use this feature.
        </GuestHint>
      )}

      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormRow
          label={"Password (min 8 characters)"}
          error={errors?.password?.message}
        >
          <input
            /* 4. Disable if updating OR if guest */
            disabled={isUpdatingUser || isGuest}
            type="password"
            id="password"
            {...register("password", {
              required: isGuest ? false : "This field is required",
              minLength: {
                value: 8,
                message: "password needs a minimum of 8 characters",
              },
            })}
          />
        </FormRow>

        <FormRow
          label={"Repeat password"}
          error={errors?.repeatPassword?.message}
        >
          <input
            disabled={isUpdatingUser || isGuest}
            type="password"
            id="repeatPassword"
            {...register("repeatPassword", {
              required: isGuest ? false : "This field is required",
              validate: (value) =>
                isGuest ||
                value === getValues().password ||
                "passwords need to match",
            })}
          />
        </FormRow>

        <ButtonsCont type="horizontal">
          <CancelButton
            onClick={reset}
            type="reset"
            disabled={isUpdatingUser || isGuest}
          >
            Clear
          </CancelButton>

          <Button disabled={isUpdatingUser || isGuest} type="submit">
            Update password
          </Button>
        </ButtonsCont>
      </Form>
    </Container>
  );
}

export default ChangePasswordForm;
