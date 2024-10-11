const express = require ('express');
const mongoose = require ('mongoose');
const cors = require('cors');
const app = express();
const PORT =3000;

//Conexion a MongoDB Atlas 
app.use(cors());
mongoose.connect('mongodb+srv://danieladiaz2908:N4dUMqDf0ENgG04N@cluster0.ecn7f.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
    useNewUrlParser : true,
    useUnifiedTopology : true, 
}).then(()=>console.log('MongoDB connected'))
    .catch(err=>console.log(err));

//Middleware
app.use(express.json());


//Modelo del usuario

const userSchema = new mongoose.Schema({
    email : String,
    password : String,
});

const User = mongoose.model('User', userSchema)

//Ruta para un nuevo usuario
app.post('/signup', async (req,res)=>{
    const {email,password} = req.body;

    //Validar si el usuario existe o no
    const existinUser = await User.findOne({email});
    if(existinUser){
        return res.status(400).send('El usuario ya existe')
    }

    //Crear un nuevo usuario
    const newUser = new User ({email,password});
    await newUser.save();
    res.status(200).send('Usuario creado correctamente');
});
 //Ruta para iniciar sesion

app.post('/login', async(req,res)=>{
    const {email,password} =req.body;
    const user = await User.findOne({email});
    if(!user || user.password !== password){
        return res.status(400).send('Credenciales incorrectas');
    }
        res.status(200).send('Inicio de sesion correcto');
});

app.listen(PORT,()=>{
    console.log(`servidor corriendo en el puerto ${PORT}`);
});
