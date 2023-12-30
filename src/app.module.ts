import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { CategoriesModule } from './categories/categories.module';
import { OrdersModule } from './orders/orders.module';
import { ProductsModule } from './products/products.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { MulterConfigModule } from './multer-config/multer-config.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'), // Serve files from the 'uploads' directory
      serveRoot: '/uploads', // Serve files under the '/uploads' route
    }),
    MongooseModule.forRoot(process.env.DB_URI),
    UsersModule,
    CategoriesModule,
    OrdersModule,
    ProductsModule,
    AuthModule,
    MulterConfigModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
