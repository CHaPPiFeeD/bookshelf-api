import { Controller, Get, Inject, Param } from '@nestjs/common';
import { UserProfile } from 'src/repositories/user/user.interface';
import { UserService } from './user.service';


@Controller('/api/user')
export class UserController {
  @Inject(UserService)
  private userService: UserService;

  @Get(':id')
  getUserProfile(@Param('id') userId: string): Promise<UserProfile> {
    return this.userService.getUserProfile(userId);
  }
}
