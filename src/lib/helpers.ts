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

const formatDate = (date: Date) => {
  return date.toISOString().split("T")[0];
};

export { formatDate, mappedOptions };
