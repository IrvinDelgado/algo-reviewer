import { generateArray } from "./helpers";
test('generate unique array from 1 to 10', () => {
  const uniqueArray = new Set(Array.from(Array(10).keys()).map(num=>num+1));
  const genArrayToSet = new Set(generateArray(1,10));
  const isGood = uniqueArray.size === genArrayToSet.size;
  expect(isGood).toBeTruthy();
});