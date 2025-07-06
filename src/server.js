import express from "express";
import cors from "cors";
import router from "./routers/index.js";
import { configDotenv } from "dotenv";

configDotenv();

const PORT = process.env.PORT || 5173;
const app = express();

app.use(cors());
app.use(express.json());

export function setupServer() {
	app.get("/", (req, res) => {
		res.send("Welcome to the Renart Case API!");
	});
	app.use(router);
	app.use((req, res) => {
		res.status(404).send("Route Not Found");
	});
	app.listen(PORT, () => {
		console.log(`Server is running on http://localhost:${PORT}`);
	});
}
