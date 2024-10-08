/* eslint-disable @typescript-eslint/no-explicit-any */
const sanitizeText = (text: any): any => {
  if (typeof text === 'string') {
    return text.replace(/[\r\n]+/g, '');
  }
  return String(text);
};

const cleanData = (item: any): any => {
  const dateKey = Object.keys(item).find((key) =>
    key.startsWith('Todas as expressões'),
  );
  const dataValue = dateKey ? sanitizeText(item[dateKey]) : '';

  const cleanedItem = {
    Data: dataValue || item['Data'],
    Processo: sanitizeText(item['Processo'] || item['__EMPTY']),
    'Órgão Julgador': sanitizeText(item['Órgão julgador'] || item['__EMPTY_1']),
    Partes: sanitizeText(item['Partes'] || item['__EMPTY_2']),
    Classe: sanitizeText(item['Classe'] || item['__EMPTY_3']),
    'Tipo de audiência': sanitizeText(
      item['Tipo de audiência'] || item['__EMPTY_4'],
    ),
    Sala: sanitizeText(item['Sala'] || item['__EMPTY_5']),
    Situação: sanitizeText(item['Situação'] || item['__EMPTY_6']),
  };

  return cleanedItem;
};

export const cleanDataSet = (dataSet: any[]): any[] => {
  return dataSet.map(cleanData);
};
