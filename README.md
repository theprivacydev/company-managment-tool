

# Company Management Tool

## Description
This is a Node.js  application allows the user to view, add, and remove all departments and employees, as well as update employee roles and who manages them straight from the command line. This app uses MySQL to store all data, and then uses a node package manager called "console.table" to display the data in the command line in neat, easy-to-read tables.

## Table of Contents
  - [Installation](#installation)
  - [Usage](#usage)
  - [Walkthrough Video Link](#walkthrough-video-link)
  - [Technologies](#technologies)
  - [License](#license)
  - [Next Steps](#next-steps)
  - [Questions](#questions)


## Installation
Clone the repository to your local machine, open the index.js in the integrated terminal and run the following from the command line:

``` 
$npm i 
$git ignore node_ modules  
$node index 
```

## Usage
Once you've run the application using the command "node index", use your keyboard arrows to move and up and down over the choices, and then hit enter to choose what you would like to do from the list of options. If that involves adding or deleting departments or employees, then enter their information when prompted.

## Walkthrough Video Link
* https://drive.google.com/file/d/13gDSAZ2w3xqj6sM3qAQ26BZhp9q5XUq9/view

## Technologies
* JavaScript 
* Node.js
* MySql

## License


  [MIT](https://opensource.org/licenses/MIT)
  

  ![License: MIT](https://img.shields.io/badge/License-MIT-9cf)


## Next Steps
* Add ability for user to update employee managers, view employees by manager, as well as delete employees, roles and departments
* Refactor and consolidate code for readability
* Clean up file structure into MVC by abstracting inquirer prompts and my sql connection into separate files from index.js
* Write tests for each js file

## Questions
For additional questions please contact:
* Jayme Mizelle
* Email: jlm_developer@gmail.com
* https://github.com/jaymemizelle
