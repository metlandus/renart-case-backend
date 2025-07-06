async function fetchPrice() {
	try {
		const response = await fetch("https://www.goldapi.io/api/XAU/USD", {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				"x-access-token": process.env.GOLD_API_KEY,
			},
		});

		const data = await response.json();
		let priceInfo = {
			price: data.price_gram_24k,
			timestamp: data.timestamp,
		};
		return priceInfo;
	} catch (error) {
		console.log("error on fetching price");
	}
}

export default fetchPrice;
