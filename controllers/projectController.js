const {
  projects,
  query,
  userProjects
} = require("../prisma/client");

module.exports = {
  getAll: async (req, res) => {


    try {
      const rows = await projects.findMany({
        take: 10
      });
      res.json(rows);
    } catch (err) {
      console.log("getProject query error: ", err);
      res.status(500).json({
        msg: "Unable to get projects from database"
      });
    }
  },
  getProject: async (req, res) => {
    const {
      id
    } = req.params;

    try {
      const rows = await projects.findFirst({
        where: {
          id
        }
      })

      res.json(rows);
    } catch (e) {
      console.log("getProject query error: ", e);
      res.status(400).json({
        msg: "Unable to get project from database. Please review query",
      });
    }
  },
  createProject: async (req, res) => {
    const {
      name,
      description
    } = req.body;

    //May need some logic to ensure project doesn't already exist

    try {
      const rows = await projects.create({
        data: {
          name,
          description
        }
      });

      res.status(201).json(rows);
    } catch (err) {
      console.log("createProject query error: ", err);
      res.status(400).json({
        msg: "Please review project creation query"
      });
    }
  },
  deleteProject: async (req, res) => {
    const projectId = req.params.id;

    console.log(projectId);


    //Need to delete all rows in tables with foreign keys as well
    try {
      //initialize transaction
      const deleted = projects.delete({
        where: {
          id: projectId
        },
        include: {
          UserProjects: true,
        }
      });
      /*
            //delete dev_assignments, ticket history, comments from tickets
            Promise.all([
              await query(
                "DELETE FROM dev_assignments WHERE ticket_id IN (SELECT id FROM tickets WHERE project_id = $1)",
                [projectId]
              ),
              await query(
                "DELETE FROM ticket_history WHERE ticket_id IN (SELECT id FROM tickets WHERE project_id = $1)",
                [projectId]
              ),
              await query(
                "DELETE FROM comments WHERE ticket_id IN (SELECT id FROM tickets WHERE project_id = $1)",
                [projectId]
              ),
            ]);

            //delete tickets, user_projects from projects
            Promise.all([
              await query("DELETE FROM tickets WHERE project_id = $1", [
                projectId,
              ]),
              await query("DELETE FROM user_projects WHERE project_id = $1", [
                projectId,
              ]),
            ]);

            //delete project
            await query("DELETE FROM projects WHERE id = $1", [projectId]);

            */
      //if no errors, commit the transaction
      // await query("COMMIT");

      res.status(200).json({
        msg: `Project ${projectId} and associated tickets/team data succesfully deleted`,
      });
    } catch (err) {
      await query("ROLLBACK");
      console.log("deleteProject query error: ", err);
      res.status(500).json({
        msg: `Project deletion of ${projectId} failed`
      });
    } finally {
      await client.release();
    }
  },
  updateProject: async (req, res) => {
    const id = req.params.id;
    const {
      name,
      description
    } = req.body;



    try {
      const updateProject = await projects.update({
        where: {
          id
        },
        data: {
          name,
          description
        }
      })

      res.json(`Project: ${name} updated successfully`);
    } catch (e) {
      console.log("updateProject query error: ", e);
      res.status(400).json({
        msg: "Please review project update query"
      });
    } finally {
      await client.release();
    }
  },

  addUserToProject: async (req, res) => {
    const {
      projectId
    } = req.params;
    const userId = req.body.userId;

    try {
      const rows = await userProjects.create({
        userId,
        projectId
      })
      res.json(rows)
    } catch (err) {
      res.status(500).send({msg:"Review assign user to project query"})
    }
  }
};