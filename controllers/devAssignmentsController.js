const {
  users,
  ticketAssignee
} = require("../prisma/client");

module.exports = {
  assignDev: async (req, res) => {
    const {
      ticketId
    } = req.params;
    const {
      userId
    } = req.body; // If there are multiple users to assign, this will be handled on front end

    try {
      await ticketAssignee.create({
        data: {
          ticketId,
          userId
        }
      })
      res
        .status(201)
        .json({
          msg: `User ${devId} assigned to ${ticketId} succesfully`
        });
    } catch (err) {
      console.log("assignUsers query error: ", err);
      res
        .status(400)
        .json({
          msg: "Please review user project assign creation query"
        });
    }
  },

  removeDev: async (req, res) => {
    const {
      userId
    } = req.body;
    const {
      ticketId
    } = req.params;

    try {
      const {
        id
      } = await ticketAssignee.findFirst({
        where: {
          ticketId,
          userId
        }
      })
      const deleted = await ticketAssignee.delete({
        where: {
          id
        }
      })

      res.json(`User removed from ticket`); 
    } catch (err) {
      console.log("getProject query error: ", err);
      res
        .status(500)
        .json({
          msg: "Unable to remove dev assignment from database"
        });
    }
  },
  getAssignedDevs: async (req, res) => {
    const {
      ticketId
    } = req.params;

    try {

      const rows = await users.findMany({
        where: {
          AssignedTickets: {
            every: {
              ticketId: Number.parseInt(ticketId)
            }
          }
        }
      })

      res.json(rows);
    } catch (err) {
      console.log("getProjectUsers query error: ", err);
      res.status(400).json({
        msg: "Please review query"
      });
    }
  },
  removeAllDevs: async (req, res) => {
    const {
      ticketId
    } = req.params;

    try {
      await userTickets.delete({
        where: {
          ticketId
        }
      })

      res.status(204).json({
        msg: "All devs removed from ticket"
      });
    } catch (err) {
      console.error(err.message);
      res.status(500);
    }
  },
};