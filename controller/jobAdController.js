import { v2 as cloudinary } from 'cloudinary';
import stream from 'stream';

cloudinary.config({
    cloud_name: 'dcatl0oqj',
    api_key: '666643799156991',
    api_secret: '9N8kmafzYRmDIQBI-grDSISMY7g'
});

export const addJobController = async (req, res) => {
    console.log(req.body, '====>>req.body');

    try {
        const folder = 'jobAds';

        const result = await new Promise((resolve, reject) => {
            const bufferStream = new stream.PassThrough();
            bufferStream.end(req.file.buffer);

            const streamm = cloudinary.uploader.upload_stream(
                {
                    resource_type: 'auto',
                    folder: folder,
                },
                (error, result) => {
                    if (error) reject(error);
                    else resolve(result);
                }
            );

            // Pipe the bufferStream into the cloudinary upload stream
            bufferStream.pipe(streamm);
        });

        console.log(result, '====>>result');
        res.send({ status: 'success', message: 'Job Ad Added' });
    } catch (error) {
        console.log(error, '===>>> error');
        console.log(error.message, '===>>> error message');
        res.status(500).json({ status: 'error', message: 'Error adding job ad' });
    }




    // try {


    //     // console.log(req, "====>>req")
    //     console.log(req.file, "====>>req.file")
    //     console.log(req.body, "==>>req.body")
    //     const folder = 'jobAds';

    //     const result = await cloudinary.uploader.upload(req.file.buffer, {
    //         resource_type: 'auto',
    //         folder: folder
    //     });

    //     console.log(result, "====>>result");

    //     res.send({ status: 'success', message: 'Job Ad Added' });
    // } catch (error) {
    //     console.log(error, "===>>> error")
    //     console.log(error.message, "===>>> error message")
    // }
}