var getEnglishPrompt = (sentences: Array<string>, word: string) => `
Based on the text:
"""
${sentences.join('\n')}
"""

Tell me the meaning of "${word}" in the sentence "${sentences[sentences.length - 1]}".

Your reply should contain no more than 30 words.
`;

export { getEnglishPrompt }
