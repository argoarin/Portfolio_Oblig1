import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { serveStatic } from "@hono/node-server/serve-static";
import { Project, ProjectSchema } from "./type";
import { z } from "zod";  // Import zod for schema validation

const app = new Hono();

const projects: Project[] = [];

app.use("/*", cors());

app.use("/statics/*", serveStatic({ root: "./" }));

app.get("/json", async (c) => {
  return c.json(projects);
});

app.post("/add", async (c) => {
  try {
    const newProject = await c.req.json();
    console.log("Received project data:", newProject);

    // Generate an ID for the new project
    const id = projects.length > 0 ? projects[projects.length - 1].id + 1 : 1;

    // Add the ID to the project object
    const projectWithId = { id, ...newProject };

    // Validate the project data against the schema
    const project = ProjectSchema.parse(projectWithId);

    // Add the project to the list
    projects.push(project);

    // Return the updated list of projects
    return c.json<Project[]>(projects, { status: 201 });
  } catch (error) {
    console.error("Error in /add route:", error);

    if (error instanceof z.ZodError) {
      return c.json({ error: "Validation failed", details: error.errors }, { status: 400 });
    }

    return c.json({ error: "Internal Server Error" }, { status: 500 });
  }
});

const port = 4001;

console.log(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port,
});
