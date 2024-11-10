"use client";
import {
  ComposedChart,
  Bar,
  Area,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";
import React, { useState } from "react";
import { Select, SelectItem } from "@nextui-org/react";

interface FitnessData {
  date: string;
  steps: number;
  distance: number;
  calories: number;
}

interface Props {
  data: FitnessData[];
}

const HistoricalFitnessCharts = ({ data }: Props) => {
  const [activeDataSet, setActiveDataSet] = useState("steps");

  const datasets = [
    { value: "steps", label: "Steps", color: "#0097a7" },
    { value: "distance", label: "Distance (km)", color: "#0097a7" },
    { value: "calories", label: "Calories", color: "#0097a7" },
  ];

  const getYDomain = () => {
    if (!data.length) return [0, 100];
    const values = data.map(
      (item) => item[activeDataSet as keyof FitnessData] as number
    );
    const min = Math.min(...values);
    const max = Math.max(...values);
    const padding = (max - min) * 0.1;

    const startingBoundary = Math.floor(min - padding);
    const closingBoundary =
      Math.ceil(max + padding) >= 0 ? Math.ceil(max + padding) : 0;

    return [startingBoundary, closingBoundary];
  };

  return (
    <div className="w-full h-[15rem] lg:h-[25rem]">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <h3 className="font-bold text-xl sm:text-2xl text-white capitalize">
          Weekly {activeDataSet}
        </h3>

        <Select
          label="Select metric"
          selectedKeys={[activeDataSet]}
          className="max-w-[200px] border-white"
          onChange={(e) => setActiveDataSet(e.target.value)}
          variant="bordered"
          size="sm"
          labelPlacement="outside"
          classNames={{
            innerWrapper: "",
            label: "!text-stone-300",
            value: "!text-white",
            popoverContent: "bg-stone-900 text-white hover:text-white",
          }}
        >
          {datasets.map((dataset) => (
            <SelectItem key={dataset.value} value={dataset.value}>
              {dataset.label}
            </SelectItem>
          ))}
        </Select>
      </div>

      {data.length === 0 ? (
        <div className="flex bg-zinc-500/50 rounded-sm flex-col items-center justify-center h-full text-center text-gray-400">
          <p>No data available</p>
          <span className="text-sm">
            Please connect to a fitness provider see insights.
          </span>
        </div>
      ) : (
        <div className="w-full h-full min-h-full">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart
              data={data}
              margin={{ top: 10, right: 30, left: 10 }}
            >
              <defs>
                <linearGradient id="colorSteps" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#eafffc" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#0097a7" stopOpacity={1} />
                </linearGradient>
                <linearGradient id="colorDistance" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#eafffc" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#0097a7" stopOpacity={1} />
                </linearGradient>
                <linearGradient id="colorCalories" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#F59E0B" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="5 5"
                stroke="#E5E7EB"
                vertical={false}
              />
              <YAxis
                stroke="#9ca3af"
                tick={{ fill: "#4B5563" }}
                tickLine={{ stroke: "#9ca3af" }}
                axisLine={{ stroke: "#9CA3AF" }}
                domain={getYDomain()}
                width={45}
              />
              <XAxis
                dataKey="date"
                stroke="#9ca3af"
                tick={{ fill: "#4B5563" }}
                tickLine={{ stroke: "#9ca3af" }}
                axisLine={{ stroke: "#9CA3AF" }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#FFF",
                  border: "1px solid #E5E7EB",
                  borderRadius: "8px",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                }}
              />
              {activeDataSet === "steps" && (
                <Area
                  type="monotone"
                  dataKey="steps"
                  stroke="#0097a7"
                  fill="url(#colorSteps)"
                  strokeWidth={2}
                  name="Steps"
                />
              )}
              {activeDataSet === "distance" && (
                <Area
                  type="monotone"
                  dataKey="distance"
                  stroke="#0097a7"
                  fill="url(#colorDistance)"
                  strokeWidth={2}
                  name="Distance (km)"
                />
              )}
              {activeDataSet === "calories" && (
                <Bar
                  dataKey="calories"
                  fill="url(#colorCalories)"
                  name="Calories"
                  radius={[10, 10, 0, 0]} // Rounded top corners
                  barSize={40}
                />
              )}
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};

export default HistoricalFitnessCharts;
