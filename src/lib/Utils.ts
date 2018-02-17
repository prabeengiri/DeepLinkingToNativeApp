/**
 * Returns query string into key/pair array.
 * @param queryString string
 *  Raw Query string.
 * @returns []
 */
export function getQueryString(queryString: string): object {
  if (queryString == undefined) {
    queryString = window.location.search;
  }

  queryString = queryString.split('+').join(' ');
  const params = {} as { [key: string]: string };
  let tokens;
  let re = /[?&]?([^=]+)=([^&]*)/g;
  while (tokens = re.exec(queryString)) {
    const key = decodeURIComponent(tokens[1]);
    const value = decodeURIComponent(tokens[2]);
    params[key] = value;
  }
  return params;
}

export function appendQueryParameter(url: string, key: string, value: any) {
  let re = new RegExp("([?&])" + key + "=.*?(&|$)", "i");
  const separator = url.indexOf('?') !== -1 ? "&" : "?";
  if (url.match(re)) {
    return url.replace(re, '$1' + key + "=" + value + '$2');
  }
  //TODO  Filter value against XSS.
  return url + separator + key + "=" + value;
}
