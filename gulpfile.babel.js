import { series } from "gulp";

// Import tasks
import server from "./_gulptasks/server";
import cssCore from "./_gulptasks/core-css";
import { copyFonts } from "./_gulptasks/copy";
import { cleanDist } from "./_gulptasks/clean";
import { sassTask, oldCssTask } from "./_gulptasks/css";
import { pugTask } from "./_gulptasks/html";
import { jsTask } from "./_gulptasks/script";

exports.default = series(
	cleanDist,
	copyFonts,
	cssCore,
	oldCssTask,
	sassTask,
	jsTask,
	pugTask,
	server,
)