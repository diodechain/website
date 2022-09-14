
# Diode Setup:
## System Preparation
1. Follow guides [here](http://jekyllrb.com/docs/installation/) to install ruby for your OS
2. Install Jekyll & Bundler: `gem install jekyll bundler`
   then `bundle install`
4. Install NodeJS from [http://nodejs.org](http://nodejs.org)
5. Install GulpJS: `npm install -g gulp` (mac may need sudo)


## Local Dev Environment

1. Inside the parent directory: `npm install`.
2. To build: `jekyll build`
3. To serve to localhost:4000: `jekyll serve --livereload`

Note: If step 2 or 3 fails, prepending `bundle exec` to the commands may solve the issue.

<br>
<hr>
<br>

# Original ReadMe:

```
=================================================
=====     jekyll-gulp-sass-browser-sync     =====
=================================================
```
A project including full setup for Jekyll, GulpJS, SASS, AutoPrefixer &amp; BrowserSync

## System Preparation

To use this project, you'll need the following things installed on your machine.

1. Ruby (v2.5.1p57)
2. [Jekyll](http://jekyllrb.com/) - `$ gem install jekyll`
3. [Jekyll-Archives](http://jekyllrb.com) - `$ bundle install`
4. [NodeJS](http://nodejs.org) - use the installer (v6.5.0).
5. [GulpJS](https://github.com/gulpjs/gulp) - `$ npm install -g gulp` (mac users may need sudo)

## Local Installation

1. Inside the directory, run `npm install`.
2. Enjoy

## Usage

**local development mode**

This will give you file watching, browser synchronisation, auto-rebuild, CSS injecting etc etc.

```shell
$ ./run
```

**seeing drafts**

```shell
$ ./run --drafts
```

