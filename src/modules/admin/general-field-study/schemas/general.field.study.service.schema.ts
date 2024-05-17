import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes } from 'mongoose'

export type GeneralFieldStudySchemaDocument = HydratedDocument<GeneralFieldStudy>;

@Schema({ timestamps: true, collection: 'generalfieldstudys' })

export class GeneralFieldStudy {

  @Prop({ required: true })
  field: string;

  @Prop({ required: true })
  status: number;

}

export const GeneralFieldStudySchema = SchemaFactory.createForClass(GeneralFieldStudy);