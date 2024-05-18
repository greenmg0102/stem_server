import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Schema as MongooseSchema } from 'mongoose';
import { Stem } from 'src/modules/admin/stem/schemas/stem.schema';

import { ProgramSchoolOrg } from 'src/modules/admin/program-school-org/schemas/program-school-org.schema';
import { ProgramSchoolType } from 'src/modules/admin/program-school-type/schemas/program.school.type.schema';
import { School } from 'src/modules/admin/shool/schemas/school.schema';
import { Opportunity } from 'src/modules/admin/opportuniy/schemas/opportunity.schema';
import { GeneralFieldStudy } from 'src/modules/admin/general-field-study/schemas/general.field.study.service.schema';
import { SpecificFieldStudy } from 'src/modules/admin/general-field-study/schemas/specific.field.study.service.schema';
import { Credential } from 'src/modules/admin/credential/schemas/credential.schema';

@Injectable()
export class StemService {

  constructor(

    @InjectModel(ProgramSchoolOrg.name) private readonly programSchoolOrgModal: Model<ProgramSchoolOrg>,
    @InjectModel(ProgramSchoolType.name) private readonly programSchoolTypeModal: Model<ProgramSchoolType>,
    @InjectModel(School.name) private readonly schoolModal: Model<School>,
    @InjectModel(SpecificFieldStudy.name) private readonly specificFieldStudyModal: Model<SpecificFieldStudy>,
    @InjectModel(GeneralFieldStudy.name) private readonly generalFieldStudyModal: Model<GeneralFieldStudy>,
    @InjectModel(Credential.name) private readonly credentialModal: Model<Credential>,
    @InjectModel(Opportunity.name) private readonly opportunityModal: Model<Opportunity>,
    @InjectModel(Stem.name) private readonly stemModal: Model<Stem>,

  ) { }

  async read(body: any): Promise<any> {

    // import ProgramSchoolOrg from './tempData1.txt'
    // import ProgramSchoolOrgType from './tempData2.txt'
    // import CredentialsSchool from './tempData3.txt'
    // import SpecificAreaofStudy from './tempData4.txt'
    // import GeneralFieldofStudy from './tempData5.txt'
    // import CourseList from './tempData6.txt'
    // import Credential from './tempData7.txt'
    // import EducationLevel from './tempData8.txt'
    // import ApplicantRequirementCredential from './tempData9.txt'
    // import Age from './tempData10.txt'
    // import OpportunityLink from './tempData11.txt'


    // for (let i = 0; i < body.list.length; i++) {

    //   let programSchoolOrgId = await this.programSchoolOrgModal.findOne({ name: body.list[i][0] }).then((res: any) => { return res._id })
    //   let programSchoolOrgTypeId = await this.programSchoolTypeModal.findOne({ type: body.list[i][1] }).then((res: any) => { return res._id })
    //   let credentialSchoolId = await this.schoolModal.findOne({ school: body.list[i][2] }).then((res: any) => { return res._id })
    //   let SpecificAreaofStudyId = await this.specificFieldStudyModal.findOne({ specificField: body.list[i][3] }).then((res: any) => { return res._id })
    //   let fieldId = await this.generalFieldStudyModal.findOne({ field: body.list[i][4] }).then((res: any) => { return res._id })
    //   let CourseListString = body.list[i][5]
    //   let credentialId = await this.credentialModal.findOne({ credential: body.list[i][6] }).then((res: any) => { return res._id })
    //   let EducationLevel = body.list[i][7]
    //   let ApplicantRequirementCredential = body.list[i][8]
    //   let Age = body.list[i][9]
    //   let OpportunityLink = body.list[i][10]
    //   let OpportunityId = await this.opportunityModal.findOne({ opportunity: body.list[i][11] }).then((res: any) => { return res._id })

    //   let data = {
    //     programSchoolOrg: programSchoolOrgId,
    //     programSchoolOrgType: programSchoolOrgTypeId,
    //     credentialSchool: credentialSchoolId,
    //     SpecificAreaofStudy: SpecificAreaofStudyId,
    //     field: fieldId,
    //     CourseList: CourseListString,
    //     credential: credentialId,
    //     EducationLevel: EducationLevel,
    //     ApplicantRequirementCredential: ApplicantRequirementCredential,
    //     Age: Age,
    //     OpportunityLink: OpportunityLink,
    //     Opportunity: OpportunityId,
    //   }

    //   let newStem = new this.stemModal(data);
    //   await newStem.save()

    // }

    // console.log("body.list", body.list);

    // for (let i = 0; i < body.list.length; i++) {
    //   let data = {
    //     name: body.list[i][0],
    //     address: body.list[i][1],
    //     city: body.list[i][2],
    //     zip: body.list[i][3],
    //     neighborhood: body.list[i][4],
    //     status: 1
    //   }

    //   let newStem = new this.stemModal(data);
    //   await newStem.save()
    // }

    // console.log("wwwGen", body.list);

    // const wwwGen = this.opportunityModal;

    // const data = body.list.map((item: any) => ({
    //   opportunity: item,
    //   status: 1
    // }));

    // wwwGen.insertMany(data)
    //   .then(result => {
    //     console.log('Data inserted successfully:', result);
    //   })
    //   .catch(error => {
    //     console.error('Error inserting data:', error);
    //   });


    const result = await this.stemModal.aggregate([
      {
        $lookup: {
          from: 'programschoolorgs',
          localField: 'programSchoolOrg',
          foreignField: '_id',
          as: 'schoolOrg',
        },
      },
      {
        $unwind: '$schoolOrg',
      },
      {
        $lookup: {
          from: 'programschooltypes',
          localField: 'programSchoolOrgType',
          foreignField: '_id',
          as: 'schoolOrgType',
        },
      },
      {
        $unwind: '$schoolOrgType',
      },
      {
        $lookup: {
          from: 'schools',
          localField: 'credentialSchool',
          foreignField: '_id',
          as: 'credentialSchool',
        },
      },
      {
        $unwind: '$credentialSchool',
      },
      {
        $lookup: {
          from: 'opportunitys',
          localField: 'Opportunity',
          foreignField: '_id',
          as: 'opportunity',
        },
      },
      {
        $unwind: '$opportunity',
      },
      {
        $lookup: {
          from: 'generalfieldstudys',
          localField: 'field',
          foreignField: '_id',
          as: 'field',
        },
      },
      {
        $unwind: '$field',
      },
      {
        $lookup: {
          from: 'credentials',
          localField: 'credential',
          foreignField: '_id',
          as: 'credential',
        },
      },
      {
        $unwind: '$credential',
      },
      {
        $project: {
          schoolOrg: 1,
          schoolOrgType: 1,
          credentialSchool: 1,
          opportunity: 1,
          field: 1,
          credential: 1
        }
      },
      { $skip: 0 },
      { $limit: 20 }
    ]).exec();

    return {
      isOkay: true,
      result: result.slice(0, 10)
    }

  }

  async create(body: any): Promise<any> {

    let real = {}
    Object.keys(body).forEach((key: any) => {
      if (key !== "status") real[key] = body[key]
    })

    console.log('real', real);

    let newStem = new this.stemModal(real);

    let result = await newStem
      .save()
      .then(async (res: any) => {

        const result = await this.stemModal.aggregate([
          {
            $lookup: {
              from: 'programschoolorgs',
              localField: 'programSchoolOrg',
              foreignField: '_id',
              as: 'schoolOrg',
            },
          },
          {
            $unwind: '$schoolOrg',
          },
          {
            $lookup: {
              from: 'programschooltypes',
              localField: 'programSchoolOrgType',
              foreignField: '_id',
              as: 'schoolOrgType',
            },
          },
          {
            $unwind: '$schoolOrgType',
          },
          {
            $lookup: {
              from: 'schools',
              localField: 'credentialSchool',
              foreignField: '_id',
              as: 'credentialSchool',
            },
          },
          {
            $unwind: '$credentialSchool',
          },
          {
            $lookup: {
              from: 'opportunitys',
              localField: 'Opportunity',
              foreignField: '_id',
              as: 'opportunity',
            },
          },
          {
            $unwind: '$opportunity',
          },
          {
            $lookup: {
              from: 'generalfieldstudys',
              localField: 'field',
              foreignField: '_id',
              as: 'field',
            },
          },
          {
            $unwind: '$field',
          },
          {
            $lookup: {
              from: 'credentials',
              localField: 'credential',
              foreignField: '_id',
              as: 'credential',
            },
          },
          {
            $unwind: '$credential',
          },
          {
            $project: {
              schoolOrg: 1,
              schoolOrgType: 1,
              credentialSchool: 1,
              opportunity: 1,
              field: 1,
              credential: 1
            }
          },
          { $skip: 0 },
          { $limit: 20 }
        ]).exec();

        return {
          isOkay: true,
          result: result
        }
      })
      .catch((err: any) => {
        console.log("newBlog saving fail ~~ !");
        return {
          isOkay: false,
          message: "Registration failed"
        }
      });

    return result
  }


}
