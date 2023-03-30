import { Netflix } from "./netflix";

var netflix = new Netflix();

function build() {
    netflix.listen((observer) => {
        console.log(observer.getCurrentText());
    });
}

netflix.onload(build);