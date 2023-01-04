# Node.js, Express, MongoDB & More: The Complete Bootcamp 2023

## 3. Section 3: Introduction to Back-End Wev Development

### 3.24. Section Intro 

Before we dive to tech stack, we could mention.

- How the web works
- Request response model
- HTTP TCP/IP
- Static vs dynamic websites
- What is a API

### 3.25. Overview of How the Web Works

Each time we open a web site in our browser, we are making a request to a server. The server then sends back a response. This is the request response model or client-server architecture.

https://www.google.com/maps

First part is the protocol (HTTP or HTTPS), then the domain name (www.google.com), then the path/resource (/maps).

Domain name is translated to IP address by DNS (Domain Name System) by DNS lookup. Domain name is easier to remember than IP address.

https://216.58.211.206:443

Port number is optional. 80 is the default port for HTTP, 443 is the default port for HTTPS.

A TCP/IP connection is established between the browser and the server. Transmission Control Protocol/Internet Protocol, they are communication protocols. They are the foundation of the internet.

HTTP is a communication protocol, it is a set of rules that allow two computers to talk to each other. It is a request response model. The client makes a request to the server, the server sends back a response.

Main difference between HTTP and HTTPS is that HTTPS is encrypted. HTTPS is HTTP over TLS/SSL. TLS/SSL is a security protocol.

HTTP contains start line, header, body. The start line is the first line of the request. It contains the method, the path, and the protocol version. The header contains information about the request. The body contains the data that we want to send to the server.

TCP breaks down the data into small packets and sends them to the server. The server receives the packets and puts them back together. IP is responsible for routing the packets to the correct destination.

### 3.26. HTTP in Action

We can inspect the network tab in the browser to see the request and response, https://www.udemy.com/. At the top we can see the first request, other requests are initiated by the first response. If we inspect the request we can see header, body, and preview.

### 3.27. Front-End vs Back-End Development

