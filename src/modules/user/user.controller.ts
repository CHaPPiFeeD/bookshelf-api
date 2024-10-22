import { Controller, Get, Inject, Param, Put } from '@nestjs/common';
import { UserProfile } from 'src/interfaces/user.interface';
import { UserService } from './user.service';
import { UpdateUserDto } from './user.dto';


@Controller('/api/user')
export class UserController {
  @Inject(UserService)
  private userService: UserService;

  @Get(':id')
  getUserProfile(@Param('id') userId: string): Promise<UserProfile> {
    return this.userService.getUserProfile(userId);
  }

  @Put(':id')
  async updateUserProfile(@Param('id') userId: string, data: UpdateUserDto): Promise<void> {
    await this.updateUserProfile(userId, data);
  }
}
