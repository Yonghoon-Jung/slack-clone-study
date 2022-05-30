import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { User } from 'src/common/decorator/user.decorator';
import { UserDto } from 'src/common/dto/user.dto';
import { UndefinedToNullInterceptor } from 'src/common/interceptors/undefinedToNull.interceptor';
import { Users } from 'src/entities/Users';
import { JoinRequestDto } from './dto/join.request.dto';
import { UsersService } from './users.service';

@UseInterceptors(UndefinedToNullInterceptor)
@ApiTags('USER')
@Controller('api/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOkResponse({
    description: '성공',
    type: UserDto,
  })
  @ApiInternalServerErrorResponse({
    description: '서버 에러',
  })
  @ApiOperation({ summary: '내 정보 조회' })
  @UseGuards(LocalAuthGuard)
  @Get()
  getUsers(@User() user) {
    return user;
  }

  @ApiOperation({ summary: '회원가입' })
  @Post()
  async join(@Body() data: JoinRequestDto) {
    const res = await this.usersService.join(
      data.email,
      data.nickname,
      data.password,
    );
    return res;
  }

  @ApiOkResponse()
  @ApiResponse({
    description: '성공',
    type: UserDto,
  })
  @ApiOperation({ summary: '로그인' })
  @Post('login')
  logIn() {
    return;
  }

  @ApiOperation({ summary: '로그아웃' })
  @Post('logout')
  logOut(@User() user, @Res() res) {
    // Req, Res는 express와의 결합성이 높아지기 때문에 최대한 사용하지 않는 게 좋다.
    // 예를들어 express -> fastify로 넘어간다면 express와 결합된 함수는 에러가 뜰 것이다.
    res.logout();
    res.clearCookie('connect.sid', { httpOnly: true });
    res.send('ok');
  }
}
