import { Repository } from 'typeorm';


export const getRandomAlNumString = (len: number) => {
  const _chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  return Array.from(Array(len))
    .map(() => _chars[Math.floor(Math.random() * _chars.length)])
    .join('');
};

export const generateGuid = async (
  repository: Repository<any>,
  key: string,
  len = 4,
): Promise<string> => {
  let guid: string;
  while (!(guid && !(await repository.findOne({ where: { [key]: guid }})))) {
    guid = getRandomAlNumString(len);
  }
  return guid;
};
