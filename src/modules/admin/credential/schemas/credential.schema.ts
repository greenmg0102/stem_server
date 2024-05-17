import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes } from 'mongoose'

export type CredentialSchemaDocument = HydratedDocument<Credential>;

@Schema({ timestamps: true, collection: 'credentials' })

export class Credential {

  @Prop({ required: true })
  credential: string;

  @Prop({ required: true })
  status: number;

}

export const CredentialSchema = SchemaFactory.createForClass(Credential);