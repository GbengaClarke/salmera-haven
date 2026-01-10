import { useEffect, useRef, useState } from "react";
import { CiMenuKebab } from "react-icons/ci";
import { GoDuplicate } from "react-icons/go";
import { MdOutlineDeleteOutline, MdOutlineEditNote } from "react-icons/md";
import styled from "styled-components";

const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

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
    /* color: var(--color-blue-500); */
  }

  &:active {
    background-color: var(--color-grey-300);
    color: var(--color-blue-500);
  }
`;

const FloatMenu = styled.div`
  position: absolute;
  right: 2.2rem;

  top: ${({ isLast3 }) => (isLast3 === "false" ? "2.5rem" : "-8rem")};

  display: flex;
  flex-direction: column;
  justify-content: center;
  /* border: 1px solid red; */
  border-radius: 4px;
  height: auto;
  width: 10rem;
  background-color: var(--color-grey-50);
  z-index: 100;
  padding: 0.3rem 0.5rem;
  gap: 0.7rem;
  box-shadow: 0 4px 5px 1px rgba(0, 0, 0, 0.15);
  /* z-index: 100000; */

  /* simple fade-in animation?? */
  /* opacity: ${({ open }) => (open ? 1 : 0)};
  transform: translateY(${({ open }) => (open ? "0" : "-10px")});
  transition: all 10s ease; */
`;

const Mod = styled.button`
  display: flex;
  align-items: center;
  border: none;
  background-color: inherit;
  gap: 0.5rem;
  padding: 0.3rem 0.4rem;
  /* border: 1px solid red; */
  transition: all 0.25s ease;

  &:hover,
  &:active,
  &:focus {
    background-color: var(--color-grey-100);
    color: var(--color-blue-500);
    outline: none;
  }

  &:hover p {
    color: var(--color-blue-500);
  }
`;

const StyledCapacity = styled.div`
  text-align: left;
`;
const StyledDiscount = styled.div`
  color: var(--color-mint-500);
  font-weight: 500;
`;

const StyledPrice = styled.div`
  font-weight: 500;
`;

function RoomsRow({ data, last3 }) {
  const ref = useRef(null);
  const ref2 = useRef(null);
  const [floatOpen, setFloatMenu] = useState(false);

  function handleFloat(e) {
    if (e.target === ref.current || ref2.current.contains(e.target)) {
      setFloatMenu(!floatOpen);
    }

    if (floatOpen && ref.current.contains(e.target)) return;

    setFloatMenu(!floatOpen);
  }

  useEffect(() => {
    function handler(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setFloatMenu(false);
      }
    }

    document.addEventListener("click", handler);

    return () => {
      document.removeEventListener("click", handler);
    };
  }, []);

  return (
    <>
      {/* <div>{data.preview}</div> */}
      <Img src="placeholderpic.webp" alt="cabin image" />
      <div>{data.rooms}</div>
      <StyledCapacity>
        {" "}
        Accommodates up to {data.capacity}{" "}
        {data.capacity > 1 ? "guests" : "guest"}
      </StyledCapacity>
      <StyledPrice>${data.price}</StyledPrice>
      <StyledDiscount>
        {data.discount ? `$${data.discount}` : "-"}
      </StyledDiscount>

      <ModifyMenu onClick={handleFloat} ref={ref}>
        <CiMenuKebab ref={ref2} />
        {/* fade in?? */}
        {/* <FloatMenu open={floatOpen}>sike</FloatMenu> */}
        {floatOpen && (
          <FloatMenu isLast3={last3} open={floatOpen}>
            <Mod>
              <MdOutlineEditNote />
              <p>Edit</p>
            </Mod>
            <Mod>
              <GoDuplicate />
              <p>Duplicate</p>
            </Mod>
            <Mod>
              <MdOutlineDeleteOutline />
              <p>Delete</p>
            </Mod>
          </FloatMenu>
        )}
      </ModifyMenu>
    </>
  );
}

export default RoomsRow;
