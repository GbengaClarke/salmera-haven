import { useForm } from "react-hook-form";
import styled from "styled-components";
import { media } from "../../styles/breakpoints";
import FormRow from "../../ui/FormElements";
import { Button, CancelButton } from "../../ui/Button";
import Row from "../../styles/Row";

const Container = styled.div`
  width: 100%;
  /* max-width: 600px; */
  margin: 2rem auto;
  padding: 2rem;
  background-color: var(--color-grey-100);
  border-radius: var(--border-radius-md);
  box-shadow: var(--shadow-sd);

  ${media.tabletsm} {
    padding: 3rem;
  }

  ${media.laptoplg} {
    max-width: 800px;
  }
`;

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
  //load settings from supabase and place as default values

  // console.log(settings);

  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    // console.log(getValues());
  };

  return (
    // <>
    <Container>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormRow label={"Full Name"} error={errors?.fullName?.message}>
          <input
            disabled={""}
            type="text"
            id="fullName"
            {...register("fullName", {
              required: "This field is required",
              min: { value: 3, message: "Minimum of 3 characters" },
            })}
          />
        </FormRow>

        <FormRow label={"Email address"} error={errors?.email?.message}>
          <input
            disabled={""}
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

          <Button disabled={""} type="submit">
            Create new user
          </Button>
        </ButtonsCont>
      </Form>
    </Container>
    // </>
  );
}

export default UsersForm;
