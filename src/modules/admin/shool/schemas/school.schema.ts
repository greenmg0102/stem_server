import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes } from 'mongoose'

export type SchoolSchemaDocument = HydratedDocument<School>;

@Schema({ timestamps: true, collection: 'schools' })

export class School {

  @Prop({ required: true })
  school: string;

  @Prop({ required: true })
  status: number;

}

export const SchoolSchema = SchemaFactory.createForClass(School);