interface Arr {
  field: {
    name: string;
    id: number;
  };
  data: string;
}
export function arrayArranger(arr: Arr[]) {
  const tt = arr.map((item) => {
    let dd: any = {};
    dd[item.field.name] = item.data;
    return dd;
  });
  const newObj = Object.assign({}, ...tt);
  return newObj;
}
