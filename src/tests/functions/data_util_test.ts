import { isValidDate } from "@/functions/date_util.ts";
import { assert } from "@std/assert";

Deno.test("isValidDate: 正当な日付", () => {
  const value = "2018-01-01";

  assert(isValidDate(new Date(value)));
});

Deno.test("isValidDate: 不正な日付", () => {
  const value = "2018-2-29";

  assert(isValidDate(new Date(value)));
});
