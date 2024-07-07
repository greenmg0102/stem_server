import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Schema as MongooseSchema } from 'mongoose';
import { ObjectId } from 'mongodb';
import { ProgramSchoolOrg } from 'src/modules/admin/program-school-org/schemas/program-school-org.schema';
import { ProgramSchoolType } from 'src/modules/admin/program-school-type/schemas/program.school.type.schema';
import { School } from 'src/modules/admin/shool/schemas/school.schema';
import { Opportunity } from 'src/modules/admin/opportuniy/schemas/opportunity.schema';
import { GeneralFieldStudy } from 'src/modules/admin/general-field-study/schemas/general.field.study.service.schema';
import { SpecificFieldStudy } from 'src/modules/admin/general-field-study/schemas/specific.field.study.service.schema';
import { Requirementcredential } from 'src/modules/admin/requirement-credential/schemas/requirement-credential.schema';
import { Requirementage } from 'src/modules/admin/requirement-age/schemas/requirement-age.schema';
import { Educationlevel } from 'src/modules/admin/education-level/schemas/education-level.schema';

import { Credential } from 'src/modules/admin/credential/schemas/credential.schema';
import { Stem } from 'src/modules/admin/stem/schemas/stem.schema';

@Injectable()
export class GroupByListService {

    constructor(
        @InjectModel(ProgramSchoolOrg.name) private readonly programSchoolOrgModal: Model<ProgramSchoolOrg>,
        @InjectModel(ProgramSchoolType.name) private readonly programSchoolTypeModal: Model<ProgramSchoolType>,
        @InjectModel(School.name) private readonly schoolModal: Model<School>,
        @InjectModel(Opportunity.name) private readonly opportunityModal: Model<Opportunity>,
        @InjectModel(GeneralFieldStudy.name) private readonly generalFieldStudyModal: Model<GeneralFieldStudy>,
        @InjectModel(Credential.name) private readonly credentialModal: Model<Credential>,
        @InjectModel(SpecificFieldStudy.name) private readonly specificFieldStudyModal: Model<SpecificFieldStudy>,
        @InjectModel(Educationlevel.name) private readonly educationlevelModal: Model<Educationlevel>,
        @InjectModel(Requirementcredential.name) private readonly requirementcredentialModal: Model<Requirementcredential>,
        @InjectModel(Requirementage.name) private readonly requirementageModal: Model<Requirementage>,
        @InjectModel(Stem.name) private readonly stemModal: Model<Stem>,
    ) { }

    async groupByListRead(): Promise<any> {

        let opportunityList = await this.opportunityModal.find()
        let credentialList = await this.credentialModal.find()
        let generalFieldStudyList = await this.generalFieldStudyModal.find()

        return {
            isOkay: true,
            result: {
                opportunityList: opportunityList,
                credentialList: credentialList,
                generalFieldStudyList: generalFieldStudyList
            },
        }
    }

}
