export const formatFileSizeWithLabels = (size: number) => {
  if (size < 1024) {
    return `${size} б`;
  }

  let label = 'кб';
  let value = size / 1024;

  if (value >= 1024) {
    label = 'мб';
    value = size / 1024 / 1024;

    if (value >= 1024) {
      label = 'гб';
      value = size / 1024 / 1024 / 1024;
    }
  }

  return new Intl.NumberFormat('ru-RU', { maximumFractionDigits: 2 }).format(value) + ' ' + label;
};
