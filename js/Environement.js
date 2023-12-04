var currentUrl = window.location;

function setCurrentUrl(url) {
  if (url.host === "127.0.0.1:5500") {
    url = "http://127.0.0.1:5500/";
  }
  return url;
}

currentUrl = setCurrentUrl(currentUrl);

export { currentUrl };