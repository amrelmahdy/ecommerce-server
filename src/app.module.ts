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
import { VendorsModule } from './vendors/vendors.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true
    }),
    // ServeStaticModule.forRoot({
    //   rootPath: join(__dirname, '..'),
    //   renderPath: 'uploads'

    // }),

    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'assets'), // Serve files from the 'uploads' directory
      serveRoot: '/assets', // Serve files under the '/uploads' route
    }),
    MongooseModule.forRoot(process.env.DB_URI),
    UsersModule,
    CategoriesModule,
    OrdersModule,
    ProductsModule,
    AuthModule,
    MulterConfigModule,
    VendorsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
