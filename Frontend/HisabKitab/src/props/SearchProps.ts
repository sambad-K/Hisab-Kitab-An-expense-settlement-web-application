export type SearchProps = {
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
} & {
  pk: number;
};
