import Table from "../../ui/TableContext";
import RoomsRow from "./RoomsRow";
import useRooms from "./useRooms";
import Spinner from "../../ui/Spinner";
import { useFilteredSortedRooms } from "../../hooks/useFilteredSortedRoom";

// function RoomsTable() {
//   const [searchParams] = useSearchParams();
//   const { rooms = [], isPending } = useRooms();

//   if (isPending) return <Spinner />;

//   const filter = searchParams.get("discount");

//   let filteredRooms = rooms;

//   //discount filter
//   if (filter === "no-discount") {
//     filteredRooms = rooms.filter((room) => room.discount === 0);
//   } else if (filter === "with-discount") {
//     filteredRooms = rooms.filter((room) => room.discount > 0);
//   }

//   let sortedRooms = filteredRooms;

//   //sorting
//   const sort = searchParams.get("sortBy");

//   // if (sort === "name-asc") {
//   //   sortedRooms = [...sortedRooms].sort((a, b) => a.name.localeCompare(b.name));
//   // } else if (sort === "name-dsc") {
//   //   sortedRooms = [...sortedRooms].sort((a, b) => b.name.localeCompare(a.name));
//   // } else if (sort === "maxCapacity-asc") {
//   //   sortedRooms = [...sortedRooms].sort(
//   //     (a, b) => a.maxCapacity - b.maxCapacity
//   //   );
//   // } else if (sort === "maxCapacity-dsc") {
//   //   sortedRooms = [...sortedRooms].sort(
//   //     (a, b) => b.maxCapacity - a.maxCapacity
//   //   );
//   // } else if (sort === "price-asc") {
//   //   sortedRooms = [...sortedRooms].sort(
//   //     (a, b) => a.regularPrice - b.regularPrice
//   //   );
//   // } else if (sort === "price-dsc") {
//   //   sortedRooms = [...sortedRooms].sort(
//   //     (a, b) => b.regularPrice - a.regularPrice
//   //   );
//   // }

//   sortedRooms = sortRooms(sortedRooms, sort);

//   // const sortBy = searchParams.get("sortBy") || "name-asc";

//   // const [field, direction] = sortBy.split("-");

//   // const modifier = direction === "asc" ? 1 : -1;

//   // sortedRooms = [...sortedRooms].sort(
//   //   (a, b) => (a[field] - b[field]) * modifier
//   // );
//   // console.log(sortedRooms);

//   return (
//     <Table columns="0.6fr 1.8fr 2.2fr 1fr 1.2fr 0.7fr">
//       <Table.Header>
//         <div></div>
//         <div>room</div>
//         <div>capacity</div>
//         <div>price</div>
//         <div>discount</div>
//         <div></div>
//       </Table.Header>

//       {/* <Table.Body data={roomsData} /> */}

//       <Table.Body
//         data={sortedRooms}
//         render={(room, i, arr) => {
//           const isLast3 = i >= arr.length - 2;
//           const str = String(isLast3);

//           return <RoomsRow key={room.id} room={room} last3={str} />;
//         }}
//       />
//     </Table>
//   );
// }

function RoomsTable() {
  const { rooms = [], isPending } = useRooms();

  const sortedRooms = useFilteredSortedRooms(rooms);

  if (isPending) return <Spinner />;

  return (
    <Table columns="0.8fr 1.5fr 2.2fr 1fr 1.2fr 0.7fr">
      <Table.Header>
        <div></div>
        <div>room</div>
        <div>capacity</div>
        <div>price</div>
        <div>discount</div>
        <div></div>
      </Table.Header>

      <Table.Body
        data={sortedRooms}
        render={(room, i, arr) => (
          <RoomsRow
            key={room.id}
            room={room}
            last3={String(i >= arr.length - 2)}
          />
        )}
      />
    </Table>
  );
}

export default RoomsTable;
