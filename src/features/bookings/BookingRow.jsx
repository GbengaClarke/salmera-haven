import { useEffect, useRef, useState } from "react";
import { CiMenuKebab } from "react-icons/ci";
import { MdOutlineDeleteOutline } from "react-icons/md";
import styled, { css } from "styled-components";
import { CommonRow } from "../../ui/TableContext";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import { FaRegEye } from "react-icons/fa";
import { IoMdLogOut } from "react-icons/io";
import {
  formatCurrency,
  formatDistanceFromStartDate,
  noonCheckout,
} from "../../utils/helpers";
import { format, isSameDay, parseISO } from "date-fns";
import useDeleteBooking from "./useDeleteBooking";
import { LuMapPinCheckInside } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import useCheckoutBooking from "./useCheckoutBooking";
import { media } from "../../styles/breakpoints";

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

  top: ${({ $isLast3 }) => ($isLast3 === "false" ? "2.5rem" : "-5rem")};

  display: flex;
  flex-direction: column;
  justify-content: center;
  border-radius: 4px;
  height: auto;
  width: max-content;
  background-color: var(--color-grey-50);
  border: 1px solid var(--color-grey-100);
  z-index: 100;
  padding: 1rem;
  gap: 1rem;
  box-shadow: 0 4px 5px 2px rgba(0, 0, 0, 0.2);
`;

const Mod = styled.button`
  display: flex;
  align-items: center;
  border: none;
  background-color: inherit;
  gap: 0.5rem;
  padding: 1rem;
  border-radius: 4px;

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

const StyledInfo = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0.6rem 0;
  gap: 0.2rem;

  & div {
    font-weight: 500;
    color: var(--color-grey-700);
    white-space: nowrap;
  }

  & p {
    font-size: 1.1rem;
    color: var(--color-grey-500);
  }
`;

const StyledPrice = styled.div`
  font-weight: 500;
  color: var(--color-grey-700);
`;

export const statusStyles = {
  "checked-in": css`
    background-color: var(--color-brand-mint);
  `,
  "checked-out": css`
    background-color: var(--color-grey-300);
    /* color: var(--color-grey-700); */
  `,
  unconfirmed: css`
    background-color: var(--color-janquil-100);
    /* background-color: #857d0e; */
  `,
};

const StyledStatus = styled.div`
  color: var(--color-grey-700);
  width: max-content;
  padding: 0.4rem 1.2rem;
  font-weight: 600;
  border-radius: 100px;
  font-size: 1rem;
  text-transform: uppercase;
  text-align: center;

  ${({ status }) => statusStyles[status]}

  ${media.tabletRange} {
    font-size: 0.7rem;
  }
`;

function BookingRow({ booking, last3 }) {
  const {
    id,
    endDate,
    startDate,
    status,
    totalPrice,
    numNights,
    guest: { fullName: guestName, email: email },
    room: { name: roomName },
  } = booking;

  const ref = useRef(null);
  const ref2 = useRef(null);
  const [floatOpen, setFloatMenu] = useState(false);

  const { deleteBooking, isDeleting } = useDeleteBooking();
  const { checkoutBooking, isCheckingout } = useCheckoutBooking();

  const isWorking = isDeleting || isCheckingout;
  const navigate = useNavigate();

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
    <CommonRow columns="0.1fr 0.7fr 2.5fr 3fr 1.4fr 1.2fr 0.1fr">
      <div></div>
      <div>{roomName}</div>
      <StyledInfo>
        <div>{guestName}</div>
        <p>{email}</p>
      </StyledInfo>
      <StyledInfo>
        <div>
          {isSameDay(parseISO(startDate), new Date())
            ? "Today"
            : formatDistanceFromStartDate(startDate)}{" "}
          &rarr; {numNights} night stay
        </div>
        <p>
          {format(new Date(startDate), "MMM dd yyyy")} &mdash;{" "}
          {format(noonCheckout(endDate), "MMM dd yyyy")}
        </p>
      </StyledInfo>
      <StyledStatus status={status}>{status.replace("-", " ")} </StyledStatus>
      <StyledPrice>{formatCurrency(totalPrice)}</StyledPrice>

      <ModifyMenu onClick={handleFloat} ref={ref}>
        <Modal>
          <CiMenuKebab ref={ref2} disabled={isWorking} />
          {floatOpen && (
            <FloatMenu $isLast3={last3} open={floatOpen}>
              <Mod
                onClick={() => {
                  navigate(`/bookings/${id}`);
                }}
                disabled={isWorking}
              >
                <FaRegEye />
                <p>See details</p>
              </Mod>

              {status === "checked-in" && (
                <Mod
                  disabled={isWorking}
                  onClick={() => {
                    checkoutBooking({
                      id: id,
                      status: "checked-out",
                      fullName: guestName,
                    });
                  }}
                >
                  <IoMdLogOut />
                  <p>Check out</p>
                </Mod>
              )}

              {status === "unconfirmed" && (
                <Mod
                  onClick={() => {
                    navigate(`/bookings/${id}/checkin`);
                  }}
                  disabled={isWorking}
                >
                  <LuMapPinCheckInside />
                  <p>Check in</p>
                </Mod>
              )}

              <Modal.Open openFor="confirmDelete">
                <Mod disabled={isWorking}>
                  <MdOutlineDeleteOutline />
                  <p>Delete booking</p>
                </Mod>
              </Modal.Open>

              <Modal.Window openFor="confirmDelete">
                <ConfirmDelete
                  resourceName="room"
                  setFloatMenu={setFloatMenu}
                  onConfirm={() => {
                    // deleteRoom(id);
                    deleteBooking(id);
                  }}
                  disabled={isWorking}
                />
              </Modal.Window>
            </FloatMenu>
          )}
        </Modal>
      </ModifyMenu>
    </CommonRow>
  );
}

export default BookingRow;
