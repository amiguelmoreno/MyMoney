import { useSearchParams } from "react-router-dom";
import Select from "./Select";

function FilterDrop({ options, filterField }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const field = searchParams.get(filterField) || "";

  function handleChange(e) {
    searchParams.set(filterField, e.target.value);
    setSearchParams(searchParams);
  }

  return (
    <Select
      options={options}
      type="white"
      value={field}
      onChange={handleChange}
    />
  );
}

export default FilterDrop;
