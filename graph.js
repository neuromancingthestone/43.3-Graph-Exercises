class Node {
  constructor(value, adjacent = new Set()) {
    this.value = value;
    this.adjacent = adjacent;
  }
}

class Graph {
  constructor() {
    this.nodes = new Set();
  }

  // this function accepts a Node instance and adds it to the nodes property on the graph
  addVertex(vertex) {
    this.nodes.add(vertex);
  }

  // this function accepts an array of Node instances and adds them to the nodes property on the graph
  addVertices(vertexArray) {
    for(let node of vertexArray) {
      this.addVertex(node);
    }
  }

  // this function accepts two vertices and updates their adjacent values to include the other vertex
  addEdge(v1, v2) {
    v1.adjacent.add(v2);
    v2.adjacent.add(v1);
  }

  areConnected(v1, v2) {
    let toVisitQueue = [v1];
    let seen = new Set(toVisitQueue);
    while(toVisitQueue.length) {
      let curr = toVisitQueue.shift();
      if(curr === v2) return true;
      for(let n of curr.adjacent) {
        if(!seen.has(n)) {
          toVisitQueue.push(n);
          seen.add(n);
        }
      }
    }
    return false;
  }

  // this function accepts two vertices and updates their adjacent values to remove the other vertex
  removeEdge(v1, v2) {
    v1.adjacent.delete(v2);
    v2.adjacent.delete(v1);
  }

  // this function accepts a vertex and removes it from the nodes property, it also updates any adjacency lists that include that vertex
  removeVertex(vertex) {
    for (let node of this.nodes) {
      if (node.adjacent.has(vertex)) {
        node.adjacent.delete(vertex);
      }
    }
    this.nodes.delete(vertex);    
  }

  // this function returns an array of Node values using DFS
  depthFirstSearch(start) {
    const toVisitStack = [start];
    const result = [];
    let seen = new Set();

    seen.add(start);

    while(toVisitStack.length) {
      let curr = toVisitStack.pop();
      result.push(curr.value)

      for(let n of curr.adjacent) {
        if(!seen.has(n)) {
          seen.add(n);
          toVisitStack.push(n);          
        }
      }
    }
    return result;    
  }

  // this function returns an array of Node values using BFS
  breadthFirstSearch(start) {
    const toVisitQueue = [start];
    const result = [];
    let seen = new Set();

    seen.add(start);

    while(toVisitQueue.length) {
      let curr = toVisitQueue.shift();
      result.push(curr.value)

      for(let n of curr.adjacent) {
        if(!seen.has(n)) {
          seen.add(n);
          toVisitQueue.push(n);          
        }
      }
    }
    return result;    
  }
}

module.exports = {Graph, Node}