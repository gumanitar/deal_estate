import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, MoreThan } from 'typeorm';
import { RefreshToken } from './entities/refresh.token.entity';
import * as crypto from 'crypto';

@Injectable()
export class TokenService {
  constructor(
    @InjectRepository(RefreshToken)
    private refreshTokensRepository: Repository<RefreshToken>,
    private jwtService: JwtService,
  ) {}

  async generateAccessToken(userId: number): Promise<string> {
    return this.jwtService.signAsync({ userId });
  }

  generateRefreshToken(): string {
    return crypto.randomBytes(32).toString('hex');
  }

  async storeRefreshToken(
    token: string,
    userId: number,
  ): Promise<RefreshToken> {
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + 3);
    await this.refreshTokensRepository.delete({ userId });

    const refreshToken = this.refreshTokensRepository.create({
      token,
      userId,
      expiryDate,
    });

    return await this.refreshTokensRepository.save(refreshToken);
  }

  async refreshTokens(token: string) {
    const storedToken = await this.refreshTokensRepository.findOneBy({
      token: token,
      expiryDate: MoreThan(new Date()),
    });

    if (!storedToken) {
      throw new UnauthorizedException('Invalid or expired refresh token');
    }
    await this.refreshTokensRepository.delete(storedToken.id);
    const accessToken = await this.generateAccessToken(storedToken.userId);
    const newRefreshToken = this.generateRefreshToken();
    await this.storeRefreshToken(newRefreshToken, storedToken.userId);

    return {
      accessToken,
      refreshToken: newRefreshToken,
    };
  }

  async removeRefreshToken(token: string): Promise<void> {
    const storedToken = await this.refreshTokensRepository.findOneBy({ token });
    if (storedToken) {
      await this.refreshTokensRepository.delete(storedToken.id);
    }
  }
}
