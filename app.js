const express = require('express');
const bodyparser = require('body-parser');
const app = express();

const PORT = process.env.PORT || 3001

let respuesta = {
    codigo: "200",
    mensaje: '',
    tutorial: ''
};

let tutoriales = [ {
    id: 1,
    Titulo: "programacion 1",
    Descripcion: "Aprender a programar",
    Publicado: false
}];


app.use(bodyparser.urlencoded({ extended: false}));
app.use(bodyparser.json());

app.get('/api/tutoriales', (req, res) => {
    if(tutoriales.length >= 1)
    res.send(tutoriales);
    else{
        res.send([]);
    }
});

app.get('/api/tutoriales/:idTuto', (req, res) => {
    const idTuto = req.params.idTuto;
    const tutorial = tutoriales.find(e => e.id === parseInt(idTuto,10))
    if(tutorial){
    respuesta.tutorial = tutorial
    respuesta.mensaje = `tutorial ingresado en parametro ${idTuto} encontrado`
    res.send(respuesta);
    } else{
        res.send("404 not found");
    }
});


app.post('/api/tutoriales', (req, res) => {

    const id = tutoriales.map( e => e.id).reduce((a, b) => {return a > b ? a : b} ) + 1 

    const tutorial = {
    id: id,
    Titulo: req.body.Titulo,
    Descripcion: req.body.Descripcion,
    Publicado: req.body.Publicado
    };
    tutoriales.push(tutorial);
    res.send(" codigo: 201 - Creado");
})


app.delete('/api/tutoriales', (req, res) => {
    const int = 0
    const cantidad = tutoriales.length
    if(tutoriales.length >= 1){
    while(int < tutoriales.length){
        tutoriales.splice(tutoriales[int],1)
    }
    respuesta.mensaje = `codigo: 200 - los registros de tutorial borrados fueron ${cantidad}`;
    res.send(respuesta.mensaje);
    } else if(tutoriales.length === 0) {
        res.send([]);
    }
})

app.delete('/api/tutoriales/:idTuto', (req, res) => {
    const idTuto = req.params.idTuto;
    const tutorial = tutoriales.find(e => e.id === parseInt(idTuto,10))
    if(tutorial){
    respuesta.mensaje = `El id de tutorial a borrar es ${idTuto}`;
    const pos = tutoriales.indexOf(tutorial)
    tutoriales.splice(pos,1)
    respuesta.tutorial = tutorial
    res.send(respuesta);
    }else {
        res.send("404 - No Encontrado");
    }
})

app.put('/api/tutoriales/:idTuto', (req, res) => {
    const idTuto = req.params.idTuto;

    const tutorialNew = {
        id: parseInt(idTuto),
        Titulo: req.body.Titulo,
        Descripcion: req.body.Descripcion,
        Publicado: req.body.Publicado
        }

    respuesta.mensaje = `El id de tutorial modificado es ${idTuto}`;
    const tutorial = tutoriales.find(e => e.id === parseInt(idTuto,10))
    if(tutorial){
    const pos = tutoriales.indexOf(tutorial)
    tutoriales.splice(pos,1)
    tutoriales.push(tutorialNew)
    respuesta.tutorial = tutorial
    res.send(respuesta);
    }else{
       res.send("codigo: 404 - No Encontrado");
    }
})

app.listen(PORT, () => {
     console.log(`Servidor iniciado en el puerto ${PORT}`);
})