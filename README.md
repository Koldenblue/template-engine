# Template Engine for Teams

![image](https://img.shields.io/badge/license-MIT%20License-green)

## Table of Contents

1. <a href="#description">Description</a>
2. <a href="#installation">Installation</a>
3. <a href="#usage">Usage</a>
4. <a href="#contributions">Contributions</a>
5. <a href="#license">License</a>
6. <a href="#questions">Issues and Questions</a>
<h3 id='description'>Description</h3>
This program generates a templated mobile-responsive html page based upon user input. A quick demonstration can be viewed at https://youtu.be/SdOaaAi9A-Q. The inquirer package from node package manager is used to ask questions and get input. Currently, the program is configured to ask questions about a team consisting of a single manager and any number of engineers or interns. However, this can be programmed to reflect different team or object compositions, as well as different question structures. The template design can also be changed by editing main.html, or the other template.html files. Overall, the goal of the program is to demonstrate the underlying design and viability of creating a template. This is largely accomplished through object-oriented programming, utilizing asynchronous inquirer functions and asynchronous node file system functions (such as writeFile()). Simple classes and subclasses are created for each employee type. This allows any number of employee objects to be instantiated and incorporated into the templates.

![image](https://user-images.githubusercontent.com/64618290/90988497-0d31e080-e548-11ea-8a7d-a604e0949886.png)

Class functionality was tested using Jest. Tests are included here, but are not necessary for functionality.

There is room for additional design improvement. For example, filters could be implemented to filter by employee type. The app could also be programmed to accept more than one manager per team. Stricter validation could be added for things such as id, etc. Database functionality could be added to actively add or remove employees. Local storage could be used to save settings, searches, or employee objects. Fields can be set to display "N/A" or another placeholder value, if blank. 

There is certainly room for a large number of features. However, this program does accomplish its goal of demonstrating basic templating functionality using object-oriented design and asynchronous functionality.

<h3 id='installation'>Installation</h3>
First, make sure that Node.js and node package manager are installed. Then, in a terminal, navigate to the appropriate directory containing this program. Run 'npm install -production' to ensure that Inquirer is installed (the production flag will avoid installing Jest). 

<h3 id='usage'>Usage</h3>
In the terminal, navigate to the directory containing "app.js". Type "node app.js" to run the program.

<h3 id='contributions'>Contributions</h3>
Contact the author through GitHub or email. Alternatively, create a new issue under the "issues" tab on GitHub.

<h3 id='license'>License</h3>
This project is licensed under the MIT License.

<h3 id='questions'>Issues and Questions</h3>
Issues and questions can be emailed to 'kmillergit' at the domain 'outlook.com'. The author's GitHub profile may be found at https://github.com/Koldenblue.

<sub><sup>This readme was generated with the help of the readme generator program at https://github.com/Koldenblue/readme-generator.</sup></sub>