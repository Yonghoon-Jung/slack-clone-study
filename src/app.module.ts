import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';

// 외부 클라우드에서 불러오는 비동기 작업
// const getEnv = async () => {
//   const response = await axios.get('/비밀키요청');

//   return response.data;
// };

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true, load: [] })],
  controllers: [AppController],
  providers: [AppService, ConfigService],
})
export class AppModule {}
