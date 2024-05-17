import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Schema as MongooseSchema } from 'mongoose';
import { Opportunity } from 'src/modules/admin/opportuniy/schemas/opportunity.schema';
import { Stem } from 'src/modules/admin/stem/schemas/stem.schema';

@Injectable()
export class OpportunitySearchService {

    constructor(
        @InjectModel(Opportunity.name) private readonly opportunityModal: Model<Opportunity>,
        @InjectModel(Stem.name) private readonly stemModal: Model<Stem>,
    ) { }

    async read(body: any): Promise<any> {


        let opportunityResult = await this.opportunityModal.find({ opportunity: { $regex: body.searchValue, $options: "i" } })

        let bufferOpportunity = opportunityResult.map((item: any) => item._id)

        let conditionPairPipeline = {
            Opportunity: { $in: bufferOpportunity },
        };

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

}
