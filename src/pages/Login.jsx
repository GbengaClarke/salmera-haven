import styled from "styled-components";
import { media } from "../styles/breakpoints";
import ImageResuseable from "../styles/ImageResuseable";
import LoginForm from "../features/authentication/LoginForm";

const LoginLayout = styled.main`
  display: grid;
  grid-template-columns: 1fr;
  min-height: 100dvh;

  position: relative;
  /* background: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)),
    url("https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop");
  background-size: cover;
  background-position: center; */

  /* ${media.tabletlg} {
    grid-template-columns: 1fr 1fr;
  } */
  ${media.tabletsm} {
    /* min-height: 100vh; */
    max-width: 1000px;
    margin-inline: auto;
  }
`;

const Wrapper = styled.div`
  background: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)),
    url("https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop");
  background-size: cover;
  background-position: center;
`;

const BrandSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  grid-column: span 2;
  align-items: center;
  padding: 2rem;
  color: white;
  text-align: center;

  ${media.tabletsm} {
    /* align-items: flex-start; */
    grid-column: span 1;
    padding: 0;
    max-width: 50rem;
  }

  & div {
    display: flex;
    align-items: center;
    justify-content: center;
    /* color: var(--color-brand-500); */
    color: #e0e0e0;
    /* border: 1px solid red; */

    ${media.tabletsm} {
      margin-left: -1rem;
    }
  }

  & h1 {
    /* font-size: 4.2rem; */
    white-space: nowrap;
    font-weight: 800;
    letter-spacing: -1px;

    ${media.tabletsm} {
      /* font-size: 3rem; */
    }
  }

  & p {
    /* font-size: 1.3rem; */
    opacity: 0.9;
    max-width: 400px;
    text-align: center;
    margin-top: -1rem;

    ${media.laptopsm} {
      margin-top: 0rem;
    }
  }
`;

const FormSection = styled.div`
  margin: 3rem;
  max-width: 50rem;
  height: max-content;

  border-radius: 3rem;
  border: 1px solid red;

  ${media.mobile} {
    min-width: 50rem;
    margin-inline: auto;

    background-color: var(--color-grey-0);
  }
  ${media.tabletsm} {
    min-width: 35rem;
    margin: 3rem;
    background-color: var(--color-grey-0);
  }

  ${media.laptopsm} {
    min-width: 40rem;
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
    height: max-content;
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
`;

const Footer = styled.div`
  grid-column: span 2;
  font-size: 1rem;
  color: #e0e0e0;
  max-height: 10rem;
  /* padding: 1rem; */
  margin-top: auto;
  margin-bottom: 1rem;
`;

export default function LoginPage() {
  return (
    <Wrapper>
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
    </Wrapper>
  );
}
