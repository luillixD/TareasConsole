const { guardarDB, leerDB } = require('./helpers/guardarArchivo');
const { inquirerMenu, pausa, leerInput, listadoTareasBorrar, confirmar, mostrarlistadoChecklist } = require('./helpers/inquirer');
const Tareas = require('./models/tareas');
require('colors');
console.clear();
const main = async() => {
    let opt = '';
    const tareas = new Tareas();
    const tareasDB = leerDB();
    if (tareasDB) {
        tareas.cargarTareasFromArray(tareasDB);
    }
    do {
        //imprimir el menu
        opt = await inquirerMenu();
        switch (opt) {
            case '1':
                const desc = await leerInput('descripcion');
                tareas.crearTarea(desc);
                break;
            case '2':
                tareas.listadoCompleto();
                break;
            case '3':
                tareas.listraPendinetesCompletadas();
                break;
            case '4':
                tareas.listraPendinetesCompletadas(false);
                break;
            case '5':
                const ids = await mostrarlistadoChecklist(tareas.listadoArr);
                tareas.toggleCompletadas(ids);
                break;
            case '6':
                const id = await listadoTareasBorrar(tareas.listadoArr);
                if (!id === 0) {
                    const ok = await confirmar('Esta Seguro?');
                    if (ok) {
                        tareas.borrarTarea(id);
                        console.log("Tarea Borrada corectamente");
                    }
                }

                break;
        }
        guardarDB(tareas.listadoArr);
        if (opt !== '0') {
            await pausa();
        }
    } while (opt !== '0')
}
main();