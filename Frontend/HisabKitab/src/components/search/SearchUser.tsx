import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import type { SearchProps } from "@/props/SearchProps";
import useSearch from "@/hooks/useSearch";
import { Card } from "@/components/ui/card";
import AddMemberButton from "../buttons/AddMemberButton";
import { Spinner } from "../ui/spinner";
import { UserAvatar } from "../avatars/UserAvatar";
import { QueryClient } from "@tanstack/react-query";
import { useState, useEffect } from "react";
export default function SearchUser({ query, setQuery, pk }: SearchProps) {
  const queryClient = new QueryClient();

  const [debouncedQuery, setDebouncedQuery] = useState("");
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 500);

    return () => clearTimeout(timer);
  }, [query]);

  const { data = [], isLoading, isSuccess, isError } = useSearch(debouncedQuery);
  if (isSuccess) {
    queryClient.invalidateQueries({
      queryKey: ["expense-per-member"],
    });
  }
  return (
    <Field orientation="horizontal" className="w-full ring-gray-600 relative">
      <div className="flex flex-col trasistion duration-300">
        <Input
          type="search"
          placeholder="Search users to add"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        {isError && <p>Error occoured</p>}
        {isLoading && (
          <p className="w-full flex justify-center items-center">
            Searching
            <Spinner />
          </p>
        )}
        {data.length <= 0 && <p>No results</p>}
        <div className=" top-10 absolute z-40 w-full flex flex-col gap-3">
          {data.map((element) => {
            return (
              <Card
                size="sm"
                className="hover:ring-green-100 border-gray-100 transition duration-300 h-20 p-3 flex flex-row items-center justify-between w-full  "
                key={element.id}
              >
                <div>{element.picture && <UserAvatar path={element.picture} />}</div>
                <div>{element.username}</div>
                <div>
                  <AddMemberButton pk={pk} id={element.id} />
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </Field>
  );
}
