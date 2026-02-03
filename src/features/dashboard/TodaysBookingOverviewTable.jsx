import Table from "../../ui/TableContext";
import Spinner from "../../ui/Spinner";
import { useFilteredSortedRooms } from "../../hooks/useFilteredSortedRoom";
import useRooms from "../rooms/useRooms";
import TodaysOverviewRow from "../bookings/TodaysOverviewRow";

function TodaysBookingOverviewTable() {
  const { rooms = [], isPending } = useRooms();

  const sortedRooms = useFilteredSortedRooms(rooms);

  if (isPending) return <Spinner />;

  return (
    <Table>
      <Table.Body
        data={sortedRooms}
        render={(room) => <TodaysOverviewRow key={room.id} room={room} />}
      />
    </Table>
  );
}

export default TodaysBookingOverviewTable;
