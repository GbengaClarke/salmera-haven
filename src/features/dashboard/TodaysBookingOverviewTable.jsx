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

  // console.log(Object.entries(getTodayBookingOverview));
  // console.log(getTodayBookingOverview);

  // function groupBookingsByStay(bookings) {
  //   const ranges = {
  //     "1-2 nights": 0,
  //     "3-5 nights": 0,
  //     "6-10 nights": 0,
  //     "10+ nights": 0,
  //   };

  //   bookings.forEach((booking) => {
  //     const nights = booking.numNights;

  //     if (nights <= 2) ranges["1-2 nights"]++;
  //     else if (nights <= 5) ranges["3-5 nights"]++;
  //     else if (nights <= 10) ranges["6-10 nights"]++;
  //     else ranges["10+ nights"]++;
  //   });

  //   // console.log(ranges);
  //   // console.log(Object.entries(ranges));

  //   return Object.entries(ranges).map(([name, value]) => ({
  //     name,
  //     value,
  //   }));
  // }

  // const x = groupBookingsByStay(getTodayBookingOverview);

  // console.log(x);

  if (isGettingTodayBookingOverview) return <Spinner />;

  return (
    <Table>
      <Table.Body
        name="todayOverview"
        data={getTodayBookingOverview}
        render={(booking) => (
          <TodaysOverviewRow key={booking.id} booking={booking} />
        )}
      />
    </Table>
  );
}

export default TodaysBookingOverviewTable;
