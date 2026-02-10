const fetchUser = (id) => {
    return new Promise((resolve,reject) => {
        setTimeout(() => {
            const users = {
                1: { id: 1, name: "Rahul", password: "fb_password", role: "admin" },
                2: { id: 2, name: "Sanya", password: "123_password", role: "user" },
            }

                const user = users[id];
                if(user) {
                    resolve(user);
                }
                else {
                    reject("User not found");
                }
            }, 1000);
        });
}

console.log("first task");
Promise.resolve().then(() => console.log("second task"));
console.log("third task");

const getUserData=async()=>{
    console.log("fetching user data from database...");
    let user;
    setTimeout(() => {
        user={name:"Raj",email:"raj@example.com" }
        console.log("user is fetched");
    }, 3000);
    console.log(user);
}

getUserData();

fetchUser(2)
    .then(user => console.log("Fetched using fetchUser:", user))
    .catch(err => console.log(err));

const fetchUserData = async (id) => {
    try {
        const user = await fetchUser(id);
        console.log("Fetched using fetchUserData:", user);
    } catch (err) {
        console.log(err);
    }
};

fetchUserData(4);