import { cleanHTML } from "../utils/clean-html";

const TIMED_TEXT_CONTAINER = '.player-timedtext'
const TIMED_TEXT_SPANS = '.player-timedtext > div > span > span'

class SubtitleObserver {
    private player: any;
    private observer: MutationObserver

    constructor (player: any, listener: (listener: SubtitleObserver) => void) {
        this.player = player;

        this.observer = new MutationObserver(() => listener(this));
        this.observer.observe(document.querySelector(TIMED_TEXT_CONTAINER)!, {
            subtree: true,
            attributes: true,
        });
    }

    disconnect() {
        this.observer.disconnect();
    }

    getCurrentText() {
        var spans = Array.from(document.querySelectorAll(TIMED_TEXT_SPANS));
        return spans.map(span => cleanHTML(span.innerHTML)).join('\n');
    }

    getBottomPercent () {
        return Math.max(10, this.player.getTimedTextSettings().bounds.bottom / window.innerHeight * 100);
    }
}

export { SubtitleObserver };