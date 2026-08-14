import { Button } from "@/components/ui/button";
import { Drawer, DrawerHeader, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import SearchUser from "../search/SearchUser";
import type { SearchProps } from "@/props/SearchProps";
export default function SearchDrawer({ query, setQuery, pk }: SearchProps) {
  return (
    <Drawer swipeDirection="left">
      <DrawerTrigger
        className="bg-green-500 hover:bg-green-600 transistion duration-300 text-white hover:text-white"
        render={<Button variant="outline" />}
      >
        Add Participants
      </DrawerTrigger>
      <DrawerContent className="md:w-75 sm:w-80 lg:w-90">
        <DrawerHeader className="font-bold text-2xl">Search Users</DrawerHeader>
        <div className=" p-5">
          <SearchUser query={query} setQuery={setQuery} pk={pk} />
        </div>
      </DrawerContent>
    </Drawer>
  );
}
