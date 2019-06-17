import { src, dest } from "gulp";
import { readFileSync } from "graceful-fs";

export const copyImage = () => {
	return src("./src/img/**/**.{svg,png,jpg,speg,gif}")
		.pipe(dest("dist/img"))
}

export const copyFonts = () => {
	return src([
		"src/fonts/**.{eot,ttf,svg,woff,woff2}"
	], {
			allowEmpty: true
		})
		.pipe(dest("dist/fonts"));
}

export const copyFavicon = () => {
	return src("src/favicon.ico", {
		allowEmpty: true
	})
		.pipe(dest("dist"));
}

module.exports = {
	copyFonts,
	copyImage,
	copyFavicon
};