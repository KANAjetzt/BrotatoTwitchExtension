import * as fs from 'node:fs';

// Used to transform the converted translations (from csv to json) into a more usefull format to look up the translations.
function transform() {
	const new_data = {};

	const data = fs.readFileSync('./static/translations.json');
	const translations = JSON.parse(data);

	translations.forEach((translation) => {
		new_data[translation.keys] = {};

		for (const [key, value] of Object.entries(translation)) {
			if (key !== 'keys') {
				new_data[translation.keys][key] = value;
			}
		}
	});

	fs.writeFileSync('./transformed.json', JSON.stringify(new_data));
}

transform();
