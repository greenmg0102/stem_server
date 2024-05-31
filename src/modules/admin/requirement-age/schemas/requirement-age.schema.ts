import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes } from 'mongoose'

export type RequirementageSchemaDocument = HydratedDocument<Requirementage>;

@Schema({ timestamps: true, collection: 'requirementages' })

export class Requirementage {

  @Prop({ required: true })
  requirementage: string;

  @Prop({ required: true })
  status: number;

}

export const RequirementageSchema = SchemaFactory.createForClass(Requirementage);