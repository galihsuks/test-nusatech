const responseTimes = [
    { endpoint: "/api/v1/users", time: 120 },
    { endpoint: "/api/v1/products", time: 80 },
    { endpoint: "/api/v1/orders", time: 150 },
];

function rataWaktuRespon(datanya) {
    let jmlTime = 0;
    datanya.forEach((data) => {
        jmlTime += data.time;
    });
    return jmlTime / datanya.length;
}
console.log(rataWaktuRespon(responseTimes));
