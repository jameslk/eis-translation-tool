const {ask, askMultiLine, askAndVerify} = require('./ask')

const replaceLabelsWithTranslation = (labels, i18nNamespace, i18nPrefix) => Object
    .keys(labels)
    .forEach((labelKey) => {
        console.log(`${labelKey}: t('${i18nNamespace}:${i18nPrefix}_${labelKey}'),`)
    });

const prefixAllKeys = (object, prefix) => Object
    .keys(object)
    .forEach((key) => {
        console.log(`'${prefix}_${key}': '${object[key]}',`)
    });

const googleTranslateStrings = (object, prefix) => Object
    .keys(object)
    .forEach((key) => {
        console.log(`"${prefix}_${key}" = "${JSON.stringify(object[key]).slice(1, -1)}";`)
    });

(async () => {

    const i18nNamespace = await askAndVerify('What is the i18n namespace?\n');

    const i18nPrefix = await askAndVerify('What prefix do you want to use for the i18n translation paths?\n');

    const labelsObjectString = await askAndVerify('What are the labels (object)?\n', askMultiLine);

    let labels = eval(`(${labelsObjectString})`)

    console.log('\n---\n');

    console.log('Translation replacement:\n');

    console.log(`import {LocalizationUtils} from '@eisgroup/common'`);
    console.log(`import t = LocalizationUtils.translate`);
    console.log('\n')

    replaceLabelsWithTranslation(labels, i18nNamespace, i18nPrefix);

    console.log('\n---\n');

    console.log('i18n File translations:\n');
    prefixAllKeys(labels, i18nPrefix);

    console.log('\n---\n');

    console.log('Google Translate Toolkit - Apple Strings (.strings file):\n')
    googleTranslateStrings(labels, i18nPrefix);

    console.log('\n---\n');


})().catch((error) => console.error(error));

