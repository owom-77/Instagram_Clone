import { Client,Storage,ID } from "appwrite";
import conf from '../conf/conf'

export class imagestorage {

    client = new Client()
    storage;

    constructor (){
        this.client 
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId)
        this.storage = new Storage(this.client)
    }

    async uploadFile(file){
        try {
            return await this.storage.createFile(
               conf.appwriteBucketId,
               ID.unique(), 
               file,
            )
        } catch (error) {
            console.log(error)
        }
    }

    async deleteFile(fileId){
        try {
            return await this.storage.deleteFile(
                conf.appwriteBucketId,
                fileId,
            )
        } catch (error) {
            console.log(error)
        }
    }

    getFilePreview(fileId){
        return this.storage.getFilePreview(
            conf.appwriteBucketId,
            fileId
        )    
    }
}

let imageStorage = new imagestorage();

export default imageStorage;