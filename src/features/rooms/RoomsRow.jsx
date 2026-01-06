import styled from "styled-components";

function RoomsRow({ data }) {
  const Img = styled.img`
    width: 100%;
    height: 95%;
    object-fit: cover;
  `;

  const Div = styled.div``;
  return (
    <>
      {/* <div>{data.preview}</div> */}
      <Img src="public/placeholderpic.webp" alt="cabin image" />
      <div>{data.rooms}</div>
      <div>{data.capacity}</div>
      <div>{data.price}</div>
      <div>{data.discount ? data.discount : "-"}</div>
      <div>{String(data.roomService)}</div>
    </>
  );
}

export default RoomsRow;
