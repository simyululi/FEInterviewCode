console.log(shuffle([1, 2, 3, 4, 5]));

function shuffle(arr) {
  arr.forEach((element, index) => {
    if (index !== 0) {
      const randomIndex = Math.floor(Math.random() * (index + 1));
  
      swap(arr, index, randomIndex);
    }
  });

  return arr;
}
function swap(arr, indexA, indexB) {
  [arr[indexA], arr[indexB]] = [arr[indexB], arr[indexA]];
}

