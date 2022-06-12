export const removeByAttr = function (
  arr: any,
  attr: any,
  value: any
): unknown {
  var i = arr.length;
  while (i--) {
    if (
      arr[i] &&
      arr[i].hasOwnProperty(attr) &&
      arguments.length > 2 &&
      arr[i][attr] === value
    ) {
      arr.splice(i, 1);
    }
  }
  return arr;
};
export function containsObject(obj: Record<string, unknown>, list: Array<any>) {
  var i;
  for (i = 0; i < list.length; i++) {
    if (list[i].email === obj.email) {
      return true;
    }
  }

  return false;
}
