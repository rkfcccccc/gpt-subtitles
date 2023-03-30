function injectScript(file_path: string, tag: string) {
    var node = document.getElementsByTagName(tag)[0];
    var script = document.createElement('script');
    script.setAttribute('type', 'text/javascript');
    script.setAttribute('src', file_path);
    node.appendChild(script);
}

function injectStyle(file_path: string, tag: string) {
    var node = document.getElementsByTagName(tag)[0];
    var link = document.createElement('link');
    link.setAttribute('type', 'text/css');
    link.setAttribute('rel', 'stylesheet');
    link.setAttribute('href', file_path);
    node.appendChild(link);
}

injectScript(chrome.runtime.getURL('content.js'), 'body');

injectStyle(chrome.runtime.getURL('styles/gpt-subtitles.css'), 'head');
injectStyle(chrome.runtime.getURL('styles/dot-pulse.css'), 'head');