import Table from "../../ui/TableContext";
import RoomsRow from "./RoomsRow";
import useRooms from "./useRooms";
import Spinner from "../../ui/Spinner";
import { useSearchParams } from "react-router-dom";

function RoomsTable() {
  const [searchParams] = useSearchParams();
  const { rooms = [], isPending } = useRooms();

  if (isPending) return <Spinner />;

  const filter = searchParams.get("discount");

  let filteredRooms = rooms;

  if (filter === "no-discount") {
    filteredRooms = rooms.filter((room) => room.discount === 0);
  } else if (filter === "with-discount") {
    filteredRooms = rooms.filter((room) => room.discount > 0);
  }

  return (
    <Table columns="0.6fr 1.8fr 2.2fr 1fr 1.2fr 0.7fr">
      <Table.Header>
        <div></div>
        <div>room</div>
        <div>capacity</div>
        <div>price</div>
        <div>discount</div>
        <div></div>
      </Table.Header>

      {/* <Table.Body data={roomsData} /> */}

      <Table.Body
        data={filteredRooms}
        render={(room, i, arr) => {
          const isLast3 = i >= arr.length - 2;
          const str = String(isLast3);

          return <RoomsRow key={room.id} room={room} last3={str} />;
        }}
      />
    </Table>
  );
}

export default RoomsTable;
