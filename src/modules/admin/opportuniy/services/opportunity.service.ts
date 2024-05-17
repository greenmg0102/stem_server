import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Schema as MongooseSchema } from 'mongoose';
import { Opportunity } from 'src/modules/admin/opportuniy/schemas/opportunity.schema';

@Injectable()
export class OpportunityService {

    constructor(
        @InjectModel(Opportunity.name) private readonly opportunityModal: Model<Opportunity>,
    ) { }

    async read(body: any): Promise<any> {

        let result = await this.opportunityModal
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

        let newGeneralFieldStudy = new this.opportunityModal(body);

        let result = await newGeneralFieldStudy
            .save()
            .then(async (res: any) => {
                let result = await this.opportunityModal
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

        let result = await this.opportunityModal
            .findByIdAndDelete(body.id)
            .then(async (res: any) => {
                let result = await this.opportunityModal
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

        let result = await this.opportunityModal
            .findByIdAndUpdate(body.id, { status: body.status })
            .then(async (res: any) => {
                let result = await this.opportunityModal
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
