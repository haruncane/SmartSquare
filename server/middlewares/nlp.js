const {LanguageServiceClient} = require('@google-cloud/language').v2;

const languageClient = new LanguageServiceClient({ keyFilename: './final-thesis-423813-924427c33758.json' });

async function classifyText(text) {
    try {
        const document = {
            content: text,
            type: 'PLAIN_TEXT',
        };
        const [response] = await languageClient.classifyText({document});
        if (!response?.categories.length) {
            const entitiesres = await languageClient.analyzeEntities({document});
            return entitiesres[0].entities[0].name;
        } else {
            return response?.categories[0]?.name;
        }
    } catch (err) {
        console.log(err);
    }
};

module.exports = { classifyText };