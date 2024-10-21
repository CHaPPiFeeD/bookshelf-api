import { Inject, Injectable } from '@nestjs/common';
import { UserProfile } from 'src/repositories/user/user.interface';
import { UserRepository } from 'src/repositories/user/user.repository';


@Injectable()
export class UserService {
  @Inject(UserRepository)
  private userRepository: UserRepository;

  getUser(userId: string): any {
    return this.userRepository.getUserById(userId);
  }

  getUserProfile(userId: string): Promise<UserProfile> {
    return this.userRepository.getUserProfileById(userId);
  }
}
