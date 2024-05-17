import { Module } from '@nestjs/common';
import { GeneralFieldStudyService } from './services/general-field-study.service';
import { GeneralFieldStudyController } from './controllers/general-field.study.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Blog, BlogSchema } from 'src/modules/admin/blog/schemas/blog.schema';
import { GeneralFieldStudy, GeneralFieldStudySchema } from 'src/modules/admin/general-field-study/schemas/general.field.study.service.schema';

@Module({
  imports: [MongooseModule.forFeature([
    { name: Blog.name, schema: BlogSchema },
    { name: GeneralFieldStudy.name, schema: GeneralFieldStudySchema },
  ])],
  providers: [GeneralFieldStudyService],
  controllers: [
    GeneralFieldStudyController
  ]
})

export class GeneralFieldStudyModule { }