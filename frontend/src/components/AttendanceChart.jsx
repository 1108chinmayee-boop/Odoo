import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

import { attendanceData } from "../data/mockData";

function AttendanceChart() {
  return (
    <div className="h-72 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={attendanceData}
          margin={{
            top: 5,
            right: 10,
            left: -20,
            bottom: 5,
          }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            vertical={false}
          />

          <XAxis
            dataKey="day"
            tick={{ fontSize: 12 }}
          />

          <YAxis
            tick={{ fontSize: 12 }}
          />

          <Tooltip />

          <Legend />

          <Area
            type="monotone"
            dataKey="present"
            name="Present"
            stroke="#4f46e5"
            fill="#e0e7ff"
            strokeWidth={2}
          />

          <Area
            type="monotone"
            dataKey="absent"
            name="Absent"
            stroke="#ef4444"
            fill="#fee2e2"
            strokeWidth={2}
          />

          <Area
            type="monotone"
            dataKey="leave"
            name="Leave"
            stroke="#f59e0b"
            fill="#fef3c7"
            strokeWidth={2}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export default AttendanceChart;