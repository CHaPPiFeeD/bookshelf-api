import { User } from 'src/entities/user.entity';


export type IRequest = Request & {
  remote_user: any;
  user: User;
};
