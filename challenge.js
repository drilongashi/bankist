// Coding Challenge #2

/*
Let's go back to Julia and Kate's study about dogs. This time, they want to convert dog ages to human ages and calculate the average age of the dogs in their study.

Create a function 'calcAverageHumanAge', which accepts an arrays of dog's ages ('ages'), and does the following things in order:

1. Calculate the dog age in human years using the following formula: if the dog is <= 2 years old, humanAge = 2 * dogAge. If the dog is > 2 years old, humanAge = 16 + dogAge * 4.
2. Exclude all dogs that are less than 18 human years old (which is the same as keeping dogs that are at least 18 years old)
3. Calculate the average human age of all adult dogs (you should already know from other challenges how we calculate averages 😉)
4. Run the function for both test datasets

TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]

GOOD LUCK 😀
*/

/*
const checkDogs = function (dogsJulia, dogsKate){
    const dogsJuliaCorrected = dogsJulia.slice();
    dogsJuliaCorrected.splice(0, 1);
    dogsJuliaCorrected.splice(-2);
    const dogs = dogsJuliaCorrected.concat(dogsKate);
    console.log(dogs);

    dogs.forEach(function (dog, i){
        if( dog >= 3){
            console.log(`Dog number ${i+1} is an adult and is ${dog} years old`)
        }else{
            console.log(`Dog number ${i+1} is still a puppy`);
        }

    });

};
checkDogs([3,5,2,12,7], [4,1,15,8,3]);*/


/*
---------------------------------------------------------------------------------------------------------------------------------------------------------------
// Challenge 2
Let's go back to Julia and Kate's study about dogs. This time, they want to convert dog ages to human ages
and calculate the average age of the dogs in their study.

Create a function 'calcAverageHumanAge', which accepts an arrays of dog's ages ('ages'), and does the following things in order:

1. Calculate the dog age in human years using the following formula: if the dog is <= 2 years old, humanAge = 2 * dogAge.
If the dog is > 2 years old, humanAge = 16 + dogAge * 4.
2. Exclude all dogs that are less than 18 human years old (which is the same as keeping dogs that are at least 18 years old)
3. Calculate the average human age of all adult dogs (you should already know from other challenges how we calculate averages 😉)
4. Run the function for both test datasets

TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]

GOOD LUCK 😀
---------------------------------------------------------------------------------------------------------------------------------------------------------------
*/
/*
const calcAverageHumanAge = function (ages){
    const humanAges = ages.map(age => (age <= 2 ? 2 * age : 16 + age * 4));
    console.log(humanAges);
    const adults = humanAges.filter(age => age >= 18);
    console.log(adults);
    const averages = adults.reduce((acc, age) => acc + age, 0) / adults.length;
    console.log(averages);
};
calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);
calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]);*/

/*// Rewrite the 'calcAverageHumanAge' function from the previous challenge,
// but this time as an arrow function, and using chaining!
console.log(`----Chaining----`);
const calcAverageHumanAge =  ages => {
    const humanAges = ages.map(age => (age <= 2 ? 2 * age : 16 + age * 4))
        .filter(age => age >= 18)
        .reduce((acc, age, i, arr) => acc + age / arr.length, 0);
        console.log(humanAges);
};
calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);
calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4])*/

// Coding Challenge #4


/*
Julia and Kate are still studying dogs, and this time they are studying if dogs are eating too much or too little.
Eating too much means the dog's current food portion is larger than the recommended portion, and eating too little is the opposite.
Eating an okay amount means the dog's current food portion is within a range 10% above and 10% below the recommended portion (see hint).

1. Loop over the array containing dog objects, and for each dog, calculate the recommended food portion and add it to the object as a new property.
Do NOT create a new array, simply loop over the array. Forumla: recommendedFood = weight ** 0.75 * 28.
(The result is in grams of food, and the weight needs to be in kg)
2. Find Sarah's dog and log to the console whether it's eating too much or too little.
HINT: Some dogs have multiple owners, so you first need to find Sarah in the owners array, and so this one is a bit tricky (on purpose) 🤓
3. Create an array containing all owners of dogs who eat too much ('ownersEatTooMuch')
and an array with all owners of dogs who eat too little ('ownersEatTooLittle').
4. Log a string to the console for each array created in 3.,
like this: "Matilda and Alice and Bob's dogs eat too much!" and "Sarah and John and Michael's dogs eat too little!"
5. Log to the console whether there is any dog eating EXACTLY the amount of food that is recommended (just true or false)
6. Log to the console whether there is any dog eating an OKAY amount of food (just true or false)
7. Create an array containing the dogs that are eating an OKAY amount of food (try to reuse the condition used in 6.)
8. Create a shallow copy of the dogs array and sort it by recommended food portion in an ascending order
(keep in mind that the portions are inside the array's objects)

HINT 1: Use many different tools to solve these challenges, you can use the summary lecture to choose between them 😉
HINT 2: Being within a range 10% above and below the recommended portion means:
 current > (recommended * 0.90) && current < (recommended * 1.10). Basically,
  the current portion should be between 90% and 110% of the recommended portion.

  TEST DATA:
const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] }
];

GOOD LUCK 😀
*/

const dogs = [
    { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
    { weight: 8, curFood: 200, owners: ['Matilda'] },
    { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
    { weight: 32, curFood: 340, owners: ['Michael'] }
];

//1.
dogs.forEach(dog => (dog.recFood = Math.trunc(dog.weight ** 0.75 * 28)));
console.log(dogs);

//2.
const dogSarah = dogs.find(dog => dog.owners.includes('Sarah'));
console.log(dogSarah);
console.log(`Sarah's dog is eating too ${dogSarah.curFood > dogSarah.recFood ? 'much' : 'little'}`);

//3.
const ownersEatTooMuch = dogs
    .filter(dog => dog.curFood > dog.recFood)
    .flatMap(dog => dog.owners);
console.log(ownersEatTooMuch);

const ownersEatTooLittle = dogs
    .filter(dog => dog.curFood < dog.recFood)
    .flatMap(dog => dog.owners);
console.log(ownersEatTooLittle);

//4.
/*"Matilda and Alice and Bob's dogs eat too much!"
and "Sarah and John and Michael's dogs eat too little!"*/
console.log(`${ownersEatTooMuch.join(' and ')}'s dogs eat to much!`);
console.log(`${ownersEatTooLittle.join(' and ')}'s eat to little`);

//5.
console.log(dogs.some(dog => dog.curFood === dog.recFood));

//6.
const checkEatingOkay = dog => dog.curFood > dog.recFood * 0.9 && dog.curFood < dog.recFood * 1.1;
console.log(dogs.some(checkEatingOkay));

//7.
console.log(dogs.filter(checkEatingOkay));

//8.
// sorit it by recommended food portion in an ascending order
const dogsSorted = dogs.slice().sort((a,b) => a.recFood - b.recFood);
console.log(dogsSorted);










