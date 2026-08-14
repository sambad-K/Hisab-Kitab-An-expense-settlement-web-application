"use client";
import { Pie, PieChart } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

export const description = "A simple pie chart";
import type { CategoryChartProps } from "@/props/CategoryChartProps";

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  chrome: {
    label: "Chrome",
    color: "var(--chart-1)",
  },
  safari: {
    label: "Safari",
    color: "var(--chart-2)",
  },
  firefox: {
    label: "Firefox",
    color: "var(--chart-3)",
  },
  edge: {
    label: "Edge",
    color: "var(--chart-4)",
  },
  other: {
    label: "Other",
    color: "var(--chart-5)",
  },
} satisfies ChartConfig;

export function CategoryChart({ food, entertainment, travel, gaming, others }: CategoryChartProps) {
  const chartData = [
    { browser: "Food", visitors: food, fill: "#22c55e" },
    { browser: "Entertainment", visitors: entertainment, fill: "#3b82f6" },
    { browser: "Travel", visitors: travel, fill: "#f59e0b" },
    { browser: "Gaming", visitors: gaming, fill: "#a855f7" },
    { browser: "Others", visitors: others, fill: "#ef4444" },
  ];
  console.log(food, entertainment, travel, gaming, others);
  return (
    <Card className="flex flex-col size90 h-full bg-transparent border-none shadow-none ">
      <CardHeader className="items-center pb-0">
        <CardTitle>Statistical Detail</CardTitle>
        <CardDescription>
          Expenses Per Category <br /> Swipe to view more..
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer config={chartConfig} className="mx-auto h-100 w-full max-w-sm">
          <PieChart>
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />

            <Pie
              data={chartData}
              dataKey="visitors"
              labelLine={false}
              label={({ payload, ...props }) => {
                return (
                  <text
                    cx={props.cx}
                    cy={props.cy}
                    x={props.x}
                    y={props.y}
                    textAnchor={props.textAnchor}
                    dominantBaseline={props.dominantBaseline}
                    fill="var(--foreground)"
                  >
                    {payload.visitors}
                  </text>
                );
              }}
              nameKey="browser"
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
