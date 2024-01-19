const express = require("express");
const { agentModel } = require("../models/agent.model");

const agentRouter = express.Router();

agentRouter.post("/api/support-agents", async (req, res) => {
  const { name, email, phone, description } = req.body;
  try {
    const emailExist = await agentModel.findOne({ email });

    if (emailExist) {
      res.status(401).json({
        message: "Agent with email already exists",
      });
      return;
    }
    const agent = {
      name,
      email,
      description,
      phone,
    };

    const agentSaved = agentModel(agent);
    await agentSaved.save();

    res.json({
      data: agentSaved,
    });
  } catch (err) {
    res.status(500).json({
      error: "Internal Server Error",
    });
  }
});

module.exports = agentRouter;
