import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes } from 'mongoose'

export type EducationlevelSchemaDocument = HydratedDocument<Educationlevel>;

@Schema({ timestamps: true, collection: 'educationlevels' })

export class Educationlevel {

  @Prop({ required: true })
  educationlevel: string;

  @Prop({ required: true })
  status: number;

}

export const EducationlevelSchema = SchemaFactory.createForClass(Educationlevel);