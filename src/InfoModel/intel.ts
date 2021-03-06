export var InfoModel = {
	"metaModel": {
		"nodes": {
			"Person": {
				"id": "Person",
				"name": "Person Meta",
				"nodeType": "metaNode",
				"schema": {
					"title": "Person",
					"type": "object",
					"properties": {
						"id": {
							"type": "string",
							"description": "A unique id for the person"
						},
						"name": {
							"type": "string"
						},
						"dateOfBirth": {
							"type": "string"
						},
						"tshirtSize": {
							"type": "string"
						},
						"notes": {
							"type": "string"
						}
					}
				},	
				"form": ["id", 
						"name", 
						{"key":"tshirtSize", "widget":"select", "widgetSpecifics": {
																		"options": ["--","xs", "s", "m", "l", "xl", "xxl"]
						}},
						{"key":"notes", "widget":"textarea", "widgetSpecifics":{"rows":"10", "cols":"80"}}, 
						{"key": "dateOfBirth", "widget":"date"}
					]
			},
			"Company": {
				"id": "Company",
				"name": "Company Meta",
				"nodeType": "metaNode",
				"schema": {
					"title": "Person",
					"type": "object",
					"properties": {
						"id": {
							"type": "string",
							"description": "A unique id for the company"
						},
						"name": {
							"type": "string"
						},
						"notes": {
							"type": "string"
						}					
					}
				},	
				"form": ["id", "name", {"key":"notes", "widget":"textarea", "widgetSpecifics":{"rows":"10", "cols":"80"}}]
			}
		},
		"edges": {
			"Person_DIRECTOR_Company": {
		        "id": "Person_DIRECTOR_Company",
		        "fromNodeId": "Person",
		        "toNodeId": "Company",
		        "label": "DIRECTOR",
		        "edgeType": "MetaEdge",
				"schema": {
					"title": "Person_DIRECTOR_Company",
					"type": "object",
					"properties": {
						"id": {
							"type": "string",
							"description": "A unique id for the Person_DIRECTOR_Company edge"
						},
						"fromNodeId": {
							"type": "string"
							},
						"toNodeId": {
							"type": "string"
						},
						"startDate": {
							"type": "string"
						},
						"endDate": {
							"type": "string"
						}
					}
				},
				"form": [
					{"key":"fromNodeId", "widget":"dropDown", "widgetSpecifics": {"basedOn": "Person"}}, 
					{"key":"toNodeId", "widget":"dropDown", "widgetSpecifics": {"basedOn": "Company"}},
					{"key":"startDate", "widget":"date"}, 
					{"key":"endDate", "widget":"date"} 
				]		
			},
			"Company_OWNS_Company": {
		        "id": "Company_OWNS_Company",
		        "fromNodeId": "Company",
		        "toNodeId": "Company",
		        "label": "OWNS",
		        "edgeType": "MetaEdge",
				"schema": {
					"title": "Company_OWNS_Company",
					"type": "object",
					"properties": {
						"id": {
							"type": "string",
							"description": "A unique id for the Company_OWNS_Company edge"
						},
						"fromNodeId": {
							"type": "string"
							},
						"toNodeId": {
							"type": "string"
						},
						"percentOwned": {
							"type": "number"
						}					
					}
				},
				"form": [
					{"key":"fromNodeId", "widget":"dropDown", "widgetSpecifics": {"basedOn": "Company"}}, 
					{"key":"toNodeId", "widget":"dropDown", "widgetSpecifics": {"basedOn": "Company"}},
					{"key":"percentOwned", "widget":"number"}				
				]		
			}
		}	
	},
	"model": {
		"nodes": {
			"JonesF": {
				"nodeType": "Person",
				"id": "JonesF",
				"name": "Freddy Jones",
				"dateOfBirth": "1989-07-01"
			}
		},
		"edges": {}
	}
}