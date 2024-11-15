import { Controller, Post, Delete, Param, UseGuards, Request } from '@nestjs/common';
import { FollowsService } from './follows.service';
import { AuthGuard } from '../auth/guards/auth.guard';

@Controller('follows')
// @UseGuards(AuthGuard)
export class FollowsController {
  constructor(private readonly followsService: FollowsService) {}

  @Post(':followingId')
  async followUser(@Request() req, @Param('followingId') followingId: number) {
    const followerId = req.user?.id;
    // if (!followerId) { activate apre la la reponce de bnr a votre quetion de jwt et le postman tu a aussi la comments
    if (followerId) {
      throw new Error('User ID not found in request');
    }
    return this.followsService.followUser(followerId, followingId);
  }

  @Delete(':followingId')
  async unfollowUser(@Request() req, @Param('followingId') followingId: number) {
    const followerId = req.user?.id;
    if (!followerId) {
      throw new Error('User ID not found in request');
    }
    return this.followsService.unfollowUser(followerId, followingId);
  }
}
