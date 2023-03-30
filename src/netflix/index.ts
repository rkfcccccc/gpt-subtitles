import { SubtitleObserver } from "./observer"

class Netflix {
    player: any;

    isReady () {
        return window.hasOwnProperty('netflix') && document.getElementsByClassName('watch-video--player-view').length == 1;
    }

    getBottomPercent () {
        return Math.max(10, this.player.getTimedTextSettings().bounds.bottom / window.innerHeight * 100);
    }

    listen (callback: (listener: SubtitleObserver) => void) {
        var observer = new SubtitleObserver(this.player);
        observer.addListener(callback);
        return observer;
    }

    onload (callback: Function) {
        if (this.isReady()) {
            var videoPlayer = (window as any).netflix.appContext.state.playerApp.getAPI().videoPlayer;
            this.player = videoPlayer.getVideoPlayerBySessionId(videoPlayer.getAllPlayerSessionIds()[0]);

            callback();
        } else {
            setTimeout(() => this.onload(callback), 100);
        }
    }
}

export { Netflix }