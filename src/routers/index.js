import { Router } from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import fetchPrice from "../helpers/goldPrice.js";

const router = Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let cachedPrice = null;
let cachedTime = 0;

router.get("/api/rings", async (req, res) => {
	const rings = JSON.parse(
		fs.readFileSync(path.join(__dirname, "../../data/rings.json"), "utf-8")
	);
	if (!rings) {
		return res.status(404).json({ message: "No rings found" });
	} else {
		if (Date.now() - cachedTime > 300000 || cachedPrice === null) {
			const priceTime = await fetchPrice();
			cachedPrice = priceTime.price;
			cachedTime = Date.now();
		}
		let pricedRings = rings.map((ring) => {
			ring.price = (ring.popularityScore + 1) * ring.weight * cachedPrice;
			return ring;
		});
		res.status(200).json(pricedRings);
	}
});

export default router;
