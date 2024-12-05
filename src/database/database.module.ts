import { Logger, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        Logger.log(`Connecting to ${configService.get<string>('MONGO_URI')}`);
        return { uri: configService.get<string>('MONGO_URI') };
      },
      inject: [ConfigService],
    }),
    DatabaseModule,
  ],
})
export class DatabaseModule {}
