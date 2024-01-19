import React, { useEffect, useState } from "react";
import GetTickets, { severityData, typeData } from "./get-tickets";
import styles from "../css/ticket.module.css";
import FilterBox from "./filterbox";
import { Link } from "react-router-dom";

const initTicketDetails = {
  topic: "",
  description: "",
  severity: "",
  type: "",
};

const Ticket = () => {
  const [ticketDetails, setTicketdetails] = useState(initTicketDetails);
  const createTicketApi = "https://ticket-assign-system.onrender.com/api/support-tickets";
  let getTicketApi = "https://ticket-assign-system.onrender.com/api/support-tickets";
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [lastPage, setlastPage] = useState(1);
  const limit = 4;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTicketdetails({ ...ticketDetails, [name]: value });
  };

  const updateFilter = (type, value) => {
    setTicketdetails({ ...ticketDetails, [type]: value });
  };
  const fetchApi = async (api) => {
    setLoading(true);
    try {
      let res = await fetch(api);
      res = await res.json();
      setData(res.data);
      setlastPage(Math.ceil(res.total / limit));
      setLoading(false);
    } catch (err) {
      setLoading(false);
      alert("Something went wrong");
    }
  };
  useEffect(() => {
    fetchApi(getTicketApi);
  }, []);

  const handleClick = async () => {
    try {
      let res = await fetch(createTicketApi, {
        method: "POST",
        body: JSON.stringify(ticketDetails),
        headers: {
          Accept: "application.json",
          "Content-Type": "application/json",
        },
      });
      res = await res.json();
      fetchApi(getTicketApi);
      alert("Ticket Created Successfully");
    } catch (err) {
      alert("Something went wrong");
    }
  };

  return (
    <div className={styles.ticket}>
      <div className={styles.formWrapper}>
        <input
          type="text"
          placeholder="topic"
          name="topic"
          value={ticketDetails.topic}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="description"
          name="description"
          value={ticketDetails.description}
          onChange={handleChange}
        />
        <FilterBox
          data={severityData}
          filterType="severity"
          updateFilter={updateFilter}
        />
        <FilterBox
          data={typeData}
          filterType="type"
          updateFilter={updateFilter}
        />
        <button onClick={handleClick}>Create Ticket</button>
        <div><Link to='/'><span>Go to Agents</span></Link></div>
      </div>
      <GetTickets
        loading={loading}
        data={data}
        fetchApi={fetchApi}
        page={page}
        lastPage={lastPage}
        setPage={setPage}
      />
    </div>
  );
};

export default Ticket;
