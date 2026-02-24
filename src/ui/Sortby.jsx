import styled from "styled-components";
import Select from "./Select";

const StyledSortby = styled.div`
  display: flex;
  align-items: center;
  /* border: 1px solid red; */
  justify-content: center;
  align-items: center;
  width: max-content;
`;

function Sortby({ options, sortByField }) {
  return (
    <StyledSortby>
      <Select options={options} sortByField={sortByField} />
    </StyledSortby>
  );
}

export default Sortby;
