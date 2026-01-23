import React from "react";
import styled from "styled-components";
import { format } from "date-fns";
import BookingDataBox from "./BookingDataBox";
import FlexAlign from "../../styles/FlexAlign";
import { statusStyles } from "./BookingRow";
// import { useParams } from "react-router-dom";
import useGetSingleBooking from "./useGetSingleBooking";

/* ======================
   STYLES
====================== */
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
  /* background-color: var(--color-grey-50); */
  border-bottom: 1px solid var(--color-grey-100);

  h2 {
    font-size: 1.8rem;
    font-weight: 700;
    color: var(--color-grey-800);
  }

  @media (max-width: 576px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
`;
const StyledStatus = styled.button`
  padding: 0.6rem 1.4rem;
  border-radius: 999px;
  border: none;
  font-size: 1.2rem;
  font-weight: 600;
  text-transform: uppercase;
  ${({ $statusStyles, status }) => $statusStyles[status]};
  /* background-color: var(--color-green-100); */
  color: var(--color-green-700);
`;

const ButtonText = styled.button`
  color: var(--color-brand-600);
  font-weight: 500;
  text-align: center;
  transition: all 0.3s;
  background: none;
  border: none;
  border-radius: var(--border-radius-sm);

  &:hover,
  &:active {
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

function BookingDetails() {
  // const { id } = useParams();
  const {
    booking = {},
    errorGettingSingleBooking,
    isGettingSingleBooking,
  } = useGetSingleBooking();

  const {
    name,
    id,
    startDate,
    endDate,
    numNights,
    guestName,
    email,
    numGuests,
    nationalID,
    observations,
    status,
    hasBreakfast,
    totalPrice,
    isPaid,
    created_at,
  } = booking;

  console.log(booking);

  return (
    <>
      <TopRow>
        <FlexAlign>
          <h2>Booking {id}</h2>
          <StyledStatus $statusStyles={statusStyles} status={booking.status}>
            {status}
          </StyledStatus>
        </FlexAlign>
        <ButtonText>&larr; Back</ButtonText>
      </TopRow>

      <Container>
        <BookingDataBox booking={booking} />

        <Footer>
          {/* Booked on {format(new Date(created_at), "EEE, MMM dd yyyy, p")} */}
          sike
        </Footer>
      </Container>
    </>
  );
}

export default BookingDetails;
