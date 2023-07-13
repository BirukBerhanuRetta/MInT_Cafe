# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

## The DataBase

This is using a local postgres database, The .sql file to create the appropriate tables is available in src as create.tbl

## The Server 

The Node.js server is also local, and can be found in /inventory-api, creatively named server.js
It's been locally running on port 3001, if running on a different port, dont forget to make appropriate changes

## The Client 

This is everything in the /src directory.
Uses App.js as its main

## TODO

* Had trouble implementing Private routes (Any help appreciated)
* Could use a order submitted successfully instead of just back tracking to login
* Currently not subtracting the cost of the order from the clients credit
* A registration page to avoid direct manipulation of our database
* SQL not sanitized before being sent to the DataBase
* Translate into Amharic
