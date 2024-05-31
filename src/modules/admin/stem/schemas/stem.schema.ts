import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes } from 'mongoose'

import { ProgramSchoolOrg } from '../../program-school-org/schemas/program-school-org.schema'
import { ProgramSchoolType } from '../../program-school-type/schemas/program.school.type.schema'
import { School } from '../../shool/schemas/school.schema'
import { Opportunity } from '../../opportuniy/schemas/opportunity.schema'
import { GeneralFieldStudy } from '../../general-field-study/schemas/general.field.study.service.schema'
import { SpecificFieldStudy } from '../../general-field-study/schemas/specific.field.study.service.schema'
import { Credential } from '../../credential/schemas/credential.schema'

import { Educationlevel } from 'src/modules/admin/education-level/schemas/education-level.schema';
import { Requirementcredential } from 'src/modules/admin/requirement-credential/schemas/requirement-credential.schema';
import { Requirementage } from 'src/modules/admin/requirement-age/schemas/requirement-age.schema';

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

  @Prop({ type: SchemaTypes.ObjectId, ref: 'specificfieldstudys' })
  SpecificAreaofStudy: SpecificFieldStudy

  @Prop({ type: SchemaTypes.ObjectId, ref: 'generalfieldstudys' })
  field: GeneralFieldStudy

  @Prop({ required: false })
  CourseList: string

  @Prop({ type: SchemaTypes.ObjectId, ref: 'credentials' })
  credential: Credential

  @Prop({ type: SchemaTypes.ObjectId, ref: 'educationlevels' })
  EducationLevel: Educationlevel

  @Prop({ type: SchemaTypes.ObjectId, ref: 'requirementcredentials' })
  ApplicantRequirementCredential: Requirementcredential

  @Prop({ type: SchemaTypes.ObjectId, ref: 'requirementages' })
  Age: Requirementage

  @Prop({ required: false })
  OpportunityLink: string

}

export const StemSchema = SchemaFactory.createForClass(Stem);