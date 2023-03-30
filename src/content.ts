import { Netflix } from "./netflix";

const netflix = new Netflix()
var subtitlesContainer: Element, subtitlesWrapper: Element, subtitlesExplanation: Element

function clear_text() {
    Array.from(document.getElementsByClassName('gpt-subtitles-row')).forEach((e) => {
        e.remove();
    });
}

function update_text(text: string) {
    clear_text();

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

function update_bottom(bottom: number) {
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
        update_text(subtitlesWrapper, observer.getCurrentText());
        update_bottom(subtitlesWrapper, observer.getBottomPercent());
    });
}

netflix.onload(build);