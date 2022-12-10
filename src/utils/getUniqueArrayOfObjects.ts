export const getUniqueArrayOfObjects = <T>(array: T[], key: string): T[] => {
  return [
    ...new Map([...array].map((item: any) => [item[key], item])).values(),
  ];
};
