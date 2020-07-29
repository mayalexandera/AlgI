class Merge {

  //this is equivalent to bfs/dfs 'start' function
  mergeSort (array) {
    if (array.length < 2) {
      return array;
    }
    let mid = Math.floor(array.length / 2);
    let left = mergeSort(array.slice(0, mid));
    let right = mergeSort(array.slice(mid));
    return merge(left, right);
  }
  //mergeSort requires a helper function, merge - who will keep sorting the sliced subarrays until they are completely sorted.
  merge (subArray1, subArray2) {
    let resultList = [];

    while (subArray1.length > 0 && subArray2.length > 0)
    resultList.push(subArray1[0] < subArray2[0]? subArray1.shift() : subArray2.shift());
    return resultList.concat(subArray1.length ? subArray1 : subArray2);
  }

}

//testing testing
//let array = [4,5,22,35,6,8,1,0,87];
//let sorted = mergeSort(array)
//console.log(sorted)

export default Merge;