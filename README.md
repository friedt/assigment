

# Documentation after fullfilled assignment

# Installation 

```shell
$ npm install
$ npm run serve
$ npm run build
$ npm run watch
```

<ul>
<li>Run 'npm install' > 
This will install the dependencies first </li> 
<li>'npm run serve' will build the project and startup a static server
which listens to http://localhost:8081/</li>
<li>'npm run build' will run eslint first and will build the project using Webpack and creates a 'dist' folder with all the built files which is the root folder of localhost</li>

<li>'npm run watch' will watch the project using webpack after changing files </li>
</ul>

# Configuration

### Webpack
This project uses Webpack as a buildtool which is configured in webpack.config.js. <br>
There are 3 loaders configured which handle the html, scss and js files.<br>
To get more information about the configuration options, see: <a href="https://webpack.js.org">https://webpack.js.org</a>

Webpack Plugins used:
- https://webpack.js.org/plugins/html-webpack-plugin/
- https://webpack.js.org/plugins/copy-webpack-plugin/

### Folder Structure

- sass/  folder which containes all the scss files
- src/ 
These are the source files that can be changed. It consists of a:
<ul>
<li>'data' folder which containes the flights.json which is used to display flight information on the API endpoint</li>
<li>'html' folder which contains the index.html which contains html partials which are bundled by 
<a href="https://github.com/webpack-contrib/html-loader">html-loader</a>
</li>
<li>'static' folder which provides static css from Schiphol</li>

</ul>

### Config files

- .babelrc : config babel settings
- .eslintrc.js : config eslint settings
- webpack.config.js : config webpack settings




# Assignment (fullfilled by Pepijn Friederichs)

The original assignment as described below is now fullfilled by me.

Please create a page that contains an input field.
When the user enters *at least* three characters into this input field,
you should display all flight information from the `flights.json` file where the destination matches the entered input.
Do this by using vanilla Javascript.

We think 4 hours should be enough to spend on this assignment.
Please don't spend more than that unless you're having fun and want to show off :)

## Requirement:
- Use Webpack to build an ES5 bundle of your program.
- Make it look nice. Make sure Webpack also packages your styles. We have provided some internal SCSS files in the `/sass` directory from our internal setup.
You can read about these on [http://takeoff.schiphol.nl/component/style-fundamentals](http://takeoff.schiphol.nl/component/style-fundamentals)
- Your application should treat the contents of `flights.json` as the output of an API endpoint.
It should load this via xhr and should not require a page load when the user changes their input.

## Submission:
- Create a clone of this repository locally.
Then push it to **your GitHub account** and continue working from there. Once you have finished, please send us the URL of the repository you have created.

### Some things to consider:
- We like tested code
- We like readable code
- We like using the latest features of ES6 where applicable
- Last but not least, have fun!
