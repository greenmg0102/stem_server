import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Schema as MongooseSchema } from 'mongoose';
import { ProgramSchoolType } from 'src/modules/admin/program-school-type/schemas/program.school.type.schema';

@Injectable()
export class ProgramSchoolOrgTypeService {

    constructor(
        @InjectModel(ProgramSchoolType.name) private readonly programSchoolTypeModal: Model<ProgramSchoolType>,
    ) { }

    async read(type: string): Promise<any> {

        let result = await this.programSchoolTypeModal
            .find({
                type: { $regex: type },
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
