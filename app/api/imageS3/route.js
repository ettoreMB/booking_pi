import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'

const client = new S3Client({
  credentials: {
    accessKeyId: `${process.env.S3_AK}`,
    secretAccessKey: `${process.env.S3_SK}`,
    region: 'us-east-1',
  },
})

import { NextResponse } from "next/server"

export async function POST(request) {
  const {searchParams}  = new URL(request.url)
  const fileName = searchParams.get('file')
  const fileType = searchParams.get('fileType')
  const productName = searchParams.get('product')
  

  const command = new PutObjectCommand({
    Bucket: `${process.env.NEXT_PUBLIC_S3_BUCKET}`,
    Key: `${productName}-${fileName.replace(' ', '')}`,
    ContentType: fileType,
  })


  try {
  
    const response = await getSignedUrl(client, command, {
      expiresIn: 3600,
    })

    return NextResponse.json(response)
  } catch (error) {
    console.log(error)
    return NextResponse.json({error: error})
  }

}