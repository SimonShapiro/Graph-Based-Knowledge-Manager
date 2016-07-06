# Graph-Based-Knowledge-Manager
This project is an experiment in how to set up and use a form of graph-based knowledge representation.  It consists of a number of 
parts that I have been playing with over the past few decades.

It also provides me with a great excuse to learn new technoligies.  Specifically, I have used this project as a vehicle to learn:
* react
* redux
* typescript
* webpack
* pouchdb
* couchdb

## What is graph-based knowledge representation?
Graph-based knowledge representations are a category of data structures that attempt to represent knowledge (assertions, facts or data) in the form of graph data structures.  A graph is formed from a set of vertices (nodes) and edges that describe the links between them.  This is a very flexible and powerful idea that is well grounded in set and mathmatical theories.  See this [wikipedia article] (https://en.wikipedia.org/wiki/Graph_(discrete_mathematics)) for some background on graph theory.  Also, [this article] (https://en.wikipedia.org/wiki/Graph_(abstract_data_type)) provides some background on using graphs as data structures.   

We often come across graph-based knowledge representations during the development of conceptual schemas for database systems. In fact, many architectural (or uml) diagrams can be thought of as graphs.  The conceptual schema is a map that describes the semantics of an organization and represents a series of assertions about its nature.

The easiest way to understand this is through an illustration.

### Example of conceptual schema & some sample assertions
Suppose we want to record information about companies and their shareholders and directors.  The conceptual schema (below) illustrates some of the key assertions that can be made.


![Example 1](https://github.com/SimonShapiro/Graph-Based-Knowledge-Manager/blob/WithTypedInfoModel/Documentation/Example1.png)

There are five distinct types of assertions that can be made from this:

1. The ownership structure of companies that own other companies
1. The shareholding by people in companies
1. The directorships held by people in companies
1. Other nformation (assertions) about companies
1. Other information (assertions) about people

Now imagine that we want to assert the following:

1. There is a Person named Fred Jones
2. There is a Person named Mary Jane
3. There is a Company named ABC Plc
4. There is a Company named XYZ Plc
5. ABC Plc owns XYZ Plc
6. Fred Jones is a director of ABC Plc
7. Fred Jones is a shareholder in XYZ Plc
8. Mary Jane is a director in XYZ Plc

The diagram below shows these assertions mapped out onto a knowledge graph that is compliant with the conceptual schema above.

![Example 1 model](https://github.com/SimonShapiro/Graph-Based-Knowledge-Manager/blob/WithTypedInfoModel/Documentation/example1 model.png)

## Reference Implementation

The reference implementation is based on couchdb. The database stores each knowledge graphs as a separate document. A demo version is availble [here](http://52.208.94.243/index_cdn.html).

The implementation provides for two couchdb servers - an optional 'master' and 'local' server. While we use the term 'local', it can still be anywhere on the web.  The demo only has a 'local' couchdb server at address `http:guest:Gu3st@//52.48.52.57:5984/mainmypouch/`. 

Copy and paste this address into the `Local` field, then click on `File` to get a list of documents available on the server.  Then load the Demo file.

More details can be found in the [wiki](https://github.com/SimonShapiro/Graph-Based-Knowledge-Manager/wiki)
