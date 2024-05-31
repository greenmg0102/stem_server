import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes } from 'mongoose'

export type RequirementcredentialSchemaDocument = HydratedDocument<Requirementcredential>;

@Schema({ timestamps: true, collection: 'requirementcredentials' })

export class Requirementcredential {

  @Prop({ required: true })
  requirementcredential: string;

  @Prop({ required: true })
  status: number;

}

export const RequirementcredentialSchema = SchemaFactory.createForClass(Requirementcredential);