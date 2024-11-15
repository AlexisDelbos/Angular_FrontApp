
export class Customer{
    id : string;
    firstname : string;
    lastname : string;
    adress : string;
    mobileNumber : string ;
    mail : string;
    
    constructor(id : string, firstname : string, lastname : string, adress : string, mobilenumber : string, mail : string){
        this.id = id;
        this.firstname = firstname;
        this.lastname = lastname;
        this.adress = adress;
        this.mobileNumber = mobilenumber;
        this.mail = mail;
    }
    

}