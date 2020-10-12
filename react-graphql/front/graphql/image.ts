import { gql } from "@apollo/client"
import { createMutationHook } from "../lib/createApolloHook"

// MUTATION/UPLOAD_IMAGE
const UPLOAD_IMAGE = gql`
mutation ($image: Upload!) {
    uploadImage(image: $image) {
        id
        src
    }
}
`
interface UploadImageData {
    uploadImage: {
        id: number
        src: string
    }
}
interface UploadImageVars {
    image: File
}
export const useUploadImage = () =>
    createMutationHook<UploadImageData, UploadImageVars>(
        UPLOAD_IMAGE,
        {

        })