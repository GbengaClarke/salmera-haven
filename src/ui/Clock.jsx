import { FaRegClock } from "react-icons/fa";
import styled from "styled-components";
import { media } from "../styles/breakpoints";
import { useClock } from "../utils/presentTime";

const Flex = styled.div`
  display: none;
  align-items: center;
  gap: 0.4rem;
  font-size: 1rem;
  font-family: "Inter", sans-serif;
  background-color: var(--color-grey-50);
  padding: 0.7rem 1.2rem;
  border-radius: 3px;
  color: var(--color-grey-600);

  & svg,
  & span {
    color: var(--color-grey-400);
  }

  ${media.mobile} {
    display: flex;
  }
`;

function Clock() {
  const { time, timezone } = useClock();

  return (
    <Flex>
      <FaRegClock />
      <div>
        {time} <span>{timezone}</span>
      </div>
    </Flex>
  );
}

export default Clock;
