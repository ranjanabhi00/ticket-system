# Ticket-Asigning-System

### A MERN stack application where we can create agents and tickets.Then tickets can be assigned to agents in round-robin pattern.if there are no available agents then we have to wiat till any agent is available.As soon as an agent resolves a ticket it will be in queue to take up the ticket.

# Features
 - Agent creation (We have to pass unique mail to create an agent)
 - Ticket creation (status:New)
 - Get all tickets 
 - Applying filtering,sorting and pagination
 - Assigning a ticket to a agent (status:Assigned)
 - Resolving an assigned ticket (status:Resolved)

# Steps to run locally
- clone the repo
- Go to backend folder
- npm install
- create mongodb connection url 
- create .env file and add key MONGODB_URI:<mongodburl> and PORT<port>
- npm start
- Go to frontend
- npm start