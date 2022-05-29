import { ApiProperty } from '@nestjs/swagger';

/*
class와 인터페이스의 차이점
class는 대표적으로 상속이 가능하고 기존 class와 유사하게 사용이 가능
interface는 사실상 TS에만 존재하고 TS 컴파일 종료 후 사라짐
class는 JS 변환 후에도 남아있음

interface는 런타임에서 날라가서 체크같은 게 어려운데
class는 class 자체가 타입 역할도 해줘서 인터페이스와 비슷한 역할을 해주면서도
JS로 변환 후에도 계속 남아있어서 JS 단에서도 타입 검증, 발리데이션 같은 걸 수행가능
*/
export class JoinRequestDto {
  @ApiProperty({
    example: 'test@test.com',
    description: '이메일',
  })
  public email: string;

  @ApiProperty({
    example: 'testNickname',
    description: '닉네임',
    required: true,
  })
  public nickname: string;

  @ApiProperty({
    example: 'abc123',
    description: '비밀번호',
    required: true,
  })
  public password: string;
}
