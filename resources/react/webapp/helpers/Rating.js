import { template } from "lodash"

export const avgRound = (number) => {
    return Math.round(number * 10) / 10
}

export const roundNoDecimals = (number) => {
    return Math.round(number, 0)
}

export const starRound = (number) => {

    // ??? definir rango de aproximación

    if (number <= 1.25){
        return 1;
    } else if (number >= 1.25 && number < 1.75){
        return 1.5;
    } else if (number >= 1.75 && number < 2.25){
        return 2;
    } else if (number >= 2.25 && number < 2.75){
        return 2.5;
    } else if (number >= 2.75 && number < 3.25){
        return 3;
    } else if (number >= 3.25 && number < 3.75){
        return 3.5;
    } else if (number >= 3.75 && number < 4.25){
        return 4;
    } else if (number >= 4.25 && number < 4.75){
        return 4.5;
    } else if (number >= 4.75){
        return 5;
    } else{
        return 0;
    }
}
