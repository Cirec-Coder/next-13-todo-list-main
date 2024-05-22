"use client";
import { debounce } from "@/lib/utils";
import { SearchIcon } from "lucide-react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

const SearchBar = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  const handleSearch = (searchTerm: string) => {
    const param = new URLSearchParams(searchParams);
    if (searchParams) {
      param.set("search", searchTerm);
    } else {
      param.delete("search");
    }
    replace(`${pathname}?${param.toString()}`);
  };

  const debouncedSearch = debounce(handleSearch, 500);
  return (
    <div className="w-2/3 relative">
      <label
        htmlFor="search"
        className="sr-only"
      >
        Search
      </label>
      <input
        type="text"
        name="search"
        id="search"
        defaultValue={searchParams.get("search")?.toString()}
        onChange={(e) => debouncedSearch(e.target.value)}
        placeholder="Search for Todos..."
        className="w-full h-10 px-5 py-3 border-slate-500 border text-xl rounded-xl bg-slate-700 placeholder-slate-500"
      />
      <SearchIcon className="w-6 h-6 absolute top-1/2 right-5 transform -translate-y-1/2 text-slate-500" />
    </div>
  );
};

export default SearchBar;
