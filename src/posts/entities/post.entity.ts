import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn ,OneToMany } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import {Comment} from 'src/comments/entities/comment.entity';

export enum PostCategory {
  ARTICLE = 'article',
  QUESTION = 'question',
  PROJECT_IDEA = 'project_idea',
}

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100 })
  title: string;

  @Column({ type: 'text' })
  content: string;

  @Column({ type: 'enum', enum: PostCategory })
  category: PostCategory;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.posts, { eager: true, onDelete: 'CASCADE' })
  author: User;

  @OneToMany(() => Comment, (comment) => comment.post)
  comments: Comment[];
}
