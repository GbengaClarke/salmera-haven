import styled from "styled-components";
import ImageResuseable from "../styles/ImageResuseable";
import { media } from "../styles/breakpoints";

const CompanyName = styled.h1`
  font-size: 1.6rem;
  color: var(--color-blue-700);
  margin-left: -1rem;

  ${media.mobilesm} {
    font-size: 1.4rem;
  }
`;
function Logo() {
  return (
    <>
      <ImageResuseable height={"5rem"} width={"5rem"}>
        <img src="/logo.png" alt="Logo" />
      </ImageResuseable>

      <CompanyName>Salmera Haven</CompanyName>
    </>
  );
}

export default Logo;
