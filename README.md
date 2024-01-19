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
- Clone the repo
- Go to backend folder
- npm install
- Create mongodb connection url 
- Create .env file and add key MONGODB_URI:<mongodburl> and PORT<port>
- npm start
- Go to frontend
- npm install
- npm start
- Can skip running backend server as backend deployed api's are there in frontend
- Or change the api in frontend as well while running backend locally


# List of api's
- https://ticket-assign-system.onrender.com/api/support-agents (post request to create agent)
- https://ticket-assign-system.onrender.com/api/support-tickets (post request to create ticket)
- https://ticket-assign-system.onrender.com/api/support-tickets (get request to get all tickets,query parameters like status,type,severity,page,limit,sortVal can be added as well)
- https://ticket-assign-system.onrender.com/api/support-tickets/assign/:id (patch request to assign ticket)
- https://ticket-assign-system.onrender.com/api/support-tickets/resolve/:id (patch request to resolve assigned ticket)