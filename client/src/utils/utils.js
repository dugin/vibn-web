import latinize from 'latinize';

export const removeAccentAndSpace = str => {
  return latinize(str.toLowerCase().replace(/\s/g, ''));
};

export const addOrRemoveFromArray = (arr, name) => {
  console.log(arr);

  return arr.findIndex(l => l.localeCompare(name) === 0) > -1
    ? arr.filter(l => l.localeCompare(name) !== 0)
    : [...arr, name];
};
