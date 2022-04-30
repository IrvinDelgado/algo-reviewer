export const generateArray = (from:number, to:number) => {
  const array = Array.from(Array(to).keys()).map(num=>num+from);
  let top = array.length;
  while(top > 0) {
    top--;
    const current = Math.floor(Math.random() * (top + 1));
    [array[current], array[top]] = [array[top], array[current]];
  }
  return array;
}