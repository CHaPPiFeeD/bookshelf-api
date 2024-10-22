import { Inject, Injectable } from '@nestjs/common';
import { API_ERROR_CODES } from 'src/constants/error-codes';
import { CreateException } from 'src/exceptions/exception';
import { UserProfile } from 'src/interfaces/user.interface';
import { UserRepository } from 'src/repositories/user.repository';
import { GetUsersQueryDto, UpdateUserDto } from './user.dto';
import { User } from 'src/entities/user.entity';


@Injectable()
export class UserService {
  @Inject(UserRepository)
  private userRepository: UserRepository;

  getUsers(filters: GetUsersQueryDto): Promise<User[]> {
    return this.userRepository.findBy(filters);
  }

  getUser(userId: string): any {
    return this.userRepository.getUserById(userId);
  }

  getUserProfile(userId: string): Promise<UserProfile> {
    return this.userRepository.getUserProfileById(userId);
  }

  async updateUserProfile(userId: string, data: UpdateUserDto): Promise<void> {
    const candidate = await this.userRepository.countBy({ id: userId });
    if (!candidate) throw new CreateException(API_ERROR_CODES.USER_NOT_FOUND);
    await this.userRepository.update({ id: userId }, data);
  }
}
