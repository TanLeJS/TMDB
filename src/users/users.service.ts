import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { compareSync, genSaltSync, hashSync } from 'bcrypt';
import { Repository } from 'typeorm';
import {
  RegisterGoogleUserDto,
  RegisterUserDto,
} from './dto/register-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  getHashPassword = (password: string) => {
    const salt = genSaltSync(10);
    const hash = hashSync(password, salt);
    return hash;
  };

  isValidPassword(password: string, hash: string) {
    return compareSync(password, hash);
  }

  async register(registerUserDto: RegisterUserDto): Promise<User> {
    const { name, email, password, preferenceGenres } = registerUserDto;
    //add logic check email
    const isExistUser = await this.userRepository.findOneBy({ email });
    if (isExistUser) {
      throw new BadRequestException(
        `Email ${email} is already exist. Try different email `,
      );
    }
    const hashPassword = this.getHashPassword(password);
    const newRegister = await this.userRepository.create({
      name,
      email,
      password: hashPassword,
      preferenceGenres,
      type: 'SYSTEM',
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: new Date(),
    });

    return newRegister;
  }

  async registerWithGoogle(registerGoogleUserDto: RegisterGoogleUserDto) {
    const { type, name, email } = registerGoogleUserDto;
    const isExistUser = await this.userRepository.findOne({
      where: { email: email },
    });
    const hashPassword = this.getHashPassword(
      Math.random().toString(36).slice(-8),
    );

    if (isExistUser) {
      throw new BadRequestException(
        `Email ${email} is already exist. Try different email `,
      );
    } else {
      const newGoogleRegister = await this.userRepository.create({
        name,
        email,
        type,
        password: hashPassword,
      });
      return newGoogleRegister;
    }
  }

  async findOneByUsername(username) {
    return this.userRepository.findOne({
      where: { email: username },
    });
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findOne(id: number): Promise<User> {
    const userData = await this.userRepository.findOneBy({ id });
    if (!userData) {
      throw new HttpException('User Not Found', 404);
    }
    return userData;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const existingUser = await this.findOne(id);
    const userData = this.userRepository.merge(existingUser, updateUserDto);
    return await this.userRepository.save(userData);
  }

  async remove(id: number): Promise<User> {
    const existingUser = await this.findOne(id);
    return await this.userRepository.remove(existingUser);
  }
}
