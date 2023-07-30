// Requiring inquirer and fs
const inquirer = require('inquirer');
const fs = require('fs');

function getLicenseBadgeURL(license) {
    return `https://img.shields.io/badge/license-${encodeURIComponent(license)}-brightgreen`;
  }
// User input array
const questions = [
    {
        type: 'input',
        name: 'title',
        message: 'Enter the title of your project:',
    },
    {
        type: 'input',
        name: 'description',
        message: 'Enter a brief description of your project:',
    },
    {
        type: 'input',
        name: 'installation',
        message: 'Enter installation instructions:',
    },
    {
        type: 'input',
        name: 'usage',
        message: 'Enter usage instructions:',
    },
    {
        type: 'list',
        name: 'license',
        message: 'Choose a license for your project:',
        choices: [
            'MIT License',
            'Apache License 2.0',
            'GNU GPLv3',
            'ISC License',
            'None',
        ],
    },
    {
        type: 'input',
        name: 'contributing',
        message: 'Enter contribution guidelines:',
    },
    {
        type: 'input',
        name: 'tests',
        message: 'Enter test instructions:',
    },
    {
        type: 'input',
        name: 'githubUsername',
        message: 'Enter your Github username:',
    },
    {
        type: 'input',
        name: 'email',
        message: 'Enter your contact email address:',
    },
];

// This section inputs a short description of the license picked from the array above onto the License Description on the README.md
const licenseExplanations = {
    'MIT License': 'A permissive license that allows users to do almost anything with the code as long as they provide attribution back to the author and don’t hold the author liable. This license is widely used for its simplicity and permissiveness.',
    'Apache License 2.0': 'A permissive license that allows users to use, modify, and distribute the licensed software. The Apache License 2.0 also provides explicit protection against patent infringement claims.',
    'GNU GPLv3': 'The latest version of the GPL, which addresses some of the compatibility issues of GPLv2 and provides more protection against software patents.',
    'ISC License': 'The ISC License simply removes language that would be considered extraneous according to the Berne Convention. The ISC License is considered equivalent to the Simplified (2-Clause) BSD License but with more concise language.',
    'None': 'No license has been chosen for this project',
};

// This section writes to the README.md
function writeToFile(fileName, data) {
    fs.writeFileSync(fileName, data);
}

// This section initializes the app and fills required fields
function init() {
    inquirer
        .prompt(questions)
        .then((answers) => {
            const licenseBadgeURL = getLicenseBadgeURL(answers.license);
            const licenseExplanation = licenseExplanations[answers.license];
            const readmeContent = `
# ${answers.title}

## License
![License](${licenseBadgeURL})

${licenseExplanation}

## Description
${answers.description}

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [License](#license)
- [Contributing](#contributing)
- [Tests](#tests)
- [Questions](#questions)

## Installation
${answers.installation}

## Usage
${answers.usage}

## Contributing
${answers.contributing}

## Tests
${answers.tests}

## Questions
For any questions or concerns, please reach out to me through the following contact information:

- Github: [${answers.githubUsername}](https://github.com/${answers.githubUsername})
- Email: ${answers.email}
`;
            writeToFile('README.md', readmeContent);
            console.log('README.md created successfully');
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}

// This function calls the start of the app
init();
