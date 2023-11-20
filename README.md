## If you need further assistance with getting the app started/using the app:

In the root directory, there is a .txt file called `project_videos` with Google Drive links to videos
One video shows how to set up the app (following these README.md directions): https://drive.google.com/file/d/1c69B-lDh-xR-ZayyeN_2dYwa5nUKmksM/view?usp=sharing
The other video is a demonstration of using the app itself: https://drive.google.com/file/d/1BEX5OLmTQPb0Jk9pLkuPOs7BVR01v1_Q/view?usp=sharing
The .png of the database schema diagram is also included in the main directory `cmsc-447-indiv-proj-react`



### STEPS TO SET UP THE APP ARE BELOW ###

## Installing Node.js/NPM to device

Install the newest version of node/npm: https://nodejs.org/en/download
You should end up with node v.18.18.0 and npm 9.8.1
You can check that they are the right versions using `node --version` and `npm --version`


## Installing node packages necessary to run the program

This step is easiest to do using Visual Studio Code in a terminal
They may already be installed in the node_modules directory in the `cmsc-447-react_app` directory
To check, do command `npm ls` in the `cmsc-447-react_app` directory

Use `npm install` inside the `cmsc-447-react_app` directory to install the following packages if not already installed:
├── @emotion/react@11.11.1
├── @emotion/styled@11.11.0
├── @mui/material@5.14.11
├── @mui/x-data-grid@6.16.0
├── @testing-library/jest-dom@5.17.0
├── @testing-library/react@13.4.0
├── @testing-library/user-event@13.5.0
├── axios@1.5.1
├── http-proxy-middleware@2.0.6
├── react-dom@18.2.0
├── react-scripts@5.0.1
├── react@18.2.0
└── web-vitals@2.1.4


## Start the virtual environment

There is a folder called virtualenv in the backend directory.
This is where all flask requirements and other flask-related packages are.
In order to run the app, you need to open TWO terminals (easiest in VS code) and start the virtual environment in both terminals
This can be done with the following commands starting from the root directory:

`cd backend`
`Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUse`
`.\\virtualenv\Scripts\Activate`

Make sure to do this in both terminals


## Start Flask

In one of the two terminals, while still in the backend directory do command `flask run`
This should start the Flask server


## Start React App

In the second terminal, without disturbing the first terminal, do open the `cmsc-447-react_app` directory
If you are still in the backend directory, you can do this with command `cd ..\cmsc-447-react_app\`
Finally, once in this directory, do `npm start`
This will run the app in development mode. 
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.


## Finally, keep the two terminals open and use the web app freely! Enjoy! :D