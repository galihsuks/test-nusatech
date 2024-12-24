const express = require("express");
const app = express();
const port = 8080;
const mysql = require("mysql2");
const connection = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "test-nusatech",
});

app.use(express.json());

app.get("/products", async (req, res) => {
    try {
        const data = await connection.promise().query(`SELECT * FROM produk`);
        res.status(200).json(data[0]);
    } catch (error) {
        res.status(500).json({ pesan: error.message });
    }
});

app.post("/products", async (req, res) => {
    try {
        const { name, price } = req.body;
        if (!name || !price) {
            return res.status(412).json({ pesan: "Masukan name dan price!" });
        }
        if (price < 0) {
            return res
                .status(412)
                .json({ pesan: "Price harus bernilai positif" });
        }
        await connection
            .promise()
            .query(`INSERT INTO produk (name, price) VALUES (?,?)`, [
                name,
                price,
            ]);
        res.status(200).json({ pesan: "Produk berhasil ditambahkan" });
    } catch (error) {
        res.status(500).json({ pesan: error.message });
    }
});

app.get("/products/:id", async (req, res) => {
    try {
        const data = await connection
            .promise()
            .query(`SELECT * FROM produk WHERE id = ${req.params.id}`);
        res.status(200).json(
            data[0].length > 0
                ? data[0][0]
                : { pesan: "Produk tidak ditemukan" }
        );
    } catch (error) {
        res.status(500).json({ pesan: error.message });
    }
});

app.delete("/products/:id", async (req, res) => {
    try {
        const data = await connection
            .promise()
            .query(`SELECT * FROM produk WHERE id = ${req.params.id}`);
        if (data[0].length == 0)
            return res.status(200).json({ pesan: "Produk tidak ditemukan" });
        await connection
            .promise()
            .query(`DELETE FROM produk WHERE id = '${req.params.id}';`);
        res.status(200).json({
            pesan: `Produk ${data[0][0].name} berhasil dihapus`,
        });
    } catch (error) {
        res.status(500).json({ pesan: error.message });
    }
});

app.listen(port, "0.0.0.0", () => {
    console.log(`Backend dah siap di port ${port}`);
});
