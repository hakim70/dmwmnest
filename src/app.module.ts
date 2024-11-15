import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { PostsModule } from './posts/posts.module';
import { CommentsModule } from './comments/comments.module';
import { User } from './user/entities/user.entity';
import { Post } from './posts/entities/post.entity';
import { Comment } from './comments/entities/comment.entity';
import { FollowsModule } from './follows/follows.module';
import { Follow } from './follows/entities/follow.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5433,
      username: 'postgres',
      password: 'jn6ft3yb',
      database: 'dmwm',
      entities: [User, Post, Comment,Follow],
      synchronize: true,
    }),
    UserModule,
    AuthModule,
    PostsModule,
    CommentsModule,
    FollowsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
