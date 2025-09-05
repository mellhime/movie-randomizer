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

export { mappedOptions };
