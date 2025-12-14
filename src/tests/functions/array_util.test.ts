import { hasDuplicateValue } from "@/functions/array_util.ts";
import { assert, assertFalse } from "@std/assert";

Deno.test("hasDuplicateValue: Test string number list has duplicated value", () => {
  const array1 = ["1", "2", "3", "4", "5"];
  const array2 = ["5", "6", "7", "8", "9"];

  assert(hasDuplicateValue(array1, array2));
});

Deno.test("hasDuplicateValue: Test string number list has not duplicated value", () => {
  const array1 = ["1", "2", "3", "4", "5"];
  const array2 = ["6", "7", "8", "9", "0"];

  assertFalse(hasDuplicateValue(array1, array2));
});
