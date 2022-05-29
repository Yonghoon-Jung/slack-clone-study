import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty({
    required: true,
    example: 1,
    description: '유저 아이디',
  })
  id: number;

  @ApiProperty({
    required: true,
    example: 'test@test.com',
    description: '이메일',
  })
  email: string;
}
