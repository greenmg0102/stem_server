import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes } from 'mongoose'

import { ProgramSchoolOrg } from '../../program-school-org/schemas/program-school-org.schema'
import { ProgramSchoolType } from '../../program-school-type/schemas/program.school.type.schema'
import { School } from '../../shool/schemas/school.schema'
import { Opportunity } from '../../opportuniy/schemas/opportunity.schema'
import { GeneralFieldStudy } from '../../general-field-study/schemas/general.field.study.service.schema'
import { Credential } from '../../credential/schemas/credential.schema'

export type StemSchemaDocument = HydratedDocument<Stem>;

@Schema({ timestamps: true, collection: 'stems' })

export class Stem {

  @Prop({ type: SchemaTypes.ObjectId, ref: 'programschoolorgs' })
  programSchoolOrg: ProgramSchoolOrg


  @Prop({ type: SchemaTypes.ObjectId, ref: 'programschooltypes' })
  programSchoolOrgType: ProgramSchoolType


  @Prop({ type: SchemaTypes.ObjectId, ref: 'schools' })
  credentialSchool: School


  @Prop({ type: SchemaTypes.ObjectId, ref: 'opportunitys' })
  Opportunity: Opportunity


  @Prop({ type: SchemaTypes.ObjectId, ref: 'generalfieldstudys' })
  field: GeneralFieldStudy


  @Prop({ type: SchemaTypes.ObjectId, ref: 'credentials' })
  credential: Credential

}

export const StemSchema = SchemaFactory.createForClass(Stem);