import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Schema as MongooseSchema } from 'mongoose';
import { Credential } from 'src/modules/admin/credential/schemas/credential.schema';

@Injectable()
export class CredentialService {

    constructor(
        @InjectModel(Credential.name) private readonly credentialModal: Model<Credential>,
    ) { }

    async read(body: any): Promise<any> {

        let result = await this.credentialModal
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

        let newSchool = new this.credentialModal(body);

        let result = await newSchool
            .save()
            .then(async (res: any) => {
                let result = await this.credentialModal
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

        let result = await this.credentialModal
            .findByIdAndDelete(body.id)
            .then(async (res: any) => {
                let result = await this.credentialModal
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


        let result = await this.credentialModal
            .findByIdAndUpdate(body.id, { status: body.status })
            .then(async (res: any) => {
                let result = await this.credentialModal
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
