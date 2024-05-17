import { Module } from '@nestjs/common';
import { SchoolService } from './services/school.service';
import { SchoolController } from './controllers/school.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { School, SchoolSchema } from 'src/modules/admin/shool/schemas/school.schema';

@Module({
  imports: [MongooseModule.forFeature([
    { name: School.name, schema: SchoolSchema },
  ])],
  providers: [SchoolService],
  controllers: [
    SchoolController
  ]
})

export class SchoolModule { }