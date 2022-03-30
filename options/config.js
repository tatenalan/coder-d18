import 'dotenv/config'

var mongoDb =  {
    cnxStr:"mongodb+srv://admin:admin@cluster0.msysu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    options:{"useNewUrlParser": true,"useUnifiedTopology":true,"serverSelectionTimeoutMS":5000}
}

export default {
    mongodb: process.env.MONGODB ? JSON.parse(process.env.MONGODB) : mongoDb,
    firebase: JSON.parse(process.env.FIREBASE)
}

/* export default {
        mongodb:  {
            cnxStr:"mongodb+srv://admin:admin@cluster0.msysu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
            options:{"useNewUrlParser": true,"useUnifiedTopology":true,"serverSelectionTimeoutMS":5000}
        },
        firebase: JSON.parse(process.env.FIREBASE)
    } */