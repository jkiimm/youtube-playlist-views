import 'should';
import nock from 'nock';
import playlist from '../../src/youtube-playlist-views';

describe('playlist', () => {
  before(() => nock.disableNetConnect());
  after(() => nock.enableNetConnect());

  it('should be able to be imported as same both of CommonJS and ES6', () => {
    const playlistCommonJS = require('../../src/youtube-playlist-views');
    Object.keys(playlist).forEach((key) => playlist[key].should.eql(playlistCommonJS[key]));
  });

  describe('getViewsText', () => {
    beforeEach(() => nock.cleanAll());
    afterEach(() => nock.cleanAll());

    it('should return text passed the selector', (done) => {
      const f = playlist.getViewsText;
      const scope = nock('https://www.youtube.com')
      .get('/playlist')
      .query({ list: 'accessible_normal' })
      .replyWithFile(200, './test/fixtures/accessible_normal.html')
      .get('/playlist')
      .query({ list: 'accessible_oneview' })
      .replyWithFile(200, './test/fixtures/accessible_oneview.html')
      .get('/playlist')
      .query({ list: 'accessible_noviews' })
      .replyWithFile(200, './test/fixtures/accessible_noviews.html')
      .get('/playlist')
      .query({ list: 'notexist' })
      .replyWithFile(200, './test/fixtures/notexist.html')
      .get('/playlist')
      .query({ list: 'private' })
      .replyWithFile(200, './test/fixtures/private.html');

      f('accessible_normal')
      .then((text) => {
        text.should.match(/views/);
        return f('accessible_noviews');
      })
      .then((text) => {
        text.should.match(/views/);
        return f('accessible_oneview');
      })
      .then((text) => {
        text.should.match(/view/);
        return f('notexist');
      })
      .catch((e) => {
        e.should.match(/not suitable/);
        return f('private');
      })
      .catch((e) => {
        e.should.match(/not suitable/);
        scope.done();
        done();
      })
      .catch(done);
    });
  });

  describe('viewsTextToNum', () => {
    it('should give only number of views', () => {
      const f = playlist.viewsTextToNum;
      f('123 views').should.be.Number().eql(123);
      f('123,456 views').should.be.Number().eql(123456);
      f('123,456,789 views').should.be.Number().eql(123456789);
      f('No views').should.be.Number().eql(0);
    });
  });
});
