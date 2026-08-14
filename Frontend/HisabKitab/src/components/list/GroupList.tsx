import useFetchGroup from "@/hooks/useFetchGroup";
import { Card, CardDescription, CardTitle, CardHeader, CardFooter } from "@/components/ui/card";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import GroupActionButton from "../buttons/GroupActionButton";
import { useState } from "react";
import { useEffect } from "react";
import { Route } from "@/routes/groups";
import { Spinner } from "../ui/spinner";
import { useNavigate } from "@tanstack/react-router";
export default function GroupList() {
  const { search } = Route.useSearch();
  const [query, setQuery] = useState(search);
  const [debouncedQuery, setDebouncedQuery] = useState(search);
  const { data, isLoading, isError, isFetching } = useFetchGroup(debouncedQuery);
  const navigate = Route.useNavigate();
  const detailnav = useNavigate();
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
      navigate({
        search: {
          search: query,
        },
      });
    }, 500);

    return () => clearTimeout(timer);
  }, [query, navigate]);
  if (isError) {
    return <p>Something went wrong</p>;
  }
  return (
    <div className="flex flex-col items-start gap-3">
      <div className="self-center">
        <Field orientation="horizontal">
          <Input
            type="search"
            placeholder="Search..."
            value={query}
            className="h-10  mb-5 border border-gray-400"
            onChange={(e) => {
              setQuery(e.target.value);
            }}
          />
        </Field>
      </div>

      {isLoading && !data ? (
        <div className="flex flex-col gap-3 w-full">
          {[1, 2, 3, 4, 5, 6].map((element) => (
            <Card
              size="sm"
              className="mx-auto w-full max-w-250 ring-green-500 h-30 dark:bg-muted/60 bg-gray-300 animate-pulse"
              key={element}
            ></Card>
          ))}
        </div>
      ) : (
        <div className="w-full h-4">
          {isFetching && (
            <div className="flex flex-row justify-center w-full">
              <Spinner />
            </div>
          )}
        </div>
      )}

      {data?.length === 0 && (
        <div className="flex w-full justify-center items-center mt-40">No groups</div>
      )}

      {data &&
        data.map((element) => (
          <Card
            size="sm"
            className="mx-auto w-full max-w-250 ring-green-500 hover:scale-103 transistion duration-500"
            key={element.id}
          >
            <CardHeader className="flex flex-row justify-between">
              <div
                onClick={() => detailnav({ to: `/groupdetail/${element.id}` })}
                className="flex-1"
              >
                <CardTitle>{element.group_name}</CardTitle>
                <CardDescription>{element.description}</CardDescription>
              </div>
              <div className="self-end">
                <GroupActionButton id={element.id} />
              </div>
            </CardHeader>

            <CardFooter onClick={() => detailnav({ to: `/groupdetail/${element.id}` })}>
              <div className="text-gray-500">
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
        ))}
    </div>
  );
}
