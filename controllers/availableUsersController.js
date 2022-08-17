const {
  userProjects,
  users
} = require("../prisma/client");

module.exports = {
  getAvailableUsers: async function (req, res) {

    const {
      projectId
    } = req.params;

    try {
      const rows = await users.findMany({
        select: {
          firstName: true,
          lastName: true,
          phone:true,
          id:true,
        },
        where:{
          UserProjects: {
            none:{projectId}
          } 
        } 
        
      })

      res.status(201).json(rows);
    } catch (err) {
      console.log(err);
      res.send(500).json({
        msg: "Failed to fetch available users"
      });
    }
  },
};