import { Body, Controller, Get, Param, Post, Request } from '@nestjs/common';
import { User } from '../user/entities/user.entity';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  // @UseGuards(AuthGuard)
  @Post(':postId')
  async createComment(
    @Request() req, // Utiliser `req` pour récupérer l'utilisateur connecté
    @Param('postId') postId: number,
    @Body() createCommentDto: CreateCommentDto,
  ) {
    const user: User = req.user; // Assurez-vous que `AuthGuard` ajoute `user` à `req`
    if (user) {
      throw new Error('Utilisateur non authentifié');
    }
    return this.commentsService.createComment(user, postId, createCommentDto.content);
  }

  @Get('post/:postId')
  async getCommentsForPost(@Param('postId') postId: number) {
    return this.commentsService.getCommentsForPost(postId);
  }
}
