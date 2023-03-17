#!/bin/sh

appwrite storage createBucket --bucketId 'thumbnails' --name 'thumbnails' --fileSecurity 'true' --permissions 'read("any")' --permissions 'create("users")'  --maximumFileSize '5242880' --allowedFileExtensions 'png' --allowedFileExtensions 'jpg' --allowedFileExtensions 'jpeg'
