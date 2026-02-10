import styled from "styled-components";
import { media } from "../../styles/breakpoints";
import { RowFlex } from "../../ui/BookingsTableContainer";
import Row from "../../styles/Row";
import Heading from "../../styles/Heading";
import { useDarkModeContext } from "../../context/DarkModeContext";
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import Spinner from "../../ui/Spinner";

const StyledDiv = styled.div`
  width: 100%;
  grid-column: span 2;
  height: 30rem;
  background: var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 1rem;

  ${"@media (min-width: 560px)"} {
    grid-column: span 1;
  }
`;

const startDataLight = [
  {
    duration: "1 night",
    value: 0,
    color: "#ef4444",
  },
  {
    duration: "2 nights",
    value: 0,
    color: "#f97316",
  },
  {
    duration: "3 nights",
    value: 0,
    color: "#eab308",
  },
  {
    duration: "4-5 nights",
    value: 0,
    color: "#84cc16",
  },
  {
    duration: "6-7 nights",
    value: 0,
    color: "#22c55e",
  },
  {
    duration: "8-14 nights",
    value: 0,
    color: "#14b8a6",
  },
  {
    duration: "15-21 nights",
    value: 0,
    color: "#3b82f6",
  },
  {
    duration: "21+ nights",
    value: 0,
    color: "#a855f7",
  },
];

const startDataDark = [
  {
    duration: "1 night",
    value: 0,
    color: "#b91c1c",
  },
  {
    duration: "2 nights",
    value: 0,
    color: "#c2410c",
  },
  {
    duration: "3 nights",
    value: 0,
    color: "#a16207",
  },
  {
    duration: "4-5 nights",
    value: 0,
    color: "#4d7c0f",
  },
  {
    duration: "6-7 nights",
    value: 0,
    color: "#15803d",
  },
  {
    duration: "8-14 nights",
    value: 0,
    color: "#0f766e",
  },
  {
    duration: "15-21 nights",
    value: 0,
    color: "#1d4ed8",
  },
  {
    duration: "21+ nights",
    value: 0,
    color: "#7e22ce",
  },
];

function prepareData(bookings, startData) {
  const data = startData.map((item) => ({ ...item }));

  bookings.reduce((acc, curr) => {
    if (curr.numNights === 1) acc[0].value++;
    else if (curr.numNights === 2) acc[1].value++;
    else if (curr.numNights === 3) acc[2].value++;
    else if (curr.numNights === 4 || curr.numNights === 5) acc[3].value++;
    else if (curr.numNights === 6 || curr.numNights === 7) acc[4].value++;
    else if (curr.numNights >= 8 && curr.numNights <= 14) acc[5].value++;
    else if (curr.numNights >= 15 && curr.numNights <= 21) acc[6].value++;
    else if (curr.numNights > 21) acc[7].value++;

    return acc;
  }, data);

  return data;
}

function StayDuration({ bookings, isGettingBookings }) {
  const { isDarkMode } = useDarkModeContext();

  const startData = isDarkMode ? startDataDark : startDataLight;

  const data = prepareData(bookings, startData);

  return (
    <StyledDiv>
      <RowFlex>
        <Row>
          <Heading as="h3">Length of Stay Distribution </Heading>
        </Row>
      </RowFlex>

      {isGettingBookings ? (
        <Spinner />
      ) : (
        <ResponsiveContainer width="100%" height={240}>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="duration"
              cx="45%"
              cy="50%"
              outerRadius={90}
              innerRadius={70}
              paddingAngle={3}
            >
              {data.map((entry, index) => (
                <Cell key={index} fill={entry.color} stroke={entry.color} />
              ))}
            </Pie>

            <Tooltip
              contentStyle={{
                fontSize: "1rem",
                color: "#000",
                backgroundColor: "#fff",
              }}
            />
            <Legend
              verticalAlign="middle"
              align="right"
              width={"30%"}
              layout="vertical"
              iconSize={15}
              iconType="circles"
              wrapperStyle={{
                fontSize: "1rem",
                color: "#333",
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      )}
    </StyledDiv>
  );
}

export default StayDuration;
