import { Module } from '@nestjs/common';
import { GeneralFieldService } from './service/General-Field.service';
import { GeneralFieldController } from './controller/General-Field.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { GeneralFieldStudy, GeneralFieldStudySchema } from 'src/modules/admin/general-field-study/schemas/general.field.study.service.schema';
import { Stem, StemSchema } from 'src/modules/admin/stem/schemas/stem.schema';

@Module({
  imports: [MongooseModule.forFeature([
    { name: GeneralFieldStudy.name, schema: GeneralFieldStudySchema },
    { name: Stem.name, schema: StemSchema },
  ])],
  providers: [GeneralFieldService],
  controllers: [
    GeneralFieldController
  ]
})

export class GeneralFieldModule { }