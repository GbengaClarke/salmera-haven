import styled from "styled-components";
import { MobileOnly } from "./Sidebar";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoMdMoon } from "react-icons/io";
import { IoSunnySharp } from "react-icons/io5";
import { media } from "../styles/breakpoints";
import HeaderFloatMenu from "./HeaderFloatMenu";
import { useDarkModeContext } from "../context/DarkModeContext";
import Logo from "./Logo";
import AvatarDetails from "./AvatarDetails";
import useGetUser from "../features/authentication/useGetUser";
import { NavLink } from "react-router-dom";
// import Clock from "./Clock";

const StyledHeader = styled.div`
  grid-column: span 2;
  grid-row: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 3.5rem 2rem;
  background-color: var(--color-grey-0);
  box-shadow: 0 6px 5px -6px rgba(24, 68, 138, 0.15);
  z-index: 11;

  ${media.mobilesm} {
    padding: 3rem 1.2rem;
  }

  @media (min-width: 600px) and (max-width: 900px) {
    padding: 3rem 1.2rem;
  }
`;

const Hamburger = styled.button`
  border: none;
  background-color: inherit;
  color: var(--color-grey-500);
  font-size: 2.5rem;
  outline: none;
  /* border: 1px solid red; */
  padding: 0.5rem;

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

export const IconsContainer = styled.button`
  position: relative;
  display: flex;
  border-radius: 3px;
  align-items: center;
  border: none;
  padding: 0.7rem;
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

const ThemeIconContainer = styled.div`
  position: relative;
  width: 30px;
  height: 30px;
  cursor: pointer;

  display: flex;
  border-radius: 3px;
  align-items: center;
  justify-content: center;

  &:focus,
  &:active {
    outline: none;
    box-shadow: none;
  }
`;

const Icon = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  font-size: 2rem;

  transition: transform 0.4s ease, opacity 0.4s ease;

  transform: ${({ $active }) =>
    $active ? "translateX(0)" : "translateX(-40px)"};
  opacity: ${({ $active }) => ($active ? 1 : 0)};
`;

function Header({ toggleSideBar, sidebarOpen }) {
  const { toggleTheme, isDarkMode } = useDarkModeContext();
  const { user } = useGetUser();

  const userData = user.user_metadata;

  return (
    <StyledHeader>
      <FlexContainer>
        <MobileOnly>
          <Hamburger onClick={toggleSideBar}>
            <RxHamburgerMenu />
          </Hamburger>
        </MobileOnly>

        <NavLink to={"/"}>
          <FlexAligner $sidebarOpen={sidebarOpen}>
            <Logo />
          </FlexAligner>
        </NavLink>
      </FlexContainer>

      {/* <FlexContainer>
        <Clock />
      </FlexContainer> */}

      <FlexContainer>
        <ThemeIconContainer onClick={toggleTheme}>
          <Icon $active={!isDarkMode}>
            <IoMdMoon color="#0b1e3d90" />
          </Icon>
          <Icon $active={isDarkMode}>
            <IoSunnySharp color="#d36019" />
          </Icon>
        </ThemeIconContainer>

        <AvatarDetails user={userData} />

        <IconsContainer>
          <HeaderFloatMenu username={userData.fullName} />
        </IconsContainer>
      </FlexContainer>
    </StyledHeader>
  );
}

export default Header;
