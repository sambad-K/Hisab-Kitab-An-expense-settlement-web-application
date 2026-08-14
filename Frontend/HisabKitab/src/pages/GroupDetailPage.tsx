import useRetrieveGroup from "@/hooks/useRetrieveGroup";
import { GroupMemberTable } from "../components/tables/GroupMemberTable";
import { useState } from "react";
import { Route } from "@/routes/groupdetail/$id";
import SearchDrawer from "../components/drawer/SearchDrawer";
const GroupsDetailPage = () => {
  const [query, setQuery] = useState("");
  const { id } = Route.useParams();
  const gid = Number(id);
  const { group } = useRetrieveGroup(gid);
  if (group.isError) {
    return <p>Error</p>;
  }
  return (
    <div className="p-5 h-[calc(100vh-64px)]">
      <div className="flex flex-col gap-4">
        <p className="font-bold text-5xl">{group.data?.group_name}</p>
        <p className="mb-3">{group.data?.description}</p>
      </div>
      <div className="mb-9">
        <SearchDrawer query={query} setQuery={setQuery} pk={gid} />
      </div>
      <GroupMemberTable id={gid} />
    </div>
  );
};
export default GroupsDetailPage;
