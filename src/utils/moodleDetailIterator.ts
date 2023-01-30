interface Arr {
  data: string;
  name: string;
}
export function arrayArranger(arr: Arr[]) {
  const tt = arr.map((item) => {
    let dd: any = {};
    dd[item.name] = item.data;
    return dd;
  });
  const newObj = Object.assign({}, ...tt);
  return newObj;
}
