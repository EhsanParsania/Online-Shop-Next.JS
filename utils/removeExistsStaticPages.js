import fs from 'fs'
import path from 'path'

export default async function removeExistsStaticPages(address, fileName, fileType, successMessage, faildMessage) {
    const exists = await fs.existsSync(path.join('.next', 'server', 'pages', ...address, fileName + fileType))
    if (exists) {
        fs.unlinkSync(
            path.join('.next', 'server', 'pages', ...address, fileName + '.html')
        )
        fs.unlinkSync(
            path.join('.next', 'server', 'pages', ...address, fileName + '.json')
        )
        return successMessage
    } else {
        return faildMessage
    }
}