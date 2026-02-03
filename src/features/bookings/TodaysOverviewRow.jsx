import styled from "styled-components";
import { CommonRow } from "../../ui/TableContext";

import { formatCurrency } from "../../utils/helpers";
import { HiArrowDownTray } from "react-icons/hi2";
import { TbDoorEnter, TbDoorExit } from "react-icons/tb";

const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const StyledInfo = styled.div`
  text-align: left;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;
const StyledChecking = styled.button`
  background-color: var(--color-brand-500);
  border: none;
  padding: 0.4rem 0.8rem;
  border-radius: 5px;
  color: white;
  font-size: 1.2rem;
  font-weight: 500;
`;

const StyledRoom = styled.div`
  font-weight: 500;
`;

const StyledDirection = styled.span`
  border-radius: 3rem;
  padding: 0.4rem 0.8rem;
  gap: 0.3rem;
  color: var(--color-grey-700);
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  background-color: ${({ $isArriving }) =>
    $isArriving === "true"
      ? "var(--color-brand-mint)"
      : "var(--color-silver-100)"};
  /* background-color: green; */
  width: max-content;
  height: auto;
`;

const ImageCont = styled.div`
  width: 2.3rem;
  height: 1.5rem;
  overflow: hidden;
  border-radius: 3px;
  background-color: var(--color-grey-100);
`;

function TodaysOverviewRow({ room }) {
  const { id, name, maxCapacity, regularPrice, discount, image, description } =
    room;

  return (
    <CommonRow columns="0.25fr 1fr 2fr .8fr .7fr">
      <ImageCont>
        <Img
          src={"https://flagcdn.com/ng.svg"}
          alt={`picture of room ${name}`}
        />
      </ImageCont>

      <div>Gbenga Clarke</div>

      <StyledInfo>
        <StyledDirection $isArriving={"false"}>
          Departing <TbDoorExit />
        </StyledDirection>{" "}
        from 5-night stay
      </StyledInfo>
      {/* <StyledInfo>
        <StyledDirection $isArriving={"true"}>
          Arriving <TbDoorEnter />
        </StyledDirection>{" "}
        for 5-night stay
      </StyledInfo> */}

      <StyledRoom>Room {"001"}</StyledRoom>

      <StyledChecking>check in</StyledChecking>
    </CommonRow>
  );
}
{
  /* <TbDoorExit /> */
}

export default TodaysOverviewRow;
