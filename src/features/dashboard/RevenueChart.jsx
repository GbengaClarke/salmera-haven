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

function RevenueChart({ data, lastDays }) {
  const { isDarkMode } = useDarkModeContext();

  //edit for x-axis labels
  const interval = lastDays === 30 ? 3 : lastDays === 90 ? 9 : "";

  // console.log(interval);

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
          margin={{ top: 10, right: 10, left: 10, bottom: 5 }}
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
            angle={0}
            interval={interval}
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
            height={5}
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
