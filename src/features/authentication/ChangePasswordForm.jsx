import { useForm } from "react-hook-form";
import FormRow from "../../ui/FormElements";
import { Button, CancelButton } from "../../ui/Button";
import { ButtonsCont, Container, Form } from "./UserDataForm";

function ChangePasswordForm({ isUpdatingUser, updateUser }) {
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm();

  function onSubmit({ password }) {
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

      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormRow
          label={"Password (min 8 charaters)"}
          error={errors?.password?.message}
        >
          <input
            disabled={isUpdatingUser}
            type="password"
            id="password"
            {...register("password", {
              required: "This field is required",
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
            disabled={isUpdatingUser}
            type="password"
            id="repeatPassword"
            {...register("repeatPassword", {
              required: "This field is required",
              validate: (value) =>
                value === getValues().password || "passwords need to match",
            })}
          />
        </FormRow>

        <ButtonsCont type="horizontal">
          <CancelButton onClick={reset} type="reset" disabled={isUpdatingUser}>
            Clear
          </CancelButton>

          <Button disabled={isUpdatingUser} type="submit">
            Update password
          </Button>
        </ButtonsCont>
      </Form>
    </Container>
  );
}

export default ChangePasswordForm;
