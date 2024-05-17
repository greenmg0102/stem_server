import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Schema as MongooseSchema } from 'mongoose';
import { School } from 'src/modules/admin/shool/schemas/school.schema';

@Injectable()
export class CredentialSchoolService {

    constructor(
        @InjectModel(School.name) private readonly schoolModal: Model<School>,
    ) { }

    async read(school: string): Promise<any> {

        let result = await this.schoolModal
            .find({
                school: { $regex: school },
                status: 1
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
