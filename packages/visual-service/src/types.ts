import type {
    ScreenshotOutput,
    ImageCompareResult,
    CheckScreenMethodOptions,
    SaveScreenMethodOptions,
    CheckElementMethodOptions,
    SaveElementMethodOptions,
    CheckFullPageMethodOptions,
    SaveFullPageMethodOptions,
    ClassOptions,
} from 'webdriver-image-comparison'
import type { RectanglesOutput } from 'webdriver-image-comparison/dist/methods/rectangles.interfaces.js'
import type { WaitForStorybookComponentToBeLoaded } from './storybook/Types.js'

type MultiOutput = {
    [browserName: string]: ScreenshotOutput;
};
export type Output = MultiOutput | ScreenshotOutput;
type MultiResult = {
    [browserName: string]: ImageCompareResult | number;
};
export type Result = MultiResult | (ImageCompareResult | number);
export type NativeContextType = boolean | Record<string, boolean>

export interface WdioIcsCommonOptions {
    hideElements?: WebdriverIO.Element[];
    removeElements?: WebdriverIO.Element[];
}

export interface WdioIcsScrollOptions extends WdioIcsCommonOptions {
    hideAfterFirstScroll?: WebdriverIO.Element[];
}

export interface WdioCheckFullPageMethodOptions
    extends Omit<CheckFullPageMethodOptions, keyof WdioIcsScrollOptions>,
        WdioIcsScrollOptions {}
export interface WdioSaveFullPageMethodOptions
    extends Omit<SaveFullPageMethodOptions, keyof WdioIcsScrollOptions>,
        WdioIcsScrollOptions {}
export interface WdioSaveElementMethodOptions
    extends Omit<SaveElementMethodOptions, keyof WdioIcsCommonOptions>,
        WdioIcsCommonOptions {}
export interface WdioSaveScreenMethodOptions
    extends Omit<SaveScreenMethodOptions, keyof WdioIcsCommonOptions>,
        WdioIcsCommonOptions {}
export interface WdioCheckElementMethodOptions
    extends Omit<CheckElementMethodOptions, keyof WdioIcsCommonOptions>,
        WdioIcsCommonOptions {}
export interface WdioCheckScreenMethodOptions
    extends Omit<CheckScreenMethodOptions, keyof WdioIcsCommonOptions>,
        WdioIcsCommonOptions {}

export interface VisualServiceOptions extends ClassOptions {}

export type PageCommandOptions = {
    executor: <T>(script: string | ((...innerArgs: any[]) => unknown), ...varArgs: any[]) => Promise<T>;
    getElementRect: (elementId: string) => Promise<RectanglesOutput>;
    screenShot: () => Promise<string>;
};

export type PageCommand = (options: PageCommandOptions, ...args: any[]) => Promise<any>;
export interface PageCommands {
    [commandName: string]: PageCommand | ((options: WaitForStorybookComponentToBeLoaded) => Promise<void>);
}
