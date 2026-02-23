import React from "react";
import styled from "styled-components";
import {
  HiOutlineCurrencyDollar,
  HiOutlineCheckCircle,
  HiOutlineChatBubbleBottomCenterText,
  HiOutlineBuildingOffice2,
} from "react-icons/hi2";
import { format, isToday } from "date-fns";
import FlexAlign from "../../styles/FlexAlign";
import {
  formatCurrency,
  formatDistanceFromStartDate,
} from "../../utils/helpers";

const Body = styled.div`
  padding: 2.4rem 0;
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
`;

import { HiOutlineEnvelope, HiOutlineIdentification } from "react-icons/hi2";

const GuestRow = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 1.2rem;
  padding: 1.2rem 1.6rem;
  background-color: var(--color-grey-50);
  border-radius: var(--border-radius-md);
  border: 1px solid var(--color-grey-100);

  @media (max-width: 500px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const GuestMain = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  strong {
    color: var(--color-grey-800);
    font-size: 1.6rem;
    font-weight: 700;
  }
`;

const GuestContact = styled.div`
  display: flex;
  align-items: center;
  gap: 1.6rem;
  flex-wrap: wrap;

  div {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    font-size: 1.3rem;
    color: var(--color-grey-500);

    svg {
      width: 1.6rem;
      height: 1.6rem;
      color: var(--color-brand-500);
    }
  }
`;

const FlagImg = styled.img`
  width: 2.4rem;
  display: block;
  border-radius: var(--border-radius-tiny);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
`;
const DataItem = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  column-gap: 1.4rem;
  row-gap: 0.4rem;
  align-items: start;
  text-align: left;

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

  p {
    display: block;
    font-weight: 500;
    color: var(--color-grey-800);
  }
`;

const PriceBox = styled.div`
  margin-top: 2rem;
  padding: 1.6rem 2rem;
  border-radius: var(--border-radius-sm);
  display: flex;
  flex-direction: column;
  gap: 1.2rem;

  background-color: ${({ $isPaid }) =>
    $isPaid ? "var(--color-mint-100)" : "var(--color-janquil-100)"};
  color: ${({ $isPaid }) =>
    $isPaid ? "var(--color-mint-500)" : "var(--color-janquil-600)"};

  font-weight: 700;
  letter-spacing: 0.04em;

  @media (min-width: 640px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 2rem 2.4rem;
  }

  & > div:first-child {
    display: flex;
    align-items: center;
    gap: 1.2rem;
    flex-wrap: wrap;
  }

  span {
    font-size: 1.5rem;
    font-weight: 600;
  }

  p:last-child {
    text-transform: uppercase;
    font-size: 1.2rem;
    letter-spacing: 0.1em;

    align-self: flex-end;

    @media (min-width: 640px) {
      align-self: center;
    }
  }

  svg {
    width: 2.4rem;
    height: 2.4rem;
    color: currentColor;
    flex-shrink: 0;
  }
`;

// const PriceBox = styled.div`
//   margin-top: 2rem;
//   padding: 1.6rem 2rem;
//   border-radius: var(--border-radius-md);
//   display: flex;
//   flex-direction: column;
//   gap: 1.6rem;

//   /* Theme-based colors */
//   background-color: ${({ $isPaid }) =>
//     $isPaid ? "var(--color-green-100)" : "var(--color-yellow-100)"};
//   color: ${({ $isPaid }) =>
//     $isPaid ? "var(--color-green-700)" : "var(--color-yellow-700)"};

//   @media (min-width: 640px) {
//     flex-direction: row;
//     justify-content: space-between;
//     align-items: center;
//     padding: 2rem 2.4rem;
//   }

//   /* Left Side: Price Content */
//   & > div:first-child {
//     display: flex;
//     align-items: center;
//     gap: 1.4rem;
//     flex-wrap: wrap;
//   }

//   /* The "Total Price" Label & Value */
//   .price-main {
//     display: flex;
//     align-items: center;
//     gap: 0.8rem;
//     font-size: 1.8rem; /* Larger for legibility */
//     font-weight: 800; /* Heavy weight for emphasis */
//     letter-spacing: -0.02em;
//   }

//   /* The Breakdown (Room + Extra) */
//   .price-breakdown {
//     font-size: 1.3rem;
//     font-weight: 500;
//     opacity: 0.7;
//     font-family: "Sono", monospace; /* Distinguishes math from labels */
//   }

//   /* Right Side: Status Badge */
//   .status-badge {
//     align-self: flex-start;
//     padding: 0.4rem 1.2rem;
//     border-radius: 999px;
//     font-size: 1.2rem;
//     font-weight: 700;
//     text-transform: uppercase;
//     letter-spacing: 0.05em;

//     /* Subtle background for the badge itself */
//     background-color: ${({ $isPaid }) =>
//       $isPaid ? "var(--color-green-200)" : "var(--color-yellow-200)"};

//     @media (min-width: 640px) {
//       align-self: center;
//     }
//   }

//   svg {
//     width: 2.6rem;
//     height: 2.6rem;
//     flex-shrink: 0;
//   }
// `;

const Header = styled.header`
  border-radius: var(--border-radius-sm);

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

function BookingDataBox({ booking = {} }) {
  const {
    room: { name: roomName },
    startDate,
    endDate,
    numNights,
    guest: { fullName, email, nationalID, countryFlag },
    numGuests,
    observations,
    status,
    hasBreakfast,
    totalPrice,
    extraPrice,
    roomPrice,
    isPaid,
  } = booking;

  return (
    <>
      <Header>
        <div>
          <HiOutlineBuildingOffice2 />
          <p>
            {numNights} nights in <span>Room {roomName}</span>
          </p>
        </div>
        <p>
          {format(new Date(startDate), "EEE, MMM dd yyyy")} (
          {isToday(new Date(startDate))
            ? "Today"
            : formatDistanceFromStartDate(startDate)}
          ) &mdash; {format(new Date(endDate), "EEE, MMM dd yyyy")}
        </p>
      </Header>

      <Body>
        <GuestRow>
          <GuestMain>
            <FlagImg src={countryFlag} alt={`Flag of ${fullName}`} />
            <strong>
              {fullName} {numGuests > 1 ? `+ ${numGuests - 1} guests` : ""}
            </strong>
          </GuestMain>

          <span
            style={{ color: "var(--color-grey-200)", userSelect: "none" }}
            className="hidden-mobile"
          >
            |
          </span>

          <GuestContact>
            <div>
              <HiOutlineEnvelope />
              <span>{email}</span>
            </div>
            <div>
              <HiOutlineIdentification />
              <span>ID {nationalID}</span>
            </div>
          </GuestContact>
        </GuestRow>

        {observations && (
          <DataItem>
            <FlexAlign>
              <HiOutlineChatBubbleBottomCenterText />
              <span>Note:</span>
            </FlexAlign>
            <p>{observations}</p>
          </DataItem>
        )}

        <DataItem>
          <FlexAlign>
            <HiOutlineCheckCircle />
            <span>Breakfast included:</span>
          </FlexAlign>
          <p>{hasBreakfast ? "Yes" : "No"}</p>
        </DataItem>

        <PriceBox $isPaid={isPaid}>
          <div style={{ display: "flex", gap: "1.2rem", alignItems: "center" }}>
            <HiOutlineCurrencyDollar />
            Total price: {formatCurrency(totalPrice)}
            {extraPrice > 1 && (
              <span>
                ({formatCurrency(roomPrice)} +{" "}
                {`${formatCurrency(extraPrice)} breakfast`})
              </span>
            )}
          </div>
          <p>{isPaid ? "✓ Paid" : " ⚠ Pay at property"}</p>
        </PriceBox>

        {/* <PriceBox $isPaid={isPaid}>
          <div>
            <div className="price-main">
              <HiOutlineCurrencyDollar />
              <span>Total {formatCurrency(totalPrice)}</span>
            </div>

            {extraPrice > 0 && (
              <span className="price-breakdown">
                ({formatCurrency(roomPrice)} room + {formatCurrency(extraPrice)}{" "}
                breakfast)
              </span>
            )}
          </div>

          <div className="status-badge">
            {isPaid ? "✓ Paid" : "⚠ Pay at property"}
          </div>
        </PriceBox> */}
      </Body>
    </>
  );
}

export default BookingDataBox;
