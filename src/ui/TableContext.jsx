import { createContext, useContext, useState } from "react";
import styled from "styled-components";
import RoomsRow from "../features/rooms/RoomsRow";

const StyledTable = styled.div`
  /* border: 1px solid red; */
  /* border: 1px solid var(--color-grey-200); */

  font-size: 1.4rem;

  /* background-color: var(--color-grey-0); */
  border-radius: 1rem;
  /* width: 50rem; */
  overflow: hidden;
`;

const StyledHeader = styled.div`
  display: grid;
  grid-template-columns: ${({ columns }) => columns};
  background-color: var(--color-blue-100);
  color: var(--color-blue-500);
  text-transform: uppercase;
  font-weight: 500;
  padding: 1rem 0rem;
`;

const StyledBody = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-size: 1.2rem;
  /* border: 1px solid red; */
  /* padding: 0.7rem 0.7rem 1.5rem 0.7rem; */
`;

const CommonRow = styled.div`
  display: grid;
  grid-template-columns: ${({ columns }) => columns};
  color: var(--color-grey-600);
  /* gap: 1rem; */

  align-items: center;

  &:nth-child(odd) {
    background-color: inherit;
  }

  &:nth-child(even) {
    background-color: var(--color-grey-100);
  }
`;

const StyledRow = styled.div``;

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

  return <StyledHeader columns={columns}>{children}</StyledHeader>;
}

// function Row({ data }) {
//   const { columns } = useContext(TableContext);

//   return (
//     <>
//       <div>{data.preview}</div>
//       <div>{data.rooms}</div>
//       <div>{data.capacity}</div>
//       <div>{data.price}</div>
//       <div>{data.discount}</div>
//       <div>{String(data.roomService)}</div>
//     </>
//   );
// }

function Body({ data }) {
  const { columns } = useContext(TableContext);

  return (
    <StyledBody>
      {data.map((room) => (
        <CommonRow key={room.preview} columns={columns}>
          <RoomsRow data={room} />
        </CommonRow>
      ))}
    </StyledBody>
  );
}

Table.Header = Header;
Table.Body = Body;

export default Table;
