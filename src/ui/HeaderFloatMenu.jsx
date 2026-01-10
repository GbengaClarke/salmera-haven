import { useEffect, useRef, useState } from "react";
import { IoChevronDownSharp, IoLogOut } from "react-icons/io5";
import styled from "styled-components";
import { FaUserEdit } from "react-icons/fa";

const FloatMenu = styled.div`
  position: absolute;
  top: 4.3rem;
  right: -0.7rem;
  display: flex;
  flex-direction: column;
  color: var(--color-black);
  justify-content: center;
  /* justify-content: flex-start; */
  gap: 1rem;
  padding: 2rem 0.5rem;
  background-color: var(--color-grey-0);
  border-radius: 4px;
  /* height: 12rem; */
  height: auto;
  width: 16rem;
  border: 1px solid var(--color-grey-100);
  overflow: hidden;
  transition: transform 0.2s ease;
  box-shadow: var(--shadow-sm);
  cursor: default;

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
  padding: 0.6rem 0.4rem;
  border-radius: 4px;
  cursor: pointer;
  font-family: "Raleway", sans-serif;

  &:hover {
    background-color: var(--color-grey-200);
  }
`;
const IconCont = styled.div`
  color: var(--color-grey-700);
  opacity: 0.7;
`;

function HeaderFloatMenu() {
  const [floatMenuOpen, setFloatMenuOpen] = useState(false);
  const floatElement = useRef(null);

  useEffect(() => {
    function handleClick(e) {
      if (floatElement.current && !e.target.contains(floatElement.current)) {
        setFloatMenuOpen(false);
      }
    }

    document.addEventListener("click", handleClick);
    document.addEventListener("scroll", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
      document.removeEventListener("scroll", handleClick);
    };
  }, [floatMenuOpen]);

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
        <GreetingCont>Hello, Samuel</GreetingCont>

        <Cont>
          <IconCont>
            <FaUserEdit />
          </IconCont>

          <div>Update Account</div>
        </Cont>

        <Cont>
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
