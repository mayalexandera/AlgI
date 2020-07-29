class Graph{
  constructor(){
      this.adjacencyList = {}
  }
  addVertex(name){
      if(!this.adjacencyList[name]) this.adjacencyList[name] = []
  }
  addEdge(vertex1, vertex2){
      //if direction mattered you would only do one of the below steps
      this.adjacencyList[vertex1].push(vertex2)
      this.adjacencyList[vertex2].push(vertex1)
  }
  removeVertex(key){
     while(this.adjacencyList[key].length){
         this.removeEdge(key, this.adjacencyList[vertex].pop())
     }
     delete this.adjacencyList[key]
  }
  removeEdge(vertex1, vertex2){
      this.adjacencyList[vertex1] = this.adjacencyList[vertex1].filter( v => v !== vertex2)
      this.adjacencyList[vertex2] = this.adjacencyList[vertex2].filter( v => v !== vertex1)
  }
  //depth first recursive traversal
  depthFirstRecursive(start){
      let result = []
      let visited = {}
      const adjacencyList = this.adjacencyList
          function dfsHelper(vertex){
              if(vertex === null) return false
              visited[vertex] = true;
              result.push(vertex)
              //why doesnt this work?
              // for(const el of adjacencyList[vertex]){
              //     console.log(visited[el])
              //     if(!visited[el]) return dfsHelper(el)
              // }
              adjacencyList[vertex].forEach(el => {
                  if (!visited[el])return dfsHelper(el)
              })
          } 
      dfsHelper(start)
      return result
  }
  //iterative depth first
  depthFirstIterative(start){
      let result = []
      let stack = [start]
      let visited = {}
      let current
      visited[start] = true
      while(stack.length){
         current = stack.pop()
          result.push(current)
          this.adjacencyList[current].forEach(el => {
              if(!visited[el]){
                  visited[el] = true
                  stack.push(el)  
              }
          })
      }
      return result
  }
}