import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/entities/Users';
import { Channels } from 'src/entities/Channels';
import { WorkspaceMembers } from 'src/entities/WorkspaceMembers';
import { DMs } from 'src/entities/DMs';

@Module({
  imports: [TypeOrmModule.forFeature([Users, Channels, WorkspaceMembers, DMs])],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
