import { client ,sender } from './mailtrap.js';
import {htmlContent}from './template.js'
export const sendVerification = async (email, verificationToken) => {
    const recipients =[{email}];
    try{
          const response =await client.send({
              from :sender,
              to:recipients,
              subject:"Email Verification",
              html:htmlContent.replace("{verificationCode}",verificationToken),
              category:"verification"
          })
    }catch(error){
        console.log(error.message);
    }
}