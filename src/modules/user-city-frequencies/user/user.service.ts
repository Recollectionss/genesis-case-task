import { Inject, Injectable } from '@nestjs/common';
import { USER_REPOSITORY } from './user.providers';
import { User } from './entity/user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepository: typeof User,
  ) {}
  async findOrCreate(data: CreateUserDto) {
    const dataValues = await this.userRepository.findOrCreate({
      where: { email: data.email },
    });
    return dataValues[0];
  }
}
