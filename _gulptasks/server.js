import { watch, series } from "gulp"
import bSync from "browser-sync";

import { jsTask } from "./script"
import { pugTask } from "./html";
import { sassTask, oldCssTask } from "./css"

export const server = () => {
	bSync.init({
		notify: true,
		server: {
			baseDir: "dist",
		},
		port: 8000
	})

	watch([
		"src/components/**/**.sass"
	], series(sassTask));

	watch([
		"src/pages/**.pug"
	], series(pugTask));

	watch([
		"src/js/**.js"
	], series(jsTask));

	watch([
		"oldcss/**/**.css"
	], series(oldCssTask));

	watch([
		"dist"
	]).on("change", bSync.reload);
}

module.exports = server;