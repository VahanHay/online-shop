import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';
import { CategoryModule } from './category/category.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './product/product.entity';
import { Category } from './category/category.entity';


const {DB_USER, DB_NAME ,DB_HOST,DB_PASS,DB_PORT} = process.env;

@Module({
  imports: [
    ProductModule, 
    CategoryModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: DB_HOST,
      port: parseInt(DB_PORT),
      username: DB_USER,
      password: DB_PASS,
      database: DB_NAME,
      entities: [Product, Category],
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}
