import React from "react";
import styled from "styled-components";
import {
  HiOutlineCurrencyDollar,
  HiOutlineCheckCircle,
  HiOutlineChatBubbleBottomCenterText,
  HiOutlineHomeModern,
} from "react-icons/hi2";
import { format, isToday } from "date-fns";
import FlexAlign from "../../styles/FlexAlign";

/* ======================
   STYLES
====================== */
const Body = styled.div`
  padding: 2.4rem;
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
`;

const GuestRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  row-gap: 0.8rem;
  column-gap: 1.2rem;
  font-size: 1.4rem;
  color: var(--color-grey-600);

  strong {
    color: var(--color-grey-800);
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 0.6rem;
  }

  span {
    white-space: nowrap;
  }
`;

const DataItem = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  column-gap: 1.4rem;
  row-gap: 0.4rem;
  align-items: start;

  svg {
    width: 2.2rem;
    height: 2.2rem;
    color: var(--color-grey-500);
    margin-top: 2px;
  }

  div {
    font-size: 1.4rem;
    color: var(--color-grey-700);
    line-height: 1.5;
  }

  span {
    display: block;
    font-weight: 600;
    color: var(--color-grey-800);
  }
`;

const PriceBox = styled.div`
  margin-top: 2rem;
  padding: 2rem 2.4rem;
  border-radius: var(--border-radius-sm);
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1.6rem;
  background-color: ${({ $isPaid }) =>
    $isPaid ? "var(--color-mint-100)" : "var(--color-janquil-100)"};
  color: ${({ $isPaid }) =>
    $isPaid ? "var(--color-green-700)" : "var(--color-grey-800)"};
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;

  svg {
    color: currentColor;
  }
`;

const Header = styled.header`
  padding: 2.4rem 3.2rem;
  background: linear-gradient(
    135deg,
    var(--color-brand-500),
    var(--color-brand-700)
  );
  color: #eef2ff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;

  svg {
    width: 3.2rem;
    height: 3.2rem;
  }

  div {
    display: flex;
    align-items: center;
    gap: 1.6rem;
    font-size: 1.8rem;
    font-weight: 600;
  }

  p {
    font-size: 1.4rem;
    opacity: 0.9;
    text-align: right;
  }

  span {
    font-family: "Raleway", monospace;
    /* font-family: "Sono", monospace; */
    font-size: 1.8rem;
  }

  @media (max-width: 576px) {
    flex-direction: column;
    align-items: flex-start;

    p {
      text-align: left;
    }
  }
`;

const ImageCont = styled.div`
  height: 2rem;
  width: 2rem;
  overflow: hidden;
  display: flex;
  align-items: center;

  & img {
    object-fit: cover;
  }
`;

function BookingDataBox({ booking }) {
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

  return (
    <>
      <Header>
        <div>
          <HiOutlineHomeModern />
          <p>
            {numNights} nights in <span>Room {name}</span>
          </p>
        </div>

        {/* <p>
          {format(new Date(startDate), "EEE, MMM dd yyyy")} (
          {isToday(new Date(startDate)) ? "Today" : "Upcoming"}) &mdash;{" "}
          {format(new Date(endDate), "EEE, MMM dd yyyy")}
        </p> */}
      </Header>
      <Body>
        <GuestRow>
          <ImageCont>
            <img src="https://flagcdn.com/ng.svg" alt="flag" />
          </ImageCont>
          <strong>
            {guestName}{" "}
            {numGuests > 1
              ? `+ ${"numGuests"} guests`
              : `+ ${"numGuests"} guest`}
          </strong>
          <span>&bull;</span>
          <span>{email}</span>
          <span>&bull;</span>
          <span>National ID: {"nationalID"}</span>
        </GuestRow>

        {observations && (
          <DataItem>
            <HiOutlineChatBubbleBottomCenterText />
            <FlexAlign>
              <span>Note:</span>
              {observations}
            </FlexAlign>
          </DataItem>
        )}

        <DataItem>
          <HiOutlineCheckCircle />
          <FlexAlign>
            <span>Breakfast included</span>
            {hasBreakfast ? "Yes" : "No"}
          </FlexAlign>
        </DataItem>

        <PriceBox $isPaid={isPaid}>
          <div style={{ display: "flex", gap: "1.2rem", alignItems: "center" }}>
            <HiOutlineCurrencyDollar />${totalPrice}
          </div>
          <p>{isPaid ? "Paid" : "Pay at property"}</p>
        </PriceBox>
      </Body>
    </>
  );
}

export default BookingDataBox;
