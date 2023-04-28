export const urlEncodeWord = (word) => {
    return word.replaceAll(" ", "%20");
};

export const urlDecodeWord = (word) => {
    return word.replaceAll("%20", " ");
};