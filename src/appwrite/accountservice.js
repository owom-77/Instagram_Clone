import { Client,Account,ID } from "appwrite";
import conf from '../conf/conf'

export class accountservice {

    client = new Client()
    account;

    constructor (){
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId)
        this.account = new Account(this.client)
    }

    async SignUpAccount({name,email,password}){
        try {
            let userAccount = await this.account.create(
                ID.unique(),
                email,
                password,
                name,
            )
            if(userAccount){
                return userAccount
            }
        } catch (error) {
            console.log(error)
        }
    }

    async LoginAccount({email,password}){
        try {
            let userAccount = await this.account.createEmailPasswordSession(
                email,
                password,
            )
            if(userAccount){
                return userAccount
            }
        } catch (error) {
            throw error
        }
    }

    async LogoutAccount(){
        try {
            await this.account.deleteSessions();
        } catch (error) {
            console.log(error)
        }
    }

    async getCurrentAccount(){
        try {
            return await this.account.get()
        } catch (error) {
            console.log(error)
        }
    }
}

let accountSer = new accountservice();

export default accountSer;