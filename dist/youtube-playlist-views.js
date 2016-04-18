'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

var _requestPromise = require('request-promise');

var _requestPromise2 = _interopRequireDefault(_requestPromise);

var _cheerio = require('cheerio');

var _cheerio2 = _interopRequireDefault(_cheerio);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getViewsText(pid) {
  var selector, options, findViewsText, $, selText;
  return _regenerator2.default.async(function getViewsText$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          selector = '#pl-header .pl-header-details li';
          options = {
            uri: 'https://www.youtube.com/playlist',
            headers: { 'accept-language': 'en' },
            qs: { list: pid },
            transform: function transform(body) {
              return _cheerio2.default.load(body);
            }
          };
          findViewsText = _ramda2.default.find(_ramda2.default.pipe(_ramda2.default.match(/views/), _ramda2.default.complement(_ramda2.default.isEmpty)));
          _context.next = 5;
          return _regenerator2.default.awrap((0, _requestPromise2.default)(options));

        case 5:
          $ = _context.sent;
          selText = $(selector).map(function (key, val) {
            return $(val).text();
          }).get();

          if (!_ramda2.default.isEmpty(selText)) {
            _context.next = 9;
            break;
          }

          throw new Error('playlist is not suitable');

        case 9:
          return _context.abrupt('return', findViewsText(selText));

        case 10:
        case 'end':
          return _context.stop();
      }
    }
  }, null, this);
}

function viewsTextToNum(text) {
  var numPart = _ramda2.default.pipe(_ramda2.default.trim, _ramda2.default.split(' '), _ramda2.default.head);
  var ifEmptyToBeZero = _ramda2.default.when(_ramda2.default.equals('No'), _ramda2.default.always('0'));
  var toNumber = _ramda2.default.pipe(_ramda2.default.replace(/,/g, ''), parseInt);

  return _ramda2.default.pipe(numPart, ifEmptyToBeZero, toNumber)(text);
}

var vseeker = {
  gotcha: function gotcha(pid) {
    var viewsText;
    return _regenerator2.default.async(function gotcha$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _regenerator2.default.awrap(getViewsText(pid));

          case 2:
            viewsText = _context2.sent;
            return _context2.abrupt('return', viewsTextToNum(viewsText));

          case 4:
          case 'end':
            return _context2.stop();
        }
      }
    }, null, this);
  },

  getViewsText: getViewsText,
  viewsTextToNum: viewsTextToNum
};

exports.default = vseeker;