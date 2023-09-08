import path from 'path';
import sharp from 'sharp';
import steam from 'stream';
import {google} from 'googleapis';

const KEYFILEPATH= path.join(__dirname+'/../credentials.json');
const SCOPES = ['https://www.googleapis.com/auth/drive'];

const auth = new google.auth.GoogleAuth({
    keyFile:KEYFILEPATH,
    scopes:SCOPES
});

export const uploadImage= async (imgBuffer:Buffer,imgName:string)=>{



    const smallImage =  await sharp(imgBuffer).resize(200,200).toBuffer();
    const mediumImage = await sharp(imgBuffer).resize(400,400).toBuffer();
    const largeImage = await sharp(imgBuffer).resize(800,800).toBuffer();

    const img_s = new steam.PassThrough();
    img_s.end(smallImage);
    const img_m = new steam.PassThrough();
    img_m.end(mediumImage);
    const img_l = new steam.PassThrough();
    img_l.end(largeImage);

    const smallImageName = imgName.replace('.jpg','-small.jpg');
    const mediumImageName = imgName.replace('.jpg','-medium.jpg');
    const largeImageName = imgName.replace('.jpg','-large.jpg');
    const smallImageBucket = await google.drive({
        version:'v3',auth:auth
    }).files.create({
        media:{
            mimeType:'image/jpeg',
            body:img_s
        },
        requestBody:{
            name:smallImageName,
            parents:["1kyBwwVTVKlUtGoacltNPX6u3gstzTzSX"]
        },
        fields:'id,name'
    });
    const mediumImageBucket = await google.drive({
        version:'v3',auth:auth
    }).files.create({
        media:{
            mimeType:'image/jpeg',
            body:img_m
        },
        requestBody:{
            name:mediumImageName,
            parents:["1IzAkncIIwkQm9Vo-t1NNiIB1Zhxthzt1"]
        },
        fields:'id,name'
    });
    const largeImageBucket = await google.drive({
        version:'v3',auth:auth
    }).files.create({
        media:{
            mimeType:'image/jpeg',
            body:img_l
        },
        requestBody:{
            name:largeImageName,
            parents:["1b3wys5R2JQ6l7Uqwo7heHUNFc7P4t_Pu"]
        },
        fields:'id,name'
    });
    const smallImagePath = `https://drive.google.com/uc?export=view&id=${smallImageBucket.data.id}`;
    const mediumImagePath = `https://drive.google.com/uc?export=view&id=${mediumImageBucket.data.id}`;
    const largeImagePath = `https://drive.google.com/uc?export=view&id=${largeImageBucket.data.id}`;

    return {smallImagePath,mediumImagePath,largeImagePath};

}