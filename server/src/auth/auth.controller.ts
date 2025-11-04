import { Controller, Post, Body, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { TokenService } from './token.service';
import { SignupDto } from './dtos/signup.dto';
import { LoginDto } from './dtos/login.dto';
import { TokenDto } from './dtos/token.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly tokenService: TokenService,
  ) {}

  @Post('signup')
  create(@Body() signupData: SignupDto) {
    return this.authService.signup(signupData);
  }

  @Post('login')
  login(@Body() loginData: LoginDto) {
    return this.authService.login(loginData);
  }

  @Delete('logout')
  async logout(@Body() tokenData: TokenDto) {
    return this.tokenService.removeRefreshToken(tokenData.refreshToken);
  }

  @Post('token')
  async refreshToken(@Body() tokenData: TokenDto) {
    return this.tokenService.refreshTokens(tokenData.refreshToken);
  }
}
