const Tarea = require("./tarea");
const colors = require('colors');

class Tareas {
    _listado = {};
    get listadoArr() {
        const listado = [];
        Object.keys(this._listado).forEach(key => {
            const tarea = this._listado[key];
            listado.push(tarea);
        })
        return listado;
    }
    constructor() {
        this._listado = {};
    }
    borrarTarea(id = '') {
        if (this._listado[id]) {
            delete this._listado[id];
        }
    }
    cargarTareasFromArray(tareas = []) {
        tareas.forEach(tarea => {
            this._listado[tarea.id] = tarea;
        })
    }
    crearTarea(desc = '') {
        const tarea = new Tarea(desc);
        this._listado[tarea.id] = tarea;
    }
    listadoCompleto() {
        this.listadoArr.forEach((tarea, i) => {
            (tarea.completadoEn) ? console.log(`${colors.green(i+1 +'.')} ${tarea.desc} :${colors.green(': Completado')}`): console.log(`${colors.red(i+1 +'.')} ${tarea.desc} :${colors.red(': Pendinete')}`);
            i++;
        });
    }
    listraPendinetesCompletadas(completadas = true) {
        if (completadas) {
            console.log('\n');
            console.log('Tareas completas');
            this.listadoArr.forEach((tarea, i) => {
                if (tarea.completadoEn) {
                    console.log(`${i+1 +'.'} ${tarea.desc} :: ${tarea.completadoEn}`)
                }
                i++;
            });
        } else {
            let i = 1;
            console.log('\n');
            console.log('Tareas pendientes');
            this.listadoArr.forEach((tarea) => {
                if (!tarea.completadoEn) {
                    console.log(`${i + '.'} ${tarea.desc}`)
                    i++;
                }
            });
        }
    }
    toggleCompletadas(ids = []) {
        ids.forEach(id => {
            const tarea = this._listado[id];
            if (!tarea.completadoEn) {
                tarea.completadoEn = new Date().toISOString();
            }
        });
        this.listadoArr.forEach(tarea => {
            if (!ids.includes(tarea.id)) {
                this._listado[tarea.id].completadoEn = null;
            }
        })
    }
}
module.exports = Tareas;