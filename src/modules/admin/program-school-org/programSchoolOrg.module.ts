import { Module } from '@nestjs/common';
import { ProgramSchoolOrgService } from './services/program-school-org.service';
import { ProgramSchoolOrgController } from './controllers/program-school-org.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Blog, BlogSchema } from 'src/modules/admin/blog/schemas/blog.schema';
import { ProgramSchoolOrg, ProgramSchoolOrgSchema } from 'src/modules/admin/program-school-org/schemas/program-school-org.schema';

@Module({
  imports: [MongooseModule.forFeature([
    { name: Blog.name, schema: BlogSchema },
    { name: ProgramSchoolOrg.name, schema: ProgramSchoolOrgSchema },
  ])],
  providers: [ProgramSchoolOrgService],
  controllers: [
    ProgramSchoolOrgController
  ]
})

export class ProgramSchoolOrgModule { }