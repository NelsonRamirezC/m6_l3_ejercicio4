const express = require('express');
const fs = require('fs');
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.listen(3001, ()=> console.log("Servidor escuchando en http://localhost:3001"));

//TRAER ALUMNOS
app.get("/alumnos", (req, res) => {
    fs.readFile("alumnos.json", "utf8", (error, data) => {
        if(error) return res.status(500).send({code:500, message: "Ocurrió un error al cargar los alumnos."})
        let alumnos = JSON.parse(data);
        res.json(alumnos);
    })
})

//CREAR O AGREGAR UN ALUMNO
app.post("/alumnos", (req, res) => {
    try{
        let {nombre, institucion} = req.body;
        fs.readFile("alumnos.json", "utf8", (error, data) => {
            if(error) return res.status(500).send({code:500, message: "Ocurrió un error al leer los alumnos."})
            let dataAlumnos = JSON.parse(data);
            dataAlumnos.alumnos.push({nombre, institucion});
            fs.writeFile("alumnos.json", JSON.stringify(dataAlumnos, null, 4), "utf8", (error)=>{
                if(error) return res.status(500).send({code:500, message: "Ocurrió un error al guardar el alumno."})
                res.status(201).send({code: 201, message: "Alumno creado"})
            })
        })

        
    }catch(error){
        res.status(500).send("Ocurrió un error al procesar la solicitud.")
    }
    
})

//ELIMINAR UN ALUMNO
app.delete("/alumnos", (req, res) => {
    
})

app.all("*", (req, res) => {
    res.status(404).send("Ruta no existe.");
})
