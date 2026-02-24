import { useEffect, useRef, useState } from "react";
import { IoChevronDownSharp, IoLogOut } from "react-icons/io5";
import styled, { css } from "styled-components";
import { FaUserEdit } from "react-icons/fa";
import useLogout from "../features/authentication/useLogout";
import { useMatch, useNavigate } from "react-router-dom";

const FloatMenu = styled.div`
  position: absolute;
  top: 5.2rem;
  right: -0.7rem;
  display: flex;
  flex-direction: column;
  color: var(--color-black);
  justify-content: center;
  gap: 1.5rem;
  padding: 2rem 1rem;
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-sm);
  height: auto;
  width: max-content;
  border: 1px solid var(--color-grey-100);
  overflow: hidden;
  transition: all 0.2s ease-in-out;
  box-shadow: var(--shadow-md);
  cursor: default;
  z-index: 999;

  ${({ $floatMenuOpen }) =>
    $floatMenuOpen
      ? css`
          opacity: 1;
          transform: translateY(0);
          pointer-events: auto;
        `
      : css`
          opacity: 0;
          transform: translateY(-10px);
          pointer-events: none;
        `};
`;

const ChevronContainer = styled.div`
  display: flex;
  align-items: center;
  color: var(--color-black);
  padding: 0.9rem;

  cursor: pointer;
  transition: transform 0.3s ease;

  ${({ $floatMenuOpen }) => $floatMenuOpen && `transform: rotate(180deg);`}
`;

const GreetingCont = styled.h1`
  text-align: center;
  margin: 0 0 0.7rem 0;
  font-size: 1.4rem;
  font-weight: 600;
  color: var(--color-grey-500);
  pointer-events: none;
  border-bottom: 1px solid var(--color-grey-100);
  padding-bottom: 1rem;
`;

const Cont = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 1.4rem;
  padding: 0.8rem 1.2rem;
  border-radius: var(--border-radius-sm);
  cursor: pointer;
  font-family: "Raleway", sans-serif;
  color: var(--color-grey-700);
  transition: all 0.2s;

  ${({ $active }) =>
    $active &&
    css`
      background-color: var(--color-grey-100);
      color: var(--color-brand-600);
      font-weight: 600;
    `}

  &:hover {
    background-color: var(--color-grey-100);
    color: var(--color-brand-600);
  }
`;

const IconCont = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.8rem;
`;

function HeaderFloatMenu({ username = "Guest", mainRef }) {
  const [floatMenuOpen, setFloatMenuOpen] = useState(false);
  const floatElement = useRef(null);
  const toggleRef = useRef(null);

  const navigate = useNavigate();
  const { logout } = useLogout();
  const match = useMatch("/account");
  const firstName = username.split(" ").at(0);

  const closeMenu = () => setFloatMenuOpen(false);

  useEffect(() => {
    if (!floatMenuOpen) return;

    function handleClickOutside(e) {
      const isOutsideMenu =
        floatElement.current && !floatElement.current.contains(e.target);
      const isOutsideToggle =
        toggleRef.current && !toggleRef.current.contains(e.target);

      if (isOutsideMenu && isOutsideToggle) {
        closeMenu();
      }
    }

    function handleScroll() {
      closeMenu();
    }

    function handleKeyDown(e) {
      if (e.key === "Escape") closeMenu();
    }

    const scrollContainer = mainRef?.current;

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    scrollContainer?.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
      scrollContainer?.removeEventListener("scroll", handleScroll);
    };
  }, [floatMenuOpen, mainRef]);

  function handleToggleMenu(e) {
    e.stopPropagation();
    setFloatMenuOpen((open) => !open);
  }

  return (
    <div style={{ position: "relative" }}>
      <ChevronContainer
        ref={toggleRef}
        $floatMenuOpen={floatMenuOpen}
        onClick={handleToggleMenu}
      >
        <IoChevronDownSharp />
      </ChevronContainer>

      <FloatMenu $floatMenuOpen={floatMenuOpen} ref={floatElement}>
        <GreetingCont>Hello, {firstName}</GreetingCont>

        <Cont
          $active={!!match}
          onClick={() => {
            navigate("/account");
            closeMenu();
          }}
        >
          <IconCont>
            <FaUserEdit />
          </IconCont>
          <span>Update Account</span>
        </Cont>

        <Cont
          onClick={() => {
            logout();
            closeMenu();
          }}
        >
          <IconCont>
            <IoLogOut />
          </IconCont>
          <span>Log Out</span>
        </Cont>
      </FloatMenu>
    </div>
  );
}

export default HeaderFloatMenu;
