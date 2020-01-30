// not my code, source: http://www.robweir.com/blog/2010/02/microsoft-random-browser-ballot.html
const shuffleArray = arr => arr
.map(a => [Math.random(), a])
.sort((a, b) => a[0] - b[0])
.map(a => a[1]);

// get random item from array
export const getRandom = (array) => {  
    const length = array.length;
    const randomIndex = Math.floor(Math.random() * length);
    return array[randomIndex];
  };