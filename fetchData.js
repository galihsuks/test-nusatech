const fetchUserData = () =>
    new Promise((resolve) => {
        setTimeout(() => resolve({ name: "John Doe", age: 30 }), 2000);
    });

async function ambilData() {
    const datanya = await fetchUserData();
    console.log(datanya);
}

ambilData();
