const testInput = `Time:      7  15   30
Distance:  9  40  200`

const realInput = `Time:        40     82     91     66
Distance:   277   1338   1349   1063`

function multiplyObjectValues(obj) {
    let result = 1;
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            result *= obj[key];
        }
    }
    return result;
}

function waitForIt(input){
let ansObj = {}
const bothArr = input.split("\n")
const timeArr = [];
const distArr = []
    
bothArr[0].split(" ").forEach(element => {
    if (element.trim().length > 0) {
        timeArr.push(element);
    }
})

bothArr[1].split(" ").forEach(element => {
    if(element.trim().length > 0){
        distArr.push(element)
    }
})

console.log(timeArr)
console.log(distArr)

for(i=1;i<timeArr.length;i++){
    let currTime = timeArr[i]
    let currDist = distArr[i]

    for(j=1;j<currTime;j++){
    let timeLeft = currTime - j
    let distTraveled = timeLeft * j
        if(distTraveled > currDist ){
            if (!ansObj[i]){
            ansObj[i] = 1
            }else{
            ansObj[i] = ansObj[i]+1
            console.log(ansObj)
            }
        }
    }
}
const ans = multiplyObjectValues(ansObj)
return ans
}


function waitForItTwo(input){
let ans = 0
const bothArr = input.split("\n")
let timeArr = ""
let distArr = ""
    
bothArr[0].split(" ").forEach(element => {
    if (element.trim().length > 0) {
        timeArr = timeArr + (element);
    }
})

bothArr[1].split(" ").forEach(element => {
    if(element.trim().length > 0){
        distArr = distArr + element
    }
})

console.log(timeArr)
console.log(distArr)

    let currTime = timeArr.split(":")[1]
    let currDist = distArr.split(":")[1]

    for(j=1;j<currTime;j++){
    let timeLeft = currTime - j
    let distTraveled = timeLeft * j
        if(distTraveled > currDist ){
            ans++
            }
        }
    return ans
}


console.log(waitForIt(testInput))
console.log(waitForIt(realInput))


console.log(waitForItTwo(testInput))
console.log(waitForItTwo(realInput))
