const express = require("express");
const { ticketModel } = require("../models/ticket.model");
const { agentModel } = require("../models/agent.model");

const ticketRouter = express.Router();

ticketRouter.post("/api/support-tickets", async (req, res) => {
  try {
    const ticket = ticketModel(req.body);
    await ticket.save();
    res.json({ data: ticket });
  } catch (err) {
    res.status(500).json({
      error: "Internal Server Error",
    });
  }
});

ticketRouter.get("/api/support-tickets", async (req, res) => {
  let { type, status, severity, assignedTo, page, limit, sortVal } = req.query;
  let queryObj = {};
  if (type) {
    queryObj = { ...queryObj, type };
  }
  if (status) {
    queryObj = { ...queryObj, status };
  }
  if (severity) {
    queryObj = { ...queryObj, severity };
  }
  if (!limit) {
    limit = 5;
  }
  if (!page) {
    page = 1;
  }
  if (!sortVal) {
    sortVal = "dateCreated";
  }
  let populateQuery = { path: "assignedTo" };
  if (assignedTo) {
    populateQuery = { ...populateQuery, match: { name: assignedTo } };
  }
  try {
    let count = await ticketModel
      .find(queryObj)
      .populate(populateQuery)
      .countDocuments();
    let tickets = await ticketModel
      .find(queryObj)
      .limit(limit)
      .skip((page - 1) * limit)
      .sort(sortVal)
      .populate(populateQuery);
    res.json({
      total: count,
      data: tickets,
    });
  } catch (err) {
    res.status(500).json({
      error: "Internal Server Error",
    });
  }
});

ticketRouter.patch("/api/support-tickets/assign/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const agents = await agentModel.find({ active: false }).sort("dateCreated");
    if (agents.length == 0) {
      res.status(401).json({
        message: "No active agent try after sometime",
      });
      return;
    }

    let agent = await agentModel.findOneAndUpdate(
      { _id: agents[0]._id },
      { $set: { active: true } }
    );

    let ticket = await ticketModel.findOneAndUpdate(
      { _id: id },
      { $set: { assignedTo: agents[0]._id, status: "Assigned" } },
      { new: true }
    );

    res.json({
      ticket: ticket,
    });
  } catch (err) {
    res.status(500).json({
      error: "Internal Server Error",
    });
  }
});

ticketRouter.patch("/api/support-tickets/resolve/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const tickets = await ticketModel.find({ _id: id });
    const date = Date.now();

    const agent = await agentModel.findOneAndUpdate(
      { _id: tickets[0].assignedTo },
      { $set: { active: false, dateCreated: date } }
    );
    console.log(agent);

    const ticketUpdated = await ticketModel.findOneAndUpdate(
      { _id: id },
      { $set: { status: "Resolved", resolvedOn: date } },
      { new: true }
    );

    res.json({
      ticket: ticketUpdated,
    });
  } catch (err) {
    res.status(500).json({
      error: "Internal Server Error",
    });
  }
});

module.exports = ticketRouter;
