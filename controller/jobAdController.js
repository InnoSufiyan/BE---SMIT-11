import { v2 as cloudinary } from 'cloudinary';
import stream from 'stream';
import Users from '../models/Users.js';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

export const addJobController = async (req, res) => {
    console.log(req.body, '====>>req.body');
    console.log(req.file, '====>>req.file');
    try {
        const folder = 'profilePicture';

        const result = await cloudinary.uploader.upload(req.file.path, {
            resource_type: 'auto',
            folder: folder
        });


        // const result = await new Promise((resolve, reject) => {
        //     const bufferStream = new stream.PassThrough();
        //     bufferStream.end(req.file.buffer);

        //     const streamm = cloudinary.uploader.upload_stream(
        //         {
        //             resource_type: 'auto',
        //             folder: folder,
        //         },
        //         (error, result) => {
        //             if (error) reject(error);
        //             else resolve(result);
        //         }
        //     );

        //     // Pipe the bufferStream into the cloudinary upload stream
        //     bufferStream.pipe(streamm);
        // });

        console.log(result, '====>>result');
        const response = await Users.findByIdAndUpdate('67827c037dcc8ba477b9df69', {
            profilePicture: result.url
        })

        console.log(response, "==>> response")
        res.send({ status: 'success', message: 'Job Ad Added', result: result });
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

export const getJobController = (req, res) => {
    res.send({
        status: 'success',
        message: 'Job Ad Received Successfully',
        data: [
            {
                id: 1,
                title: 'Job Title',
                description: 'Job Description',
            }
        ]
    })
}