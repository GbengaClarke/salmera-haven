import Table from "../../ui/TableContext";
import Spinner from "../../ui/Spinner";
import { useFilteredSortedRooms } from "../../hooks/useFilteredSortedRoom";
import useRooms from "../rooms/useRooms";
import TodaysOverviewRow from "../bookings/TodaysOverviewRow";
import useGetTodayBookingOverview from "./useGetTodayBookingOverview";

function TodaysBookingOverviewTable() {
  const {
    getTodayBookingOverview,
    errorGettingTodayBookingOverview,
    isGettingTodayBookingOverview,
  } = useGetTodayBookingOverview();

  if (isGettingTodayBookingOverview) return <Spinner />;

  return (
    <Table>
      <Table.Body
        data={getTodayBookingOverview}
        render={(booking) => (
          <TodaysOverviewRow key={booking.id} booking={booking} />
        )}
      />
    </Table>
  );
}

export default TodaysBookingOverviewTable;
