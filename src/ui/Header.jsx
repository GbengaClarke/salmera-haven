import styled from "styled-components";
import { MobileOnly } from "./Sidebar";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoMdMoon } from "react-icons/io";
import { IoSunnySharp } from "react-icons/io5";
import ImageResuseable from "../styles/ImageResuseable";
import { media } from "../styles/breakpoints";
import HeaderFloatMenu from "./HeaderFloatMenu";
import { useDarkModeContext } from "../context/DarkModeContext";
import Logo from "./Logo";
import AvatarDetails from "./AvatarDetails";
import Clock from "./Clock";

const StyledHeader = styled.div`
  grid-column: span 2;
  grid-row: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem;
  background-color: var(--color-grey-0);
  box-shadow: 0 6px 5px -6px rgba(24, 68, 138, 0.15);
  /* 0 6px 12px -6px  */
  z-index: 11;

  ${media.mobilesm} {
    padding: 1.2rem;
  }
`;

const Hamburger = styled.button`
  border: none;
  background-color: inherit;
  color: var(--color-grey-500);
  font-size: 2.5rem;
  outline: none;

  &:focus,
  &:active {
    outline: none;
    box-shadow: none;
  }
`;

export const FlexContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  ${media.mobile} {
    gap: 1.5rem;
  }
`;

const Avatar = styled.img`
  object-fit: cover;
  height: 100%;
`;

export const IconsContainer = styled.button`
  position: relative;

  display: flex;
  /* border: 1px solid red; */
  border-radius: 3px;
  align-items: center;
  border: none;
  padding: 0.4rem;
  background-color: inherit;

  &:hover {
    background-color: var(--color-grey-200);
  }

  &:focus,
  &:active {
    outline: none;
    box-shadow: none;
  }
`;

export const FlexAligner = styled.div`
  display: flex;
  align-items: center;
  justify-content: left;
  gap: 1rem;

  opacity: ${({ $sidebarOpen }) => ($sidebarOpen ? "0" : "1")};
  transition: opacity 0.25s ease-in-out;
  /* border: 1px solid red; */

  ${media.mobile} {
    gap: 1.5rem;
  }
`;

function Header({ toggleSideBar, sidebarOpen }) {
  const { toggleTheme, isDarkMode, theme } = useDarkModeContext();

  return (
    <StyledHeader>
      <FlexContainer>
        <MobileOnly>
          <Hamburger onClick={toggleSideBar}>
            <RxHamburgerMenu />
          </Hamburger>
        </MobileOnly>

        <FlexAligner $sidebarOpen={sidebarOpen}>
          <Logo />
        </FlexAligner>
      </FlexContainer>

      {/* <FlexContainer>
        <Clock />
      </FlexContainer> */}

      <FlexContainer>
        <IconsContainer onClick={toggleTheme}>
          {!isDarkMode ? (
            <IoMdMoon color="#0b1e3d90" />
          ) : (
            <IoSunnySharp color="#d36019" />
          )}
        </IconsContainer>

        <AvatarDetails />

        <IconsContainer>
          <HeaderFloatMenu />
        </IconsContainer>
      </FlexContainer>
    </StyledHeader>
  );
}

export default Header;
