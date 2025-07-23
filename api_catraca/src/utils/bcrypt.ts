import * as bcrypt from 'bcrypt';

export const generateHashBcrypt = async (password: string): Promise<string> => {
  return await bcrypt.hash(password, 10);
};

export const compareHashBcrypt = async (password: string, hash: string): Promise<boolean> => {
  const response = await bcrypt.compare(password, hash);
  return response;
};
