import * as jwt from 'jsonwebtoken';


export function decode(token: string): any {
  return jwt.decode(token);
}
