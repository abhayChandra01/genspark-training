// array of numbers
const numberArray: number[] = [1, 2, 3, 4, 5];
console.log("Initial numberArray:", numberArray);

// array of objects
const objectArray: { id: number; name: string }[] = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
  { id: 3, name: "Charlie" },
];
console.log("Initial objectArray:", objectArray);

// PUSH
numberArray.push(6);
console.log("After PUSH on numberArray:", numberArray);

objectArray.push({ id: 4, name: "David" });
console.log("After PUSH on objectArray:", objectArray);

// POP
numberArray.pop();
console.log("After POP on numberArray:", numberArray);

objectArray.pop();
console.log("After POP on objectArray:", objectArray);

// UNSHIFT
numberArray.unshift(0);
console.log("After UNSHIFT on numberArray:", numberArray);

objectArray.unshift({ id: 0, name: "Eve" });
console.log("After UNSHIFT on objectArray:", objectArray);

// SHIFT
numberArray.shift();
console.log("After SHIFT on numberArray:", numberArray);

objectArray.shift();
console.log("After SHIFT on objectArray:", objectArray);

// MAP
const doubledNumbers = numberArray.map((num) => num * 2);
console.log("After MAP (doubled) on numberArray:", doubledNumbers);

const nameList = objectArray.map((obj) => obj.name);
console.log("After MAP (names) on objectArray:", nameList);

// FILTER
const evenNumbers = numberArray.filter((num) => num % 2 === 0);
console.log("After FILTER (even numbers) on numberArray:", evenNumbers);

const filteredObjects = objectArray.filter((obj) => obj.id > 1);
console.log("After FILTER (id > 1) on objectArray:", filteredObjects);

// REDUCE
const sum = numberArray.reduce((acc, curr) => acc + curr, 0);
console.log("After REDUCE (sum) on numberArray:", sum);

const namesCombined = objectArray.reduce(
  (acc, obj) => acc + obj.name + " ",
  ""
);
console.log(
  "After REDUCE (concatenate names) on objectArray:",
  namesCombined.trim()
);

// SLICE
const slicedNumbers = numberArray.slice(1, 3);
console.log("After SLICE (1,3) on numberArray:", slicedNumbers);

const slicedObjects = objectArray.slice(0, 2);
console.log("After SLICE (0,2) on objectArray:", slicedObjects);

// SPLICE
numberArray.splice(1, 2);
console.log(
  "After SPLICE (remove 2 from index 1) on numberArray:",
  numberArray
);

objectArray.splice(1, 1, { id: 99, name: "Zara" });
console.log("After SPLICE (replace at index 1) on objectArray:", objectArray);

// FOREACH
console.log("FOREACH on numberArray:");
numberArray.forEach((num) => console.log("Number:", num));

console.log("FOREACH on objectArray:");
objectArray.forEach((obj) => console.log("Object Name:", obj.name));

// CONCAT
const extendedNumbers = numberArray.concat([6, 7, 8]);
console.log("After CONCAT on numberArray:", extendedNumbers);

// EVERY
const allPositive = numberArray.every((num) => num > 0);
console.log("After EVERY (all positive) on numberArray:", allPositive);

// SOME
const hasNegative = numberArray.some((num) => num < 0);
console.log("After SOME (any negative) on numberArray:", hasNegative);

// SORT
const sortedNumbers = [...numberArray].sort((a, b) => b - a);
console.log("After SORT (descending) on numberArray:", sortedNumbers);

const sortedObjects = [...objectArray].sort((a, b) =>
  a.name.localeCompare(b.name)
);
console.log("After SORT (by name) on objectArray:", sortedObjects);
