const {
  userProjects,
  projects,
  users
} = require("../prisma/client");

module.exports = {
  assignUser: async (req, res) => {
    const {
      projectId
    } = req.params;
    const {
      userId
    } = req.body; // If there are multiple users to assign, this will be handled on front end
    // const client = await pool.connect();

    try {

      const row = await userProjects.create({
        data: {
          userId,
          projectId
        }
      })
      console.log("Added user", userId, "to project", projectId)
      return res
        .status(201)
        .json({
          msg: `Assigned user to project succesfully`
        });
    } catch (err) {
      console.log("assignUsers query error: ", err);
      return res
        .status(400)
        .json({
          msg: "Please review user project assign creation query"
        });
    }
  },
  removeAllUsers: async (req, res) => {
    const {
      projectId
    } = req.params;
    const client = await pool.connect();

    try {
      await client.query("DELETE FROM user_projects WHERE project_id = $1", [
        projectId,
      ]);

      res.status(202).json(`Project users deleted`);
    } catch (err) {
      console.log("getProject query error: ", err);
      res
        .status(500)
        .json({
          msg: "Unable to remove user_project from database"
        });
    }
  },
  removeUser: async (req, res) => {
    const {
      projectId,
      userId
    } = req.params;
    console.log(projectId, userId)
    try {
      const {
        id
      } = await userProjects.findFirst({
        where: {
          projectId,
          userId
        }
      })
      console.log(id)
      const row = await userProjects.delete({
        where: {
          id
        }
      })

      res.status(202).json(`User removed from project`);
    } catch (err) {
      console.log("getProject query error: ", err);
      res.status(500)
        .json({
          msg: "Unable to remove user_project from database"
        });
    }
  },
  getProjectUsers: async (req, res) => {
    const {
      projectId
    } = req.params;

    try {

      const rows = await userProjects.findMany({
        where: {
          projectId
        },
        select:{
          User:true 
        }
      })
      const users = rows.map((row) => row.User)

      res.json(users);
    } catch (err) {
      console.log("getProjectUsers query error: ", err);
      res.status(400).json({
        msg: "Please review query"
      });
    } 
  },
};