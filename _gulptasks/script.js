import { src, dest } from "gulp";

export const jsTask = () => {
	return src(["src/js/*.js"])
		.pipe(dest("dist/js"))
}

module.exports = { jsTask };