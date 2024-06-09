export const excludeKey = (payload, toExclude) => {
if (!payload || !toExclude) return

  const updatedPayload = { ...payload };

  if (updatedPayload.hasOwnProperty(toExclude)) {
    delete updatedPayload[toExclude];
  }

  return updatedPayload
};
