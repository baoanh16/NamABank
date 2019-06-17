import { src, dest } from "gulp";
import sass from "gulp-sass";
import concat from "gulp-concat";
import sourcemap from "gulp-sourcemaps";
import cssnano from "cssnano";
import postcss from "gulp-postcss";
import cssSort from "css-declaration-sorter";
import autoprefixer from "autoprefixer";

export const sassTask = () => {
	return src([
		"src/components/_core/**.sass",
		"src/components/_global/**.sass",
		"src/components/**/**.sass",
	])
		.pipe(sourcemap.init())
		.pipe(concat("main2.min.sass"))
		.pipe(sass().on("error", sass.logError))
		.pipe(postcss([
			autoprefixer({
				browsers: ["last 4 version", "IE 9"],
				cascade: false
			}),
			cssnano(),
			cssSort({
				order: "concentric-css",
			})
		]))
		.pipe(sourcemap.write("."))
		.pipe(dest("dist/css"))
};


export const oldCssTask = function () {
	return src([
		"oldcss/fonts.css",
		"oldcss/toolbar.css",
		"oldcss/header.min.css",
		"oldcss/footer.min.css",
		"oldcss/homepage/index.css",
		"oldcss/main.min.css",
		"oldcss/custom.huy.css",
		"src/plugins/jquery-ui-1.12.1.custom/jquery-ui.min.css"
	])
		.pipe(sourcemap.init())
		.pipe(concat("main.min.css"))
		.pipe(postcss([
			autoprefixer({
				browsers: ["last 4 version", "IE 9"],
				cascade: false
			}),
			cssnano(),
			cssSort({
				order: "concentric-css",
			})
		]))
		.pipe(sourcemap.write("."))
		.pipe(dest("dist/css"))
}
module.exports = { sassTask, oldCssTask };