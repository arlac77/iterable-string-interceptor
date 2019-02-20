export async function* it(a) {
  for (const c of a) {
    yield c;
  }
}

export async function collect(a) {
  const parts = [];
  for await (const c of a) {
    parts.push(c);
  }

  return parts.join("");
}
