export const generateArray = (from:number, to:number) => {
  let array = Array.from(Array(to).keys());
  for (let i = from; i < to; i++) {
    array[i]+=from;
  };
  let top = array.length;
  if(top) while(--top) {
    let random = Math.random();
    random = random === 0 ? 1 : random;
    const current = Math.floor(Math.random() * (top + 1));
    const tmp:number = array[current];
    array[current] = array[top];
    array[top] = tmp;
  }
  return array;
}