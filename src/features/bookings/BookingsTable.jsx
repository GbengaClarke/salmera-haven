import { useSearchParams } from "react-router-dom";
import Pagination from "../../ui/pagination";
import Spinner from "../../ui/Spinner";
import Table from "../../ui/TableContext";
import BookingRow from "./BookingRow";
import useGetBookings from "./useGetBookings";

function BookingsTable() {
  const { bookings, count, isGettingBookings } = useGetBookings();

  if (isGettingBookings) return <Spinner />;

  return (
    <Table columns="0.2fr 1fr 1.8fr 2.2fr 1.3fr 1.2fr 0.5fr">
      <Table.Header>
        <div></div>
        <div>room</div>
        <div>guest</div>
        <div>dates</div>
        <div>status</div>
        <div>amount</div>
        <div></div>
      </Table.Header>

      <Table.Body
        data={bookings}
        render={(booking, i, arr) => (
          <BookingRow
            key={booking.id}
            booking={booking}
            last3={String(i >= arr.length - 2)}
          />
        )}
      />

      <Table.Footer>
        <Pagination count={count} />
      </Table.Footer>
    </Table>
  );
}

export default BookingsTable;
