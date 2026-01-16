import { useEffect, useRef, useState } from "react";
import { CiMenuKebab } from "react-icons/ci";
import { GoDuplicate } from "react-icons/go";
import { MdOutlineDeleteOutline, MdOutlineEditNote } from "react-icons/md";
import styled from "styled-components";
import { CommonRow } from "../../ui/TableContext";
import useDeleteRoom from "./useDeleteRoom";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import useDuplicateRoom from "./useDuplicateRoom";
import CreateRoomForm from "./CreateRoomForm";

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

  top: ${({ $isLast3 }) => ($isLast3 === "false" ? "2.5rem" : "-8rem")};

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

const ImageCont = styled.div`
  width: 7rem;
  height: 5rem;
  overflow: hidden;
  border-radius: 3px;
  background-color: var(--color-grey-100);
`;

function RoomsRow({ room, last3 }) {
  const { id, name, maxCapacity, regularPrice, discount, image, description } =
    room;

  const ref = useRef(null);
  const ref2 = useRef(null);
  const [floatOpen, setFloatMenu] = useState(false);

  const { deleteRoom, isPending: isDeleting } = useDeleteRoom();

  const { duplicateRoom, isPending: isDuplicating } = useDuplicateRoom();

  const isMenuPending = isDeleting || isDuplicating;

  function handleDuplicate() {
    const duplicateData = {
      name: `copy of ${name}`,
      maxCapacity,
      regularPrice,
      discount,
      image,
      description,
    };
    duplicateRoom(duplicateData);
    setFloatMenu(false);
  }

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
    <CommonRow columns="0.6fr 1.8fr 2.2fr 1fr 1.2fr 0.7fr">
      <ImageCont>
        <Img src={image} alt={name} />
      </ImageCont>

      <div>{name}</div>
      <StyledCapacity>
        Accommodates up to {maxCapacity} {maxCapacity > 1 ? "guests" : "guest"}
      </StyledCapacity>
      <StyledPrice>${regularPrice}</StyledPrice>
      <StyledDiscount>{discount ? `$${discount}` : "-"}</StyledDiscount>

      <ModifyMenu onClick={handleFloat} ref={ref}>
        <Modal>
          <CiMenuKebab ref={ref2} disabled={true} />
          {floatOpen && (
            <FloatMenu $isLast3={last3} open={floatOpen}>
              <Modal.Open openFor="editRoom">
                <Mod disabled={isMenuPending}>
                  <MdOutlineEditNote />
                  <p>Edit</p>
                </Mod>
              </Modal.Open>

              <Mod disabled={isMenuPending} onClick={handleDuplicate}>
                <GoDuplicate />
                <p>Duplicate</p>
              </Mod>

              <Modal.Open openFor="confirmDelete">
                <Mod disabled={isMenuPending}>
                  <MdOutlineDeleteOutline />
                  <p>Delete</p>
                </Mod>
              </Modal.Open>

              <Modal.Window openFor="editRoom">
                <CreateRoomForm room={room} setFloatMenu={setFloatMenu} />
              </Modal.Window>

              <Modal.Window openFor="confirmDelete">
                <ConfirmDelete
                  resourceName="room"
                  setFloatMenu={setFloatMenu}
                  onConfirm={() => {
                    deleteRoom(id);
                  }}
                  disabled={isDeleting}
                />
              </Modal.Window>
            </FloatMenu>
          )}
        </Modal>
      </ModifyMenu>
    </CommonRow>
  );
}

export default RoomsRow;
