import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes } from 'mongoose'

export type SpecificFieldStudySchemaDocument = HydratedDocument<SpecificFieldStudy>;

@Schema({ timestamps: true, collection: 'specificfieldstudys' })

export class SpecificFieldStudy {

  @Prop({ required: true })
  specificField: string;

  @Prop({ required: true })
  status: number;

}

export const SpecificFieldStudySchema = SchemaFactory.createForClass(SpecificFieldStudy);