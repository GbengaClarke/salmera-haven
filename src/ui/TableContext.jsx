import { createContext, useContext } from "react";
import styled from "styled-components";
// import RoomsRow from "../features/rooms/RoomsRow";

const StyledTable = styled.div`
  /* border: 1px solid red; */
  font-size: 1.4rem;
  border-radius: 1rem;
  min-width: 500px;
  max-width: 800px;
  margin-inline: auto;
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

export const CommonRow = styled.div`
  display: grid;
  grid-template-columns: ${({ columns }) => columns};
  color: var(--color-grey-600);
  align-items: center;
  padding: 0.6rem;
  /* border: 1px solid red; */

  &:nth-child(odd) {
    background-color: inherit;
  }

  &:nth-child(even) {
    background-color: var(--color-grey-100);
  }
`;

// const StyledRow = styled.div``;

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

function Body({ data, render }) {
  // const { columns } = useContext(TableContext);

  return (
    <StyledBody>
      {/* <CommonRow key={data.preview} columns={columns}> */}
      {data.map(render)}
      {/* </CommonRow> */}
    </StyledBody>
  );

  // return (
  //   <StyledBody>
  //     {data.map((room, i, arr) => {
  //       const isLast3 = i >= arr.length - 2;
  //       const str = String(isLast3);

  //       return (
  //         <CommonRow key={room.preview} columns={columns}>
  //           <RoomsRow last3={str} data={room} />
  //         </CommonRow>
  //       );
  //     })}
  //   </StyledBody>
  // );
}

Table.Header = Header;
Table.Body = Body;

export default Table;
