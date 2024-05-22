import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Schema as MongooseSchema } from 'mongoose';
import { Opportunity } from 'src/modules/admin/opportuniy/schemas/opportunity.schema';

@Injectable()
export class OpportunityService {

    constructor(
        @InjectModel(Opportunity.name) private readonly opportunityModal: Model<Opportunity>,
    ) { }

    async read(opportunity: string): Promise<any> {

        let result = await this.opportunityModal
            .find({
                opportunity: { $regex: opportunity, $options: 'i'  },
            })
            .then((res: any) => {
                return res
            })
            .catch((err: any) => {
                return []
            });

        return result
    }
}
