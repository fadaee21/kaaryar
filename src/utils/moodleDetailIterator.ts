interface Arr {
  field: {
    name: string;
    id: number;
  };
  data: string;
}
export function arrayArranger(arr: Arr[] | undefined) {
  const tt = arr?.map((item) => {
    let dd: any = {};
    dd[item.field.name] = item.data;
    return dd;
  });
  const newObj = tt && Object.assign({}, ...tt);
  return newObj;
}
