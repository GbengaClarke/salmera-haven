import { useForm } from "react-hook-form";
import styled from "styled-components";
import { media } from "../../styles/breakpoints";
import FormRow from "../../ui/FormElements";
import { Button, CancelButton } from "../../ui/Button";
import useSignupUser from "./useSignupUser";

// const Container = styled.div`
//   width: 100%;
//   /* max-width: 600px; */
//   margin: 0.5rem auto;
//   padding: 2rem;
//   background-color: var(--color-grey-100);
//   border-radius: var(--border-radius-md);
//   box-shadow: var(--shadow-sd);

//   ${media.tabletsm} {
//     padding: 2.3rem;
//   }

//   ${media.laptoplg} {
//     max-width: 800px;
//   }
// `;

const Container = styled.div`
  width: 100%;
  /* max-width: 600px; */
  /* margin: 0.5rem auto; */
  /* padding: 2rem;
  background-color: var(--color-grey-100); */
  padding: 0.5rem 0.7rem;

  /* border-radius: var(--border-radius-md); */
  box-shadow: var(--shadow-sd);

  & h5 {
    text-align: left;
    color: var(--color-grey-700);
    font-weight: 500;
    margin-bottom: 1rem;
  }

  ${media.tabletsm} {
    /* padding: 2.3rem; */
  }

  ${media.laptoplg} {
    max-width: 800px;
  }
`;

const Form = styled.form`
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

const ButtonsCont = styled.div`
  display: flex;
  align-items: center;
  margin-left: auto;
  gap: 1rem;
`;

function ChangePasswordForm() {
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm();

  function onSubmit({ avatar, email, password }) {}

  return (
    <Container>
      <h5>Change password</h5>

      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormRow
          label={"Password (min 8 charaters)"}
          error={errors?.password?.message}
        >
          <input
            disabled={""}
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
            disabled={""}
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
          <CancelButton onClick={reset} type="reset" disabled={""}>
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

          <Button disabled={""} type="submit">
            Create new user
          </Button>
        </ButtonsCont>
      </Form>
    </Container>
  );
}

export default ChangePasswordForm;
