This web app aims calculate the shortest path between 2 nodes using Dijkstra's Algorithm. It also allows sending of results via Twilio SMS to a phone number. Tested on Ubuntu 20.04.1 LTS.

Quickstart with docker compose
Run `docker-compose up` to set up all containers


---

Setup

1 Run `cd` into `frontend` directory and run `npm install`
2 Run `cd` into `backend` directory and run `npm install`
3 While still in `backend` directory , run `npm run build:ui` to build the React 'build' folder

For use with twilio
4a Edit the `.env` file with following lines: `accountSid="XYZ"`, `authToken="ABC"` and `twilioNumber="+123456"`. Replace the actual values with your twilio dashboard credentials.

OR

For use without twilio
4b Edit `server.js` file and comment out any references to twilio. For reference, this is lines 6 and 38-44.

5 Run `npm start` to start the backend node / express server
6 Browse to http://www.localhost:3001/ to use the app
7 Enjoy!

---

Backend

Packages used
-node
-express
-cors
-dotenv
-twilio
-morgan
-nodemon

Description
The backend is built on Express and has 3 main functions:
1 Serve a static page from the React build folder via "/"
2 Run the shortest path algo and return results as a json API via "/api"
3 Send the results to a phone number via "/twilio"

Additional details
Server runs on port 3001.
Entry file is `server.js`
Helper files are `getShortestPath.js` and `twilio.js`
Routes have to be input both ways to work correctly. For example, instead of entering AB5, it is compulsory to enter AB5 and BA5, as per specification

---

Frontend

Packages used
-React
-axios
-Bootstrap

Description
The frontend is built on React and useState hooks. It mainly fetches data via the API build on the express backend.

The React portion is modified in the /frontend directory. For it to be built, the command "npm run build:ui" builds the build folder and copies it to the backend directory.

Entry file is `App.js` and `Index.js`
