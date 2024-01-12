import { Module } from '@nestjs/common';
import { VendorsController } from './vendors.controller';
import { VendorsService } from './vendors.service';
import { MongooseModule } from '@nestjs/mongoose';
import { vendorSchema } from './schemas/vendor.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Vendor', schema: vendorSchema }])],
  controllers: [VendorsController],
  providers: [VendorsService],
  exports: [VendorsService]
})
export class VendorsModule {}
