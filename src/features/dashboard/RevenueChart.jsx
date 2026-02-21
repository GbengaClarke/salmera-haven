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
import { useState, useEffect } from "react";

const StyledChart = styled.div`
  width: 100%;
  height: 300px;
  overflow-x: auto;
  overflow-y: hidden;

  & .recharts-cartesian-grid-horizontal line,
  & .recharts-cartesian-grid-vertical line {
    stroke: var(--color-grey-300);
  }

  & .recharts-cartesian-axis-tick-value {
    font-size: 1.3rem;
    font-family: inherit;
  }
`;

function RevenueChart({ data, lastDays }) {
  const { isDarkMode } = useDarkModeContext();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isMobile = windowWidth < 640;

  let interval;
  if (isMobile) {
    interval =
      lastDays === 7
        ? 1
        : lastDays === 30
        ? 6
        : lastDays === 90
        ? 15
        : "preserveEnd";
  } else {
    interval = lastDays === 30 ? 3 : lastDays === 90 ? 9 : 0;
  }

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
      <ResponsiveContainer
        height="100%"
        width="100%"
        minWidth={isMobile ? 550 : 0}
      >
        <AreaChart
          data={data}
          margin={{ top: 10, right: 15, left: 0, bottom: 0 }}
        >
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

          <CartesianGrid strokeDasharray="4 4" stroke={colors.grid} />

          <XAxis
            dataKey="date"
            stroke={colors.text}
            tick={{ fill: colors.text }}
            tickMargin={10}
            interval={interval}
            angle={isMobile ? -25 : 0}
            textAnchor={isMobile ? "end" : "middle"}
            height={isMobile ? 60 : 30}
          />

          <YAxis
            stroke={colors.text}
            tick={{ fill: colors.text, fontSize: isMobile ? "10px" : "12px" }}
            width={isMobile ? 45 : 60}
            tickFormatter={(value) =>
              value >= 1000 ? `$${(value / 1000).toFixed(1)}k` : `$${value}`
            }
          />

          <Tooltip
            itemStyle={{ textAlign: "left" }}
            labelStyle={{
              textAlign: "left",
              marginBottom: "4px",
              fontWeight: "bold",
            }}
            contentStyle={{
              backgroundColor: colors.background,
              border: `1px solid ${colors.grid}`,
              borderRadius: "8px",
              color: colors.text,
            }}
            formatter={(value, name) => [`$${value.toLocaleString()}`, name]}
          />

          <Legend
            verticalAlign="top"
            align="right"
            height={40}
            wrapperStyle={{
              paddingBottom: "10px",
              fontSize: "12px",
            }}
          />

          <Area
            type="monotone"
            dataKey="revenue"
            name="Total Revenue"
            stroke={colors.totalSales.stroke}
            fillOpacity={1}
            fill="url(#revenueGradient)"
            strokeWidth={2}
          />

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
