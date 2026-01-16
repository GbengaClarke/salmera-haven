import { cloneElement, createContext, useContext, useState } from "react";
import { HiXMark } from "react-icons/hi2";
import styled from "styled-components";
import useOutsideClick from "../hooks/useOutsideClick";
import { createPortal } from "react-dom";

const StyledModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  /* top: 10px;
  left: 10px; */
  /* border: 1px solid red; */
  border: 1px solid var(--color-grey-200);

  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  transition: all 0.5s;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: var(--backdrop-color);
  backdrop-filter: blur(4px);
  z-index: 1000;
  transition: all 0.5s;
`;

const Button = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;
  position: absolute;
  top: 1rem;
  right: 1.9rem;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-500);
  }
`;

const ModalContext = createContext();

function Modal({ children }) {
  const [openName, setOpenName] = useState("");

  const close = () => setOpenName("");

  return (
    <ModalContext.Provider value={{ openName, setOpenName, close }}>
      {children}
    </ModalContext.Provider>
  );
}

function Open({ children, openFor }) {
  const { setOpenName } = useContext(ModalContext);

  return cloneElement(children, {
    onClick: () => {
      setOpenName(openFor);
    },
  });
}

function Window({ children, openFor }) {
  const { openName, close } = useContext(ModalContext);

  const ref = useOutsideClick(close);

  if (openFor !== openName) return null;

  // const isEditing = openFor === "editRoom";

  return createPortal(
    <Overlay>
      <StyledModal ref={ref}>
        <Button onClick={close}>
          <HiXMark />
        </Button>

        <div onClick={(e) => e.stopPropagation()}>
          {cloneElement(children, { closeModal: close })}
        </div>
      </StyledModal>
    </Overlay>,
    document.body
  );
}

Modal.Open = Open;
Modal.Window = Window;

export default Modal;
