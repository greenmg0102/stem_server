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
export class PathwayFromCredentialService {

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

    async pathwayFromCredential(body: any): Promise<any> {

        console.log(body);
        

        let real: any

        if (body.opportunity) {
            real = await this.stemModal.find({ Opportunity: body.opprtunity, credential: body.credential }).then((res: any) => { return res })
        } else {
            real = await this.stemModal.find({ credential: body.credential }).then((res: any) => { return res })
        }

        let fieldIdList = new Set(real.map((item: any) => item.field))

        let fieldList = await this.generalFieldStudyModal.aggregate([
            {
                $match: {
                    _id: { $in: [...fieldIdList] }
                },
            }
        ])
        return {
            isOkay: true,
            fieldList: fieldList
        }
    }

}
