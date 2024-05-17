import { Module } from '@nestjs/common';
import { IntegrationSearchService } from './service/Integration-Search.service';
import { IntegrationSearchController } from './controller/Integration-Search.controller';
import { MongooseModule } from '@nestjs/mongoose';

import { ProgramSchoolOrg, ProgramSchoolOrgSchema } from 'src/modules/admin/program-school-org/schemas/program-school-org.schema';
import { ProgramSchoolType, ProgramSchoolTypeSchema } from 'src/modules/admin/program-school-type/schemas/program.school.type.schema';
import { School, SchoolSchema } from 'src/modules/admin/shool/schemas/school.schema';
import { Opportunity, OpportunitySchema } from 'src/modules/admin/opportuniy/schemas/opportunity.schema';
import { GeneralFieldStudy, GeneralFieldStudySchema } from 'src/modules/admin/general-field-study/schemas/general.field.study.service.schema';
import { Credential, CredentialSchema } from 'src/modules/admin/credential/schemas/credential.schema';
import { Stem, StemSchema } from 'src/modules/admin/stem/schemas/stem.schema';

@Module({
  imports: [MongooseModule.forFeature([
    { name: ProgramSchoolType.name, schema: ProgramSchoolTypeSchema },
    { name: GeneralFieldStudy.name, schema: GeneralFieldStudySchema },
    { name: ProgramSchoolOrg.name, schema: ProgramSchoolOrgSchema },
    { name: Opportunity.name, schema: OpportunitySchema },
    { name: School.name, schema: SchoolSchema },
    { name: Credential.name, schema: CredentialSchema },
    { name: Stem.name, schema: StemSchema }
  ])],
  providers: [IntegrationSearchService],
  controllers: [
    IntegrationSearchController
  ]
})

export class IntegrationSearchModule { }