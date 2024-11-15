// src/posts/posts.controller.ts

import { Controller, Post, Body, Get, Param, UseGuards, Req } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { AuthGuard } from '../auth/guards/auth.guard';
import { Request } from 'express';
import { User } from '../user/entities/user.entity';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  // @UseGuards(AuthGuard)
  @Post()
  async createPost(@Body() createPostDto: CreatePostDto, @Req() req: Request) {
    const user = req.user as User;
    return await this.postsService.createPost(createPostDto, user);
  }

  @Get()
  async getAllPosts() {
    return await this.postsService.getAllPosts();
  }

  @Get(':id')
  async getPostById(@Param('id') id: number) {
    return await this.postsService.getPostById(id);
  }
}