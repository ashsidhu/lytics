# Lytics
Lytics provides really simple analytics for Express applications built on top of Node.js. It works by plugging in one middleware function into your application just like Morgan. The middleware injected by this package has minimal overhead on your application's performance. For every request that the app receives Lytics will measure the duration and collect the request data including url, method, timestamp, ip. 

Requiring Lytics in your app will spin up a logging server on port 5151 listening for the request data objects. As the responses to the requests are finished sending, Lytics will send the request metadata collected above to the logging server via web-sockets. The logging server expects a Mongodb instance running locally on port 27017, where it writes the data received. 

One more thing, opening up [localhost:5151](http://localhost:5151) on your browser will provide you with a live stream of all requests being served by your app server along with request metadata.

### Data logged by Lytics
For every request handled by your app server, Lytics will record the following data about the request:

- Duration (ms)
- Timestamp
- URL
- HTTP Method
- IP
- Query parameters (wip)
- Body length (wip)

### Use Case
The idea is to be able to run aggregation on the logged data to gain insights into how the app server is performing. It will help you 

- find out endpoints that are the current bottlenecks in your app's performance
- monitor the health of critical endpoints of your app

### Setup
1. Run `npm install --save lytics` to install.

2. Require lytics using this command to use it with your Express app

	```
	// Require lytics using this command
	var lytics = require('lytics');
	```

3. Use middleware returned by lytics by the instance of the Express app

	```
	var express = require('express');
	var app = express();
	
	// Use middleware returned by lytics
	app.use(lytics());
	```
	
### Requirements
1. An instance of MongoDB should be running locally on port 27017.

2. Port 5151 should be available for running the logging server. 

### Realtime monitoring

Point your browser to [localhost:5151](http://localhost:5151) while running Lytics to monitor your app in realtime. The client connects to the logging server via web-sockets and receives the above data as it is being received by the logging server. To view the data, open the console on the browser and enjoy the realtime feed of request data.

![request data](http://i.imgur.com/dZy9bfo.png)
