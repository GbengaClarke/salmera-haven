import React from "react";
import styled, { css } from "styled-components";
import { format } from "date-fns";
import { IoMdLogOut } from "react-icons/io";
import { LuMapPinCheckInside } from "react-icons/lu";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { Outlet, useMatch, useNavigate } from "react-router-dom";

import BookingDataBox from "./BookingDataBox";
import FlexAlign from "../../styles/FlexAlign";
import { statusStyles } from "./BookingRow";
import useGetSingleBooking from "./useGetSingleBooking";
import Spinner from "../../ui/Spinner";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import { media } from "../../styles/breakpoints";
import useDeleteBooking from "./useDeleteBooking";
// import { media } from "../../styles/media";

/* ======================
   STYLES
====================== CLEAN UP UI CODE, REMOVE COPIES AND USE PERSONAL RESUABLE BUTTON COMPONENT */

const Container = styled.section`
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-md);
  box-shadow: var(--shadow-md);
  border: 1px solid var(--color-grey-100);
  overflow: hidden;
`;

const TopRow = styled.div`
  padding: 2rem 3.2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid var(--color-grey-100);

  h2 {
    font-size: 1.8rem;
    font-weight: 700;
    color: var(--color-grey-800);
  }

  ${media.mobilesm} {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
`;

const StyledStatus = styled.span`
  padding: 0.6rem 1.4rem;
  border-radius: 999px;
  font-size: 1rem;
  font-weight: 600;
  text-transform: uppercase;
  ${({ $statusStyles, status }) => $statusStyles[status]};
`;

export const ButtonText = styled.button`
  background: none;
  border: none;
  /* color: var(--color-brand-600); */
  color: var(--color-grey-600);
  padding: 1rem 1.4rem;
  background-color: var(--color-grey-200);
  border-radius: var(--border-radius-md);
  margin-left: auto;
  font-weight: 500;
  cursor: pointer;

  &:hover {
    color: var(--color-brand-400);
  }
`;

const Footer = styled.footer`
  padding: 1.6rem 3.2rem;
  border-top: 1px solid var(--color-grey-100);
  font-size: 1.2rem;
  color: var(--color-grey-500);
  text-align: right;
`;

/* ======================
   MODAL ACTIONS
====================== */

export const ModalActions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1.2rem;
  justify-content: center;
  padding: 2rem;

  ${media.mobile} {
    justify-content: flex-start;
  }
`;

export const ActionButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.8rem;

  padding: 1rem 1.4rem;
  border-radius: var(--border-radius-md);
  font-weight: 600;
  font-size: 1.3rem;

  border: none;
  cursor: pointer;

  width: auto;
  min-width: 12rem;
  white-space: nowrap;

  background-color: var(--color-grey-100);
  color: var(--color-grey-700);

  &:hover {
    background-color: var(--color-grey-200);
  }

  svg {
    font-size: 1.6rem;
  }

  ${media.tabletsm} {
    font-size: 1.4rem;
    padding: 1.1rem 1.6rem;
  }
`;

const PrimaryAction = styled(ActionButton)`
  background-color: var(--color-brand-600);
  color: white;

  &:hover {
    background-color: var(--color-brand-500);
  }
`;

const DangerAction = styled(ActionButton)`
  background-color: var(--color-red-100);
  color: var(--color-red-700);

  &:hover {
    background-color: var(--color-red-200);
  }
`;

/* ======================
   COMPONENT
====================== */

function BookingDetails() {
  const { booking = {}, isGettingSingleBooking } = useGetSingleBooking();

  const navigate = useNavigate();

  const { deleteBooking, errorDeleting, isDeleting } = useDeleteBooking();

  const { id, status, created_at } = booking;

  const isCheckIn = useMatch(`/bookings/:id/checkin`);

  // console.log(isCheckIn);

  if (isGettingSingleBooking) return <Spinner />;

  return (
    <>
      <TopRow>
        <FlexAlign>
          <h2>Booking #{id}</h2>
          <StyledStatus $statusStyles={statusStyles} status={status}>
            {status}
          </StyledStatus>
        </FlexAlign>

        <ButtonText onClick={() => navigate(-1)}>&larr; Back</ButtonText>
      </TopRow>

      <Container>
        <BookingDataBox booking={booking} />

        <Footer>
          Booked on{" "}
          {created_at && format(new Date(created_at), "EEE, MMM dd yyyy, p")}
        </Footer>
      </Container>

      {/* {isCheckIn && (
        <Container>
          <Footer>
            Booked on{" "}
            {created_at && format(new Date(created_at), "EEE, MMM dd yyyy, p")}
          </Footer>
          <Footer>
            Booked on{" "}
            {created_at && format(new Date(created_at), "EEE, MMM dd yyyy, p")}
          </Footer>
        </Container>
      )} */}

      <Outlet context={{ booking, isCheckIn, navigate }} />

      {/* MODAL ACTIONS */}
      <Modal>
        <ModalActions>
          {status === "checked-in" && (
            <PrimaryAction>
              <IoMdLogOut />
              <span>Check out</span>
            </PrimaryAction>
          )}

          {status === "unconfirmed" && !isCheckIn && (
            <PrimaryAction
              onClick={() => {
                navigate(`/bookings/${id}/checkin`);
              }}
            >
              <LuMapPinCheckInside />
              <span>Check in</span>
            </PrimaryAction>
          )}

          {/* {status === "unconfirmed" && isCheckIn && (
            <PrimaryAction>
              <LuMapPinCheckInside />

              <span>Check in booking #{id}</span>
            </PrimaryAction>
          )} */}

          {!isCheckIn && (
            <>
              {" "}
              <Modal.Open openFor="confirmDelete">
                <DangerAction>
                  <MdOutlineDeleteOutline />
                  <span>Delete</span>
                </DangerAction>
              </Modal.Open>
              <ButtonText onClick={() => navigate(-1)}>Back</ButtonText>
            </>
          )}
        </ModalActions>

        <Modal.Window openFor="confirmDelete">
          <ConfirmDelete
            resourceName="booking"
            onConfirm={() => {
              deleteBooking(id);
              navigate(-1);
            }}
            disabled={false}
          />
        </Modal.Window>
      </Modal>
    </>
  );
}

export default BookingDetails;
