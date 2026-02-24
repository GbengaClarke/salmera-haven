import { createContext, useContext } from "react";
import styled from "styled-components";

const StyledTable = styled.div`
  font-size: 1.4rem;
  border-radius: 1rem;
  margin-inline: auto;

  @media (max-width: 767px) {
    min-width: 80rem;
    overflow-x: auto;
  }

  @media (min-width: 768px) {
    width: 100%;
    min-width: 0;
    overflow-x: hidden;
  }
`;

const StyledBody = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-size: 1.2rem;
`;

const Footer = styled.div`
  background-color: inherit;
  display: flex;
  align-items: center;
  padding: 1.2rem;

  &:not(:has(*)) {
    display: none;
  }
`;

const Empty = styled.p`
  font-size: 1.6rem;
  font-weight: 500;
  text-align: center;
  margin: 2.4rem;
`;

export const CommonRow = styled.div`
  display: grid;
  grid-template-columns: ${({ columns }) => columns};
  column-gap: 1.2rem;
  align-items: center;
  color: var(--color-grey-600);
  transition: all 0.2s;
  padding: 1.2rem 1.6rem;
  font-size: 1.5rem;

  @media (min-width: 768px) and (max-width: 1100px) {
    font-size: 1.2rem;
    padding: 0.8rem 1rem;
    column-gap: 0.8rem;

    & p {
      font-size: 1.1rem;
    }
  }

  @media (min-width: 1101px) {
    font-size: 1.6rem;
    & p {
      font-size: 1.3rem;
    }
  }

  &:not(header):nth-child(odd) {
    background-color: inherit;
  }

  &:not(header):nth-child(even) {
    background-color: var(--color-grey-100);
  }
`;

const StyledHeader = styled(CommonRow)`
  padding: 1.6rem;
  background-color: var(--color-blue-100);
  color: var(--color-blue-500);
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 600;

  @media (min-width: 768px) and (max-width: 1100px) {
    padding: 1rem;
  }
`;

const TableContext = createContext();

function Table({ columns, children }) {
  return (
    <TableContext.Provider value={{ columns }}>
      <StyledTable>{children}</StyledTable>
    </TableContext.Provider>
  );
}

function Header({ children }) {
  const { columns } = useContext(TableContext);

  return (
    <StyledHeader columns={columns} as="header">
      {children}
    </StyledHeader>
  );
}

function Body({ data, render, name = "" }) {
  if (data?.length === 0 && !name) return <Empty>no data presently</Empty>;
  if (data?.length === 0 && name === "todayOverview")
    return <Empty>no activity today</Empty>;

  return <StyledBody>{data?.map(render)}</StyledBody>;
}

Table.Header = Header;
Table.Body = Body;
Table.Footer = Footer;

export default Table;
