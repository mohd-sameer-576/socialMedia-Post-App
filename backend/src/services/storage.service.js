const ImageKit = require('@imagekit/nodejs');

const imagekit = new ImageKit({
    privateKey: process.env.PrivateKey,
});

async function uploadImage(buffer) {
   try{
    const result = await imagekit.files.upload({
        file: buffer.toString('base64'),
        fileName: "image.jpg"
    });
    return result.url;
   } catch (error) {
       throw error;
   }
}

module.exports =  uploadImage ;