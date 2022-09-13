let colors: string[] = ["green", "yellow", "orange", "violet"];

export const getColors = (): string[] => {
  const resColors = [...colors];
  return resColors;
};

export const postColor = (color: string): string[] => {
  colors.push(color);
  for (let i = 0; i < colors.length; i++) {
    console.log(`%c${colors[i]}`, `color:${colors[i]}`);
  }
  return colors;
};