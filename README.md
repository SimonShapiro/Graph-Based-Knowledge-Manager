# Graph-Based-Knowledge-Manager
This project is an experiment in how to set up and use a form of graph-based knowledge representation.  It consists of a number of 
parts that I have been playing with over the past few decades.

It also provides me with a great excuse to learn new technoligies.  Specifically, I have used this project as a vehicle to learn:
* react
* redux
* typescript
* webpack
* pouchdb

## What is graph-based knowledge representation?
We most commonly come across graph-based knowledge representations in the development of conceptual schemas for database systems.
The conceptual schema is a map that describes the semantics of an organization and represents a series of assertions about its nature. 

The easiest way to understand this is through an illustration.

### Example of conceptual schema
Suppose we want to record information about companies and their shareholders and directors.  The conceptual schema (below) illustrates some of the key assertions that can be made.


![Example 1](https://github.com/SimonShapiro/Graph-Based-Knowledge-Manager/blob/WithTypedInfoModel/Documentation/Example1.png)

There are five distinct types of assertions that can be made from this:
1 The ownership structure of companies that own other companies
1 The shareholding by people in companies
1 The directorships held by people in companies
1 Other nformation (assertions) about companies
1 Other information (assertions) about people
