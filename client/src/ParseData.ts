export type Assessment = {
  assessment_reason: string;
  decile_score: number;
  raw_score: number;
  rec_supervision_level_text: string;
  screening_date: string;
  type_of_assessment: string;
};

export type Charge = {
  charge: string;
  charge_degree: string;
  charge_number: number;
  offense_date: string;
};

export type JailHistory = {
  in_custody: string;
  out_custody: string;
};

export type PrisonHistory = {
  in_custody: string;
  out_custody: string;
};

export type Demographics = {
  age: number;
  name: string;
  race: string;
  sex: string;
};

export type RecidInfo = {
  num_r_cases: number;
  r_case_number: string;
  r_charge_degree: string;
  r_charge_desc: string;
  r_days_from_arrest: string;
  r_jail_in: string;
  r_jail_out: string;
  r_offense_date: string;
};

export type ViolentRecidInfo = {
  num_vr_cases: number;
  vr_case_number: string;
  vr_charge_degree: string;
  vr_charge_desc: string;
  vr_offense_date: string;
};

export type ParsedData = {
  compas: Assessment[];
  demographics: Demographics;
  is_recid: number;
  is_violent_recid: number;
  jailhistory: JailHistory[];
  previous_charges: Charge[];
  prisonhistory: PrisonHistory[];
  recid_info: RecidInfo | null;
  violent_recid_info: ViolentRecidInfo | null;
};

const format = (date: string) => {
  return date?.split(" ")[0];
};

export const fetchData = async (): Promise<ParsedData | null> => {
  try {
    const response = await fetch(
      "https://compas-api.derekzhang.ca/random-case"
    );
    const jsonData = await response.json();

    // Parse the data into a single dictionary structure
    const parsedData: ParsedData = {
      compas: jsonData.compas.map((assessment: any) => ({
        assessment_reason: assessment.assessment_reason,
        decile_score: assessment.decile_score,
        raw_score: assessment.raw_score,
        rec_supervision_level_text: assessment.rec_supervision_level_text,
        screening_date: format(assessment.screening_date),
        type_of_assessment: assessment.type_of_assessment,
      })),
      demographics: {
        age: jsonData.demographics.age,
        name: jsonData.demographics.name?.toUpperCase(),
        race: jsonData.demographics.race,
        sex: jsonData.demographics.sex,
      },
      is_recid: jsonData.is_recid,
      is_violent_recid: jsonData.is_violent_recid,
      jailhistory: jsonData.jailhistory
        .map((history: any) => ({
          in_custody: format(history.in_custody),
          out_custody: format(history.out_custody),
        }))
        .sort((a, b) => a.in_custody < b.in_custody),
      previous_charges: jsonData.previous_charges
        .map((charge: any) => ({
          charge: charge.charge,
          charge_degree: charge.charge_degree,
          charge_number: charge.charge_number,
          offense_date: format(charge.offense_date),
        }))
        .sort((a, b) => a.offense_date < b.offense_date),
      prisonhistory: Array.isArray(jsonData.prisonhistory)
        ? jsonData.prisonhistory
            .map((history: any) => ({
              in_custody: format(history.in_custody),
              out_custody: format(history.out_custody),
            }))
            .sort((a, b) => a.in_custody < b.in_custody)
        : [], // If it's not an array, default to an empty array
      recid_info: jsonData.recid_info
        ? {
            num_r_cases: jsonData.recid_info.num_r_cases,
            r_case_number: jsonData.recid_info.r_case_number,
            r_charge_degree: jsonData.recid_info.r_charge_degree,
            r_charge_desc: jsonData.recid_info.r_charge_desc,
            r_days_from_arrest: jsonData.recid_info.r_days_from_arrest,
            r_jail_in: format(jsonData.recid_info.r_jail_in),
            r_jail_out: format(jsonData.recid_info.r_jail_out),
            r_offense_date: format(jsonData.recid_info.r_offense_date),
          }
        : null,
      violent_recid_info: jsonData.violent_recid_info
        ? {
            num_vr_cases: jsonData.violent_recid_info.num_vr_cases,
            vr_case_number: jsonData.violent_recid_info.vr_case_number,
            vr_charge_degree: jsonData.violent_recid_info.vr_charge_degree,
            vr_charge_desc: jsonData.violent_recid_info.vr_charge_desc,
            vr_offense_date: format(
              jsonData.violent_recid_info.vr_offense_date
            ),
          }
        : null,
    };

    return parsedData;
  } catch (error) {
    console.error("Error fetching the data:", error);
    return null;
  }
};
