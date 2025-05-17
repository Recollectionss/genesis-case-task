import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserProvider } from './user.providers';

@Module({
  providers: [UserService, ...UserProvider],
  exports: [UserService],
})
export class UserModule {}
