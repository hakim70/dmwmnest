import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateFollowDto {
  @IsNotEmpty()
  @IsNumber()
  followingId: number;
}
