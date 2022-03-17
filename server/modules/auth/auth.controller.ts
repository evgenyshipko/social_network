import { Body, Controller, Get, Post, Req, Res, UseGuards } from "@nestjs/common";
import { RequestWithUser } from "./requestWithUser.interface";
import { RegisterDto } from "../user/dto/register.dto";
import { AuthService } from "./auth.service";
import { LocalAuthenticationGuard } from "./guards/local.guard";
import { Response } from "express";
import JwtAuthenticationGuard from "./guards/jwt-auth.guard";

@Controller("api/auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("register")
  async register(@Body() registrationData: RegisterDto) {
    return this.authService.register(registrationData);
  }

  @UseGuards(LocalAuthenticationGuard)
  @Post("login")
  async logIn(@Req() request: RequestWithUser, @Res() response: Response,) {

    const user = request.user;

    const cookie = this.authService.getCookieWithJwtToken(user.id);

    response.setHeader('Set-Cookie', cookie);

    user.password = undefined;
    return response.send(user);
  }

  @UseGuards(JwtAuthenticationGuard)
  @Post('log-out')
  async logOut(@Req() request: RequestWithUser, @Res() response: Response) {
    response.setHeader('Set-Cookie', this.authService.getCookieForLogOut());
    return response.sendStatus(200);
  }

  @UseGuards(JwtAuthenticationGuard)
  @Get()
  checkAuth(@Req() request: RequestWithUser) {
    const user = request.user;
    user.password = undefined;
    return user;
  }

}
