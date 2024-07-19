import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PipelineStage, Model, Schema as MongooseSchema } from 'mongoose';
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
export class IntegrationSearchService {

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

    async SchoolRealTimeRead(body: any): Promise<any> {
        let page = body.page
        let pageSize = body.pageSize
        let searchParameter = body.searchParameter

        const regexArray = searchParameter.trim().split(" ").map((param: any) => new RegExp(param, 'i'));

        // let schoolOrgIdList = searchParameter.length > 0 && body.programSchoolOrg.length === 0 ? await this.programSchoolOrgModal.find({
        //     $or: [
        //         { name: { $in: regexArray } },
        //     ]
        // }).lean().select('_id').exec().then((result) => result.map((item) => new ObjectId(item._id))) : []

        // let schoolOrgTypeIdList = searchParameter.length > 0 && body.programSchoolOrgType.length === 0 ? await this.programSchoolTypeModal.find({ type: { $in: regexArray } }).lean().select('_id').exec().then((result) => result.map((item) => new ObjectId(item._id))) : []
        let schoolIdList = searchParameter.length > 0 && body.credentialSchool.length === 0 ? await this.schoolModal.find({ school: { $in: regexArray } }).lean().select('_id').exec().then((result) => result.map((item) => new ObjectId(item._id))) : []
        let opportunityIdList = searchParameter.length > 0 && body.Opportunity.length === 0 ? await this.specificFieldStudyModal.find({ specificField: { $in: regexArray } }).lean().select('_id').exec().then((result) => result.map((item) => new ObjectId(item._id))) : []
        // let specificFieldStudyIdList = searchParameter.length > 0 && body.credential.length === 0 ? await this.specificFieldStudyModal.find({ specificField: { $in: regexArray } }).lean().select('_id').exec().then((result) => result.map((item) => new ObjectId(item._id))) : []
        let generalFieldStudyIdList = searchParameter.length > 0 && body.field.length === 0 ? await this.generalFieldStudyModal.find({ field: { $in: regexArray } }).lean().select('_id').exec().then((result) => result.map((item) => new ObjectId(item._id))) : []
        let credentialIdList = searchParameter.length > 0 && body.credential.length === 0 ? await this.credentialModal.find({ credential: { $in: regexArray } }).lean().select('_id').exec().then((result) => result.map((item) => new ObjectId(item._id))) : []
        // let educationlevelModalIdList = searchParameter.length > 0 && body.credential.length === 0 ? await this.educationlevelModal.find({ educationlevel: { $in: regexArray } }).lean().select('_id').exec().then((result) => result.map((item) => new ObjectId(item._id))) : []
        // let requirementcredentialModalIdList = searchParameter.length > 0 && body.credential.length === 0 ? await this.requirementcredentialModal.find({ requirementcredential: { $in: regexArray } }).lean().select('_id').exec().then((result) => result.map((item) => new ObjectId(item._id))) : []
        // let requirementageModalIdList = searchParameter.length > 0 && body.credential.length === 0 ? await this.requirementageModal.find({ requirementage: { $in: regexArray } }).lean().select('_id').exec().then((result) => result.map((item) => new ObjectId(item._id))) : []

        // let programSchoolOrgIdList = body.programSchoolOrg.map((item: any) => new ObjectId(item.value))
        // let programSchoolOrgTypeList = body.programSchoolOrgType.map((item: any) => new ObjectId(item.value))


        let credentialSchoolList = body.credentialSchool.map((item: any) => new ObjectId(item.value))
        let OpportunityList = body.Opportunity.map((item: any) => new ObjectId(item.value))
        let fieldList = body.field.map((item: any) => new ObjectId(item.value))
        let credentialList = []

        if (body && body.credential && body.credential[0] && body.credential[0].value === null) {
            let credentialHint = body.credential[0].label
            const keyword = " Certifications";
            const cleanedCredential = credentialHint.replace(keyword, "").trim();
            const regex = new RegExp(cleanedCredential, 'i');
            credentialList = await this.credentialModal.find({ credential: regex }).lean().select('_id').exec().then((result) => result.map((item) => new ObjectId(item._id)))
        } else {
            credentialList = body.credential.map((item: any) => new ObjectId(item.value))
        }

        let orConditions: any[] = [
            { CourseList: { $in: regexArray } },
            { EducationLevel: { $in: regexArray } },
            { ApplicantRequirementCredential: { $in: regexArray } },
            { Age: { $in: regexArray } },
            { OpportunityLink: { $in: regexArray } }
        ];

        let bufferMatching: any = {
            $or: orConditions
        };

        let conditionPairPipeline: any = {
            ...bufferMatching
        };

        if (body.Opportunity.length > 0) conditionPairPipeline.SpecificAreaofStudy = { $in: OpportunityList }
        else orConditions.push({ SpecificAreaofStudy: { $in: opportunityIdList } });

        // if (body.programSchoolOrg.length > 0) conditionPairPipeline.programSchoolOrg = { $in: programSchoolOrgIdList }
        // else orConditions.push({ programSchoolOrg: { $in: schoolOrgIdList } });

        // if (body.programSchoolOrgType.length > 0) conditionPairPipeline.programSchoolOrgType = { $in: programSchoolOrgTypeList }
        // else orConditions.push({ programSchoolOrgType: { $in: schoolOrgTypeIdList } });

        if (credentialSchoolList.length > 0) conditionPairPipeline.credentialSchool = { $in: credentialSchoolList }
        else orConditions.push({ credentialSchool: { $in: schoolIdList } });

        if (body.field.length > 0) conditionPairPipeline.field = { $in: fieldList }
        else orConditions.push({ field: { $in: generalFieldStudyIdList } });

        if (body.credential.length > 0) conditionPairPipeline.credential = { $in: credentialList }
        else orConditions.push({ credential: { $in: credentialIdList } });

        // orConditions.push({ SpecificAreaofStudy: { $in: specificFieldStudyIdList } });
        // orConditions.push({ EducationLevel: { $in: educationlevelModalIdList } });
        // orConditions.push({ ApplicantRequirementCredential: { $in: requirementcredentialModalIdList } });
        // orConditions.push({ Age: { $in: requirementageModalIdList } });


        if (orConditions.length > 0) {
            conditionPairPipeline.$or = orConditions;
        }

        console.log('real time search', body.sortCondition);

        let sortField: string = body.sortCondition.split(':')[0];
        let direction: 1 | -1 = body.sortCondition.split(':')[1] === '1' ? 1 : -1;

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
            { $unwind: '$schoolOrg' },
            {
                $lookup: {
                    from: 'programschooltypes',
                    localField: 'programSchoolOrgType',
                    foreignField: '_id',
                    as: 'schoolOrgType',
                },
            },
            { $unwind: '$schoolOrgType' },
            {
                $lookup: {
                    from: 'schools',
                    localField: 'credentialSchool',
                    foreignField: '_id',
                    as: 'credentialSchool',
                },
            },
            { $unwind: '$credentialSchool' },
            {
                $group: {
                    _id: '$credentialSchool.school',
                    doc: { $first: '$$ROOT' }
                }
            },
            {
                $replaceRoot: {
                    newRoot: '$doc'
                }
            },
            {
                $lookup: {
                    from: 'opportunitys',
                    localField: 'Opportunity',
                    foreignField: '_id',
                    as: 'opportunity',
                },
            },
            { $unwind: '$opportunity' },
            {
                $lookup: {
                    from: 'generalfieldstudys',
                    localField: 'field',
                    foreignField: '_id',
                    as: 'field',
                },
            },
            { $unwind: '$field' },
            {
                $lookup: {
                    from: 'credentials',
                    localField: 'credential',
                    foreignField: '_id',
                    as: 'credential',
                },
            },
            { $unwind: '$credential' },
            {
                $lookup: {
                    from: 'specificfieldstudys',
                    localField: 'SpecificAreaofStudy',
                    foreignField: '_id',
                    as: 'SpecificAreaofStudy',
                },
            },
            { $unwind: '$SpecificAreaofStudy' },
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
                    SpecificAreaofStudy: 1
                }
            },
            { $skip: (page - 1) * pageSize },
            { $limit: pageSize }
        ];
        
        const result = await this.stemModal.aggregate(handsPipeline).exec()
        
        console.log("result", result);
        
        // let total: any = await this.stemModal.aggregate([
        //     { $match: conditionPairPipeline },
        //     { $count: "totalCount" }
        // ]).exec();

        // return {
        //     isOkay: true,
        //     result: result,
        //     totalCount: total[0] === undefined ? 0 : total[0].totalCount
        // }
    }

    async realTimeReadInGrup(body: any): Promise<any> {

        let page = body.page
        let pageSize = body.pageSize
        let searchParameter = body.searchParameter

        const regexArray = searchParameter.trim().split(" ").map((param: any) => new RegExp(param, 'i'));

        // let schoolOrgIdList = searchParameter.length > 0 && body.programSchoolOrg.length === 0 ? await this.programSchoolOrgModal.find({
        //     $or: [
        //         { name: { $in: regexArray } },
        //     ]
        // }).lean().select('_id').exec().then((result) => result.map((item) => new ObjectId(item._id))) : []

        // let schoolOrgTypeIdList = searchParameter.length > 0 && body.programSchoolOrgType.length === 0 ? await this.programSchoolTypeModal.find({ type: { $in: regexArray } }).lean().select('_id').exec().then((result) => result.map((item) => new ObjectId(item._id))) : []
        let schoolIdList = searchParameter.length > 0 && body.credentialSchool.length === 0 ? await this.schoolModal.find({ school: { $in: regexArray } }).lean().select('_id').exec().then((result) => result.map((item) => new ObjectId(item._id))) : []
        let opportunityIdList = searchParameter.length > 0 && body.Opportunity.length === 0 ? await this.specificFieldStudyModal.find({ specificField: { $in: regexArray } }).lean().select('_id').exec().then((result) => result.map((item) => new ObjectId(item._id))) : []
        // let specificFieldStudyIdList = searchParameter.length > 0 && body.credential.length === 0 ? await this.specificFieldStudyModal.find({ specificField: { $in: regexArray } }).lean().select('_id').exec().then((result) => result.map((item) => new ObjectId(item._id))) : []
        let generalFieldStudyIdList = searchParameter.length > 0 && body.field.length === 0 ? await this.generalFieldStudyModal.find({ field: { $in: regexArray } }).lean().select('_id').exec().then((result) => result.map((item) => new ObjectId(item._id))) : []
        let credentialIdList = searchParameter.length > 0 && body.credential.length === 0 ? await this.credentialModal.find({ credential: { $in: regexArray } }).lean().select('_id').exec().then((result) => result.map((item) => new ObjectId(item._id))) : []
        // let educationlevelModalIdList = searchParameter.length > 0 && body.credential.length === 0 ? await this.educationlevelModal.find({ educationlevel: { $in: regexArray } }).lean().select('_id').exec().then((result) => result.map((item) => new ObjectId(item._id))) : []
        // let requirementcredentialModalIdList = searchParameter.length > 0 && body.credential.length === 0 ? await this.requirementcredentialModal.find({ requirementcredential: { $in: regexArray } }).lean().select('_id').exec().then((result) => result.map((item) => new ObjectId(item._id))) : []
        // let requirementageModalIdList = searchParameter.length > 0 && body.credential.length === 0 ? await this.requirementageModal.find({ requirementage: { $in: regexArray } }).lean().select('_id').exec().then((result) => result.map((item) => new ObjectId(item._id))) : []

        // let programSchoolOrgIdList = body.programSchoolOrg.map((item: any) => new ObjectId(item.value))
        // let programSchoolOrgTypeList = body.programSchoolOrgType.map((item: any) => new ObjectId(item.value))


        let credentialSchoolList = body.credentialSchool.map((item: any) => new ObjectId(item.value))
        let OpportunityList = body.Opportunity.map((item: any) => new ObjectId(item.value))
        let fieldList = body.field.map((item: any) => new ObjectId(item.value))
        let credentialList = []

        if (body && body.credential && body.credential[0] && body.credential[0].value === null) {
            let credentialHint = body.credential[0].label
            const keyword = " Certifications";
            const cleanedCredential = credentialHint.replace(keyword, "").trim();
            const regex = new RegExp(cleanedCredential, 'i');
            credentialList = await this.credentialModal.find({ credential: regex }).lean().select('_id').exec().then((result) => result.map((item) => new ObjectId(item._id)))
        } else {
            credentialList = body.credential.map((item: any) => new ObjectId(item.value))
        }

        let orConditions: any[] = [
            { CourseList: { $in: regexArray } },
            { EducationLevel: { $in: regexArray } },
            { ApplicantRequirementCredential: { $in: regexArray } },
            { Age: { $in: regexArray } },
            { OpportunityLink: { $in: regexArray } }
        ];

        let bufferMatching: any = {
            $or: orConditions
        };

        let conditionPairPipeline: any = {
            ...bufferMatching
        };


        if (body.Opportunity.length > 0) conditionPairPipeline.SpecificAreaofStudy = { $in: OpportunityList }
        else orConditions.push({ SpecificAreaofStudy: { $in: opportunityIdList } });

        // if (body.programSchoolOrg.length > 0) conditionPairPipeline.programSchoolOrg = { $in: programSchoolOrgIdList }
        // else orConditions.push({ programSchoolOrg: { $in: schoolOrgIdList } });

        // if (body.programSchoolOrgType.length > 0) conditionPairPipeline.programSchoolOrgType = { $in: programSchoolOrgTypeList }
        // else orConditions.push({ programSchoolOrgType: { $in: schoolOrgTypeIdList } });

        if (credentialSchoolList.length > 0) conditionPairPipeline.credentialSchool = { $in: credentialSchoolList }
        else orConditions.push({ credentialSchool: { $in: schoolIdList } });

        if (body.field.length > 0) conditionPairPipeline.field = { $in: fieldList }
        else orConditions.push({ field: { $in: generalFieldStudyIdList } });

        if (body.credential.length > 0) conditionPairPipeline.credential = { $in: credentialList }
        else orConditions.push({ credential: { $in: credentialIdList } });

        // orConditions.push({ SpecificAreaofStudy: { $in: specificFieldStudyIdList } });
        // orConditions.push({ EducationLevel: { $in: educationlevelModalIdList } });
        // orConditions.push({ ApplicantRequirementCredential: { $in: requirementcredentialModalIdList } });
        // orConditions.push({ Age: { $in: requirementageModalIdList } });


        if (orConditions.length > 0) {
            conditionPairPipeline.$or = orConditions;
        }

        console.log('real time search', body.sortCondition);

        let sortField: string = body.sortCondition.split(':')[0];
        let direction: 1 | -1 = body.sortCondition.split(':')[1] === '1' ? 1 : -1;

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
                $lookup: {
                    from: 'specificfieldstudys',
                    localField: 'SpecificAreaofStudy',
                    foreignField: '_id',
                    as: 'SpecificAreaofStudy',
                },
            },
            {
                $unwind: '$SpecificAreaofStudy',
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
                    SpecificAreaofStudy: 1
                }
            },
            { $skip: (page - 1) * pageSize },
            { $limit: pageSize }
        ];

        const result = await this.stemModal.aggregate(handsPipeline).exec()

        let total: any = await this.stemModal.aggregate([
            { $match: conditionPairPipeline },
            { $count: "totalCount" }
        ]).exec();

        return {
            isOkay: true,
            result: result,
            totalCount: total[0] === undefined ? 0 : total[0].totalCount
        }
    }

    async realTimeRead(body: any): Promise<any> {

        let page = body.page
        let pageSize = body.pageSize
        let searchParameter = body.searchParameter

        const regexArray = searchParameter.trim().split(" ").map((param: any) => new RegExp(param, 'i'));

        // let schoolOrgIdList = searchParameter.length > 0 && body.programSchoolOrg.length === 0 ? await this.programSchoolOrgModal.find({
        //     $or: [
        //         { name: { $in: regexArray } },
        //     ]
        // }).lean().select('_id').exec().then((result) => result.map((item) => new ObjectId(item._id))) : []

        // let schoolOrgTypeIdList = searchParameter.length > 0 && body.programSchoolOrgType.length === 0 ? await this.programSchoolTypeModal.find({ type: { $in: regexArray } }).lean().select('_id').exec().then((result) => result.map((item) => new ObjectId(item._id))) : []
        let schoolIdList = searchParameter.length > 0 && body.credentialSchool.length === 0 ? await this.schoolModal.find({ school: { $in: regexArray } }).lean().select('_id').exec().then((result) => result.map((item) => new ObjectId(item._id))) : []
        let opportunityIdList = searchParameter.length > 0 && body.Opportunity.length === 0 ? await this.opportunityModal.find({ opportunity: { $in: regexArray } }).lean().select('_id').exec().then((result) => result.map((item) => new ObjectId(item._id))) : []
        // let specificFieldStudyIdList = searchParameter.length > 0 && body.credential.length === 0 ? await this.specificFieldStudyModal.find({ specificField: { $in: regexArray } }).lean().select('_id').exec().then((result) => result.map((item) => new ObjectId(item._id))) : []
        let generalFieldStudyIdList = searchParameter.length > 0 && body.field.length === 0 ? await this.generalFieldStudyModal.find({ field: { $in: regexArray } }).lean().select('_id').exec().then((result) => result.map((item) => new ObjectId(item._id))) : []
        let credentialIdList = searchParameter.length > 0 && body.credential.length === 0 ? await this.credentialModal.find({ credential: { $in: regexArray } }).lean().select('_id').exec().then((result) => result.map((item) => new ObjectId(item._id))) : []
        // let educationlevelModalIdList = searchParameter.length > 0 && body.credential.length === 0 ? await this.educationlevelModal.find({ educationlevel: { $in: regexArray } }).lean().select('_id').exec().then((result) => result.map((item) => new ObjectId(item._id))) : []
        // let requirementcredentialModalIdList = searchParameter.length > 0 && body.credential.length === 0 ? await this.requirementcredentialModal.find({ requirementcredential: { $in: regexArray } }).lean().select('_id').exec().then((result) => result.map((item) => new ObjectId(item._id))) : []
        // let requirementageModalIdList = searchParameter.length > 0 && body.credential.length === 0 ? await this.requirementageModal.find({ requirementage: { $in: regexArray } }).lean().select('_id').exec().then((result) => result.map((item) => new ObjectId(item._id))) : []

        // let programSchoolOrgIdList = body.programSchoolOrg.map((item: any) => new ObjectId(item.value))
        // let programSchoolOrgTypeList = body.programSchoolOrgType.map((item: any) => new ObjectId(item.value))


        let credentialSchoolList = body.credentialSchool.map((item: any) => new ObjectId(item.value))
        let OpportunityList = body.Opportunity.map((item: any) => new ObjectId(item.value))
        let fieldList = body.field.map((item: any) => new ObjectId(item.value))
        let credentialList = []

        if (body && body.credential && body.credential[0] && body.credential[0].value === null) {
            let credentialHint = body.credential[0].label
            const keyword = " Certifications";
            const cleanedCredential = credentialHint.replace(keyword, "").trim();
            const regex = new RegExp(cleanedCredential, 'i');
            credentialList = await this.credentialModal.find({ credential: regex }).lean().select('_id').exec().then((result) => result.map((item) => new ObjectId(item._id)))
        } else {
            credentialList = body.credential.map((item: any) => new ObjectId(item.value))
        }

        let orConditions: any[] = [
            { CourseList: { $in: regexArray } },
            { EducationLevel: { $in: regexArray } },
            { ApplicantRequirementCredential: { $in: regexArray } },
            { Age: { $in: regexArray } },
            { OpportunityLink: { $in: regexArray } }
        ];

        let bufferMatching: any = {
            $or: orConditions
        };

        let conditionPairPipeline: any = {
            ...bufferMatching
        };


        if (body.Opportunity.length > 0) conditionPairPipeline.Opportunity = { $in: OpportunityList }
        else orConditions.push({ Opportunity: { $in: opportunityIdList } });

        // if (body.programSchoolOrg.length > 0) conditionPairPipeline.programSchoolOrg = { $in: programSchoolOrgIdList }
        // else orConditions.push({ programSchoolOrg: { $in: schoolOrgIdList } });

        // if (body.programSchoolOrgType.length > 0) conditionPairPipeline.programSchoolOrgType = { $in: programSchoolOrgTypeList }
        // else orConditions.push({ programSchoolOrgType: { $in: schoolOrgTypeIdList } });

        if (credentialSchoolList.length > 0) conditionPairPipeline.credentialSchool = { $in: credentialSchoolList }
        else orConditions.push({ credentialSchool: { $in: schoolIdList } });

        if (body.field.length > 0) conditionPairPipeline.field = { $in: fieldList }
        else orConditions.push({ field: { $in: generalFieldStudyIdList } });

        if (body.credential.length > 0) conditionPairPipeline.credential = { $in: credentialList }
        else orConditions.push({ credential: { $in: credentialIdList } });

        // orConditions.push({ SpecificAreaofStudy: { $in: specificFieldStudyIdList } });
        // orConditions.push({ EducationLevel: { $in: educationlevelModalIdList } });
        // orConditions.push({ ApplicantRequirementCredential: { $in: requirementcredentialModalIdList } });
        // orConditions.push({ Age: { $in: requirementageModalIdList } });


        if (orConditions.length > 0) {
            conditionPairPipeline.$or = orConditions;
        }

        console.log('real time search', body.sortCondition);

        let sortField: string = body.sortCondition.split(':')[0];
        let direction: 1 | -1 = body.sortCondition.split(':')[1] === '1' ? 1 : -1;

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
                $lookup: {
                    from: 'specificfieldstudys',
                    localField: 'SpecificAreaofStudy',
                    foreignField: '_id',
                    as: 'SpecificAreaofStudy',
                },
            },
            {
                $unwind: '$SpecificAreaofStudy',
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
                }
            },
            { $skip: (page - 1) * pageSize },
            { $limit: pageSize }
        ];

        const result = await this.stemModal.aggregate(handsPipeline).exec()

        let total: any = await this.stemModal.aggregate([
            { $match: conditionPairPipeline },
            { $count: "totalCount" }
        ]).exec();

        return {
            isOkay: true,
            result: result,
            totalCount: total[0] === undefined ? 0 : total[0].totalCount
        }
    }

    async read(body: any): Promise<any> {

        const requestTime = new Date();
        console.log(`API Request Time: ${requestTime}`);

        let page = body.page
        let pageSize = body.pageSize
        let searchParameter = body.searchParameter

        let schoolOrgIdList = searchParameter.length > 0 && body.programSchoolOrg.length === 0 ? await this.programSchoolOrgModal.find({
            $or: [
                { name: { $regex: searchParameter } },
                { address: { $regex: searchParameter } },
                { city: { $regex: searchParameter } },
                { zip: { $regex: searchParameter } },
                { neighborhood: { $regex: searchParameter } }
            ]
        }).lean().select('_id').exec().then((result) => result.map((item) => new ObjectId(item._id))) : []

        let schoolOrgTypeIdList = searchParameter.length > 0 && body.programSchoolOrgType.length === 0 ? await this.programSchoolTypeModal.find({ type: { $regex: searchParameter } }).lean().select('_id').exec().then((result) => result.map((item) => new ObjectId(item._id))) : []
        let schoolIdList = searchParameter.length > 0 && body.credentialSchool.length === 0 ? await this.schoolModal.find({ school: { $regex: searchParameter } }).lean().select('_id').exec().then((result) => result.map((item) => new ObjectId(item._id))) : []
        let opportunityIdList = searchParameter.length > 0 && body.Opportunity.length === 0 ? await this.opportunityModal.find({ opportunity: { $regex: searchParameter } }).lean().select('_id').exec().then((result) => result.map((item) => new ObjectId(item._id))) : []
        let specificFieldStudyIdList = searchParameter.length > 0 && body.credential.length === 0 ? await this.specificFieldStudyModal.find({ specificField: { $regex: searchParameter } }).lean().select('_id').exec().then((result) => result.map((item) => new ObjectId(item._id))) : []
        let generalFieldStudyIdList = searchParameter.length > 0 && body.field.length === 0 ? await this.generalFieldStudyModal.find({ field: { $regex: searchParameter } }).lean().select('_id').exec().then((result) => result.map((item) => new ObjectId(item._id))) : []
        let credentialIdList = searchParameter.length > 0 && body.credential.length === 0 ? await this.credentialModal.find({ credential: { $regex: searchParameter } }).lean().select('_id').exec().then((result) => result.map((item) => new ObjectId(item._id))) : []
        let educationlevelModalIdList = searchParameter.length > 0 && body.credential.length === 0 ? await this.educationlevelModal.find({ educationlevel: { $regex: searchParameter } }).lean().select('_id').exec().then((result) => result.map((item) => new ObjectId(item._id))) : []
        let requirementcredentialModalIdList = searchParameter.length > 0 && body.credential.length === 0 ? await this.requirementcredentialModal.find({ requirementcredential: { $regex: searchParameter } }).lean().select('_id').exec().then((result) => result.map((item) => new ObjectId(item._id))) : []
        let requirementageModalIdList = searchParameter.length > 0 && body.credential.length === 0 ? await this.requirementageModal.find({ requirementage: { $regex: searchParameter } }).lean().select('_id').exec().then((result) => result.map((item) => new ObjectId(item._id))) : []



        let programSchoolOrgIdList = body.programSchoolOrg.map((item: any) => new ObjectId(item.value))
        let programSchoolOrgTypeList = body.programSchoolOrgType.map((item: any) => new ObjectId(item.value))
        let credentialSchoolList = body.credentialSchool.map((item: any) => new ObjectId(item.value))
        let OpportunityList = body.Opportunity.map((item: any) => new ObjectId(item.value))
        let fieldList = body.field.map((item: any) => new ObjectId(item.value))
        let credentialList = body.credential.map((item: any) => new ObjectId(item.value))


        let orConditions: any[] = [
            { CourseList: { $regex: searchParameter } },
            { EducationLevel: { $regex: searchParameter } },
            { ApplicantRequirementCredential: { $regex: searchParameter } },
            { Age: { $regex: searchParameter } },
            { OpportunityLink: { $regex: searchParameter } }
        ];

        let bufferMatching: any = {
            $or: orConditions
        };

        let conditionPairPipeline: any = {
            ...bufferMatching
        };


        if (body.Opportunity.length > 0) conditionPairPipeline.Opportunity = { $in: OpportunityList }
        else orConditions.push({ Opportunity: { $in: opportunityIdList } });

        if (body.programSchoolOrg.length > 0) conditionPairPipeline.programSchoolOrg = { $in: programSchoolOrgIdList }
        else orConditions.push({ programSchoolOrg: { $in: schoolOrgIdList } });

        if (body.programSchoolOrgType.length > 0) conditionPairPipeline.programSchoolOrgType = { $in: programSchoolOrgTypeList }
        else orConditions.push({ programSchoolOrgType: { $in: schoolOrgTypeIdList } });

        if (credentialSchoolList.length > 0) conditionPairPipeline.credentialSchool = { $in: credentialSchoolList }
        else orConditions.push({ credentialSchool: { $in: schoolIdList } });

        if (body.field.length > 0) conditionPairPipeline.field = { $in: fieldList }
        else orConditions.push({ field: { $in: generalFieldStudyIdList } });

        if (body.credential.length > 0) conditionPairPipeline.credential = { $in: credentialList }
        else orConditions.push({ credential: { $in: credentialIdList } });

        orConditions.push({ SpecificAreaofStudy: { $in: specificFieldStudyIdList } });
        orConditions.push({ EducationLevel: { $in: educationlevelModalIdList } });
        orConditions.push({ ApplicantRequirementCredential: { $in: requirementcredentialModalIdList } });
        orConditions.push({ Age: { $in: requirementageModalIdList } });

        if (orConditions.length > 0) {
            conditionPairPipeline.$or = orConditions;
        }

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
                $lookup: {
                    from: 'specificfieldstudys',
                    localField: 'SpecificAreaofStudy',
                    foreignField: '_id',
                    as: 'SpecificAreaofStudy',
                },
            },
            {
                $unwind: '$SpecificAreaofStudy',
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
            { $skip: (page - 1) * pageSize },
            { $limit: pageSize }
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
                    from: 'specificfieldstudys',
                    localField: 'SpecificAreaofStudy',
                    foreignField: '_id',
                    as: 'SpecificAreaofStudy',
                },
            },
            {
                $unwind: '$SpecificAreaofStudy',
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
                $lookup: {
                    from: 'educationlevels',
                    localField: 'EducationLevel',
                    foreignField: '_id',
                    as: 'EducationLevel',
                },
            },
            {
                $unwind: {
                    path: '$EducationLevel',
                    preserveNullAndEmptyArrays: true,
                },
            },
            {
                $lookup: {
                    from: 'requirementcredentials',
                    localField: 'ApplicantRequirementCredential',
                    foreignField: '_id',
                    as: 'ApplicantRequirementCredential',
                },
            },
            {
                $unwind: {
                    path: '$ApplicantRequirementCredential',
                    preserveNullAndEmptyArrays: true,
                },
            },
            {
                $lookup: {
                    from: 'requirementages',
                    localField: 'Age',
                    foreignField: '_id',
                    as: 'Age',
                },
            },
            {
                $unwind: {
                    path: '$Age',
                    preserveNullAndEmptyArrays: true,
                },
            },
            {
                $project: {
                    schoolOrg: 1,
                    schoolOrgType: 1,
                    credentialSchool: 1,
                    opportunity: 1,
                    field: 1,
                    SpecificAreaofStudy: 1,
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
