import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select";
import type { TypeFilterProps } from "@/props/TypeFilterProps";
export function ActivityTypeSelect({ type, onChange }: TypeFilterProps) {
  return (
    <NativeSelect value={type} onChange={(e) => onChange(e.target.value)}>
      <NativeSelectOption value="">Select activity type</NativeSelectOption>
      <NativeSelectOption value="GROUP CREATE">Group Created</NativeSelectOption>
      <NativeSelectOption value="GROUP DELETE">Group Deleted</NativeSelectOption>
      <NativeSelectOption value="MEMBER ADD">Members Added</NativeSelectOption>
      <NativeSelectOption value="MEMBER REMOVE">Members Removed / Leave</NativeSelectOption>
      <NativeSelectOption value="PAYMENT">Payment/settlements</NativeSelectOption>
      <NativeSelectOption value="SETTLEMENT CREATE">Settlements Created</NativeSelectOption>
    </NativeSelect>
  );
}
