type TOptionSource = {
  id: string | number;
  name: string;
};

const mappedOptions = <T extends TOptionSource>(list: T[]) => {
  return list.map((element: T) => ({
    label: element.name,
    value: element.id,
  }));
};

const snakeToCamel = (string: string) => {
  const splitStringArr = string.split("_");
  return splitStringArr.reduce((acc, curr, i) => {
    curr = i !== 0 ? curr[0].toUpperCase() + curr.slice(1) : curr;
    return acc + curr;
  }, "");
};

const convertSnakeToCamel = (obj: Record<string, unknown>) => {
  const parentKeys = Object.keys(obj);
  parentKeys.forEach((key) => {
    const currentObj = obj[key];
    delete obj[key];
    const newKey = snakeToCamel(key);
    obj[newKey] = currentObj;
    if (obj[newKey] && typeof obj[newKey] === "object") {
      convertSnakeToCamel(obj[newKey] as Record<string, unknown>);
    }
  });
  return obj;
};

const formatDate = (date: Date) => {
  if (!date) {
    return undefined;
  }
  return date.toISOString().split("T")[0];
};

const convertCamelToSnake = (obj: Record<string, string | number>) =>
  Object.keys(obj).reduce((acc: Record<string, string | number>, k) => {
    acc[k.replace(/([a-zA-Z])(?=[A-Z])/g, "$1_").toLowerCase()] = obj[k];
    return acc;
  }, {});

export { convertCamelToSnake, convertSnakeToCamel, formatDate, mappedOptions };
