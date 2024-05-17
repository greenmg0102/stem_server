import { Module } from '@nestjs/common';
import { SchoolTypeService } from './services/school-type.service';
import { SchoolTypeController } from './controllers/school-type.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Blog, BlogSchema } from 'src/modules/admin/blog/schemas/blog.schema';
import { ProgramSchoolType, ProgramSchoolTypeSchema } from 'src/modules/admin/program-school-type/schemas/program.school.type.schema';

@Module({
  imports: [MongooseModule.forFeature([
    { name: Blog.name, schema: BlogSchema },
    { name: ProgramSchoolType.name, schema: ProgramSchoolTypeSchema },
  ])],
  providers: [SchoolTypeService],
  controllers: [
    SchoolTypeController
  ]
})

export class ProgramSchoolTypeModule { }