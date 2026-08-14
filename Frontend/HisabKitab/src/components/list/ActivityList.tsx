import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Spinner } from "../ui/spinner";
import { Input } from "@/components/ui/input";
import useFetchActivity from "@/hooks/useFetchActivity";
import { Route } from "@/routes/activity";
import { GrCaretNext } from "react-icons/gr";
import { GrCaretPrevious } from "react-icons/gr";
import { ActivityTypeSelect } from "../filter/FilterActivity";
import { useState, useEffect } from "react";
export function ActivityList() {
  const { page, q, type } = Route.useSearch();
  const navigate = Route.useNavigate();
  const [query, setQuery] = useState(q);
  const [debouncedQuery, setDebouncedQuery] = useState(q);
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
      navigate({
        search: (prev) => ({
          ...prev,
          page: 1,
          q: query,
        }),
      });
    }, 500);

    return () => clearTimeout(timer);
  }, [query, navigate]);
  const { data, isLoading, isError, isFetching } = useFetchActivity(page, debouncedQuery, type);
  if (isError) {
    return <div>Error loading activities</div>;
  }

  return (
    <div className="flex flex-col gap-1.5 p-3 h-full">
      <div className="flex flex-row justify-center gap-3 ">
        <div>
          <Input
            className="max-w-60 h-10 border border-gray-400"
            type="search"
            placeholder="Search..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
            }}
          />
        </div>
        <div>
          <ActivityTypeSelect
            type={type}
            onChange={(value) =>
              navigate({
                search: (prev) => ({
                  ...prev,
                  page: 1,
                  type: value,
                }),
              })
            }
          />
        </div>
      </div>
      {isLoading && !data ? (
        <div className="flex flex-col gap-3">
          {[1, 2, 3, 4, 5].map((element) => (
            <Card
              size="sm"
              className="mx-auto max-w-250 w-full ring-green-500 h-30 bg-gray-300 dark:bg-muted/60  animate-pulse"
              key={element}
            ></Card>
          ))}
        </div>
      ) : (
        <div className="h-4">
          {isFetching && (
            <div className="flex justify-center w-full">
              <Spinner />
            </div>
          )}
        </div>
      )}
      {data?.results.length === 0 && (
        <div className="flex w-full justify-center items-center mt-40">No Activities</div>
      )}

      <div className="flex flex-col justify-center gap-3 w-full p-3">
        {data?.results.map((element) => (
          <div className="flex-1">
            <Card
              size="sm"
              className="mx-auto w-full max-w-250 ring-green-500 hover:scale-103 transistion duration-500"
              key={element.id}
            >
              <CardHeader>
                <CardTitle>{element.title}</CardTitle>
                <CardDescription>{element.type}</CardDescription>
              </CardHeader>
              <CardFooter className="flex-row justify-end items-center gap-2">
                <div>
                  {new Date(element.created_at).toLocaleString("en-US", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                  })}
                </div>
              </CardFooter>
            </Card>
          </div>
        ))}
      </div>
      <div className="flex flex-row justify-around items-center mt-auto">
        <Button
          disabled={!data?.previous}
          className="p-2 text-white bg-green-500 hover:bg-green-600 hover:text-white rounded-full w-10 h-10 flex items-center justify-center  mb-1.5"
          onClick={() =>
            navigate({
              search: (prev) => ({ ...prev, page: prev.page - 1 }),
            })
          }
        >
          <GrCaretPrevious />
        </Button>
        <Button
          disabled={!data?.next}
          className="p-2 text-white bg-green-500 hover:bg-green-600 hover:text-white rounded-full w-10 h-10 flex items-center justify-center  mb-1.5"
          onClick={() =>
            navigate({
              search: (prev) => ({ ...prev, page: prev.page + 1 }),
            })
          }
        >
          <GrCaretNext />
        </Button>
      </div>
    </div>
  );
}
