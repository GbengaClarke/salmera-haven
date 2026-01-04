import styled from "styled-components";
import Select from "./Select";

const StyledSortby = styled.div`
  display: flex;
  align-items: center;
`;

function Sortby({ options }) {
  return (
    <StyledSortby>
      <Select options={options} />
    </StyledSortby>
  );
}

export default Sortby;
