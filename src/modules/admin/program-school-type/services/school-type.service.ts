import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Schema as MongooseSchema } from 'mongoose';
import { ProgramSchoolType } from 'src/modules/admin/program-school-type/schemas/program.school.type.schema';

@Injectable()
export class SchoolTypeService {

    constructor(
        @InjectModel(ProgramSchoolType.name) private readonly ProgramSchoolTypeModal: Model<ProgramSchoolType>,
    ) { }

    async read(body: any): Promise<any> {

        let result = await this.ProgramSchoolTypeModal
            .find()
            .then((res: any) => {
                return res
            })
            .catch((err: any) => {
                return []
            });

        return result
    }

    async create(body: any): Promise<any> {
        console.log('body', body);

        let newProgramSchoolType = new this.ProgramSchoolTypeModal(body);

        let result = await newProgramSchoolType
            .save()
            .then(async (res: any) => {
                let result = await this.ProgramSchoolTypeModal
                    .find()
                    .then((res: any) => {
                        return res
                    })
                    .catch((err: any) => {
                        return []
                    });

                return {
                    isOkay: true,
                    result: result
                }
            })
            .catch((err: any) => {
                console.log("newBlog saving fail ~~ !");
                return {
                    isOkay: false,
                    message: "Registration failed"
                }
            });

        return result
    }

    async delete(body: any): Promise<any> {

        let result = await this.ProgramSchoolTypeModal
            .findByIdAndDelete(body.id)
            .then(async (res: any) => {
                let result = await this.ProgramSchoolTypeModal
                    .find()
                    .then((res: any) => {
                        return res
                    })
                    .catch((err: any) => {
                        return []
                    });

                return {
                    isOkay: true,
                    result: result
                }
            })
            .catch((err: any) => {
                console.log("newBlog saving fail ~~ !");
                return {
                    isOkay: false,
                    message: "Registration failed"
                }
            });

        return result
    }

    async update(body: any): Promise<any> {

        console.log("update", body);
        

        let result = await this.ProgramSchoolTypeModal
            .findByIdAndUpdate(body.id, { status: body.status })
            .then(async (res: any) => {
                let result = await this.ProgramSchoolTypeModal
                    .find()
                    .then((res: any) => {
                        return res
                    })
                    .catch((err: any) => {
                        return []
                    });

                return {
                    isOkay: true,
                    result: result
                }
            })
            .catch((err: any) => {
                console.log("newBlog saving fail ~~ !");
                return {
                    isOkay: false,
                    message: "Registration failed"
                }
            });

        return result
    }

}
