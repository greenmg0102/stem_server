import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Schema as MongooseSchema } from 'mongoose';
import { ProgramSchoolOrg } from 'src/modules/admin/program-school-org/schemas/program-school-org.schema';
import { ProgramSchoolType } from 'src/modules/admin/program-school-type/schemas/program.school.type.schema';
import { School } from 'src/modules/admin/shool/schemas/school.schema';
import { Opportunity } from 'src/modules/admin/opportuniy/schemas/opportunity.schema';
import { GeneralFieldStudy } from 'src/modules/admin/general-field-study/schemas/general.field.study.service.schema';
import { Credential } from 'src/modules/admin/credential/schemas/credential.schema';
import { Stem } from 'src/modules/admin/stem/schemas/stem.schema';

const { ObjectId } = require('mongodb');

@Injectable()
export class IntegrationSearchService {

    constructor(
        @InjectModel(ProgramSchoolOrg.name) private readonly programSchoolOrgModal: Model<ProgramSchoolOrg>,
        @InjectModel(ProgramSchoolType.name) private readonly programSchoolTypeModal: Model<ProgramSchoolType>,
        @InjectModel(School.name) private readonly schoolModal: Model<School>,
        @InjectModel(Opportunity.name) private readonly opportunityModal: Model<Opportunity>,
        @InjectModel(GeneralFieldStudy.name) private readonly generalFieldStudyModal: Model<GeneralFieldStudy>,
        @InjectModel(Credential.name) private readonly credentialModal: Model<Credential>,
        @InjectModel(Stem.name) private readonly stemModal: Model<Stem>,
    ) { }

    async read(body: any): Promise<any> {

        let page = body.page
        let pageSize = body.pageSize
        let searchParameter = body.searchParameter

        console.log("programSchoolOrg", body.programSchoolOrg);
        console.log("searchParameter", searchParameter);


        let programSchoolOrgIdList = body.programSchoolOrg.length === 0 ? [] : body.programSchoolOrg.map((item: any) => new ObjectId(item.value))
        let programSchoolOrgTypeList = body.programSchoolOrgType.length === 0 ? [] : body.programSchoolOrgType.map((item: any) => new ObjectId(item.value))
        let credentialSchoolList = body.credentialSchool.length === 0 ? [] : body.credentialSchool.map((item: any) => new ObjectId(item.value))
        let OpportunityList = body.Opportunity.length === 0 ? [] : body.Opportunity.map((item: any) => new ObjectId(item.value))
        let fieldList = body.field.length === 0 ? [] : body.field.map((item: any) => new ObjectId(item.value))
        let credentialList = body.credential.length === 0 ? [] : body.credential.map((item: any) => new ObjectId(item.value))

        let bufferMatching: any = {
            $or: [
                { CourseList: { $regex: searchParameter } },
                { EducationLevel: { $regex: searchParameter } },
                { ApplicantRequirementCredential: { $regex: searchParameter } },
                { Age: { $regex: searchParameter } },
                { OpportunityLink: { $regex: searchParameter } },
            ]
        };

        let conditionPairPipeline: any = {
            ...bufferMatching
        };

        if (body.Opportunity.length > 0) conditionPairPipeline.Opportunity = { $in: OpportunityList }
        if (body.programSchoolOrg.length > 0) conditionPairPipeline.programSchoolOrg = { $in: programSchoolOrgIdList }
        if (body.programSchoolOrgType.length > 0) conditionPairPipeline.programSchoolOrgType = { $in: programSchoolOrgTypeList }
        if (credentialSchoolList.length > 0) conditionPairPipeline.credentialSchool = { $in: credentialSchoolList }
        if (body.field.length > 0) conditionPairPipeline.field = { $in: fieldList }
        if (body.credential.length > 0) conditionPairPipeline.credential = { $in: credentialList }

        let total: any = await this.stemModal.aggregate([
            { $match: conditionPairPipeline },
            { $count: "totalCount" }
        ]).exec();


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
            { $skip: page - 1 },
            { $limit: pageSize },
        ];

        const result = await this.stemModal.aggregate(handsPipeline).exec()

        return {
            isOkay: true,
            result: result,
            totalCount: total[0] === undefined ? 0 : total[0].totalCount
        }
    }

    async readId(id: any): Promise<any> {

        const handsPipeline = [
            {
                $match: {
                    _id: new ObjectId(id)
                }
            },
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
                    credential: 1,
                    CourseList: 1,
                    EducationLevel: 1,
                    ApplicantRequirementCredential: 1,
                    Age: 1,
                    OpportunityLink: 1
                }
            },
        ];

        const result = await this.stemModal.aggregate(handsPipeline).exec()

        return {
            isOkay: true,
            result: result,
        }
    }

}
