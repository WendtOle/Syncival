export function toRecord<T, K extends string | number | symbol>(
  array: T[],
  keyExtractor: (item: T) => K,
): Record<K, T> {
  return array.reduce(
    (record, item) => {
      const key = keyExtractor(item);
      record[key] = item;
      return record;
    },
    {} as Record<K, T>,
  );
}
