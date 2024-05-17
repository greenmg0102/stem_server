import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes } from 'mongoose'

export type ProgramSchoolTypeSchemaDocument = HydratedDocument<ProgramSchoolType>;

@Schema({ timestamps: true, collection: 'programschooltypes' })

export class ProgramSchoolType {

  @Prop({ required: true })
  type: string;

  @Prop({ required: true })
  status: number;

}

export const ProgramSchoolTypeSchema = SchemaFactory.createForClass(ProgramSchoolType);