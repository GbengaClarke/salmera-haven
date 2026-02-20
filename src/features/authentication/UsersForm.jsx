import { useForm } from "react-hook-form";
import styled from "styled-components";
import { media } from "../../styles/breakpoints";
import FormRow from "../../ui/FormElements";
import { Button, CancelButton } from "../../ui/Button";
import useSignupUser from "./useSignupUser";
import { Container } from "../settings/SettingsForm";
import SpinnerMini from "../../ui/SpinnerMini";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  & div {
    text-align: left;
  }
`;

const ButtonsCont = styled.div`
  display: flex;
  align-items: center;
  margin-left: auto;
  gap: 1rem;
`;

function UsersForm() {
  const { signupUser, isCreating } = useSignupUser();
  // const { googleLogin, isPending } = useGoogleLogin();

  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm();

  function onSubmit({ fullName, email, password }) {
    signupUser(
      { fullName, email, password },
      {
        onSuccess: () => reset(),
      }
    );
  }

  return (
    // <>
    <Container>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormRow label={"Full Name"} error={errors?.fullName?.message}>
          <input
            disabled={isCreating}
            type="text"
            id="fullName"
            {...register("fullName", {
              required: "This field is required",
            })}
          />
        </FormRow>

        <FormRow label={"Email address"} error={errors?.email?.message}>
          <input
            disabled={isCreating}
            type="email"
            id="email"
            {...register("email", {
              required: "This field is required",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "provide a valid email address",
              },
            })}
          />
        </FormRow>

        <FormRow
          label={"Password (min 8 charaters)"}
          error={errors?.password?.message}
        >
          <input
            disabled={isCreating}
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
            disabled={isCreating}
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
          <CancelButton onClick={reset} type="reset" disabled={isCreating}>
            Clear
          </CancelButton>

          {/* <Button
            type="button"
            fontSize="2.4rem"
            onClick={() => {
              googleLogin();
            }}
          >
            <FcGoogle />
          </Button> */}

          <Button disabled={isCreating} type="submit">
            {!isCreating ? " Create new user" : <SpinnerMini />}
          </Button>
        </ButtonsCont>
      </Form>
    </Container>
    // </>
  );
}

export default UsersForm;
