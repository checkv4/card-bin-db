import { lookupBin } from "../dist";

console.log(await lookupBin("440393"))
console.log(await lookupBin("440393", "pst"))
console.log(await lookupBin("411111"))
console.log(await lookupBin("411111", "pst"))