import { Controller, Post, Get, Param, Body, UseGuards, Request } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { AuthGuard } from '../auth/guards/auth.guard';
import { CreateCommentDto } from './dto/create-comment.dto';
import { User } from '../user/entities/user.entity';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @UseGuards(AuthGuard)
  @Post(':postId')
  async createComment(
    @Request() req, // Utiliser `req` pour récupérer l'utilisateur connecté
    @Param('postId') postId: number,
    @Body() createCommentDto: CreateCommentDto,
  ) {
    const user: User = req.user;
    // if (!user) { active apre la question avec bnr systeme de follows 
    if (!user){
      throw new Error('Utilisateur non authentifié');
    }
    return this.commentsService.createComment(user, postId, createCommentDto.content);
  }

  @Get('post/:postId')
  async getCommentsForPost(@Param('postId') postId: number) {
    return this.commentsService.getCommentsForPost(postId);
  }
}
