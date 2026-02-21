import { useSearchParams } from "react-router-dom";
import styled from "styled-components";
import { formatCurrency } from "../utils/helpers";

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  font-weight: 500;
  font-size: 1.25rem;
  color: var(--color-grey-500);
`;

const StyledLabel = styled.div`
  text-align: left;
  display: flex;
  justify-content: space-between;
  align-items: center;

  & span {
    white-space: nowrap;
  }
`;

const StyledBar = styled.div`
  width: 100%;
  height: 1rem;
  background-color: var(--color-grey-300);
  border-radius: 1rem;
  overflow: hidden;
`;

const StyledProgress = styled.div`
  width: ${({ $percentage }) => `${$percentage}%`};
  height: 100%;
  border-radius: 1rem;

  background-color: ${({ $color }) => $color || "var(--color-mint-500)"};

  transition: width 0.5s ease;
  will-change: width;
`;

const Styled = styled.div`
  display: flex;
  align-items: center;

  & span {
    width: 4rem;
  }
`;

function ProgressBar({ value = 12, max = 20, label, label2, color }) {
  const percentage = value === 0 ? 0 : Math.ceil((value / max) * 100);

  return (
    <StyledContainer>
      <StyledLabel>
        <span>
          {label}:{" "}
          {label === "Revenue Target" ? (
            <strong>
              {formatCurrency(value)}/{formatCurrency(Math.ceil(max))}
            </strong>
          ) : (
            <strong>
              {value}/{Math.ceil(max)}{" "}
            </strong>
          )}
          {label2}
        </span>
      </StyledLabel>
      <Styled>
        <StyledBar>
          <StyledProgress
            $percentage={percentage}
            $color={color}
          ></StyledProgress>
        </StyledBar>
        <span>{percentage}%</span>
      </Styled>
    </StyledContainer>
  );
}

export default ProgressBar;
