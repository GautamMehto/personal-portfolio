const CLOUD_NAME = "gautam-portfolio"  // replace with your actual cloud name

export const img = (publicId) =>
    `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/${publicId}`

export const vid = (publicId) =>
    `https://res.cloudinary.com/${CLOUD_NAME}/video/upload/${publicId}`