import { useSearchParams } from "react-router-dom";
import styled from "styled-components";
import { formatCurrency } from "../utils/helpers";

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  font-weight: 500;
  font-size: 1.2rem;
  color: var(--color-grey-500);
`;

const StyledLabel = styled.div`
  text-align: left;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StyledBar = styled.div`
  width: 100%;
  height: 1rem;
  background-color: var(--color-grey-300);
  border-radius: 1rem;
  overflow: hidden;
`;
const StyledProgress = styled.div`
  /* width: 50%; */
  width: ${({ $percentage }) => `${$percentage}%`};
  height: 100%;
  border-radius: 1rem;

  background-color: var(--color-mint-500);

  transition: width 0.5s ease;
  /* transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1); */
  will-change: width;
`;

const Styled = styled.div`
  display: flex;
  align-items: center;

  & span {
    width: 4rem;
  }
`;

function ProgressBar({ value = 12, max = 20, label, label2 }) {
  const percentage = value === 0 ? 0 : Math.ceil((value / max) * 100);

  return (
    <StyledContainer>
      <StyledLabel>
        <div>
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
        </div>
      </StyledLabel>
      <Styled>
        <StyledBar>
          <StyledProgress $percentage={percentage}></StyledProgress>
        </StyledBar>
        <span>{percentage}%</span>
      </Styled>
    </StyledContainer>
  );
}

export default ProgressBar;
