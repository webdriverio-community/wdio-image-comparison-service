import type { Options } from '@wdio/types'
import { join } from 'node:path'
import { config as sharedConfig } from './wdio.shared.conf.ts'

export const config: Options.Testrunner = {
    ...sharedConfig,
    // ===================
    // Image compare setup
    // ===================
    services: [
        ...sharedConfig.services || [],
        [
            'appium',
            {
                // This will use the globally installed version of Appium
                command: 'appium',
                args: {
                    // This is needed to tell Appium that we can execute local ADB commands
                    // and to automatically download the latest version of ChromeDriver
                    relaxedSecurity: true,
                    // Write the Appium logs to a file in the root of the directory
                    log: './logs/appium.log',
                },
            },
        ],
        [
            'visual',
            {
                addIOSBezelCorners: true,
                baselineFolder: join(process.cwd(), './tests/localBaseline/'),
                formatImageName: '{tag}-{logName}-{width}x{height}',
                screenshotPath: join(process.cwd(), '.tmp/'),
                savePerInstance: true,
                autoSaveBaseline: true,
                blockOutStatusBar: true,
                blockOutToolBar: true,
                blockOutSideBar: true,
                logLevel: 'debug',
            },
        ],
    ],
}
