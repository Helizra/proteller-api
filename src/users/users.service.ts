import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  create(user: User) {
    return this.userRepository.save(user);
  }

  findOne(id: string) {
    return this.userRepository.findOne({
      where: {
        id: id,
      },
    });
  }

  findOneByEmail(email: string) {
    return this.userRepository.findOne({
      where: {
        email: email,
      },
    });
  }

  update(id: string, user: User) {
    return this.userRepository.update(id, user);
  }

  async delete(id: string) {
    await this.userRepository.delete(id);
  }
}
