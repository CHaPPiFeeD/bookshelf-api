import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';


@Injectable()
export class UserRepository {
  @InjectRepository(User)
  private userRepository: Repository<User>;

  public async getOrCreateUser(data) {
    const candidate = await this.userRepository.findOne({
      where: { email: data.email },
    });
    if (candidate) return candidate;
    const user = this.userRepository.create({
      name: data.name,
      email: data.email,
    });
    await this.userRepository.save(user);
    return this.getUserById(user.id);
  }

  public getUserById(id: string): Promise<any> {
    return this.userRepository.findOne({ where: { id } });
  }
}
