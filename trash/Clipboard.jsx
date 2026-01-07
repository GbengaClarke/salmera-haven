import { useEffect, useRef, useState } from "react";
import { CiMenuKebab } from "react-icons/ci";
import styled from "styled-components";

// Image styling
const Img = styled.img`
  width: 100%;
  height: 95%;
  object-fit: cover;
  border-radius: 0.5rem;
`;

// Button / menu trigger styling
const ModifyMenu = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 3px;
  width: max-content;
  margin: auto;
  padding: 0.5rem;
  cursor: pointer;

  &:hover {
    background-color: var(--color-grey-200);
    color: var(--color-blue-500);
  }

  &:active {
    background-color: var(--color-grey-300);
  }
`;

// Float menu container
const FloatMenu = styled.div`
  position: absolute;
  top: 2.5rem;
  right: 0;
  display: flex;
  flex-direction: column;
  border: 1px solid #ccc;
  background-color: #fff;
  border-radius: 0.5rem;
  z-index: 100;
  width: 10rem;
  padding: 0.5rem 0;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);

  /* Optional: simple fade-in animation */
  opacity: ${({ open }) => (open ? 1 : 0)};
  transform: translateY(${({ open }) => (open ? "0" : "-10px")});
  transition: all 0.2s ease;
`;

// Main component
function RoomsRow({ data }) {
  const [floatOpen, setFloatMenu] = useState(false);
  const menuRef = useRef(null);

  // Toggle the float menu
  function handleToggle() {
    setFloatMenu((prev) => !prev);
  }

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setFloatMenu(false);
      }
    }

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  // Close menu on Escape key
  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === "Escape") setFloatMenu(false);
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      <Img src="placeholderpic.webp" alt="cabin image" />
      <div>{data.rooms}</div>
      <div>{data.capacity}</div>
      <div>{data.price}</div>
      <div>{data.discount ? data.discount : "-"}</div>

      <ModifyMenu onClick={handleToggle} ref={menuRef}>
        <CiMenuKebab />
        <FloatMenu open={floatOpen}>
          {/* Replace with actual menu items */}
          <button
            style={{
              padding: "0.5rem",
              border: "none",
              background: "none",
              cursor: "pointer",
            }}
          >
            Edit
          </button>
          <button
            style={{
              padding: "0.5rem",
              border: "none",
              background: "none",
              cursor: "pointer",
            }}
          >
            Delete
          </button>
        </FloatMenu>
      </ModifyMenu>
    </>
  );
}

export default RoomsRow;
