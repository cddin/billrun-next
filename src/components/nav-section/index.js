// ----------------------------------------------------------------------

export { default as NavSectionVertical } from './vertical';
export { default as NavSectionHorizontal } from './horizontal';

export function isExternalLink(path) {
  return path.includes('http');
}

export function getActive(path, pathname, asPath) {
  // console.log('================');
  // console.log('path', path);
  // console.log('pathname:', pathname);
  // console.log('asPath:', asPath);
  const checkPath = path.startsWith('#');
  // console.log('checkPath:', checkPath);
  return (!checkPath && pathname.includes(path)) || (!checkPath && asPath.includes(path));
}
