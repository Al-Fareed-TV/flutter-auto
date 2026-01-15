const DriverContext = require("../../lib/actions");

class Login{
    ctx = new DriverContext()
    constructor(){   
    }

    clickOnRegister(){
        this.ctx.tap({text:"Register"})
    }

    enterName(name){
        this.ctx.typeText({text:name})
    }

    enterEmail(email){
        this.ctx.typeText({text:email})
    }

    enterPhone(phone){
        this.ctx.typeText({text:phone})
    }

    clickOnRegisterButton(){
        this.ctx.tap({text:"Register"})
    }

    verifyHomeScreen(){
        this.ctx.tap({text:"Register"})
    }
}