const i18nStringsFiles = require('i18n-strings-files');
const {ask, askMultiLine, askAndVerify} = require('./ask');

const outputObjectKeys = (object) => Object
    .keys(object)
    .forEach((key) => {
        console.log(`'${key}': '${object[key]}',`)
    });

(async () => {

    const strings = await askAndVerify('What are the Apple Strings (from a .strings file)?\n', askMultiLine);

    console.log('\n---\n');

    console.log('Converted to i18n translations:\n');
    const object = i18nStringsFiles.parse(strings)

    outputObjectKeys(object)

    console.log('\n---\n');

})().catch((error) => console.error(error));
