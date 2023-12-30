import { PrismaClient,Provinces} from "@prisma/client";
import fs from 'fs';
import csvParser from 'csv-parser';


// file  : https://github.com/kongvut/thai-province-data/blob/master/csv/thai_amphures.csv
interface CSVRow_Provinces {
    id: string;
    name_th: string;
    name_en: string;
    geography_id: string;
    created_at: string;
    updated_at: string;
    deleted_at: string;
}
interface CSVRow_Districts {
    id: string;
    name_th: string;
    name_en: string;
    province_id: string;
    created_at: string;
    updated_at: string;
    deleted_at: string;
}
interface CSVRow_SubDistricts {
    id: string;
    zip_code: string;
    name_th: string;
    name_en: string;
    amphure_id: string;
    created_at: string;
    updated_at: string;
    deleted_at: string;
}
//const file_name = 'C:/Users/mrbig/Downloads/thai_provinces.csv';
//const file_name = 'C:/Users/mrbig/Downloads/thai_amphures.csv';
const file_name = 'C:/Users/mrbig/Downloads/thai_tambons.csv';

//const results: CSVRow_Provinces[] = [];
const results: CSVRow_SubDistricts[] = [];
//const results: CSVRow_Districts[] = [];



fs.createReadStream(file_name)
  .pipe(csvParser())
  .on('data', (row: CSVRow_SubDistricts) => {
    results.push(row);
    //console.log(row)
  })
  .on('end', () => {
    insertDataIntoDatabase(results);
  });

  const prisma = new PrismaClient();



async function insertDataIntoDatabase(data: CSVRow_SubDistricts[]):Promise<void> {

    try{
        for (const rowData of data) {

            // const provice = await prisma.provinces.create({
            //     data: {
            //         id: parseInt(rowData.id, 10),
            //         name_th: rowData.name_th,
            //         name_en: rowData.name_en,
            //     },
            // })
            // const district = await prisma.district.create({
            //     data: {
            //         id: parseInt(rowData.id, 10),
            //         name_th: rowData.name_th,
            //         name_en: rowData.name_en,
            //         province_id:parseInt(rowData.province_id, 10),
            //     },
            // })
            const subDistrict = await prisma.subDistrict.create({
                data: {
                    id: parseInt(rowData.id, 10),
                    name_th: rowData.name_th,
                    name_en: rowData.name_en,
                    district_id: parseInt(rowData.amphure_id, 10),
                    zipcode: rowData.zip_code,
                },
            })

            }


            await prisma.$disconnect();

    }
    catch(e){
        console.log(e)
    }
}

