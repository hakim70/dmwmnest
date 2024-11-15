import { Entity, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn } from 'typeorm';
import { User } from 'src/user/entities/user.entity';

@Entity()
export class Follow {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.followings, { onDelete: 'CASCADE' })
  follower: User;

  @ManyToOne(() => User, (user) => user.followers, { onDelete: 'CASCADE' })
  following: User;

  @CreateDateColumn()
  createdAt: Date;
}
