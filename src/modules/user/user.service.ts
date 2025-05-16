import { Inject, Injectable } from '@nestjs/common';
import { USER_REPOSITORY } from './user.providers';
import { User } from './entity/user.entity';

@Injectable()
export class UserService {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepository: typeof User,
  ) {}
}
