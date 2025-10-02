const randChoice = <T>(arr: T[]) => {
  return arr[Math.floor(Math.random() * arr.length)];
};

export { randChoice };
