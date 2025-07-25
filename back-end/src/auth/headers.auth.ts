import { Response } from 'express';

export function setAuthHeaders(res: Response, token: string): Response {
  res.removeHeader('Authorization');
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  res.setHeader('Authorization', token);
  return res;
}
