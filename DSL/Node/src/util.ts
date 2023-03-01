import path from 'path';
import fs from 'fs';

export const buildContentFilePath = (filename: string): string => {
  return path.join(process.env.CONTENT_FOLDER || 'data', filename)
}

export const isValidFilename = (filename: string): boolean => {
  return RegExp('^[0-9a-zA-Z-._/]+$').test(filename);
}

export const getAllFiles = function (dirPath: string): string[] {
  const folder = path.join(process.env.CONTENT_FOLDER || 'data', dirPath)
  return getAllFilesInsideFolder(folder)
}

const getAllFilesInsideFolder = function (dirPath: string, arrayOfFiles: string[] = []) {
  const files = fs.readdirSync(dirPath)
  arrayOfFiles = arrayOfFiles || []

  files.forEach(function (file) {
    if (fs.statSync(dirPath + '/' + file).isDirectory()) {
      arrayOfFiles = getAllFilesInsideFolder(dirPath + '/' + file, arrayOfFiles)
    } else {
      arrayOfFiles.push(path.join(__dirname, dirPath, '/', file))
    }
  })

  return arrayOfFiles
}
