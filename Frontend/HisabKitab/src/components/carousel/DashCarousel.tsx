import useFetchDashboard from "@/hooks/useFetchDashboard";
import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import { PendingSettledChart } from "../charts/PendingSettledChart";
import { CategoryChart } from "../charts/CategoryChart";
import { DashboardGroupList } from "../list/DashboardGroupList";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ActivityHover } from "../hover/ActivityHover";
const DashCarousel = () => {
  const { data } = useFetchDashboard();
  return (
    <div className="flex flex-col gap-3">
      <div className="flex justify-between p-3 h-40">
        <p className="text-5xl ">Hello! {data?.user}</p>
        <div className="h-20">{data?.activity && <ActivityHover data={data?.activity} />}</div>
      </div>
      <Carousel>
        <CarouselContent>
          <CarouselItem>
            <div className="p-3 grid grid-cols-1 gap-3 md:grid-cols-3 sm:grid-cols-1 justify-items-center">
              <Card className="ring-gray-400 hover:ring-green-500 hover:scale-110 size-50 transistion duration-300 md:size-auto lg:size-50 xl:size-50">
                <CardHeader className="p-3 flex justify-center flex-1 text-3xl items-center">
                  {data?.summary.total_groups}
                </CardHeader>
                <CardFooter className="bg-green-500 text-white text-2xl font-bold h-20 text-center items-center">
                  Groups Enrolled
                </CardFooter>
              </Card>
              <Card className="ring-gray-400 hover:ring-green-500 hover:scale-110 size-50 transistion duration-300 md:size-auto lg:size-50 xl:size-50">
                <CardHeader className="p-3 flex justify-center flex-1 items-center text-2xl">
                  Rs. {data?.summary.total_expense.toFixed(2)}
                </CardHeader>
                <CardFooter className="bg-green-500 text-white text-2xl font-bold h-20 text-center items-center">
                  Total Expenses
                </CardFooter>
              </Card>
              <Card className="ring-gray-400 hover:ring-green-500 hover:scale-110 size-50 transistion duration-300 md:size-auto lg:size-50 xl:size-50">
                <CardHeader className="p-3 flex justify-center flex-1 text-2xl items-center">
                  Rs. {data?.summary.total_paid.toFixed(2)}
                </CardHeader>
                <CardFooter className="bg-green-500 text-white text-2xl font-bold h-20 text-center flex-col items-center  ">
                  Total Paid
                </CardFooter>
              </Card>
            </div>
          </CarouselItem>
          <CarouselItem>
            <div className="p-3 grid grid-cols-1 gap-3 md:grid-cols-3 sm:grid-cols-1 justify-items-center">
              <Card className="ring-gray-400 hover:ring-green-500 hover:scale-110 size-50 transistion duration-300 md:size-auto lg:size-50 xl:size-50">
                <CardHeader className="p-3 flex justify-center flex-1 text-xl items-center">
                  Rs. {data?.summary.your_owe.toFixed(2)}
                </CardHeader>
                <CardFooter className="bg-green-500 text-white text-2xl font-bold h-20 text-center items-center">
                  Net Amount To Pay
                </CardFooter>
              </Card>
              <Card className="ring-gray-400 hover:ring-green-500 hover:scale-110 size-50 transistion duration-300  md:size-auto lg:size-50 xl:size-50">
                <CardHeader className="p-3 flex justify-center flex-1 text-xl items-center ">
                  Rs. {data?.summary.your_receive.toFixed(2)}
                </CardHeader>
                <CardFooter className="bg-green-500 text-white text-2xl font-bold h-20 text-center items-center">
                  Net Amount To Receive
                </CardFooter>
              </Card>
              <Card className=" ring-gray-400 hover:ring-green-500 size-50 hover:scale-110 transistion duration-300 md:size-auto lg:size-50 xl:size-50">
                <CardHeader className="p-3 flex justify-center flex-10 text-xl items-center ">
                  {data?.pending_settlement_counts}
                </CardHeader>
                <CardFooter className="bg-green-500 text-white text-2xl font-bold h-20 text-center items-center">
                  Pending Settlements
                </CardFooter>
              </Card>
            </div>
          </CarouselItem>
          <CarouselItem>
            <div className="p-3 grid grid-cols-1 gap-3 md:grid-cols-3 sm:grid-cols-1 justify-items-center">
              <Card className="ring-gray-400 hover:ring-green-500 hover:scale-110 size-50 transistion duration-300 md:size-auto lg:size-50 xl:size-50">
                <CardHeader className="p-3 flex justify-center flex-1 text-2xl items-center">
                  {data?.completed_settlement_counts}
                </CardHeader>
                <CardFooter className="bg-green-500 text-white text-2xl font-bold h-20 text-center items-center">
                  Completed Settlements
                </CardFooter>
              </Card>
            </div>
          </CarouselItem>
        </CarouselContent>
        <CarouselPrevious className="left-2" />
        <CarouselNext className="right-2" />
      </Carousel>

      <div className=" flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-1.5 h-full  ">
        <Carousel>
          <CarouselContent>
            <CarouselItem>
              {" "}
              <CategoryChart
                food={data?.category.food ?? 0}
                entertainment={data?.category.entertainment ?? 0}
                travel={data?.category.travel ?? 0}
                gaming={data?.category.gaming ?? 0}
                others={data?.category.others ?? 0}
              />
            </CarouselItem>
            <CarouselItem>
              <PendingSettledChart
                pending={data?.pending_settlement_counts ?? 0}
                completed={data?.completed_settlement_counts ?? 0}
              />
            </CarouselItem>
          </CarouselContent>
        </Carousel>

        <div>
          <DashboardGroupList group={data?.group ?? []} />
        </div>
      </div>
    </div>
  );
};

export default DashCarousel;
