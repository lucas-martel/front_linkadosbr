import TFilter from "@/types/TFilter";

export const saveFilter = (key: string, value: any) => {
  let data = getFilter() as any;
  data[key] = value;
  sessionStorage.setItem("fp", JSON.stringify(data));
};

export const getFilter = (): TFilter => {
  const data = sessionStorage.getItem("fp");
  if (data === null) {
    return {} as TFilter;
  }
  return JSON.parse(data) as TFilter;
};
