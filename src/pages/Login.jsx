// import styled from "styled-components";
// import LoginForm from "../features/authentication/LoginForm";
// import Heading from "../styles/Heading";
// import Logo from "../ui/Logo";

// const LoginLayout = styled.main`
//   min-height: 100vh;
//   display: grid;
//   grid-template-columns: 48rem;
//   align-content: center;
//   justify-content: center;
//   gap: 3.2rem;
//   background-color: var(--color-grey-50);
// `;

// function Login() {
//   return (
//     <LoginLayout>
//       <Logo />
//       <Heading as="h4"> Log into your account</Heading>
//       <LoginForm />
//     </LoginLayout>
//   );
// }

// export default Login;

import styled from "styled-components";
import { media } from "../styles/breakpoints";
import ImageResuseable from "../styles/ImageResuseable";
import LoginForm from "../features/authentication/LoginForm";
import Logo from "../ui/Logo";
import RoomsTable from "../features/rooms/RoomsTable";

const LoginLayout = styled.main`
  display: grid;
  grid-template-columns: 1fr;
  min-height: 100vh;
  /* height: 50rem; */
  /* height: 100dvh; */
  /* overflow: hidden; */
  position: relative;
  background: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)),
    url("https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop");
  background-size: cover;
  background-position: center;

  ${media.tabletsm} {
    grid-template-columns: 1.2fr 1fr;
  }
`;

const BrandSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  /* align-items: center; */
  padding: 4rem;
  color: white;
  text-align: center;
  /* border: 1px solid red; */

  ${media.tabletsm} {
    /* align-items: flex-start; */
    /* padding: 10rem; */
    text-align: left;
  }

  & div {
    display: flex;
    align-items: center;
    /* color: var(--color-brand-500); */
    color: #e0e0e0;
    /* border: 1px solid red; */
  }

  & h1 {
    /* font-size: 4.2rem; */
    font-weight: 800;
    letter-spacing: -1px;
  }

  & p {
    font-size: 1.3rem;
    opacity: 0.9;
    max-width: 400px;
    text-align: center;
  }
`;

const FormSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 3rem;
  max-width: 40rem;
  /* margin-inline: auto; */

  /* padding: 1rem; */
  border-radius: 3rem;
  /* height: 20rem;*/
  /* overflow: hidden; */
  /* border: 1px solid blue; */
  /* border-radius: var(--border-radius-lg); */

  /* On desktop, this is a solid white sidebar */
  ${media.tabletsm} {
    background-color: var(--color-grey-0);
    /* padding: 1rem; */
    /* margin: 4rem 4rem 4rem 0; */
  }
`;

const FormCard = styled.div`
  background-color: var(--color-grey-0);
  padding: 2rem;
  border-radius: 3rem;
  text-align: left;
  width: 100%;
  /* max-width: 45rem; */
  box-shadow: var(--shadow-lg);

  & h2 {
  }

  & p {
  }

  /* Remove shadow/border on desktop since the whole sidebar is white */
  ${media.tabletsm} {
    box-shadow: none;
    /* border-radius: 0; */
  }
`;

const SmallLogo = styled.div`
  display: flex;
  align-items: center;
  /* justify-content: left; */
  font-size: 1rem;
  color: var(--color-blue-500);
  font-weight: 700;
  margin-bottom: -0.7rem;
  margin-left: -0.4rem;
  /* border: 1px solid red; */
`;

const Input = styled.input`
  width: 100%;
  padding: 0.5rem;
  margin-top: 0.4rem;
  border: 1px solid var(--color-grey-200);
  border-radius: var(--border-radius-md);
  background-color: var(--color-grey-50);
  transition: all 0.2s;

  &:focus {
    background-color: #fff;
    border-color: var(--color-brand-500);
    outline: none;
  }
`;

const Label = styled.label`
  display: block;
  font-size: 1.3rem;
  font-weight: 600;
  color: var(--color-grey-700);
  margin-top: 1.5rem;
  text-align: left;
`;

const SubmitButton = styled.button`
  width: 100%;
  background-color: var(--color-brand-500);
  color: white;
  padding: 1rem;
  border: none;
  border-radius: var(--border-radius-md);
  /* font-size: 1.6rem; */
  font-weight: 600;
  margin-top: 3rem;
  transition: background-color 0.2s;

  &:hover {
    background-color: var(--color-brand-600);
  }
`;

const Footer = styled.div`
  /* border: 1px solid green; */
  grid-column: span 2;
  font-size: 1rem;
  color: #e0e0e0;
  max-height: 10rem;
  padding: 1rem;
  margin-top: auto; //set media query for this
`;

export default function LoginPage() {
  return (
    <LoginLayout>
      <BrandSection>
        <div>
          <ImageResuseable height={"8rem"} width={"8rem"}>
            <img src="/logo.png" alt="Logo" />
          </ImageResuseable>
          <h1>Salmera Haven</h1>
        </div>

        <p>
          Enter your credentials to access our secure dashboard and manage
          business operations.
        </p>
      </BrandSection>

      <FormSection>
        <FormCard>
          <SmallLogo>
            <ImageResuseable height={"3rem"} width={"3rem"}>
              <img src="/logo.png" alt="Logo" />
            </ImageResuseable>
            <span>Salmera Haven</span>
          </SmallLogo>

          <h2
            style={{
              fontSize: "2rem",
              color: "var(--color-grey-900)",
            }}
          >
            Sign In
          </h2>
          <p
            style={{
              fontSize: "1.4rem",
              color: "var(--color-grey-500)",
            }}
          >
            Welcome! Please login to your account.
          </p>

          <LoginForm />
        </FormCard>
      </FormSection>
      {/* turn them to links using span below */}
      <Footer>
        © 2026 Salmera Haven. All rights reserved. | Term of use | Privacy
        Policy
      </Footer>
    </LoginLayout>
  );
}
