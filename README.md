# Personal Gulp pack
With the help of these files, you can quickly set up the build of your Gulp project.


## Directory structure for file placement:
> ./src/fonts/\*\*/\*.{ttf, woff, woff2, **etc**}           - for fonts, obviously...  
> ./src/images/\*\*/\*.{jpg, png, svg, gif, webp, **etc**}  - for images, obviously...   
> ./src/js/\*\*/\*.js                                       - for JS src files.  
> ./src/pages/\*\*/\*.pug                                   - for PUG src files.  
> ./src/scss/\*\*/\*.scss                                   - for SCSS src files.  
> ./src/templates/\*\*/\*.html                              - HTML files for Panini builder.  
> .browserslistrc                                           - Instruction for autoprefixer.  
> .gitignore                                                - You can delete that file.  
> .htmlhintrc                                               - You can enable/disable the VSCode hints in this file.  
> gulpfile.js                                               - main file for configure tasks. **DO NOT REMOVE!**  
> package.json                                              - main file for Node Package Manager **DO NOT REMOVE!**   
> README.md                                                 - You are reading that file right now.  


## Usage:
1. Download that package or cloning the repository in your project directory.
`git clone https://github.com/TaniIlves/GulpPack.git`
2. Enter the command in your terminal: `npm i` (node.js must be installed)
3. Run the command: `gulp` (run *default* task)
4. **Have fun!**



## Installed NPM packages:

### Base packages
[gulp](https://www.npmjs.com/package/gulp) *Version 4.0.2* - Toolkit that helps you automate painful or time-consuming tasks in your development workflow.  
[browser-sync](https://www.npmjs.com/package/browser-sync) *Version 2.29.1* - Keep multiple browsers & devices in sync when building websites.  


### Preprocessors
[gulp-pug](https://www.npmjs.com/package/gulp-pug) *Version 5.0.0* - *Gulp* plugin for compiling Pug templates.  
[sass](https://www.npmjs.com/package/sass) *Version 1.62.1* - This package is a distribution of *Dart Sass*, compiled to pure *JavaScript* with no native code or external dependencies.  
[gulp-sass](https://www.npmjs.com/package/gulp-sass) *Version 5.1.0* - Sass plugin for *Gulp*.  


### Utilities
[del](https://www.npmjs.com/package/del) *Version 6.0.0* - Delete files and directories.  
[file-exists](https://www.npmjs.com/package/file-exists) *Version 5.0.1* - Check if filepath exists and is a file. Returns false for directories.  
[gulp-rename](https://www.npmjs.com/package/gulp-rename) *Version 2.0.0* - *Gulp* plugin to rename files easily.  
[gulp-plumber](https://www.npmjs.com/package/gulp-plumber) *Version 1.2.1* - This plugin is fixing issue with *Node Streams* piping.  


### Image processors
[gulp-avif](https://www.npmjs.com/package/gulp-avif) *Version 1.1.1* - This is gulp plugin for convertation *PNG* and *JPG* images to *AVIF*.  
[gulp-imagemin](https://www.npmjs.com/package/gulp-imagemin) *Version 7.1.0* - Minify *PNG*, *JPEG*, *GIF* and *SVG* images.  
[gulp-svg-sprite](https://www.npmjs.com/package/gulp-svg-sprite) *Version 2.0.3* - *Gulp* plugin wrapping around svg-sprite which takes a bunch of *SVG* files, optimizes them and bakes them into *SVG* sprites of several types.  
[gulp-webp](https://www.npmjs.com/package/gulp-webp) *Version 4.0.1* - Convert *PNG*, *JPEG*, *TIFF*, *WebP* images to *WebP*.  


### Fonts processors
[gulp-fonter](https://www.npmjs.com/package/gulp-fonter) *Version 0.3.0* - Font subsetting and converting plugin for *Gulp*.  
[gulp-ttf2woff](https://www.npmjs.com/package/gulp-ttf2woff) *Version 1.1.1* - Create a *WOFF* font from a *TTF* one with *Gulp*.  
[gulp-ttf2woff2](https://www.npmjs.com/package/gulp-ttf2woff2) *Version 4.0.1* - Create a *WOFF2* font from a *TTF* one with *Gulp*.  


### Code minimizers and optimizers
[gulp-postcss](https://www.npmjs.com/package/gulp-postcss) *Version 9.0.1* - plugin to pipe *CSS* through several plugins, but parse *CSS* only once.  
[autoprefixer](https://www.npmjs.com/package/autoprefixer) *Version 10.4.14* - Plugin to parse *CSS* and add vendor prefixes to *CSS* rules.  
[gulp-sourcemaps](https://www.npmjs.com/package/gulp-sourcemaps) *Version 3.0.0* - Sourcemap support for gulpjs.  
[gulp-strip-css-comments](https://www.npmjs.com/package/gulp-strip-css-comments) *Version 2.0.0* - Strip comments from *CSS*.  
[gulp-cssbeautify](https://www.npmjs.com/package/gulp-cssbeautify) *Version 3.0.1* - That plugin automatically formats your style to be consistent and easy to read.  
[gulp-cssnano](https://www.npmjs.com/package/gulp-cssnano) *Version 2.1.3* - Minify your *CSS* for increase page loading speed.  
[gulp-terser](https://www.npmjs.com/package/gulp-terser) *Version 2.1.0* - Minify your *JS* for more speed.  


### Other packages
[gulp-newer](https://www.npmjs.com/package/gulp-newer) *Version 1.4.0* - A *Gulp* plugin for passing through only those source files that are newer than corresponding destination files.  
[gulp-notify](https://www.npmjs.com/package/gulp-notify) *Version 4.0.0* - Notification plugin for *Gulp*.  
[gulp-rigger](https://www.npmjs.com/package/gulp-rigger) *Version 0.5.8* - *Rigger* is a build time include engine for *Javascript*, *CSS*, *CoffeeScript* and in general any type of text file that you wish to might want to 'include' other files into.  
[panini](https://www.npmjs.com/package/panini) *Version 1.7.2* - A super simple flat file generator for use with *Gulp*.  
