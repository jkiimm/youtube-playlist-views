import R from 'ramda';
import request from 'request-promise';
import cheerio from 'cheerio';

async function getViewsText(pid) {
  const selector = '#pl-header .pl-header-details li';
  const options = {
    uri: 'https://www.youtube.com/playlist',
    headers: { 'accept-language': 'en' },
    qs: { list: pid },
    transform: (body) => cheerio.load(body)
  };

  const findViewsText = R.find(R.pipe(R.match(/view/), R.complement(R.isEmpty)));

  const $ = await request(options);
  const selText = $(selector).map((key, val) => $(val).text()).get();

  if (R.isEmpty(selText)) {
    throw new Error('playlist is not suitable');
  }

  return findViewsText(selText);
}

function viewsTextToNum(text) {
  const numPart = R.pipe(R.trim, R.split(' '), R.head);
  const ifEmptyToBeZero = R.when(R.equals('No'), R.always('0'));
  const toNumber = R.pipe(R.replace(/,/g, ''), parseInt);

  return R.pipe(numPart, ifEmptyToBeZero, toNumber)(text);
}

async function views(pid) {
  const viewsText = await getViewsText(pid);
  return viewsTextToNum(viewsText);
}

const playlist = { views, getViewsText, viewsTextToNum };

export default playlist;
export { views, getViewsText, viewsTextToNum };
