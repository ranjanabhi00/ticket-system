import React from "react";

const FilterBox = ({ data, filterType, updateFilter }) => {
  const handleChange = (e) => {
    updateFilter(filterType, e.target.value);
  };

  return (
    <>
      <select name={filterType} onChange={handleChange}>
        <option value="">{filterType}</option>
        {data.map((item, ind) => {
          return (
            <option key={ind} value={item}>
              {item}
            </option>
          );
        })}
      </select>
    </>
  );
};

export default FilterBox;
