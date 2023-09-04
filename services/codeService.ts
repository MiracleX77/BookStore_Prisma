

export const  generateCode = (user_id:number,count:number):string =>{
    let code = ""
    const date = new Date();
    const year = date.getFullYear().toString().substr(-2);
    code += year;
    const month = date.getMonth();
    if(month < 10){
        code += "0"+month.toString();
    }else{
        code += month.toString();
    }
    const day = date.getDate();
    if(day < 10){
        code += "0"+day.toString();
    }else{
        code += day.toString();
    }

    code += user_id.toString();
    if(count>9999){
        count = count%10000;
    }
    if(count < 10){
        code += "000"+count.toString();
    }else if(count < 100){
        code += "00"+count.toString();
    }else if(count < 1000){
        code += "0"+count.toString();
    }else{
        code += count.toString();
    }
    return code;

}