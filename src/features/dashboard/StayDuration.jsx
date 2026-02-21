import styled from "styled-components";
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
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;

  *:focus {
    outline: 1px solid var(--color-grey-400);
    box-shadow: none;
  }

  ${"@media (min-width: 560px)"} {
    grid-column: span 1;
  }
`;

const startDataLight = [
  { duration: "1 night", value: 0, color: "#ef4444" },
  { duration: "2 nights", value: 0, color: "#f97316" },
  { duration: "3 nights", value: 0, color: "#eab308" },
  { duration: "4-5 nights", value: 0, color: "#84cc16" },
  { duration: "6-7 nights", value: 0, color: "#22c55e" },
  { duration: "8-14 nights", value: 0, color: "#14b8a6" },
  { duration: "15-21 nights", value: 0, color: "#3b82f6" },
  { duration: "21+ nights", value: 0, color: "#a855f7" },
];

const startDataDark = [
  { duration: "1 night", value: 0, color: "#b91c1c" },
  { duration: "2 nights", value: 0, color: "#c2410c" },
  { duration: "3 nights", value: 0, color: "#a16207" },
  { duration: "4-5 nights", value: 0, color: "#4d7c0f" },
  { duration: "6-7 nights", value: 0, color: "#15803d" },
  { duration: "8-14 nights", value: 0, color: "#0f766e" },
  { duration: "15-21 nights", value: 0, color: "#1d4ed8" },
  { duration: "21+ nights", value: 0, color: "#7e22ce" },
];

function prepareData(bookings, startData) {
  const data = startData.map((item) => ({ ...item }));
  bookings.forEach((curr) => {
    if (curr.numNights === 1) data[0].value++;
    else if (curr.numNights === 2) data[1].value++;
    else if (curr.numNights === 3) data[2].value++;
    else if (curr.numNights === 4 || curr.numNights === 5) data[3].value++;
    else if (curr.numNights === 6 || curr.numNights === 7) data[4].value++;
    else if (curr.numNights >= 8 && curr.numNights <= 14) data[5].value++;
    else if (curr.numNights >= 15 && curr.numNights <= 21) data[6].value++;
    else if (curr.numNights > 21) data[7].value++;
  });
  return data;
}

// Custom Tooltip to match slice color
const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const { payload: entry } = payload[0];
    return (
      <div
        style={{
          padding: "0.5rem 0.8rem",
          borderRadius: "0.4rem",
          backgroundColor: "rgba(255,255,255,0.95)",
          color: entry.color,
          fontSize: "1.6rem",
          fontWeight: "500",
        }}
      >
        {entry.duration}: {entry.value}
      </div>
    );
  }
  return null;
};

// Custom legend with color labels
const renderLegend = (props) => {
  const { payload } = props;
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: "0.5rem",
        marginTop: "1rem",
      }}
    >
      {payload.map((entry, index) => (
        <span
          key={`item-${index}`}
          style={{
            display: "flex",
            alignItems: "center",
            fontSize: "0.9rem",
            gap: "0.3rem",
            color: entry.color,
          }}
        >
          <span
            style={{
              width: 12,
              height: 12,
              backgroundColor: entry.color,
              borderRadius: "50%",
              display: "inline-block",
            }}
          ></span>
          {entry.value} ({entry.payload.duration})
        </span>
      ))}
    </div>
  );
};

function StayDuration({ bookings, isGettingBookings }) {
  const { isDarkMode } = useDarkModeContext();
  const startData = isDarkMode ? startDataDark : startDataLight;
  const data = prepareData(bookings, startData);

  return (
    <StyledDiv>
      <RowFlex>
        <Row>
          <Heading
            style={{
              whiteSpace: "nowrap",
            }}
            as="h2"
          >
            Length of Stay Distribution
          </Heading>
        </Row>
      </RowFlex>

      {isGettingBookings ? (
        <Spinner />
      ) : (
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="duration"
              cx="50%"
              cy="50%"
              outerRadius="80%"
              innerRadius="50%"
              paddingAngle={3}
              cornerRadius={5}
            >
              {data.map((entry, index) => (
                <Cell key={index} fill={entry.color} stroke={entry.color} />
              ))}
            </Pie>

            <Tooltip content={<CustomTooltip />} />
            <Legend content={renderLegend} />
          </PieChart>
        </ResponsiveContainer>
      )}
    </StyledDiv>
  );
}

export default StayDuration;
