import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { JoinRequestDto } from './dto/join.request.dto';
import { UsersService } from './users.service';

@Controller('api/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getUsers(@Req() req) {
    return req.user;
  }

  @Post()
  postUsers(@Body() data: JoinRequestDto) {
    const res = this.usersService.postUsers(
      data.email,
      data.nickname,
      data.password,
    );
    return res;
  }

  @Post('login')
  logIn() {
    return req.user;
  }

  @Post('logout')
  logOut(@Req() req, @Res() res) {
    // Req, Res는 express와의 결합성이 높아지기 때문에 최대한 사용하지 않는 게 좋다.
    // 예를들어 express -> fastify로 넘어간다면 express와 결합된 함수는 에러가 뜰 것이다.
    res.logout();
    res.clearCookie('connect.sid', { httpOnly: true });
    res.send('ok');
  }
}
