
export const validateIsString = (string) => {
   return string.length > 0 ? true : false;
}

export const validateIsNumber = (givenNumber) => {

    const number = new Number(givenNumber);

    return number > 0 ? true : false;
}