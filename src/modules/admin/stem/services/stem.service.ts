import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Schema as MongooseSchema } from 'mongoose';
import { Stem } from 'src/modules/admin/stem/schemas/stem.schema';

import { ProgramSchoolOrg } from 'src/modules/admin/program-school-org/schemas/program-school-org.schema';
import { ProgramSchoolType } from 'src/modules/admin/program-school-type/schemas/program.school.type.schema';
import { School } from 'src/modules/admin/shool/schemas/school.schema';
import { Opportunity } from 'src/modules/admin/opportuniy/schemas/opportunity.schema';
import { GeneralFieldStudy } from 'src/modules/admin/general-field-study/schemas/general.field.study.service.schema';
import { Credential } from 'src/modules/admin/credential/schemas/credential.schema';

@Injectable()
export class StemService {

  constructor(

    @InjectModel(ProgramSchoolOrg.name) private readonly programSchoolOrgModal: Model<ProgramSchoolOrg>,
    @InjectModel(ProgramSchoolType.name) private readonly programSchoolTypeModal: Model<ProgramSchoolType>,
    @InjectModel(School.name) private readonly schoolModal: Model<School>,
    @InjectModel(Opportunity.name) private readonly opportunityModal: Model<Opportunity>,
    @InjectModel(GeneralFieldStudy.name) private readonly generalFieldStudyModal: Model<GeneralFieldStudy>,
    @InjectModel(Credential.name) private readonly credentialModal: Model<Credential>,
    @InjectModel(Stem.name) private readonly stemModal: Model<Stem>,

  ) { }

  async read(body: any): Promise<any> {

    // programSchoolOrg: [],
    // programSchoolOrgType: [],
    // credentialSchool: [],
    // Opportunity: [],
    // field: [],
    // credential: [],
    // areaStudy: [],
    // educationLieve: [],
    // applicantRequirementCredential: [],
    // courseLink: "",
    // opportunityLink: "",


    // for (let i = 0; i < body.list.length; i++) {

    //   let programSchoolOrgId = await this.programSchoolOrgModal.findOne({ name: body.list[i][0] }).then((res: any) => { return res._id })
    //   let programSchoolOrgTypeId = await this.programSchoolTypeModal.findOne({ type: body.list[i][1] }).then((res: any) => { return res._id })
    //   let credentialSchoolId = await this.schoolModal.findOne({ school: body.list[i][2] }).then((res: any) => { return res._id })
    //   let OpportunityId = await this.opportunityModal.findOne({ opportunity: body.list[i][3] }).then((res: any) => { return res._id })
    //   let fieldId = await this.generalFieldStudyModal.findOne({ field: body.list[i][5] }).then((res: any) => { return res._id })
    //   let credentialId = await this.credentialModal.findOne({ credential: body.list[i][7] }).then((res: any) => { return res._id })

    //   let data = {
    //     programSchoolOrg: programSchoolOrgId,
    //     programSchoolOrgType: programSchoolOrgTypeId,
    //     credentialSchool: credentialSchoolId,
    //     Opportunity: OpportunityId,
    //     field: fieldId,
    //     credential: credentialId
    //   }

    //   let newStem = new this.stemModal(data);
    //   let result = await newStem.save()

    // }


    // console.log("body", body.list);

    // const wwwGen = this.programSchoolOrgModal;

    // const data = body.list.map((item: any) => ({
    //   name: item[0],
    //   address: item[1],
    //   city: item[2],
    //   zip: item[3],
    //   neighborhood: item[4],
    //   status: 1,
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
      }
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
          }
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
