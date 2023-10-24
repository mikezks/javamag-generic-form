
export function injectUniqueId(): { uniqueId: number } {
  const id = new Date().getTime();

  return {
    uniqueId: id
  };
}
