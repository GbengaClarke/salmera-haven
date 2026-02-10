import styled from "styled-components";
import { media } from "../styles/breakpoints";
import FlexAlign from "../styles/FlexAlign";
import {
  HiClock,
  HiCurrencyDollar,
  HiCurrencyEuro,
  HiMiniDocumentCurrencyDollar,
  HiOutlineCalendarDays,
} from "react-icons/hi2";
import { FaBed, FaSuitcaseRolling } from "react-icons/fa";
import { formatCurrency } from "../utils/helpers";

const StyledCards = styled.div`
  display: flex;
  gap: 1rem;
  /* border: 1px solid red; */

  ${media.mobile} {
    overflow-x: auto;
    justify-content: space-between;
    width: 100%;
    margin-inline: auto;
    gap: 1rem;
  }

  ${media.tabletlg} {
    gap: 3rem;
    /* gap: 3rem; */
  }
`;

const CardContainer = styled.div`
  width: 13.8rem;
  height: 8rem;
  margin-left: 0.3rem;
  margin-top: 0.2rem;
  background: ${({ $bColor }) =>
    `linear-gradient(
      to right,
      ${$bColor} 0%,
      ${$bColor} 30%,
      transparent 100%
    )`};

  border-radius: 9px;
  overflow: hidden;
  /* outline: 1px solid var(--color-grey-100); */
  outline: 1px solid #72727226;

  transition: all 0.25s ease;

  ${media.mobile} {
    flex: 1;
    width: 13rem;
    /* width: 20rem; */
  }
`;

const Card = styled.div`
  width: 100%;
  height: 100%;
  margin-left: 0.4rem;
  color: var(--color-grey-700);
  padding: 0.8rem;
  /* text-align: left; */
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
  gap: 0.4rem;

  background-color: var(--color-grey-0);

  & p {
    font-size: 1.6rem;
  }

  & strong {
  }
  & span {
    display: block;
    font-size: 1rem;
    color: var(--color-grey-500);
  }
`;

const CardRow = styled.div`
  gap: 0.4rem;
  display: flex;
  align-items: center;
  /* justify-content: center; */
  /* margin-right: 0.5rem; */
  color: ${({ $bColor }) => $bColor};

  /* border: 1px solid red; */

  & p {
    font-size: 1.3rem;
    color: ${({ $bColor }) => $bColor};
    white-space: nowrap;

    @media (min-width: 576px) and (max-width: 623px) {
      font-size: 1.1rem;
    }
    @media (min-width: 769px) and (max-width: 784px) {
      font-size: 1.1rem;
    }
  }
`;

function Cards({ scheduledTodayCount, bookings }) {
  const { revenue, highest, checkIn, unconfirmed } = bookings.reduce(
    (acc, curr) => {
      acc.revenue += curr.totalPrice;
      acc.highest = Math.max(acc.highest, curr.totalPrice);
      acc.checkIn += curr.status === "checked-in" ? 1 : 0;
      acc.unconfirmed += curr.status === "unconfirmed" ? 1 : 0;

      return acc;
    },
    {
      revenue: 0,
      highest: 0,
      checkIn: 0,
      unconfirmed: 0,
    }
  );

  // const occupation =
  //   confirmedStays.reduce((acc, curr) => acc + curr.numNights, 0) /
  //   (numDays * cabinCount)

  // console.log(unconfirmed);

  return (
    <StyledCards>
      <CardContainer $bColor="var(--color-blue-700)">
        <Card>
          <CardRow $bColor="var(--color-blue-700)">
            <HiOutlineCalendarDays />
            <p>Total Bookings</p>
          </CardRow>

          <strong>{bookings.length}</strong>
          {/* <span>
            {scheduledTodayCount > 0 ? scheduledTodayCount : "None"} arrivals
            today
          </span> */}

          <span>
            {scheduledTodayCount > 0
              ? scheduledTodayCount === 1
                ? `${scheduledTodayCount} arrival
            today`
                : `${scheduledTodayCount} arrivals
            today`
              : "No arrival today"}
          </span>
        </Card>
      </CardContainer>
      <CardContainer $bColor="var(--color-brand-mint)">
        <Card>
          <CardRow $bColor="var(--color-brand-mint)">
            <HiCurrencyDollar />
            <p>Total Revenue</p>
          </CardRow>

          <strong>{formatCurrency(revenue)}</strong>
          <span>Highest sale {formatCurrency(highest)}</span>
        </Card>
      </CardContainer>
      <CardContainer $bColor="var(--color-red-700)">
        <Card>
          <CardRow $bColor="var(--color-red-700)">
            <FaSuitcaseRolling />
            <p>Check ins</p>
          </CardRow>

          <strong>{checkIn}</strong>
          {/*  unconfimed status below */}
          <span>{unconfirmed} remaining</span>
        </Card>
      </CardContainer>
      <CardContainer $bColor="var(--color-janquil-500)">
        <Card>
          <CardRow $bColor="var(--color-janquil-500)">
            <FaBed />
            <p>Occupancy Rate</p>
          </CardRow>

          <strong>76%</strong>
          <span>62 of 80 rooms</span>
        </Card>
      </CardContainer>
    </StyledCards>
  );
}

export default Cards;
