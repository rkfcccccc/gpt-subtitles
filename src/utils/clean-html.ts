function cleanHTML(text: string) {
    return text.replace(/<\/?[^>]+(>|$)/g, "");
}

export { cleanHTML }
