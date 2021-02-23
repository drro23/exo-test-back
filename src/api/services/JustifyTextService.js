const justifyTextService = (text, lineMaxWidth) => {
    let result = [];
    let words = text.split(' ');
    let i = 0, n = words.length;

    const leftJustify = (words, diff, i, j) => {
        let spacesOnRight = diff - (j - i - 1);
        let res = words[i];
        for (let k = i + 1; k < j; ++k) {
            res += " " + words[k];
        }
        res += " ".repeat(spacesOnRight);
        return res;
    }

    const middleJustify = (words, diff, i, j) => {
        let spacesNeeded = j - i - 1;
        let spaces = diff / spacesNeeded;
        let extraSpaces = diff % spacesNeeded;
        let res = words[i];
        for (let k = i + 1; k < j; ++k) {
            let spacesToApply = spaces + (extraSpaces-- > 0 ? 1 : 0);
            res += " ".repeat(spacesToApply) + words[k];
        }

        return res;
    }

    while (i < n) {
        let j = i + 1;
        let lineLength = words[i].length;
        while (j < n && lineLength + words[j].length + (j - i - 1) < lineMaxWidth) {
            lineLength += words[j].length;
            ++j;
        }
        let diff = lineMaxWidth - lineLength;
        let numberOfWords = j - i;
        if (numberOfWords === 1 || j >= n) {
            result += leftJustify(words, diff, i, j);
        } else {
            result += middleJustify(words, diff, i, j);
        }
        if (j !== n) {
            result += '\n';
        }
        i = j;
    }

    return result;
}

module.exports = justifyTextService;
