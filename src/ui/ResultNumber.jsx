import styled from "styled-components";

const StyledSelect = styled.select`
  color: black;
`;

function ResultNumber({ setSearchParams, searchParams, PAGE_SIZE }) {
  const numbers = [5, 10, 15];

  const value = PAGE_SIZE || "10";
  // console.log(value);

  function handleClick(value) {
    // // setSearchParams((prev) => {
    // //   prev.set("pageSize", value);
    // //   return prev;
    // // });

    searchParams.set("pageSize", value);
    searchParams.set("page", 1); //change back to page 1?
    setSearchParams(searchParams);
  }

  return (
    <StyledSelect
      value={value}
      onChange={(e) => handleClick(Number(e.target.value))}
    >
      {numbers.map((number, i) => (
        <option key={i} value={number}>
          {number}
        </option>
      ))}
    </StyledSelect>
  );
}

export default ResultNumber;
