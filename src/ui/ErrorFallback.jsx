import styled from "styled-components";
import Heading from "../styles/Heading";
import GlobalStyles from "../styles/GlobalStyles";
import { Button } from "./Button";
import { media } from "../styles/breakpoints";

const StyledErrorFallback = styled.main`
  min-height: 100vh;
  background-color: var(--color-grey-50);

  display: flex;
  align-items: center;
  justify-content: center;

  padding: 2rem;

  ${media.tabletsm} {
    padding: 4rem;
  }
`;

const Box = styled.div`
  width: 100%;
  max-width: 52rem;

  background-color: var(--color-grey-100);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-md);

  padding: 2.4rem;
  text-align: center;

  display: flex;
  flex-direction: column;
  gap: 1.6rem;

  ${media.tabletsm} {
    padding: 3.2rem;
  }

  ${media.laptoplg} {
    padding: 4rem;
  }
`;

const Illustration = styled.div`
  font-size: 4rem;
  margin-bottom: 0.8rem;

  ${media.tabletsm} {
    font-size: 5rem;
  }
`;

const ErrorText = styled.p`
  color: var(--color-grey-500);
  font-family: "Sono";
  font-size: 1.4rem;
  line-height: 1.6;

  word-break: break-word;

  ${media.tabletsm} {
    font-size: 1.5rem;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 1rem;

  flex-wrap: wrap;
`;

function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <>
      <GlobalStyles />

      <StyledErrorFallback>
        <Box>
          <Illustration>⚠️</Illustration>

          <Heading as="h1">Something went wrong</Heading>

          <ErrorText>
            {error?.message ||
              "An unexpected error occurred. Please try again."}
          </ErrorText>

          <ButtonGroup>
            <Button onClick={resetErrorBoundary}>Try again</Button>
          </ButtonGroup>
        </Box>
      </StyledErrorFallback>
    </>
  );
}

export default ErrorFallback;
