import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { UserProfile } from '../interfaces/user.interface';


@Injectable()
export class UserRepository extends Repository<User> {
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

  public getUserProfileById(id: string): Promise<UserProfile> {
    return this.userRepository.createQueryBuilder('u')
      .select(['u.id as user_id', 'u.name as user_name', '(SELECT COUNT(b.id) FROM book b WHERE b.user_id = u.id) AS books_count'])
      .where('u.id = :userId')
      .setParameters({ userId: id })
      .getRawOne();
  }
}
