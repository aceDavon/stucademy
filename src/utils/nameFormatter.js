export function nameCase(names) {
  if (!names) return;
  names = names.toLowerCase().split(" ");

  for (let i = 0; i < names.length; i++) {
    names[i] = names[i].charAt(0).toUpperCase() + names[i].slice(1);
  }
  return names.join(" ");
}
