// TODO: Include packages needed for this application
const inquirer = require('inquirer');
const fs = require('fs');

function getLicenseBadgeURL(license) {
    return `https://img.shields.io/badge/license-${encodeURIComponent(license)}-brightgreen`;
  }
// TODO: Create an array of questions for user input
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
        name: 'questions',
        message: 'Enter frequently asked questions and their answers:',
    },
];

const licenseExplanations = {
    'MIT License': 'A permissive license that allows users to do almost anything with the code as long as they provide attribution back to the author and don’t hold the author liable. This license is widely used for its simplicity and permissiveness.',
    'Apache License 2.0': 'A permissive license that allows users to use, modify, and distribute the licensed software. The Apache License 2.0 also provides explicit protection against patent infringement claims.',
    'GNU GPLv3': 'The latest version of the GPL, which addresses some of the compatibility issues of GPLv2 and provides more protection against software patents.',
    'ISC License': 'The ISC License simply removes language that would be considered extraneous according to the Berne Convention. The ISC License is considered equivalent to the Simplified (2-Clause) BSD License but with more concise language.',
    'None': 'No license has been chosen for this project',
};

// TODO: Create a function to write README file
function writeToFile(fileName, data) {
    fs.writeFileSync(fileName, data);
}

// TODO: Create a function to initialize app
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
${answers.questions}
`;
            writeToFile('README.md', readmeContent);
            console.log('README.md created successfully');
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}

// Function call to initialize app
init();
