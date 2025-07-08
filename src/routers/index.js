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
	try {
		const { popularityScore, priceMin, priceMax } = req.query;

		const rings = JSON.parse(
			fs.readFileSync(
				path.join(__dirname, "../../data/rings.json"),
				"utf-8"
			)
		);

		if (!rings) {
			return res.status(404).json({ message: "No rings found" });
		}

		if (Date.now() - cachedTime > 300000 || cachedPrice === null) {
			const priceTime = await fetchPrice();
			cachedPrice = priceTime.price;
			cachedTime = Date.now();
		}

		let pricedRings = rings.map((ring) => {
			ring.price = (ring.popularityScore + 1) * ring.weight * cachedPrice;
			return ring;
		});

		let filteredRings = pricedRings;

		if (popularityScore && parseFloat(popularityScore) > 0) {
			filteredRings = filteredRings.filter(
				(ring) => ring.popularityScore >= parseFloat(popularityScore)
			);
		}

		if (priceMin && parseFloat(priceMin) > 0) {
			filteredRings = filteredRings.filter(
				(ring) => ring.price >= parseFloat(priceMin)
			);
		}

		if (priceMax && parseFloat(priceMax) < 10000) {
			filteredRings = filteredRings.filter(
				(ring) => ring.price <= parseFloat(priceMax)
			);
		}

		res.status(200).json(filteredRings);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

export default router;
