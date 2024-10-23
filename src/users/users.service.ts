import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { compareSync, genSaltSync, hashSync } from 'bcrypt';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  getHashPassword = (password: string) => {
    const salt = genSaltSync(10);
    const hash = hashSync(password, salt);
    return hash;
  };

  isValidPassword(password: string, hash: string) {
    return compareSync(password, hash);
  }

  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    const userData = await this.userRepository.create(createUserDto);
    return this.userRepository.save(userData);
  }

  async findOneByUsername(username) {
    return this.userRepository.findOne({
      where: { email: username },
    });
  }

  async findAll(): Promise<UserEntity[]> {
    return await this.userRepository.find();
  }

  async findOne(id: number): Promise<UserEntity> {
    const userData = await this.userRepository.findOneBy({ id });
    if (!userData) {
      throw new HttpException('User Not Found', 404);
    }
    return userData;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<UserEntity> {
    const existingUser = await this.findOne(id);
    const userData = this.userRepository.merge(existingUser, updateUserDto);
    return await this.userRepository.save(userData);
  }

  async remove(id: number): Promise<UserEntity> {
    const existingUser = await this.findOne(id);
    return await this.userRepository.remove(existingUser);
  }
}
