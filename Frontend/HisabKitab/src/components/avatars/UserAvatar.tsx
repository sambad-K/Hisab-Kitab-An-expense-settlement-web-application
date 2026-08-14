import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { AvatarProps } from "@/props/AvatarProps";
export function UserAvatar({ path }: AvatarProps) {
  console.log(path);
  return (
    <div className="flex flex-row flex-wrap items-center gap-6 md:gap-12">
      <Avatar>
        <AvatarImage src={path} alt="x" className="grayscale-0" />
        <AvatarFallback>U</AvatarFallback>
      </Avatar>
    </div>
  );
}
