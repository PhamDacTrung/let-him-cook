import { configurations, DatabaseConfig } from '@config';
import { AuthModule } from '@modules';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigType } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DishModule } from './modules/dish/dish.module';
import { IngredientModule } from './modules/ingredient/ingredient.module';
import { UserModule } from './modules/user/user.module';
import { VoteModule } from './modules/vote/vote.module';

const modules = [
  AuthModule,
  UserModule,
  IngredientModule,
  DishModule,
  VoteModule,
];

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      load: configurations,
      cache: true,
    }),

    TypeOrmModule.forRootAsync({
      inject: [DatabaseConfig.KEY],
      useFactory: (config: ConfigType<typeof DatabaseConfig>) => {
        if (!config) {
          throw new Error('Cannot start app without ORM config');
        }
        return config as TypeOrmModuleOptions;
      },
    }),
    ...modules,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
