const randChoice = <T>(arr: T[]) => {
  return arr[Math.floor(Math.random() * arr.length)];
};

const randomPage = (count: number) => {
  return Math.floor(Math.random() * count) + 1;
};

export { randChoice, randomPage };
