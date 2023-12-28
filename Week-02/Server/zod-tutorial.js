const z = require("zod");
// zod is a library basically used for the validation.

// validate an array containing with the numbers in it only.
function validateArrayWithNumbers(arr) {
    const schema = z.array(z.number());
    const res =  schema.safeParse(arr);
    console.log(res, "response");
}
validateArrayWithNumbers([1,2,3,4]);
validateArrayWithNumbers(['1',2,3,4]);