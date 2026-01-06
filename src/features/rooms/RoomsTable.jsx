import Table from "../../ui/TableContext";
import RoomsRow from "./RoomsRow";

const roomsData = [
  {
    preview: "Single Room",
    rooms: 1,
    capacity: 1,
    price: 120,
    discount: 0,
    roomService: false,
  },
  {
    preview: "Standard Double",
    rooms: 1,
    capacity: 2,
    price: 180,
    discount: 10,
    roomService: true,
  },
  {
    preview: "Deluxe Double",
    rooms: 2,
    capacity: 4,
    price: 320,
    discount: 15,
    roomService: true,
  },
  {
    preview: "Family Suite",
    rooms: 3,
    capacity: 6,
    price: 480,
    discount: 20,
    roomService: true,
  },
  {
    preview: "Executive Suite",
    rooms: 4,
    capacity: 8,
    price: 750,
    discount: 25,
    roomService: true,
  },
  {
    preview: "Budget Room",
    rooms: 1,
    capacity: 2,
    price: 90,
    discount: 5,
    roomService: false,
  },
];

function RoomsTable() {
  return (
    <Table columns="0.6fr 1.8fr 2.2fr 1fr 1.2fr 0.7fr">
      <Table.Header>
        <div></div>
        <div>cabin</div>
        <div>capacity</div>
        <div>price</div>
        <div>discount</div>
        <div></div>
      </Table.Header>

      <Table.Body data={roomsData}></Table.Body>
    </Table>
  );
}

export default RoomsTable;
