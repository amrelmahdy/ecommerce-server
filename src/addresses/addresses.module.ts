import { Module } from '@nestjs/common';
import { AddressesService } from './addresses.service';
import { AddressesController } from './addresses.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { addressSchema } from './schemas/address.schema';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Address', schema: addressSchema }]),
    UsersModule
  ],
  providers: [AddressesService],
  controllers: [AddressesController]
})
export class AddressesModule { }
