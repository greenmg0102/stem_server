import { Injectable } from '@nestjs/common';
import { ObjectId } from 'mongodb';
import { InjectModel } from '@nestjs/mongoose';
import { PipelineStage, Model, Schema as MongooseSchema } from 'mongoose';
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
export class GeneralFieldService {

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

    async read(body: any): Promise<any> {

        let generalFieldResult = await this.generalFieldStudyModal.find({ field: { $regex: body.searchValue, $options: "i" } })

        let bufferGeneralFieldResult = generalFieldResult.map((item: any) => item._id)

        let conditionPairPipeline = {
            Opportunity: { $in: bufferGeneralFieldResult },
        };
        const handsPipeline: PipelineStage[] = [
            { $match: conditionPairPipeline },
            {
                $lookup: {
                    from: 'programschoolorgs',
                    localField: 'programSchoolOrg',
                    foreignField: '_id',
                    as: 'schoolOrg',
                },
            },
            {
                $unwind: '$schoolOrg',
            },
            {
                $lookup: {
                    from: 'programschooltypes',
                    localField: 'programSchoolOrgType',
                    foreignField: '_id',
                    as: 'schoolOrgType',
                },
            },
            {
                $unwind: '$schoolOrgType',
            },
            {
                $lookup: {
                    from: 'schools',
                    localField: 'credentialSchool',
                    foreignField: '_id',
                    as: 'credentialSchool',
                },
            },
            {
                $unwind: '$credentialSchool',
            },
            {
                $lookup: {
                    from: 'opportunitys',
                    localField: 'Opportunity',
                    foreignField: '_id',
                    as: 'opportunity',
                },
            },
            {
                $unwind: '$opportunity',
            },
            {
                $lookup: {
                    from: 'generalfieldstudys',
                    localField: 'field',
                    foreignField: '_id',
                    as: 'field',
                },
            },
            {
                $unwind: '$field',
            },
            {
                $lookup: {
                    from: 'credentials',
                    localField: 'credential',
                    foreignField: '_id',
                    as: 'credential',
                },
            },
            {
                $unwind: '$credential',
            },
            {
                $project: {
                    schoolOrg: 1,
                    schoolOrgType: 1,
                    credentialSchool: 1,
                    opportunity: 1,
                    field: 1,
                    credential: 1
                }
            },
            { $skip: body.pageNumber },
            { $limit: (body.pageNumber + 1) * body.pageLimit }
        ];

        const result = await this.stemModal.aggregate(handsPipeline).exec()

        return {
            isOkay: true,
            result: result
        }
    }

    async filterRead(): Promise<any> {

        console.log("!!!!");


        let generalResult = await this.stemModal.aggregate([
            {
                $lookup: {
                    from: 'generalfieldstudys',
                    localField: 'field',
                    foreignField: '_id',
                    as: 'field',
                },
            },
            {
                $unwind: '$field',
            },
            {
                $group: {
                    _id: "$field.field",
                    count: { $sum: 1 }
                }
            }
        ])

        return {
            isOkay: true,
            result: generalResult
        }
    }

    async stemAccordingtoGeneralFieldRead(body: any): Promise<any> {

        console.log("stemAccordingtoGeneralFieldRead", body);

        let searchParameter = body.searchParameter
        const regexArray = searchParameter.trim().split(" ").map((param: any) => new RegExp(param, 'i'));

        let schoolOrgIdList = await this.programSchoolOrgModal.find({
            $or: [
                { name: { $in: regexArray } },
                { address: { $in: regexArray } },
                { city: { $in: regexArray } },
                { zip: { $in: regexArray } },
                { neighborhood: { $in: regexArray } }
            ]
        }).lean().select('_id').exec().then((result) => result.map((item) => new ObjectId(item._id)))

        let generalFieldId = await this.generalFieldStudyModal.findOne({ field: body.field }).then((res: any) => {
            return res._id
        })

        let orConditions: any[] = [
            { field: generalFieldId }
        ];

        let conditionPairPipeline = {
            $and: orConditions
        };

        if (schoolOrgIdList.length > 0) orConditions.push({ programSchoolOrg: { $in: schoolOrgIdList } });


        console.log('real time search', body.sortCondition);

        let sortField: string = body.sortCondition.split(':')[0];
        let direction: 1 | -1 = body.sortCondition.split(':')[1] === '1' ? 1 : -1;

        const handsPipeline = [
            { $match: conditionPairPipeline },
            {
                $lookup: {
                    from: 'programschoolorgs',
                    localField: 'programSchoolOrg',
                    foreignField: '_id',
                    as: 'schoolOrg',
                },
            },
            {
                $unwind: '$schoolOrg',
            },
            {
                $lookup: {
                    from: 'programschooltypes',
                    localField: 'programSchoolOrgType',
                    foreignField: '_id',
                    as: 'schoolOrgType',
                },
            },
            {
                $unwind: '$schoolOrgType',
            },
            {
                $lookup: {
                    from: 'schools',
                    localField: 'credentialSchool',
                    foreignField: '_id',
                    as: 'credentialSchool',
                },
            },
            {
                $unwind: '$credentialSchool',
            },
            {
                $lookup: {
                    from: 'opportunitys',
                    localField: 'Opportunity',
                    foreignField: '_id',
                    as: 'opportunity',
                },
            },
            {
                $unwind: '$opportunity',
            },
            {
                $lookup: {
                    from: 'generalfieldstudys',
                    localField: 'field',
                    foreignField: '_id',
                    as: 'field',
                },
            },
            {
                $unwind: '$field',
            },
            {
                $lookup: {
                    from: 'credentials',
                    localField: 'credential',
                    foreignField: '_id',
                    as: 'credential',
                },
            },
            {
                $unwind: '$credential',
            },
            {
                $sort: {
                    [sortField]: direction
                }
            },
            {
                $project: {
                    schoolOrg: 1,
                    schoolOrgType: 1,
                    credentialSchool: 1,
                    opportunity: 1,
                    field: 1,
                    credential: 1,
                    CourseList: 1,
                    EducationLevel: 1,
                    ApplicantRequirementCredential: 1,
                    Age: 1,
                    OpportunityLink: 1
                }
            },
            { $skip: (body.page - 1) * body.pageSize },
            { $limit: body.pageSize }
        ];

        const total = await this.stemModal.countDocuments(conditionPairPipeline);
        const result = await this.stemModal.aggregate(handsPipeline).exec()

        console.log(total, result.length);

        return {
            isOkay: true,
            result: result,
            totalCount: total
        }

    }

}
