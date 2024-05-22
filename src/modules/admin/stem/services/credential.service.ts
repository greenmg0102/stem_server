import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Schema as MongooseSchema } from 'mongoose';
import { Credential } from 'src/modules/admin/credential/schemas/credential.schema';

@Injectable()
export class CredentialService {

    constructor(
        @InjectModel(Credential.name) private readonly credentialModal: Model<Credential>,
    ) { }

    async read(credential: string): Promise<any> {

        console.log("credential", credential);
        

        let result = await this.credentialModal
            .find({
                credential: { $regex: credential, $options: 'i' },
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
