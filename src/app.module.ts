import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerMiddleware } from './middleware/logger.middleware';
import { UsersModule } from './users/users.module';
import { WorkspacesModule } from './workspaces/workspaces.module';
import { ChannelsModule } from './channels/channels.module';
import { DmsModule } from './dms/dms.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as ormConfig from '../ormconfig';

// 외부 클라우드에서 불러오는 비동기 작업
// const getEnv = async () => {
//   const response = await axios.get('/비밀키요청');

//   return response.data;
// };

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    UsersModule,
    WorkspacesModule,
    ChannelsModule,
    DmsModule,
    TypeOrmModule.forRoot(ormConfig),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    ConfigService,
    /* 
    providers의 원형
    {
      provide: Service, // 고유한 키
      useClass: Service // 클래스를 넣으면 provide는 클래스의 이름을 따라감
      useValue: Value // 클래스가 아닌 밸류를 넣을 수도 있음
      useFactory: () => {
        // 수행할 작업...
        return {
          a: 'b'
        }
      }
    },
    {
      provide: 'CUSTOM_KEY',
      useValue: 'CUSTOM_VALUE',
    }
    를 사용한다면 컨트롤러에서 
    @Inject('CUSTOM_KEY') private readonly customValue
    형식으로 사용하면 된다.

    즉, 클래스일 경우 클래스 명으로만으로 디펜덴시 인젝션이 키값으로 가능하고,
    클래스가 아닌 경우 인덱스에서 키랑 토큰을 맞춰줘야 한다.
  */
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
