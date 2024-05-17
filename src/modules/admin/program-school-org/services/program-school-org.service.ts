import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Schema as MongooseSchema } from 'mongoose';
import { ProgramSchoolOrg } from 'src/modules/admin/program-school-org/schemas/program-school-org.schema';

@Injectable()
export class ProgramSchoolOrgService {

    constructor(
        @InjectModel(ProgramSchoolOrg.name) private readonly programSchoolOrgModal: Model<ProgramSchoolOrg>,
    ) { }

    async read(body: any): Promise<any> {

        let result = await this.programSchoolOrgModal
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

        let newProgramSchoolOrg = new this.programSchoolOrgModal(body);

        let result = await newProgramSchoolOrg
            .save()
            .then(async (res: any) => {
                let result = await this.programSchoolOrgModal
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

        let result = await this.programSchoolOrgModal
            .findByIdAndDelete(body.id)
            .then(async (res: any) => {
                let result = await this.programSchoolOrgModal
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


        let result = await this.programSchoolOrgModal
            .findByIdAndUpdate(body.id, { status: body.status })
            .then(async (res: any) => {
                let result = await this.programSchoolOrgModal
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
