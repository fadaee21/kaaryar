import { OptionsString } from "../model";

export function getLabel(
  value: string | undefined,
  opt: OptionsString[]
): string | undefined {
  let val = [];
  let lab = [];
  for (let i = 0; i < opt.length; i++) {
    val.push(opt[i].value);
    lab.push(opt[i].label);
    switch (value) {
      case val[i]:
        return lab[i];
    }
  }
}
