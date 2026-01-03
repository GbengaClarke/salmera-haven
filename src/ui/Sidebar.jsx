import { useEffect, useRef } from "react";
import styled from "styled-components";
import { media } from "../styles/breakpoints";
import { HiOutlineChevronDoubleLeft } from "react-icons/hi";
import Logo from "./Logo";
import FlexAlign from "../styles/FlexAlign";
import SideNav from "./SideNav";

const StyledSidebar = styled.aside`
  background-color: var(--color-grey-0);
  grid-row: 1/-1;
  /* border: 1px solid red; */
  position: fixed;
  inset: 0 auto 0 0;
  width: 20rem;
  overflow: hidden;
  /* overflow-y: scroll; */
  z-index: 12;
  padding: 1rem 1.3rem 2rem 1.3rem;

  transform: ${({ $open }) => ($open ? "translateX(0)" : "translateX(-100%)")};

  transition: transform 0.3s, background-color 0.3s ease-in-out;

  /* keeps animation smooth */
  will-change: transform;

  ${media.tabletsm} {
    position: static;
    width: auto;
    transform: translateX(0);
    background-color: var(--color-grey-0);
    z-index: 11;

    box-shadow: 6px 0 5px -6px rgba(24, 68, 138, 0.15);
  }
`;

export const MobileOnly = styled.div`
  display: flex;
  align-items: center;

  ${media.tabletsm} {
    display: none;
  }
`;

const AlignRight = styled.button`
  margin-left: auto;
  border: none;
  border-radius: 3px;
  padding: 1rem;
  background-color: inherit;
  color: var(--color-grey-500);

  &:hover {
    background-color: var(--color-grey-200);
  }

  &:focus,
  &:active {
    outline: none;
    box-shadow: none;
  }
`;

function Sidebar({ isOpen, closeSideBar }) {
  const sidebarRef = useRef(null);

  //close menu on outside click (mobile)
  useEffect(() => {
    function handleClickOutside(event) {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        closeSideBar();
      }

      // console.log(sidebarRef.current);
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("touchstart", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [isOpen, closeSideBar]);

  return (
    <StyledSidebar $open={isOpen} ref={sidebarRef}>
      <MobileOnly>
        <FlexAlign justify={"center"}>
          <Logo />
        </FlexAlign>
      </MobileOnly>

      <MobileOnly>
        {isOpen && (
          <AlignRight onClick={closeSideBar}>
            <HiOutlineChevronDoubleLeft />
          </AlignRight>
        )}
      </MobileOnly>

      <SideNav closeSideBar={closeSideBar} />
    </StyledSidebar>
  );
}

export default Sidebar;
