import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Follow } from './entities/follow.entity';
import { User } from '../user/entities/user.entity';

@Injectable()
export class FollowsService {
  constructor(
    @InjectRepository(Follow)
    private followsRepository: Repository<Follow>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async followUser(followerId: number, followingId: number): Promise<Follow> {
    if (followerId === followingId) {
      throw new BadRequestException("You can't follow yourself");
    }

    const follower = await this.usersRepository.findOne({ where: { id: followerId } });
    const following = await this.usersRepository.findOne({ where: { id: followingId } });

    if (!follower || !following) {
      throw new NotFoundException('User not found');
    }

    const existingFollow = await this.followsRepository.findOne({
      where: { follower: { id: followerId }, following: { id: followingId } },
    });

    if (existingFollow) {
      throw new BadRequestException('You are already following this user');
    }

    const follow = this.followsRepository.create({ follower, following });
    return this.followsRepository.save(follow);
  }

  async unfollowUser(followerId: number, followingId: number): Promise<void> {
    const follow = await this.followsRepository.findOne({
      where: { follower: { id: followerId }, following: { id: followingId } },
    });

    if (!follow) {
      throw new NotFoundException("You are not following this user");
    }

    await this.followsRepository.remove(follow);
  }

  async getFollowers(userId: number): Promise<User[]> {
    const followers = await this.followsRepository.find({
      where: { following: { id: userId } },
      relations: ['follower'],
    });
    return followers.map((follow) => follow.follower);
  }

  async getFollowing(userId: number): Promise<User[]> {
    const followings = await this.followsRepository.find({
      where: { follower: { id: userId } },
      relations: ['following'],
    });
    return followings.map((follow) => follow.following);
  }
}
