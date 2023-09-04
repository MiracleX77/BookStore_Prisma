import sharp from 'sharp';

export const uploadImage= async (imgBuffer:Buffer,imgName:string)=>{

    const smallImage =  await sharp(imgBuffer).resize(200,200).toBuffer();
    const mediumImage = await sharp(imgBuffer).resize(400,400).toBuffer();
    const largeImage = await sharp(imgBuffer).resize(800,800).toBuffer();

    const smallImageName = imgName.replace('.jpg','-small.jpg');
    const mediumImageName = imgName.replace('.jpg','-medium.jpg');
    const largeImageName = imgName.replace('.jpg','-large.jpg');

    const imagePath = 'C:/Users/mrbig/Documents/pic';
    const smallImagePath = imagePath + '/s/' + smallImageName;
    const mediumImagePath = imagePath + '/m/' + mediumImageName;
    const largeImagePath = imagePath + '/l/' + largeImageName;

    await Promise.all([
        sharp(smallImage).toFile(smallImagePath),
        sharp(mediumImage).toFile(mediumImagePath),
        sharp(largeImage).toFile(largeImagePath)
    ]);
    return {smallImagePath,mediumImagePath,largeImagePath};

}