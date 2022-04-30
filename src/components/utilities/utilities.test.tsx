import { generateArray } from "./helpers";
test('generate unique array', () => {
  const generatedArray = generateArray(1,10);
  const setArray = new Set(generatedArray);
  const array = Array.from(Array(10).keys());
  const isGood = setArray.size === array.length;
  expect(isGood).toBeTruthy();
});