type ClassValue =
  | string
  | number
  | boolean
  | undefined
  | null
  | Record<string, unknown>
  | ClassValue[];

function toVal(mix: ClassValue): string {
  let str = '';

  if (typeof mix === 'string') {
    return mix;
  }

  if (typeof mix === 'number') {
    return String(mix);
  }

  if (typeof mix === 'object' && mix !== null) {
    if (Array.isArray(mix)) {
      for (const item of mix) {
        if (item) {
          const y = toVal(item);
          if (y) {
            str = str ? `${str} ${y}` : y;
          }
        }
      }
    } else {
      for (const key in mix) {
        if (Object.prototype.hasOwnProperty.call(mix, key) && mix[key]) {
          str = str ? `${str} ${key}` : key;
        }
      }
    }
  }

  return str;
}

export function cn(...args: ClassValue[]): string {
  let str = '';

  for (const arg of args) {
    if (arg) {
      const x = toVal(arg);
      if (x) {
        str = str ? `${str} ${x}` : x;
      }
    }
  }

  return str;
}

export default cn;
