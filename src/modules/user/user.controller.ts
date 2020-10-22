import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { users } from '@prisma/client';
import { OmitSecrets } from 'src/modules/prisma/prisma.interface';
import { CursorPipe } from 'src/pipes/cursor.pipe';
import { OptionalIntPipe } from 'src/pipes/optional-int.pipe';
import { OrderByPipe } from 'src/pipes/order-by.pipe';
import { WherePipe } from 'src/pipes/where.pipe';
import { UsersService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private usersService: UsersService) {}

  @Get()
  async getAll(
    @Query('skip', OptionalIntPipe) skip?: number,
    @Query('take', OptionalIntPipe) take?: number,
    @Query('cursor', CursorPipe) cursor?: Record<string, number | string>,
    @Query('where', WherePipe) where?: Record<string, number | string>,
    @Query('orderBy', OrderByPipe) orderBy?: Record<string, 'asc' | 'desc'>,
  ): Promise<OmitSecrets<users>[]> {
    return this.usersService.users({ skip, take, orderBy, cursor, where });
  }

  @Get(':id')
  async get(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<OmitSecrets<users>> {
    return this.usersService.user({ id: Number(id) });
  }
}
