import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes } from 'mongoose'

export type ProgramSchoolOrgSchemaDocument = HydratedDocument<ProgramSchoolOrg>;

@Schema({ timestamps: true, collection: 'programschoolorgs' })

export class ProgramSchoolOrg {

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  address: string;

  @Prop({ required: true })
  city: string;

  @Prop({ required: true })
  zip: string;

  @Prop({ required: true })
  neighborhood: string;

  @Prop({ required: true })
  status: number;

}

export const ProgramSchoolOrgSchema = SchemaFactory.createForClass(ProgramSchoolOrg);