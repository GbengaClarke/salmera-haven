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
  padding: 2rem 1.5rem;
  background-color: var(--color-grey-0);
  border-radius: 4px;
  height: auto;
  width: max-content;
  border: 1px solid var(--color-grey-100);
  overflow: hidden;
  transition: transform 0.2s ease;
  box-shadow: var(--shadow-sm);
  cursor: default;
  z-index: 999;

  ${({ $floatMenuOpen }) =>
    $floatMenuOpen
      ? "transform: translateY(1%)"
      : "transform: translateY(-300%)"};
`;

const ChevronContainer = styled.div`
  display: flex;
  align-content: center;
  color: var(--color-black);
`;

const GreetingCont = styled.h1`
  /* border: 1px solid blue; */
  text-align: center;
  margin: 0 0 0.7rem 0;
  font-size: 1.6rem;
  pointer-events: none;
`;

const Cont = styled.div`
  display: flex;
  align-items: center;
  gap: 0.7rem;
  font-size: 1.4rem;
  /* border: 1px solid red; */
  padding: 0.6rem 0.8rem;
  border-radius: 4px;
  cursor: pointer;
  font-family: "Raleway", sans-serif;
  ${({ $active }) =>
    $active &&
    css`
      background-color: var(--color-grey-200);
    `}

  &:hover {
    background-color: var(--color-grey-200);
  }
`;
const IconCont = styled.div`
  color: var(--color-grey-700);
  opacity: 0.7;
`;

function HeaderFloatMenu({ username, mainRef }) {
  const [floatMenuOpen, setFloatMenuOpen] = useState(false);
  const floatElement = useRef(null);
  const navigate = useNavigate();

  const match = useMatch("/account");

  const firstName = username.split(" ").at(0);

  const { logout } = useLogout();

  useEffect(() => {
    if (!floatMenuOpen) return;

    function handleClickOutside(e) {
      if (floatElement.current && !floatElement.current.contains(e.target)) {
        setFloatMenuOpen(false);
      }
    }

    function handleScroll() {
      setFloatMenuOpen(false);
    }

    const scrollContainer = mainRef?.current;

    document.addEventListener("mousedown", handleClickOutside);
    scrollContainer?.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      scrollContainer?.removeEventListener("scroll", handleScroll);
    };
  }, [floatMenuOpen, mainRef]);

  function handleClickChevron(e) {
    e.stopPropagation();
    setFloatMenuOpen((open) => !open);
  }

  return (
    <>
      <ChevronContainer onClick={handleClickChevron}>
        <IoChevronDownSharp />
      </ChevronContainer>

      <FloatMenu $floatMenuOpen={floatMenuOpen} ref={floatElement}>
        <GreetingCont>Hello, {firstName}</GreetingCont>

        <Cont
          $active={match ? true : false}
          onClick={() => navigate("/account")}
        >
          <IconCont>
            <FaUserEdit />
          </IconCont>

          <div>Update Account</div>
        </Cont>

        <Cont onClick={logout}>
          <IconCont>
            <IoLogOut />
          </IconCont>
          <div>Log Out</div>
        </Cont>
      </FloatMenu>
    </>
  );
}

export default HeaderFloatMenu;
