import fs from "fs";
import gulp from "gulp";
import imagemin from "gulp-imagemin";
import newer from "gulp-newer";
import svgSprite from "gulp-svg-sprite";
import fonter from "gulp-fonter-fix";
import ttf2woff2 from "gulp-ttf2woff2";
import { deleteAsync } from "del";

const pathSource = "./src";
const pathBuild = "./dist";

const settings = {
  icons: {
    src: `${pathSource}/icons/*.svg`,
    build: `${pathBuild}/icons/`,
  },
  images: {
    svg: `${pathSource}/images/**/*.svg`,
    src: `${pathSource}/images/**/*.{jpg,jpeg,png,gif,webp}`,
    build: `${pathBuild}/images/`,
  },
  fonts: {
    src: `${pathSource}/fonts/`,
    build: `${pathBuild}/fonts/`,
  },
};

const imageMinimize = () => {
  return gulp
    .src(settings.images.src)
    .pipe(newer(settings.images.build))
    .pipe(
      imagemin({
        progressive: true,
        svgoPlugins: [{ removeViewBox: false }],
        interlaced: true,
        optimizationLevel: 3, // 0 to 7
      })
    )
    .pipe(gulp.dest(settings.images.build))
    .pipe(gulp.src(settings.images.svg))
    .pipe(gulp.dest(settings.images.build));
};

const otfToTtf = () => {
  return gulp
    .src(`${settings.fonts.src}*.otf`, {})
    .pipe(fonter({ formats: ["ttf"] }))
    .pipe(gulp.dest(settings.fonts.src));
};

const ttfToWoff = () => {
  return gulp
    .src(`${settings.fonts.src}*.ttf`, {})
    .pipe(fonter({ formats: ["woff"] }))
    .pipe(gulp.dest(`${settings.fonts.build}`))
    .pipe(gulp.src(`${settings.fonts.src}*.ttf`))
    .pipe(ttf2woff2())
    .pipe(gulp.dest(settings.fonts.build))
    .pipe(gulp.src(`${settings.fonts.src}*.{woff,woff2}`))
    .pipe(gulp.dest(settings.fonts.build));
};

const fontsStyle = () => {
  let fontsFile = `${settings.fonts.build}/fonts.scss`;
  fs.unlink(fontsFile, () => {});
  fs.readdir(settings.fonts.build, function (err, fontsFiles) {
    if (fontsFiles) {
      if (!fs.existsSync(fontsFile)) {
        fs.writeFile(fontsFile, "", () => {});
        let newFileOnly;
        for (var i = 0; i < fontsFiles.length; i++) {
          let fontFileName = fontsFiles[i].split(".")[0];
          if (newFileOnly !== fontFileName) {
            let fontName = fontFileName.split("-")[0]
              ? fontFileName.split("-")[0]
              : fontFileName;
            let fontWeight = fontFileName.split("-")[1]
              ? fontFileName.split("-")[1]
              : fontFileName;
            if (fontWeight.toLowerCase() === "thin") {
              fontWeight = 100;
            } else if (fontWeight.toLowerCase() === "extralight") {
              fontWeight = 200;
            } else if (fontWeight.toLowerCase() === "light") {
              fontWeight = 300;
            } else if (fontWeight.toLowerCase() === "medium") {
              fontWeight = 500;
            } else if (fontWeight.toLowerCase() === "semibold") {
              fontWeight = 600;
            } else if (fontWeight.toLowerCase() === "bold") {
              fontWeight = 700;
            } else if (
              fontWeight.toLowerCase() === "extrabold" ||
              fontWeight.toLowerCase() === "heavy"
            ) {
              fontWeight = 800;
            } else if (fontWeight.toLowerCase() === "black") {
              fontWeight = 900;
            } else {
              fontWeight = 400;
            }
            fs.appendFile(
              fontsFile,
              `@font-face {\n\tfont-family: ${fontName};\n\tfont-display: swap;\n\tsrc: url("../fonts/${fontFileName}.woff2") format("woff2"), url("../fonts/${fontFileName}.woff") format("woff");\n\tfont-weight: ${fontWeight};\n\tfont-style: normal;\n}\r\n`,
              () => {}
            );
            newFileOnly = fontFileName;
          }
        }
      }
    } else {
      fs.unlink(fontsFile, () => {});
    }
  });
  return gulp.src(pathSource);
};

const sprite = () => {
  return gulp
    .src(settings.icons.src, {})
    .pipe(
      svgSprite({
        mode: {
          symbol: { sprite: "../../dist/sprite.svg" },
        },
        shape: {
          id: {
            separator: "",
            generator: "icon-",
          },
        },
        svg: {
          rootAttributes: {
            style: "display: none;",
            "aria-hidden": true,
          },
          xmlDeclaration: false,
        },
      })
    )
    .pipe(gulp.dest(pathSource));
};

const resetFonts = () => deleteAsync(settings.fonts.build);
const resetImages = () => deleteAsync(settings.images.build);
const resetIcons = () => deleteAsync(settings.icons.build);

const fonts = gulp.series(resetFonts, otfToTtf, ttfToWoff, fontsStyle);
const images = gulp.series(resetImages, imageMinimize);
const icons = gulp.series(resetIcons, sprite);

export { fonts, images, icons };
