/** AOC parsing utilities */

function sanitise(v) {
  v = v.trim();
  return isNaN(v) ? v : parseFloat(v);
}

function getLinebreak(input) {
  return input.indexOf('\r\n') !== -1 ? '\r\n' : '\n';
}

function splitNewline(input) {
  const br = getLinebreak(input);
  const res =  input.trim().split(br);
  return res.map(v => sanitise(v));
}

function splitDoubleNewline(input) {
  const br = getLinebreak(input);
  const res = input.trim().split(br + br)
  return res.map(v => sanitise(v));
}

function splitComma(input) {
  const res = input.trim().split(',');
  return res.map(v => sanitise(v));
}

function keyValue(input, delim) {
  const split = input.trim().split(delim);
  const key = split[0];
  const value = sanitise(split.length > 1 ? split[1] : null);
  return { key, value };
}

function replaceAll(input, a, b) {
  const re = new RegExp(a, 'g');
  return input.replace(re, b);
}

function toNumbers(arr) {
  return arr.map(el => {
    return isNaN(el.trim()) ? el : parseFloat(el.trim());
  });
}

export {
  splitNewline,
  splitDoubleNewline,
  splitComma,
  keyValue,
  replaceAll,
  toNumbers
};
