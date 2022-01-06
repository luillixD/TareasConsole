const fs = require('fs');
const archivo = './db/data.json';
const guardarDB = (data) => {
    // //hacerlo en fomato json
    fs.writeFileSync(archivo, JSON.stringify(data));
}
const leerDB = () => {
    if (!fs.existsSync(archivo)) {
        return null;
    }
    const info = fs.readFileSync(archivo, { encoding: 'utf-8' });
    // pasar de json a objeto
    const data = JSON.parse(info);
    console.log(data);
    return data;
}
module.exports = {
    guardarDB,
    leerDB
}