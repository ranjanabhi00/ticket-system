import { Routes, Route } from "react-router-dom";
import Agent from "../components/agent";
import Ticket from "../components/ticket";

const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Agent />} />
      <Route path="/tickets" element={<Ticket />} />
    </Routes>
  );
};

export default Routers;
