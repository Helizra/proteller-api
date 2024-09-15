import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { UsersService } from 'src/users/users.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import { User } from 'src/users/entities/user.entity';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UsersService,
  ) {}

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    const newUser = new User();
    newUser.name = registerDto.name;
    newUser.email = registerDto.email;
    newUser.password = await bcrypt.hash(registerDto.password, 10);
    const createdUser = await this.userService.create(newUser);
    return this.authService.login(createdUser);
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const user = await this.authService.validateUser(
      loginDto.email,
      loginDto.password,
    );
    if (!user) {
      throw new UnauthorizedException('Adresse mail ou mot de passe incorrect');
    } else {
      return this.authService.login(user);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getMe(@Request() req: any) {
    if (!req.user?.userId) {
      throw new UnauthorizedException();
    }
    const user = await this.userService.findOne(req.user.userId);
    return user;
  }
}
