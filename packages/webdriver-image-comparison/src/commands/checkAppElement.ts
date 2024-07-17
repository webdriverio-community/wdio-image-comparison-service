import { methodCompareOptions } from '../helpers/options.js'
import type { ImageCompareResult } from '../methods/images.interfaces.js'
import { executeImageCompare } from '../methods/images.js'
import type { InternalCheckElementMethodOptions } from './check.interfaces.js'
import type { WicElement } from './element.interfaces.js'
import saveAppElement from './saveAppElement.js'

/**
 * Compare  an image of the element
 */
export default async function checkAppElement(
    {
        methods,
        instanceData,
        folders,
        element,
        tag,
        checkElementOptions,
        isNativeContext = true
    }: InternalCheckElementMethodOptions
): Promise<ImageCompareResult | number> {
    // 1. Set some vars
    const { isMobile } = instanceData
    const { executor } = methods

    // 2. Save the element and return the data
    const { devicePixelRatio, fileName, isLandscape } = await saveAppElement({
        methods,
        instanceData,
        folders,
        element: element as WicElement,
        tag,
        saveElementOptions: checkElementOptions,
        isNativeContext,
    })
    // @TODO: This is something for the future, to allow ignore regions on the element itself.
    // This will become a feature request

    // 3a. Determine the options
    const compareOptions = methodCompareOptions(checkElementOptions.method)
    const executeCompareOptions = {
        devicePixelRatio,
        compareOptions: {
            wic: checkElementOptions.wic.compareOptions,
            method: compareOptions,
        },
        fileName,
        folderOptions: {
            autoSaveBaseline: checkElementOptions.wic.autoSaveBaseline,
            actualFolder: folders.actualFolder,
            baselineFolder: folders.baselineFolder,
            diffFolder: folders.diffFolder,
            browserName: instanceData.browserName,
            deviceName: instanceData.deviceName,
            isMobile,
            savePerInstance: checkElementOptions.wic.savePerInstance,
        },
        isAndroidNativeWebScreenshot: instanceData.nativeWebScreenshot,
        isHybridApp: checkElementOptions.wic.isHybridApp,
        isLandscape,
        platformName: instanceData.platformName,
    }

    // 3b Now execute the compare and return the data
    return executeImageCompare(executor, executeCompareOptions)
}
