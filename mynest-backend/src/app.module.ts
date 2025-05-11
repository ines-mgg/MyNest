import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { MailService } from './mail/mail.service';
import { MailController } from './mail/mail.controller';
import { UtilsService } from './utils/utils.service';
import { UtilsModule } from './utils/utils.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { JwtStrategy } from './auth/jwt.strategy';
import { AppGateway } from './app.gateway';
import { ChatModule } from './chat/chat.module';
import { ConversationModule } from './conversation/conversation.module';
import { SocketService } from './socket/socket.service';
import { SocketModule } from './socket/socket.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET || 'supa-secret-key',
      signOptions: { expiresIn: process.env.JWT_SECRET_EXPIRATION || '24h' },
    }),
    MailerModule.forRoot({
      transport: {
        host: 'mynestmaildev',
        port: 1025,
        secure: false,
      },
      defaults: {
        from: '"No Reply" <noreply@example.com>',
      },
      template: {
        dir: __dirname + '/templates',
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    }),
    UserModule,
    AuthModule,
    SocketModule,
    AuthModule,
    PassportModule,
    UtilsModule,
    ChatModule,
    ConversationModule,
  ],
  controllers: [MailController],
  providers: [
    AppGateway,
    MailService,
    UtilsService,
    JwtStrategy,
    JwtService,
    SocketService,
  ],
})
export class AppModule {}
