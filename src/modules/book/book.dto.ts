import { IsDefined, IsString, MinLength } from 'class-validator';
import { BookUserStatus } from 'src/entities/user-book-status-link.entity';


export class CreateBookDto {
  @IsString()
  @IsDefined()
  @MinLength(3)
  name: string;

  @IsString()
  @IsDefined()
  description: string;
}

export class GetAllBooksQueryDto {
  user_id?: string;
  book_user_status?: BookUserStatus | 'own';
}
