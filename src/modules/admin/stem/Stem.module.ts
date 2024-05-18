import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ProgramSchoolOrgController } from './controllers/programSchoolOrg.controller';
import { ProgramSchoolOrgTypeController } from './controllers/programSchoolOrgType.controller';
import { SchoolController } from './controllers/school.controller';
import { OpportunityController } from './controllers/opportunity.controller';
import { GeneralFieldStudyController } from './controllers/generalFieldStudy.controller';
import { CredentialController } from './controllers/credential.controller';
import { StemController } from './controllers/stem.controller';


import { ProgramSchoolOrgService } from './services/programSchoolOrg.service';
import { ProgramSchoolOrgTypeService } from './services/programSchoolOrgType.service';
import { CredentialSchoolService } from './services/CredentialSchool.service';
import { OpportunityService } from './services/Opportunity.service';
import { GeneralFieldStudyService } from './services/generalFieldStudy.service';
import { CredentialService } from './services/credential.service';
import { StemService } from './services/stem.service';

import { ProgramSchoolOrg, ProgramSchoolOrgSchema } from 'src/modules/admin/program-school-org/schemas/program-school-org.schema';
import { ProgramSchoolType, ProgramSchoolTypeSchema } from 'src/modules/admin/program-school-type/schemas/program.school.type.schema';
import { School, SchoolSchema } from 'src/modules/admin/shool/schemas/school.schema';
import { SpecificFieldStudy, SpecificFieldStudySchema } from 'src/modules/admin/general-field-study/schemas/specific.field.study.service.schema';
import { Opportunity, OpportunitySchema } from 'src/modules/admin/opportuniy/schemas/opportunity.schema';
import { GeneralFieldStudy, GeneralFieldStudySchema } from 'src/modules/admin/general-field-study/schemas/general.field.study.service.schema';
import { Credential, CredentialSchema } from 'src/modules/admin/credential/schemas/credential.schema';
import { Stem, StemSchema } from 'src/modules/admin/stem/schemas/stem.schema';

@Module({
  imports: [MongooseModule.forFeature([
    { name: ProgramSchoolType.name, schema: ProgramSchoolTypeSchema },
    { name: GeneralFieldStudy.name, schema: GeneralFieldStudySchema },
    { name: SpecificFieldStudy.name, schema: SpecificFieldStudySchema },
    { name: ProgramSchoolOrg.name, schema: ProgramSchoolOrgSchema },
    { name: Opportunity.name, schema: OpportunitySchema },
    { name: School.name, schema: SchoolSchema },
    { name: Credential.name, schema: CredentialSchema },
    { name: Stem.name, schema: StemSchema },
  ])],
  providers: [
    ProgramSchoolOrgService,
    ProgramSchoolOrgTypeService,
    CredentialSchoolService,
    OpportunityService,
    GeneralFieldStudyService,
    CredentialService,
    StemService
  ],
  controllers: [
    ProgramSchoolOrgController,
    ProgramSchoolOrgTypeController,
    SchoolController,
    OpportunityController,
    GeneralFieldStudyController,
    CredentialController,
    StemController
  ]
})

export class StemModule { }