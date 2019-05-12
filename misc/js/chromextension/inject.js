
function inject(fileName) {
    let script = document.createElement("script");
    script.src = chrome.extension.getURL(fileName);
    script.async = false;
    document.documentElement.append(script);    
}
inject("content.js");
inject("debug.js");