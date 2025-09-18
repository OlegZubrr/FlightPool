class NullChecker {
  constructor() {
    throw new Error("Cannot instantiate static class");
  }

  static defaultIfEmpty = (valueList) => {
    for (const { value, defaultValue } of valueList) {
      if (value === null || value === undefined || value === "") {
        return defaultValue;
      }
    }
    return "";
  };
}

export { NullChecker };
