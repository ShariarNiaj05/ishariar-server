//* Split fine mimetype and get fist index
export function getFileType(file: IUploadFile): string {
  const mimeTypeParts = file.mimetype.split('/');
  return mimeTypeParts[1] ? mimeTypeParts[1] : 'Unknown';
}
