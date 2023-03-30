function buildLoadingDots() {
    const row = document.createElement('div');
    row.classList.add('gpt-subtitles-row');

    for (var i = 0; i < 3; i++) {
        const dot = document.createElement('div');
        dot.classList.add('dot-pulse');
        dot.setAttribute('style', 'animation-delay: ' + (0.5 * i) + 's;');

        row.appendChild(dot);
    }

    return row;
}

export { buildLoadingDots }