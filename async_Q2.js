// Task 2: The "Multi-Step" Authentication
// Goal: Practice "Chaining" or sequential awaits (One thing after another).
// ● The Scenario: A user logs in. You need to find the user first, then check their
// subscription.
// ● The Functions:
// 1. getUser(username): Resolves with { name: "Rahul", type:
// "Premium" } after 1.5s.
// 2. checkSubscription(user): Takes the user object. If type is "Premium",
// resolve with "Access Granted to Netflix". Otherwise, reject with
// "Please Subscribe".

// ● The Requirement: Create a "Consumer" function that calls getUser first, then passes
// that result into checkSubscription.

const getUser = (username) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (username === "Rahul") {
                resolve({ name: "Rahul", type: "Premium" });
            } else {
                resolve({ name: username, type: "Free" });
            }
        }, 1500);
    });
};


const checkSubscription = (user) => {
    return new Promise((resolve, reject) => {
        if (user.type === "Premium") {
            resolve("Access Granted to Netflix");
        } 
        else {
            reject("Please Subscribe");
        }
    });
}

const authenticateUser = async (username) => {
    try {
        const user = await getUser(username);
        const accessMessage = await checkSubscription(user);
        console.log(accessMessage);
    }
    catch (err) {
        console.log(err);
    }
};

authenticateUser("Rahul");