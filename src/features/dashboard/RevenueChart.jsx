import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import styled from "styled-components";
import { useDarkModeContext } from "../../context/DarkModeContext";

const StyledChart = styled.div`
  width: 100%;
  height: 300px;

  & .recharts-cartesian-grid-horizontal line,
  & .recharts-cartesian-grid-vertical line {
    stroke: var(--color-grey-300);
  }
`;

// const data = [
//   { date: "2026-02-01", revenue: 4000, extra: 400 },
//   { date: "2026-02-02", revenue: 3000, extra: 1200 },
//   { date: "2026-02-03", revenue: 5000, extra: 800 },
//   { date: "2026-02-04", revenue: 1000, extra: 200 },
//   { date: "2026-02-05", revenue: 800, extra: 400 },
//   { date: "2026-02-06", revenue: 2000, extra: 250 },
// ];

const data = [
  { date: "Jan 09", revenue: 480, extra: 20 },
  { date: "Jan 10", revenue: 580, extra: 100 },
  { date: "Jan 11", revenue: 550, extra: 150 },
  { date: "Jan 12", revenue: 600, extra: 50 },
  { date: "Jan 13", revenue: 700, extra: 150 },
  { date: "Jan 14", revenue: 800, extra: 150 },
  { date: "Jan 15", revenue: 700, extra: 200 },
  { date: "Jan 16", revenue: 650, extra: 200 },
  { date: "Jan 17", revenue: 600, extra: 300 },
  { date: "Jan 18", revenue: 550, extra: 100 },
  { date: "Jan 19", revenue: 700, extra: 100 },
  { date: "Jan 20", revenue: 800, extra: 200 },
  { date: "Jan 21", revenue: 700, extra: 100 },
  { date: "Jan 22", revenue: 810, extra: 50 },
  { date: "Jan 23", revenue: 950, extra: 250 },
  { date: "Jan 24", revenue: 970, extra: 100 },
  { date: "Jan 25", revenue: 900, extra: 200 },
  { date: "Jan 26", revenue: 950, extra: 300 },
  { date: "Jan 27", revenue: 850, extra: 200 },
  { date: "Jan 28", revenue: 900, extra: 100 },
  { date: "Jan 29", revenue: 800, extra: 300 },
  { date: "Jan 30", revenue: 950, extra: 200 },
  { date: "Jan 31", revenue: 1100, extra: 300 },
  { date: "Feb 01", revenue: 1200, extra: 400 },
  { date: "Feb 02", revenue: 1250, extra: 300 },
  { date: "Feb 03", revenue: 1400, extra: 450 },
  { date: "Feb 04", revenue: 1500, extra: 500 },
  { date: "Feb 05", revenue: 1400, extra: 600 },
  { date: "Feb 06", revenue: 1450, extra: 400 },
];

function RevenueChart() {
  const { isDarkMode } = useDarkModeContext();

  const colors = isDarkMode
    ? {
        totalSales: { stroke: "#4f46e5", fill: "#4f46e5" },
        extraFees: { stroke: "#22c55e", fill: "#22c55e" },
        text: "#e5e7eb",
        background: "#18212f",
        grid: "#374151",
      }
    : {
        totalSales: { stroke: "#4f46e5", fill: "#c7d2fe" },
        extraFees: { stroke: "#16a34a", fill: "#dcfce7" },
        text: "#374151",
        background: "#fff",
        grid: "#e5e7eb",
      };

  return (
    <StyledChart>
      <ResponsiveContainer height={"100%"} width={"100%"}>
        <AreaChart
          data={data}
          margin={{ top: 20, right: 30, left: 10, bottom: 5 }}
        >
          {/* Gradient for Revenue */}
          <defs>
            <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="5%"
                stopColor={colors.totalSales.stroke}
                stopOpacity={0.7}
              />
              <stop
                offset="100%"
                stopColor={colors.totalSales.stroke}
                stopOpacity={0}
              />
            </linearGradient>

            {/* Gradient for Extra Fees */}
            <linearGradient id="extraGradient" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="5%"
                stopColor={colors.extraFees.stroke}
                stopOpacity={0.6}
              />
              <stop
                offset="95%"
                stopColor={colors.extraFees.stroke}
                stopOpacity={0.2}
              />
            </linearGradient>
          </defs>

          {/* GRID */}
          <CartesianGrid
            strokeDasharray="4 4"
            stroke={colors.grid}
            vertical={true}
          />

          {/* AXES */}
          <XAxis
            dataKey="date"
            stroke={colors.text}
            tick={{ fill: colors.text }}
            interval={2}
            angle={0}
            tickMargin={10}
          />

          <YAxis
            stroke={colors.text}
            tick={{ fill: colors.text }}
            tickFormatter={(value) => `$${value}`}
          />

          {/* TOOLTIP */}
          <Tooltip
            /* This aligns the text content to the left */ itemStyle={{
              textAlign: "left",
            }}
            /* Optional: align the date label at the top to the left too */ labelStyle={{
              textAlign: "left",
            }}
            itemSorter={(item) => (item.name === "Total Sales" ? -1 : 1)}
            contentStyle={{
              backgroundColor: colors.background,
              border: "none",
              borderRadius: "8px",
              color: colors.text,
            }}
            formatter={(value, name) => [`$${value.toLocaleString()}`, name]}
          />

          {/* LEGEND */}
          <Legend
            height={7}
            wrapperStyle={{
              color: colors.text,
              fontSize: "12px",
            }}
          />

          {/* REVENUE FLOW */}
          <Area
            type="monotone"
            dataKey="revenue"
            name="Total Revenue"
            stroke={colors.totalSales.stroke}
            fillOpacity={1}
            fill="url(#revenueGradient)"
            strokeWidth={2}
          />

          {/* EXTRA FEES FLOW */}
          <Area
            type="monotone"
            dataKey="extra"
            name="Extra Fees"
            stroke={colors.extraFees.stroke}
            fillOpacity={1}
            fill="url(#extraGradient)"
            strokeWidth={2}
          />
        </AreaChart>
      </ResponsiveContainer>
    </StyledChart>
  );
}

export default RevenueChart;
