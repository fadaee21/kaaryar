import { OptionsString } from "../model";

export function getLabel(
  value: string | undefined,
  opt: OptionsString[]
): string | undefined {
  const option = opt.find((o) => o.value === value);
  return option ? option.label : undefined;
}
