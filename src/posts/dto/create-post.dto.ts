import { IsNotEmpty, IsEnum, IsString } from 'class-validator';
import { PostCategory } from '../entities/post.entity';

export class CreatePostDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  content: string;

  @IsNotEmpty()
  @IsEnum(PostCategory)
  category: PostCategory;
}
