import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { SafeUser } from '../users/types/safe-user.type';
import { UsersService } from '../users/users.service';
import { RegisterDto } from './dto/register.dto';
import {
  AuthTokenResponse,
  AuthenticatedUser,
  JwtPayload,
} from './types/auth.types';

@Injectable()
export class AuthService {
  private static readonly BcryptSaltRounds = 10;

  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto): Promise<SafeUser> {
    const existingUser = await this.usersService.findByEmail(registerDto.email);

    if (existingUser) {
      throw new ConflictException('Email is already registered');
    }

    const passwordHash = await bcrypt.hash(
      registerDto.password,
      AuthService.BcryptSaltRounds,
    );

    return this.usersService.create(registerDto.email, passwordHash);
  }

  async validateUser(
    email: string,
    password: string,
  ): Promise<SafeUser | null> {
    const user = await this.usersService.findByEmail(email);

    if (!user) {
      return null;
    }

    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);

    if (!isPasswordValid) {
      return null;
    }

    return this.usersService.toSafeUser(user);
  }

  login(user: SafeUser): AuthTokenResponse {
    const payload: JwtPayload = {
      sub: user.id,
      email: user.email,
    };

    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  getAuthenticatedUser(user: AuthenticatedUser): AuthenticatedUser {
    if (!user?.userId) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
