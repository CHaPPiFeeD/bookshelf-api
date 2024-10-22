import { Controller, Get, Inject, Param, Put, Query } from '@nestjs/common';
import { UserProfile } from 'src/interfaces/user.interface';
import { UserService } from './user.service';
import { GetUsersQueryDto, UpdateUserDto } from './user.dto';
import { User } from 'src/entities/user.entity';


@Controller('/api/user')
export class UserController {
  @Inject(UserService)
  private userService: UserService;

  @Get()
  getUsers(@Query() query: GetUsersQueryDto): Promise<User[]> {
    return this.userService.getUsers(query);
  }

  @Get(':id')
  getUserProfile(@Param('id') userId: string): Promise<UserProfile> {
    return this.userService.getUserProfile(userId);
  }

  @Put(':id')
  async updateUserProfile(@Param('id') userId: string, data: UpdateUserDto): Promise<void> {
    await this.updateUserProfile(userId, data);
  }
}
