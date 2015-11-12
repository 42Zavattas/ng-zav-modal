# ngZavModal [![Build Status](https://travis-ci.org/42Zavattas/ng-zav-modal.svg?branch=develop)](https://travis-ci.org/42Zavattas/ng-zav-modal) [![Coverage Status](https://coveralls.io/repos/42Zavattas/ng-zav-modal/badge.svg?branch=master)](https://coveralls.io/r/42Zavattas/ng-zav-modal?branch=master) [![Code Climate](https://codeclimate.com/github/42Zavattas/ng-zav-modal/badges/gpa.svg)](https://codeclimate.com/github/42Zavattas/ng-zav-modal)

## Install

```
bower install ng-zav-modal --save
```

Insert css file:

```html
<link rel="stylesheet" href="bower_components/ng-zav-modal/dist/ng-zav-modal.min.css">
```

Insert js files:

```html
<script src="bower_components/jquery/dist/jquery.js"></script>
<script src="bower_components/gsap/src/uncompressed/TweenMax.js"></script>
<script src="bower_components/ng-zav-modal/dist/ng-zav-modal.min.js"></script>
```

Enable angular module:

```javascript
angular.module('myApp', ['ngZavModal']);
```

## Usage

```html
<zav-modal trigger="openModal">
  I'm the content.
</zav-modal>

<button ng-click="openModal = true">
  Open modal
</button>
```
