import React, { useEffect, useState } from "react";
import styles from "../css/ticket.module.css";
import Card from "./card";
import FilterBox from "./filterbox";

export const statusData = ["New", "Assigned", "Resolved"];
export const typeData = ["Type1", "Type2", "Type3"];
export const severityData = ["Low", "Medium", "High"];

const initFilter = {};

const GetTickets = ({ data, loading, fetchApi, page, setPage, lastPage }) => {
  let api = "https://ticket-assign-system.onrender.com/api/support-tickets";
  const limit = 4;
  const [filter, setFilter] = useState(initFilter);

  const updateFilter = (type, value) => {
    setFilter({ ...filter, [type]: value });
  };

  const applySortVal = (e) => {
    const { name, value } = e.target;
    setFilter({ ...filter, [name]: value });
  };

  const applyFilter = () => {
    let string = "?";
    let keys = Object.keys(filter);
    for (let key of keys) {
      string += key;
      string += "=" + filter[key] + "&";
    }
    api += string + "page=" + page + "&limit=" + limit;
    fetchApi(api);
    setFilter({});
  };

  useEffect(()=>{
    api +="?page=" + page + "&limit=" + limit;
    fetchApi(api);
  },[page])

  return (
    <div>
      <div>
        <h3>List Of Tickets</h3>
        <div className={styles.filterWrapper}>
          <FilterBox
            data={statusData}
            filterType="status"
            updateFilter={updateFilter}
          />
          <FilterBox
            data={typeData}
            filterType="type"
            updateFilter={updateFilter}
          />
          <FilterBox
            data={severityData}
            filterType="severity"
            updateFilter={updateFilter}
          />
          <button onClick={applyFilter}>Apply Filter</button>
        </div>
        <div>
          <p className={styles.topic}>Sort Results</p>
          <input
            type="radio"
            id="resolved"
            name="sortVal"
            value="resolvedOn"
            onChange={applySortVal}
          />
          <label for="resolved">Resolved On</label>
          <br />
          <input
            type="radio"
            id="createddate"
            name="sortVal"
            value="createdDate"
            onChange={applySortVal}
          />
          <label for="createddate"> Created date</label>
          <br />
          <br />
          <br />
        </div>
      </div>
      {loading && <h3>Loading.....</h3>}
      {!loading &&
        data.length > 0 &&
        data.map((ticket) => (
          <Card fetchApi={applyFilter} ticket={ticket} key={ticket._id} />
        ))}
      <div className={styles.footer}>
        <button
          disabled={page == 1}
          onClick={() => setPage(page - 1)}
          className={page == 1 ? styles.disabled : styles.btn}
        >
          Prev
        </button>
        <span>{page}</span>
        <button
          disabled={page == lastPage}
          onClick={() => setPage(page + 1)}
          className={page == lastPage ? styles.disabled : styles.btn}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default GetTickets;
