import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Schema as MongooseSchema } from 'mongoose';
import { GeneralFieldStudy } from 'src/modules/admin/general-field-study/schemas/general.field.study.service.schema';

@Injectable()
export class GeneralFieldStudyService {

    constructor(
        @InjectModel(GeneralFieldStudy.name) private readonly generalFieldStudyModal: Model<GeneralFieldStudy>,
    ) { }

    async read(field: string): Promise<any> {

        let result = await this.generalFieldStudyModal
            .find({
                field: { $regex: field },
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
