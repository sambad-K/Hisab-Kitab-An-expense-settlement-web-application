import api from "./axios";
import type { GroupSchemaValue } from "@/schema/group.schema";
export const createGroup = (data: GroupSchemaValue) => {
  return api.post("/group/", data);
};
