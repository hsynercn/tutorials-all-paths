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

<https://www.google.com/maps>

First part is the protocol (HTTP or HTTPS), then the domain name (www.google.com), then the path/resource (/maps).

Domain name is translated to IP address by DNS (Domain Name System) by DNS lookup. Domain name is easier to remember than IP address.

<https://216.58.211.206:443>

Port number is optional. 80 is the default port for HTTP, 443 is the default port for HTTPS.

A TCP/IP connection is established between the browser and the server. Transmission Control Protocol/Internet Protocol, they are communication protocols. They are the foundation of the internet.

HTTP is a communication protocol, it is a set of rules that allow two computers to talk to each other. It is a request response model. The client makes a request to the server, the server sends back a response.

Main difference between HTTP and HTTPS is that HTTPS is encrypted. HTTPS is HTTP over TLS/SSL. TLS/SSL is a security protocol.

HTTP contains start line, header, body. The start line is the first line of the request. It contains the method, the path, and the protocol version. The header contains information about the request. The body contains the data that we want to send to the server.

TCP breaks down the data into small packets and sends them to the server. The server receives the packets and puts them back together. IP is responsible for routing the packets to the correct destination.

### 3.26. HTTP in Action

We can inspect the network tab in the browser to see the request and response, <https://www.udemy.com/>. At the top we can see the first request, other requests are initiated by the first response. If we inspect the request we can see header, body, and preview.

### 3.27. Front-End vs Back-End Development

Front-end uses HTML, CSS, and JavaScript. Back-end uses server-side languages like Node.js, PHP, Python, Ruby, Java, etc. Back-end is responsible for storing and retrieving data, processing data, and sending data to the front-end.

A server is responsible for storing and retrieving data, processing data, and sending data to the front-end. A server is a computer that is always on and connected to the internet.

Static server is a server that only serves static files. Dynamic content is content that is generated on the fly. Dynamic server is a server that can serve both static and dynamic content.

Any serious application needs a database. A database is a collection of data that is stored in a structured way and can be accessed easily.

We are going to use Node.js, and MongoDB.

### 3.28. Static vs Dynamic vs API

Static website contains only HTML, CSS, and JavaScript. It is not connected to a database and it doesn't need any back-end.

Dynamic websites are different than static websites, we build the page on the server side with dynamic resources.

With powerful browsers we start to build applications on the API(Application Programming Interface). Web application is rendered by the browser, but the data is fetched from the server.

Server-side rendering is when the server sends the complete HTML to the browser. Client-side rendering is when the browser fetches the data from an API and renders the page.

We can user an API from anywhere, we can use it from a mobile app, a desktop app, or a website.
