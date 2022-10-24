export const removeNonRecordValues = (
  o: Record<string, unknown>
): Record<string, unknown> => {
  return Object.fromEntries(
    Object.entries(o).map(([k, v]) => {
      if (Array.isArray(v)) {
        return [k, []];
      }

      if (typeof v === 'object' && v !== null) {
        return [k, removeNonRecordValues(v as Record<string, unknown>)];
      }

      return [k, ''];
    })
  );
};

export const traverse = (o: Record<string, unknown>, p = ''): string =>
  (
    Object.entries(o)
      .map(([k, v]) => {
        const key = (p + k).toUpperCase();

        if (Array.isArray(v)) {
          return `${key}="${v.join(',')}"`;
        }

        if (typeof v === 'object' && v !== null) {
          return traverse(v as Record<string, unknown>, `${key}_`);
        }

        return `${key}="${v}"`;
      })
      .flat(Infinity) as readonly string[]
  ).join('\n');
