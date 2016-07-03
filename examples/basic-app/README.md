### Truss Basic Example

This is a very basic example which demonstrate the usage of

- app.js is the entry point for this application.
- Truss.createInstance which can be used to initialize any module.
- default rendering capabilty of modules. If render function is not available on module and template is exposed to Truss then Truss will compile the template with provided data to generate the html and insert it inside container.


#### How to run application.
Basic System Requirement: Your system should have NodeJs installed and if you dont have browse https://nodejs.org/en/ to dowload the installer. Make sure that node version is atleast 6.1.0. To check node version run this command
```
  node -v
```

Step 1: Install all the required dependencies using
```
  npm install
```
Step 2: Transpile the code.
```
  npm run dev
```
or to run in watch mode
```
  npm run dev:watch
```
Step 3: Run any static server in the appilcation directory and browse to url provided by static server.

If you dont have any static server installed, we recomment using http-server which can be installed using
```
  npm install -g http-server
```
and the run this command in the application directory
```
  http-server
```
By default http-server will listen on port 8080, so to browse the app hit localhost:8080 in your browser.

We highly recomment using Chrome canary which has better devtool support than any other browser. It can be downloaded from https://www.google.com/chrome/browser/canary.html


#### Concerns and Queries
Drop a mail to truss-developers@flipkart.com for any kind of questions or support.
