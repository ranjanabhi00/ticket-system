import styles from "../css/ticket.module.css";

const Card = ({ ticket, fetchApi }) => {
  const { topic, status, severity, description, type } = ticket;
  const assignApi = `https://ticket-assign-system.onrender.com/api/support-tickets/assign/${ticket._id}`;
  const resolveApi = `https://ticket-assign-system.onrender.com/api/support-tickets/resolve/${ticket._id}`;

  const updateTicket = async (api) => {
    try {
      let res = await fetch(api, {
        method: "PATCH",
      });
      if (res.status == 200) {
        alert("Ticket Updated Successfully");
        fetchApi();
        return;
      } else {
        alert(await res.json().message);
      }
    } catch (err) {
      alert("Something went wrong");
    }
  };

  const getBtn = () => {
    if (status == "New") {
      return (
        <button className={styles.btn} onClick={() => updateTicket(assignApi)}>
          Assign
        </button>
      );
    } else if (status == "Assigned") {
      return (
        <button className={styles.btn} onClick={() => updateTicket(resolveApi)}>
          Resolve
        </button>
      );
    } else return null;
  };
  return (
    <div className={styles.card}>
      <p className={styles.topic}>Topic:{topic}</p>
      <p className={styles.nonTopic}>Severity:{severity}</p>
      {!!type && <p className={styles.nonTopic}>Type:{type}</p>}
      {!!description && (
        <p className={styles.nonTopic}>Description:{description}</p>
      )}
      <div className={styles.btnWrapper}>
        <p className={styles.nonTopic}>Status:{status}</p>
        {getBtn()}
      </div>
    </div>
  );
};

export default Card;
