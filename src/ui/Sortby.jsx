import styled from "styled-components";
import Select from "./Select";

const StyledSortby = styled.div`
  display: flex;
  align-items: center;

  @media (max-width: 394px) {
    /* flex: 1; */
    width: 13rem;
  }
`;

function Sortby({ options, sortByField }) {
  return (
    <StyledSortby>
      <Select options={options} sortByField={sortByField} />
    </StyledSortby>
  );
}

export default Sortby;
