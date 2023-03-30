import { SubtitleObserver } from "./observer"

class Netflix {
    player: any;
    anchor = '.watch-video--player-view';

    isReady () {
        return window.hasOwnProperty('netflix') && document.querySelector(this.anchor) != null;
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