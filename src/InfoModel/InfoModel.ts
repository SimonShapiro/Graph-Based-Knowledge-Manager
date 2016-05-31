class iNode {
    nodeType:          string;
    id:                           string;
    name:                   string;
    constructor(id: string, name: string) {
        this.id = id;
        this.name = name;
    }
}
 
class iEdge {
    edgeType:       string;
    id:            	string;
    fromNodeId: 	string;
    toNodeId:       string;
    label: 			string;
    constructor(fromNodeId: string, verb: string, toNodeId: string) {
        this.id = `${fromNodeId}_${verb}_${toNodeId}`
        this.fromNodeId = fromNodeId;
        this.toNodeId = toNodeId;
        this.label = verb;                          
    }
}
 
class MetaNode extends iNode {
                nodeType = "MetaNode";
}
 
class MetaEdge extends iEdge {
                edgeType = "MetaEdge"
}

class System_CONNECTS_System extends iEdge {
	edgeType = "System_CONNECTS_System"
}
 
class System extends iNode  {
                nodeType = "System";
}

class OrgUnit extends iNode {
    nodeType = "OrgUnit"
}
 
class Dataset extends iNode {
                nodeType = "Dataset";
//            description: string;
//            size: number;
}
 
type HashMap = {[id:string]: any}
 
class iGraph {
    nodes: HashMap;
    edges: HashMap;
    constructor () {
	    this.nodes = {};
	    this.edges = {};
    }
    addNode(n: iNode) {
        this.nodes[n.id] = n;
        return this
    }
    addEdge(e: iEdge) {
        let knownNodes = Object.keys(this.nodes)
        console.log("Known nodes", knownNodes)
        if ((knownNodes.indexOf(e.fromNodeId) != -1) && (knownNodes.indexOf(e.fromNodeId) != -1)) {
            console.log("ok to add edge")
            this.edges[e.id] = e
            }
        else console.log("One or both nodes on this edge missing ",e.fromNodeId, e.toNodeId)             
        return this
    }
}
 
//  iModel uses the constructor's metaModel to condition the model
class iModel {
    metaModel: iGraph;
    model: iGraph;
    constructor(metaModel: iGraph) {
        this.metaModel = metaModel;
        this.model = new iGraph()
    }
    addNode(n: iNode) {
        //can only add node of types defined in metaModel
        let legalNodes = Object.keys(this.metaModel.nodes);
        if (legalNodes.indexOf(n.nodeType) != -1) {
            this.model.nodes[n.id] = n
        }
        else console.log("NodeType not in metaModel", JSON.stringify(n))
        return this
    }
    addEdge(fromNodeId: string, verb: string, toNodeId: string) {  
    	// can only add if manufactured type is in metamodel and each node is in nodes
    	let legalEdges = Object.keys(this.metaModel.edges)
    	if((this.model.nodes[fromNodeId] != undefined) && (this.model.nodes[toNodeId] != undefined)) {
	    	let edgeType = `${this.model.nodes[fromNodeId].nodeType}_${verb}_${this.model.nodes[toNodeId].nodeType}`
	    	if (legalEdges.indexOf(edgeType) != -1) {
		    	let edgeId = `${fromNodeId}_${verb}_${toNodeId}`
		    	let edge = new iEdge(fromNodeId, verb, toNodeId)
		    	edge.edgeType = edgeType
		    	this.model.edges[edgeId] = edge  
	    	}        
	        else console.log("Attempting illegal edge ", edgeType)        
	    }
        else console.log("Something wrong with constiuents of edge ", fromNodeId, verb, toNodeId)        
        return this
    }
    nodesAsArrayOfType(nodeType: string) {
    	console.log("Going for nodes of type ", nodeType)
    		let a = this.model.nodes
            let k = Object.keys(a);
            let sub = k.filter((e) => {
                            return a[e].nodeType == nodeType
            }).map((e) => a[e])
        console.log("Got nodes ", sub)    
            return sub
	}
}
 
const subSet = (a: Object, f: Function) => {
                let k = Object.keys(a);
                let sub = k.filter((e) => {
                                return a[e] instanceof f
                }).map((e) => a[e])
                return sub
}
//====================================  Information Model ===============================
 
//-------------------- MetaModel ------------------
let m = new iGraph()
                .addNode(new MetaNode("System", "System Meta"))
                .addNode(new MetaNode("Dataset", "Dataset Meta"))
                .addNode(new MetaNode("OrgUnit", "OrgUnit Meta"))
                .addEdge(new MetaEdge("System", "CONNECTS", "System"))
                .addEdge(new MetaEdge("System", "PRODUCES", "Dataset"))
                .addEdge(new MetaEdge("System", "USES", "Dataset"))
                .addEdge(new MetaEdge("OrgUnit", "CONSISTS_OF", "OrgUnit"))
                .addEdge(new MetaEdge("OrgUnit", "USES", "System"))
//-------------------- Model ---------------------
let a = new iModel(m)
                .addNode(new System("S1", "System1"))
                .addNode(new System("S2", "System2"))
                .addNode(new Dataset("D1", "Data1"))
                .addNode(new Dataset("D2", "Data2"))
                .addNode(new Dataset("D3", "Data3"))
                .addNode(new OrgUnit("O1", "OrgUnit 1"))
                .addNode(new OrgUnit("O1-1", "OrgUnit 1-1"))
                .addNode(new OrgUnit("O1-2", "OrgUnit 1-2"))
                .addEdge("S1", "CONNECTS", "S2")
                .addEdge("D1", "CONNECTS", "S1")
                .addEdge("S1", "PRODUCES", "D1")
                .addEdge("O1", "CONSISTS_OF", "O1-1")
                .addEdge("O1", "CONSISTS_OF", "O1-2")
                .addEdge("O1", "USES", "S2")
                ;
a.model.nodes["S1"].description = ["System One: laskjf saldkj fslk jlskdj lsdk jlk" 
                                    ,"ljk lkjs dlkjf sldkjf lsdk"
                                    ,"sldkjflsdkjf lsdkjf sdlkj sd"
                                    ,"llkjd slfkj sldjkf sdlkj"].join("\n");
 
console.log(JSON.stringify(a, null, 2))
console.log(subSet(a.model.nodes, iNode))  // iNode to return everything
console.log(a.model.nodes["S1"].nodeType)

export var InfoModel = a
