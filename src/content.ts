import { credentials } from "./config/credentials";
import { buildLoadingDots } from "./loading";
import { Netflix } from "./netflix";
import { SubtitleObserver } from "./netflix/observer";
import { getEnglishPrompt } from "./prompt";

const netflix = new Netflix()
var subtitlesContainer: Element, subtitlesWrapper: Element, subtitlesExplanation: Element

function updateExplanationText(text: string) {
    if (subtitlesExplanation.classList.contains('gpt-subtitles-flicker')) {
        subtitlesExplanation.classList.remove('gpt-subtitles-flicker');
        subtitlesExplanation.innerHTML = '';
    }
    
    subtitlesExplanation.innerHTML = text;
}

async function getExplanation(sentences: Array<string>, word: string) {
    const { ChatGPTUnofficialProxyAPI } = await import('chatgpt')

    subtitlesExplanation.classList.remove('gpt-subtitles-hidden');
    subtitlesExplanation.classList.add('gpt-subtitles-flicker');
    subtitlesExplanation.innerHTML = buildLoadingDots().outerHTML;

    const proxyUrl = 'https://corsproxy.io/?' + encodeURIComponent('https://bypass.duti.tech/api/conversation');
    const api = new ChatGPTUnofficialProxyAPI({
        accessToken: credentials.accessToken,
        apiReverseProxyUrl: proxyUrl,
    })

    const result = await api.sendMessage(getEnglishPrompt(sentences, word), {
        onProgress: (partialResponse) => {
            updateExplanationText(partialResponse.text);
        }
    })

    console.log(result);
}

function clearText() {
    subtitlesExplanation.classList.add('gpt-subtitles-hidden');;

    const rows = Array.from(document.getElementsByClassName('gpt-subtitles-row'));
    rows.map((e) => e.remove());
}

function updateText(observer: SubtitleObserver) {
    clearText();

    const text = observer.getCurrentText();
    const lines = text.split('\n');
    for (var i = lines.length - 1; i >= 0; i--) {
        const line = lines[i];

        const subtitlesRow = document.createElement('div');
        subtitlesRow.classList.add('gpt-subtitles-row');
        
        const words = line.split(' ');
        words.forEach(word => {
            const subtitlesWord = document.createElement('div');
            subtitlesWord.classList.add('gpt-subtitles-word');
            subtitlesWord.onclick = () => {
                getExplanation(observer.getLast(5), word);
            };

            subtitlesWord.innerText = word;

            subtitlesRow.appendChild(subtitlesWord);
        });
        
        subtitlesWrapper.prepend(subtitlesRow);
    }
}

function updatebottom(bottom: number) {
    subtitlesWrapper.setAttribute('style', `bottom: ${bottom}%;`);
}

async function build(){    
    subtitlesContainer = document.createElement('div');
    subtitlesContainer.classList.add('gpt-subtitles-container');

    subtitlesWrapper = document.createElement('div');
    subtitlesWrapper.classList.add('gpt-subtitles-wrapper');
    subtitlesContainer.appendChild(subtitlesWrapper);

    subtitlesExplanation = document.createElement('div');
    subtitlesExplanation.classList.add('gpt-subtitles-explanation', 'gpt-subtitles-hidden');
    subtitlesWrapper.appendChild(subtitlesExplanation);

    document.querySelector(netflix.anchor)!.appendChild(subtitlesContainer)
    console.log('gpt subtitles builded');
    
    const listener = netflix.listen((observer, done) => {
        if (done) {
            console.log('listener disconnected');
            netflix.onload(build);
            listener.disconnect();
            return;
        }

        if (observer.textUpdated) updateText(observer);
        if (observer.bottomUpdated) updatebottom(observer.getBottomPercent());
    });
}

netflix.onload(build);