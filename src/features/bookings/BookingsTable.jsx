import Pagination from "../../ui/Pagination.jsx";
import Spinner from "../../ui/Spinner";
import Table from "../../ui/TableContext";
import BookingRow from "./BookingRow";
import useGetBookings from "./useGetBookings";

function BookingsTable() {
  const { bookings, count, isGettingBookings, PAGE_SIZE } = useGetBookings();

  if (isGettingBookings) return <Spinner />;

  return (
    <Table columns="0.1fr 0.7fr 2.5fr 3fr 1.4fr 1.4fr 0.1fr">
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
        <Pagination count={count} PAGE_SIZE={PAGE_SIZE} />
      </Table.Footer>
    </Table>
  );
}

export default BookingsTable;
