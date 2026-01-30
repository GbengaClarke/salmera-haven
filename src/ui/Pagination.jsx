import styled, { css } from "styled-components";
import { useSearchParams } from "react-router-dom";
import ResultNumber from "./ResultNumber";

const StyledPagination = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: var(--color-grey-500);
  /* border: 1px solid red; */
  width: 100%;
  font-size: 1.1rem;
`;
const StyledNav = styled.div`
  display: flex;
  gap: 1rem;
  color: var(--color-grey-500);

  opacity: ${({ $dataContainPage }) => ($dataContainPage ? "0" : "1")};
`;

const StyledButton = styled.button`
  padding: 0.7rem 1rem;
  border-radius: 3px;
  background-color: inherit;
  color: var(--color-grey-600);
  /* border: 1px solid red; */
  border: none;
  opacity: ${({ disabled }) => disabled && "0.6"};

  &:hover {
    ${({ disabled }) =>
      disabled
        ? ""
        : css`
            background-color: var(--color-grey-200);
            color: var(--color-grey-900);
          `};
  }

  &:focus {
    outline: none;
  }

  &:active {
    outline: 1px solid var(--color-grey-300);
  }
`;

function Pagination({ count, PAGE_SIZE }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const page = Number(searchParams.get("page") || "1");
  // const PAGE_SIZE = searchParams.get("pageSize");

  const totalPages = Math.ceil(count / PAGE_SIZE);

  const start = page * PAGE_SIZE - PAGE_SIZE + 1;
  const value = page * PAGE_SIZE;
  const end = value > count ? count : value;

  const $dataContainPage = page === totalPages && page === 1;

  function handlePageNav(newPage) {
    if (newPage < 1 || newPage > totalPages) return;

    // setSearchParams((prev) => {
    //   prev.set("page", newPage);
    //   return prev;
    // });

    searchParams.set("page", newPage);
    setSearchParams(searchParams);
  }

  return (
    <StyledPagination>
      <div>
        {!$dataContainPage && `Showing ${start} to ${end} of`} {count} results
      </div>

      <ResultNumber
        setSearchParams={setSearchParams}
        searchParams={searchParams}
        PAGE_SIZE={PAGE_SIZE}
      />

      {
        /*!dataContainPage &&*/ <StyledNav $dataContainPage={$dataContainPage}>
          <StyledButton
            onClick={() => {
              handlePageNav(page - 1);
            }}
            disabled={page === 1}
          >
            &#10094; Previous
          </StyledButton>
          <StyledButton
            onClick={() => {
              handlePageNav(page + 1);
            }}
            disabled={page === totalPages}
          >
            Next &#10095;
          </StyledButton>
        </StyledNav>
      }
    </StyledPagination>
  );
}

export default Pagination;
