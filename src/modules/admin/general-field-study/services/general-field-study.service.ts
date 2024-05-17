import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Schema as MongooseSchema } from 'mongoose';
import { GeneralFieldStudy } from 'src/modules/admin/general-field-study/schemas/general.field.study.service.schema';

@Injectable()
export class GeneralFieldStudyService {

    constructor(
        @InjectModel(GeneralFieldStudy.name) private readonly generalFieldStudyModal: Model<GeneralFieldStudy>,
    ) { }

    async read(body: any): Promise<any> {

        let result = await this.generalFieldStudyModal
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

        let newGeneralFieldStudy = new this.generalFieldStudyModal(body);

        let result = await newGeneralFieldStudy
            .save()
            .then(async (res: any) => {
                let result = await this.generalFieldStudyModal
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

        let result = await this.generalFieldStudyModal
            .findByIdAndDelete(body.id)
            .then(async (res: any) => {
                let result = await this.generalFieldStudyModal
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

        let result = await this.generalFieldStudyModal
            .findByIdAndUpdate(body.id, { status: body.status })
            .then(async (res: any) => {
                let result = await this.generalFieldStudyModal
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
