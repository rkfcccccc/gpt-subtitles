import { cleanHTML } from "../utils/clean-html";

const TIMED_TEXT_CONTAINER = '.player-timedtext'
const TIMED_TEXT_SPANS = '.player-timedtext > div > span > span'

class SubtitleItem {
    text: string
    time: number

    constructor (text: string, time: number) {
        this.text = text;
        this.time = time;
    }
}

class SubtitleObserver {
    private observer: MutationObserver
    private history: Array<SubtitleItem>
    private player: any;

    textUpdated = false
    bottomUpdated = false

    private lastBottom: number = -1;

    constructor (player: any, listener: (listener: SubtitleObserver, done: boolean) => void) {
        this.history = [];
        this.player = player;

        this.observer = new MutationObserver(() => {
            const container = document.querySelector(TIMED_TEXT_CONTAINER)!;
            const done = container == null;

            const text = this.getCurrentText();
            const time = this.player.getCurrentTime();

            while (this.history.length > 0 && this.history[this.history.length - 1].time > time)
                this.history.pop();

            if (this.history.length == 0 || this.history[this.history.length - 1].text != text) {
                this.history.push(new SubtitleItem(text, time));
                this.textUpdated = true;
            } else {
                this.textUpdated = false;
            }

            const newBottom = this.getBottomPercent();
            if (this.lastBottom != newBottom) {
                this.bottomUpdated = true;
                this.lastBottom = this.getBottomPercent();
            } else {
                this.bottomUpdated = false;
            }

            listener(this, done);
        });

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

    getLast(count: number): Array<string> {
        const result: Array<string> = [];
        for (var i = Math.max(this.history.length - count, 0); i < this.history.length; i++) {
            result.push(this.history[i].text);
        }

        return result;
    }
}

export { SubtitleObserver };