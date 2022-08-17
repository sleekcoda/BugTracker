const {
  userTickets,
  tickets
} = require("../prisma/client");

module.exports = {
  createTicket: async (req, res) => {
    const {
      projectId
    } = req.params;
    const authorId = req.user;
    console.log("authorId", authorId)
    const {
      title,
      description,
      priority,
      type,
      status,
      timeEstimate
    } =
    req.body;

    try {
      const rows = await tickets.create({
        data: {
          title,
          description, 
          projectId,
          priority,
          type,
          status,
          timeEstimate: Number.parseInt(timeEstimate),
          authorId
        },
      })

      res.json(rows);
    } catch (err) {
      console.log(`Failed to create ticket for ${title}: `, "\n", err);
      res.status(500).json({
        msg: `Please review query`
      });
    }
  },


  getAllTickets: async (req, res) => {

    try {
      const rows = await tickets.findMany({
        include:{
          Project:{
            select:{
              name: true
            }
          }
        } 
      })
      const result = rows.map(row => {
        return {...row,projectName: `${row.Project.name}`}
      });

      res.json(result);
    } catch (err) {
      console.log("Error fetching user tickets", err);
    }
  },
  getProjectTickets: async (req, res) => {
    const {
      projectId
    } = req.params;

    try {
      const rows = await tickets.findMany({
        where: {
          projectId
        },
        include: {
          Author: {
            select: {
              firstName: true,
              lastName: true
            }
          }
        }
      })
      const data = rows.map(row => {
        return {
          ...row,
          authorName: `${row.Author.firstName} ${row.Author.lastName}`
        }
      })
      res.json(data);
    } catch (err) {
      console.log(
        `Failed to get tickets for project ${projectId}: `,
        "\n",
        err
      );
      res.status(500).json({
        msg: `Please review query`
      });
    }
  },
  getUserTickets: async (req, res) => {
    const userId = req.user;

    try {
      const rows = await tickets.findMany({
        where: {
          TicketAssignees: {
            every: {
              userId
            },
          }
        }
      })

      res.json(rows);
    } catch (err) {
      console.log("Error fetching user tickets", err);
    }
  },
  updateTicket: async (req, res) => {
    const {
      ticketId
    } = req.params;
    const {
      title,
      description,
      authorId,
      assignedAuthorId,
      priority,
      type,
      status,
      timeEstimate,
    } = req.body;
    const client = await pool.connect();

    try {
      await client.query(
        "UPDATE tickets SET (title, description, priority, type, status, time_estimate) = ($1, $2, $3, $4, $5, $6) WHERE id = $7",
        [title, description, priority, type, status, timeEstimate, ticketId]
      );

      res.status(201).json({
        msg: `Ticket ${ticketId} updated successfully`
      });
    } catch (err) {
      console.log(`Failed to update ticket: `, "\n", err);
      res.status(500).json({
        msg: `Please review query`
      });
    }
  },
  deleteTicket: async (req, res) => {
    const {
      ticketId
    } = req.params;

    try {
      const deleted = await tickets.delete({
        where: {
          id: Number.parseInt(ticketId)
        }
      })
      console.log('deleted', deleted);

      res.status(200).json({
        msg: `Ticket ${ticketId} deleted`
      });

    } catch (err) {
      console.log("Failed to delete ticket: ", "\n", err);
      res.status(500).json({
        msg: "Review deletion query"
      });
    }
  },
  getTicket: async (req, res) => {
    const {
      ticketId
    } = req.params;

    try {
      const row = tickets.findFirst({
        where: {
          ticketId
        }
      })

      res.json(row);
    } catch (err) {
      console.log(`Failed to get ticket for`, "\n", err);
      res.status(500).json({
        msg: `Please review query`
      });
    }
  }
};