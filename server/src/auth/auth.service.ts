import {
  Injectable,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';
import { SignupDto } from './dtos/signup.dto';
import { LoginDto } from './dtos/login.dto';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

import * as bcrypt from 'bcrypt';
import { TokenService } from './token.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private tokenService: TokenService,
  ) {}

  async signup(signupData: SignupDto) {
    const userExists = await this.usersRepository.findOneBy({
      email: signupData.email,
    });
    if (userExists) {
      throw new ConflictException('User with this email already exists');
    }

    const hashedPassword = await bcrypt.hash(signupData.password, 10);

    const newUser = await this.usersRepository.create({
      name: signupData.name,
      email: signupData.email,
      password: hashedPassword,
    });

    return this.usersRepository.save(newUser);
  }

  async login(loginData: LoginDto) {
    const user = await this.usersRepository.findOneBy({
      email: loginData.email,
    });
    if (!user) {
      throw new UnauthorizedException('Invalid login credentials');
    }
    const passwordMatch = await bcrypt.compare(
      loginData.password,
      user.password,
    );
    if (!passwordMatch) {
      throw new UnauthorizedException('Invalid login credentials');
    }
    const accessToken = await this.tokenService.generateAccessToken(user.id);
    const refreshToken = this.tokenService.generateRefreshToken();
    await this.tokenService.storeRefreshToken(refreshToken, user.id);
    return { accessToken, refreshToken };
  }
}
