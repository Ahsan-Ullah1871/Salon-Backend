import config from "./config/index";
import salon_app from "./salon_app";

// getting-started.js
import { Server } from "http";

process.on("uncaughtException", (error) => {
	process.exit(1);
});

let server: Server;

async function main() {
	try {
		server = salon_app.listen(config.port, () => {
			console.log("Connected");
			console.log(
				`Application  listening on port ${config.port}`
			);
		});
	} catch (error) {
		console.log("Failed to connect database", error);
	}

	process.on("unhandledRejection", (err) => {
		if (server) {
			server.close(() => {
				console.log(err);
				process.exit(1);
			});
		} else {
			process.exit(1);
		}
	});
}

main();

