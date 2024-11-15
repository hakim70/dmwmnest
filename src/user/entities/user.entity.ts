import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Post } from '../../posts/entities/post.entity';
import{Comment} from '../../comments/entities/comment.entity'
import { Follow } from '../../follows/entities/follow.entity';

export enum Role {
  USER = 'user',
  ADMIN = 'admin',
  MODERATOR = 'moderator',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

//   @Column({ type: 'varchar', length: 30 })
  name: string;

  @Column({ type: 'varchar', length: 15, unique: true })
  username: string;

  @Column({ type: 'varchar', length: 40, unique: true })
  email: string;

  @Column({ type: 'int', nullable: true })
  age: number;

  @Column()
  password: string;

  @Column({ type: 'enum', enum: ['m', 'f', 'u'], default: 'u' })
  gender: string;

  @Column({ type: 'enum', enum: Role, default: Role.USER })
  role: Role;

  // Relation avec les posts
  @OneToMany(() => Post, (post) => post.author)
  posts: Post[];

  @OneToMany(() => Comment, (comment) => comment.author)
  comments: Comment[];

  @OneToMany(() => Follow, (follow) => follow.follower)
  followings: Follow[];

  @OneToMany(() => Follow, (follow) => follow.following)
  followers: Follow[];
}

