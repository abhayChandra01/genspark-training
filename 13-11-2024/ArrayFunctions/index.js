var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
// array of numbers
var numberArray = [1, 2, 3, 4, 5];
console.log("Initial numberArray:", numberArray);
// array of objects
var objectArray = [
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
var doubledNumbers = numberArray.map(function (num) { return num * 2; });
console.log("After MAP (doubled) on numberArray:", doubledNumbers);
var nameList = objectArray.map(function (obj) { return obj.name; });
console.log("After MAP (names) on objectArray:", nameList);
// FILTER
var evenNumbers = numberArray.filter(function (num) { return num % 2 === 0; });
console.log("After FILTER (even numbers) on numberArray:", evenNumbers);
var filteredObjects = objectArray.filter(function (obj) { return obj.id > 1; });
console.log("After FILTER (id > 1) on objectArray:", filteredObjects);
// REDUCE
var sum = numberArray.reduce(function (acc, curr) { return acc + curr; }, 0);
console.log("After REDUCE (sum) on numberArray:", sum);
var namesCombined = objectArray.reduce(function (acc, obj) { return acc + obj.name + " "; }, "");
console.log("After REDUCE (concatenate names) on objectArray:", namesCombined.trim());
// SLICE
var slicedNumbers = numberArray.slice(1, 3);
console.log("After SLICE (1,3) on numberArray:", slicedNumbers);
var slicedObjects = objectArray.slice(0, 2);
console.log("After SLICE (0,2) on objectArray:", slicedObjects);
// SPLICE
numberArray.splice(1, 2);
console.log("After SPLICE (remove 2 from index 1) on numberArray:", numberArray);
objectArray.splice(1, 1, { id: 99, name: "Zara" });
console.log("After SPLICE (replace at index 1) on objectArray:", objectArray);
// FOREACH
console.log("FOREACH on numberArray:");
numberArray.forEach(function (num) { return console.log("Number:", num); });
console.log("FOREACH on objectArray:");
objectArray.forEach(function (obj) { return console.log("Object Name:", obj.name); });
// CONCAT
var extendedNumbers = numberArray.concat([6, 7, 8]);
console.log("After CONCAT on numberArray:", extendedNumbers);
// EVERY
var allPositive = numberArray.every(function (num) { return num > 0; });
console.log("After EVERY (all positive) on numberArray:", allPositive);
// SOME
var hasNegative = numberArray.some(function (num) { return num < 0; });
console.log("After SOME (any negative) on numberArray:", hasNegative);
// SORT
var sortedNumbers = __spreadArray([], numberArray, true).sort(function (a, b) { return b - a; });
console.log("After SORT (descending) on numberArray:", sortedNumbers);
var sortedObjects = __spreadArray([], objectArray, true).sort(function (a, b) {
    return a.name.localeCompare(b.name);
});
console.log("After SORT (by name) on objectArray:", sortedObjects);
