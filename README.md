# youtube-playlist-views

gotcha youtube playlist views

## Installation
```
$ npm install youtube-playlist-views --save
```

## Example

### ES5

```
var playlist = require('youtube-playlist-views');

playlist.views('PLAYLIST_ID').then(function (views) {
  var igotcha = views;
  console.log(igotcha);
});
```

### ES6

```
import playlist from 'youtube-playlist-views';

playlist.views('PLAYLIST_ID').then((views) => {
  const igotcha = views;
  console.log(igotcha);
});
```

[![Travis build status](http://img.shields.io/travis/jkiimm/youtube-playlist-views.svg?style=flat)](https://travis-ci.org/jkiimm/youtube-playlist-views)
[![Code Climate](https://codeclimate.com/github/jkiimm/youtube-playlist-views/badges/gpa.svg)](https://codeclimate.com/github/jkiimm/youtube-playlist-views)
[![Test Coverage](https://codeclimate.com/github/jkiimm/youtube-playlist-views/badges/coverage.svg)](https://codeclimate.com/github/jkiimm/youtube-playlist-views)
[![Dependency Status](https://david-dm.org/jkiimm/youtube-playlist-views.svg)](https://david-dm.org/jkiimm/youtube-playlist-views)
[![devDependency Status](https://david-dm.org/jkiimm/youtube-playlist-views/dev-status.svg)](https://david-dm.org/jkiimm/youtube-playlist-views#info=devDependencies)
