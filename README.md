# Space Shooter

[Tutorial: Building a polished HTML5 space shooter game with Phaser.js](http://jschomay.tumblr.com/post/103568304133/tutorial-building-a-polished-html5-space-shooter)

The code of this project is not the same as the tutorial. Instead, I'm using ecmascript6 via [Google's Traceur](https://github.com/google/traceur-compiler) and [Slush](http://slushjs.github.io), a scaffolding tool for javascript projects.

Special thanks to [Jeff Schomay](http://jeffschomay.com/) who made available this awesome tutorial.

## Pre-requesits

You will need to have [node][node] and [gulp][gulp] setup on your machine.

## Getting started

To package all source files and run on a local server simply run the following command:

```sh
$ gulp
```

This should open a browser window with the game running locally. You can copy the address and paste it into any browser on your local network (including mobiles and tablets).

## Scaffold
* design (game design document goes here)
* media (folder for your assets source...)
* gulp (gulp tasks folder)
* project (contains scripts, stylesheets and index.html)
* static/assets
    - images
    - music
    - sound

## Editing

When editing, make sure you update the files within the `project` directory. These files will then be compressed and added to the `dist` directory ready for publishing.

ECMAScript 6 features are supported with help of [Traceur][Traceur]. This means you can write code with syntax which is going to be supported officially by Phaser 3.

Happy building games!

[node]:       http://nodejs.org/
[gulp]:       http://gulpjs.com/
[Traceur]:    https://github.com/google/traceur-compiler
