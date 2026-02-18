import { useState } from "react";
import styled from "styled-components";
import {
  HiOutlineEnvelope,
  HiOutlineLockClosed,
  HiOutlineEye,
  HiOutlineEyeSlash,
} from "react-icons/hi2";
import FormRow from "../../ui/FormElements";
import { Button } from "../../ui/Button";
import { login } from "../../services/apiAuth";
import useLogin from "./useLogin";
import SpinnerMini from "../../ui/SpinnerMini";

// Container to position the icon over the input
const InputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;

  & svg.input-icon {
    position: absolute;
    left: 1.2rem;
    font-size: 2rem;
    color: var(--color-grey-400);
    transition: all 0.2s;
    pointer-events: none;
  }

  /* Target the input within this wrapper */
  & input {
    width: 100%;
    padding: 0.8rem 1.2rem 0.8rem 4rem; /* Extra left padding for icon */
    border: 1px solid var(--color-grey-200);
    border-radius: var(--border-radius-md);
    background-color: var(--color-grey-50);
    transition: all 0.2s;

    &:focus {
      outline: none;
      border-color: var(--color-brand-500);
      background-color: var(--color-grey-0);
    }

    /* Change icon color when input is focused */
    &:focus + svg.input-icon {
      color: var(--color-brand-500);
    }
  }
`;

// Specific button for the password visibility toggle
const EyeButton = styled.button`
  position: absolute;
  right: 1.2rem;
  background: none;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-grey-400);
  padding: 0;
  //add transition

  &:hover {
    transition: all 0.15s ease-in-out;
    color: var(--color-grey-600);
  }

  &:active,
  &:focus {
    outline: none;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
  margin-top: 1rem;

  & div {
    text-align: left;
  }
`;

function LoginForm() {
  const [email, setEmail] = useState("test@demo.com");
  const [password, setPassword] = useState("HelloFriend");
  const [showPassword, setShowPassword] = useState(false);

  const { login, isLoggingIn } = useLogin();

  function handleSubmit(e) {
    e.preventDefault();
    if (!email || !password) return;

    // console.log("Logging in...", { email, password });

    login(
      { email, password },
      {
        onSuccess: () => {
          setPassword("");
          setEmail("");
        },
      }
    );
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormRow label="Email address">
        <InputWrapper>
          <input
            type="email"
            id="email"
            placeholder="example@mail.com"
            autoComplete="username"
            value={email}
            disabled={isLoggingIn}
            onChange={(e) => setEmail(e.target.value)}
          />
          <HiOutlineEnvelope className="input-icon" />
        </InputWrapper>
      </FormRow>

      <FormRow label="Password">
        <InputWrapper>
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            placeholder="••••••••"
            autoComplete="current-password"
            value={password}
            disabled={isLoggingIn}
            onChange={(e) => setPassword(e.target.value)}
          />
          <HiOutlineLockClosed className="input-icon" />

          <EyeButton
            type="button"
            onClick={() => setShowPassword((s) => !s)}
            tabIndex="-1"
          >
            {showPassword ? (
              <HiOutlineEyeSlash size={20} />
            ) : (
              <HiOutlineEye size={20} />
            )}
          </EyeButton>
        </InputWrapper>
      </FormRow>

      <FormRow>
        <Button
          disabled={isLoggingIn}
          padding=".8rem"
          fontWeight="700"
          width="100%"
        >
          {isLoggingIn ? <SpinnerMini /> : "Sign In"}
        </Button>
        {/* {isLoggingIn ? "" : "Sign in"} */}
      </FormRow>
    </Form>
  );
}

export default LoginForm;
