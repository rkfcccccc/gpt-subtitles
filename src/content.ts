import { Netflix } from "./netflix";

const netflix = new Netflix()
var subtitlesContainer: Element, subtitlesWrapper: Element, subtitlesExplanation: Element

function clearText() {
    Array.from(document.getElementsByClassName('gpt-subtitles-row')).forEach((e) => {
        e.remove();
    });
}

function updateText(text: string) {
    clearText();

    const lines = text.split('\n');
    for (var i = lines.length - 1; i >= 0; i--) {
        const line = lines[i];

        const subtitlesRow = document.createElement('div');
        subtitlesRow.classList.add('gpt-subtitles-row');
        
        const words = line.split(' ');
        words.forEach(word => {
            const subtitlesWord = document.createElement('div');
            subtitlesWord.classList.add('gpt-subtitles-word');
            // subtitlesWord.onclick = () => getExplanation(...);
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

    const listener = netflix.listen((observer) => {
        updateText(observer.getCurrentText());
        updatebottom(observer.getBottomPercent());
    });
}

netflix.onload(build);