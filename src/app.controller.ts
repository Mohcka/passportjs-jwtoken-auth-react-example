import {
  Controller,
  Get,
  UseGuards,
  Post,
  Request,
  Response,
  Render,
} from '@nestjs/common';
import * as express from 'express';
import { AppService } from './app.service';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth/auth.service';

import { jwtConstants } from './auth/constants';

@Controller()
export class AppController {
  private readonly jwtCookieName = 'jwt-token';

  constructor(
    private readonly appService: AppService,
    private readonly authService: AuthService,
  ) {}

  @UseGuards(AuthGuard('local'))
  @Post('auth/login')
  async login(
    @Request() req: express.Request,
    @Response() res: express.Response,
  ) {
    const jwtToken = await this.authService.login(req.user);

    res.cookie(this.jwtCookieName, jwtToken['access_token'], {
      maxAge: jwtConstants.EXPIRES as number,
    });

    res.json(jwtToken);
    // return jwtToken;
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  async getProfile(@Request() req: express.Request): Promise<any> {
    return req.user;
  }

  @Get()
  @Render('index')
  getHello(): any {
    return { title: 'Homie' };
  }
}
