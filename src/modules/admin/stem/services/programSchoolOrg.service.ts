import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Schema as MongooseSchema } from 'mongoose';
import { ProgramSchoolOrg } from 'src/modules/admin/program-school-org/schemas/program-school-org.schema';

@Injectable()
export class ProgramSchoolOrgService {

    constructor(
        @InjectModel(ProgramSchoolOrg.name) private readonly programSchoolOrgModal: Model<ProgramSchoolOrg>,
    ) { }

    async read(name: string): Promise<any> {

        console.log("name", name);


        let result = await this.programSchoolOrgModal
            .find({
                name: { $regex: name },
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
