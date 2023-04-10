import { app } from "./app";

const port = process.env.APP_PORT;

const server = app.listen(port, (): void => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});

export default server;
