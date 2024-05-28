/* istanbul ignore file */
// import * as resemble from 'resemblejs'
import * as resemble from 'resemble-jimp'
import type { ComparisonOptions } from 'resemblejs'
import type { CompareData } from './compare.interfaces.js'

export default async function compareImages(image1: Buffer, image2: Buffer, options: ComparisonOptions): Promise<CompareData> {
    /**
     * Resemble.js implemented in the way that scales 2nd images to the size of 1st.
     * Experimentally proven that downscaling images produces more accurate result than upscaling
     */
    return new Promise((resolve, reject) => {
        const { imageToCompare1, imageToCompare2 } = options.scaleToSameSize && image1.length > image2.length
            ? {
                imageToCompare1: image2,
                imageToCompare2: image1,
            }
            : { imageToCompare1: image1, imageToCompare2: image2 }

        resemble.default.compare(imageToCompare1, imageToCompare2, options, (err: any, data: any) => {
            if (err) {
                reject(err)
            } else {
                resolve(data)
            }
        })
    })
}
