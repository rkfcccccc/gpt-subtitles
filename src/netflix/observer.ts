import { cleanHTML } from "../utils/clean-html";

const TIMED_TEXT_CONTAINER = '.player-timedtext'
const TIMED_TEXT_SPANS = '.player-timedtext > div > span > span'

class SubtitleObserver {
    private player: any;
    private observer: MutationObserver
    private listeners: Array<(listener: SubtitleObserver) => void>;

    constructor (player: any) {
        this.player = player;
        this.listeners = [];

        this.observer = new MutationObserver(() => this.mutationCallback());
        this.observer.observe(document.querySelector(TIMED_TEXT_CONTAINER)!, {
            subtree: true,
            attributes: true,
        });
    }

    private mutationCallback() {
        this.listeners.forEach(listener => {
            listener(this);
        });
    }

    addListener(callback: (listener: SubtitleObserver) => void) {
        this.listeners.push(callback);
    }

    getCurrentText() {
        var spans = Array.from(document.querySelectorAll(TIMED_TEXT_SPANS));
        return spans.map(span => cleanHTML(span.innerHTML)).join('\n');
    }
}

export { SubtitleObserver };