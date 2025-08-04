import config from '../config/environments'
import path from 'path'
import { Vimeo } from 'vimeo'
import bytesize from 'byte-size'
import { writeFile } from 'fs/promises'
import { customAlphabet } from 'nanoid'
const nanoid = customAlphabet('1234567890abcdefghijklmnopqrstuvwxyz', 50)
// const client = new Vimeo(
//   '7b8aba384484a5cfea1d1291596e9c5f4409243a',
//   'NGt0G0bB5rcOFUUHo6/hxBF5JIXztIY++lbpJQDnIuFqNtZA2wN07zoREoGosX8sZ6FZ6wfFarws/xxrq02xddLoS3mJ3Ch+SC0yMUjtUEdF2sqKScXk2f/y7XBIkPTZ',
//   '3949214120361e2f63ca6d17f2b428eb'
// )
const client = new Vimeo(
  'e00401bedb585735f524108ad5727b4dcf0bf6d4',
  'S7tIvXPgLie2WxwEGt35/ICpm5f3s76Lm7EXBx6rACYsMhxT5ArDkF8upNdCmxzpC9L/yUrZx7Sl7ZGq81y/3SFd01cL9Vm1D/twfKDMDXFAZgWzqof33Akj4Tfc23eA',
  'cae4468ebd4e05c53950a88d984d4a40'
)
export interface IUploadVideo {
  size: string
  path: string
  key: string
  file_path: string
}
export const uploadVideo = ({
  vimeo,
  name,
  description,
}: {
  vimeo: Buffer
  name: string
  description: string
}) => {
  return new Promise<IUploadVideo>(async (resolve, reject) => {
    const file_path = path.join(config.DIR_ASSETS!, (await nanoid()) + '.mp4')
    await writeFile(file_path, vimeo)
    client.upload(
      file_path,
      {
        name: description,
        description: description, //? agregar al model
      },
      function (uri) {
        // console.log("uri",uri)
        const { value, unit } = bytesize(vimeo.byteLength)
        resolve({
          key: uri.split('/')[2],
          // path: 'https://vimeo.com/' + uri.split('/')[2],
          path: 'https://player.vimeo.com/video/' + uri.split('/')[2],
          
          size: value + unit,
          file_path,
        })
      },
      function (bytes_uploaded, bytes_total) {
        var percentage = ((bytes_uploaded / bytes_total) * 100).toFixed(2)
        console.log(bytes_uploaded, bytes_total, percentage + '%')
      },
      function (err) {
        reject(err)
      }
    )
  })
}
export const deleteVideo = () => {
  return new Promise((resolve, reject) => {})
}
