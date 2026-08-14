"use client";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import type { PendingCompletedProps } from "@/props/PendingCompletedProps";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

export const description = "A bar chart";

export function PendingSettledChart({ pending, completed }: PendingCompletedProps) {
  const chartData = [
    { status: "Pending", desktop: pending },
    { status: "Settled", desktop: completed },
  ];

  const chartConfig = {
    desktop: {
      label: "Settlements",
      color: "#3b82f6",
    },
  } satisfies ChartConfig;

  return (
    <Card className="h-full justify-center bg-transparent border-none shadow-none  ">
      <CardHeader>
        <CardTitle>Settlement Status</CardTitle>
        <CardDescription>Pending and completed settlements</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="status"
              tickLine={false}
              tickMargin={10}

              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Bar dataKey="desktop" fill="var(--color-desktop)" radius={8} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
