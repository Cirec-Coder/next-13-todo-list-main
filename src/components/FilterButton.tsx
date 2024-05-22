import { capitalize } from "@/lib/utils";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

type FilterButtonProps = {
  name: string;
  filter: string;
};

const FilterButton = ({ name, filter }: FilterButtonProps) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  // update URL paramèters
  const setFilter = (filterName: string) => {
    const param = new URLSearchParams(searchParams);
    param.set("filter", filterName);
    replace(`${pathname}?${param.toString()}`);
  };
  return (
    <>
      <input
        type="radio"
        name="filter"
        className="btn btn-ghost sm:btn-sm btn-xs mx-0.5 m-0"
        aria-label={capitalize(name)}
        key={name}
        id={name}
        defaultChecked={filter === name}
        onClick={() => {
          setFilter(name);
        }}
      />
    </>
  );
};

export default FilterButton;
