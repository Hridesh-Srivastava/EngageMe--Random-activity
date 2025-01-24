import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
import path from "path";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static("public/"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/" , async(req , res) => {
    try {
        const response = await axios.get("https://bored-api.appbrewery.com/random");
        const result = response.data;
        console.log(result);
        
        res.render("index.ejs" , {
            data : result,
        });
    } catch (error) {
        console.error("Failed to get the request!", error.message);
        
        res.render("index.ejs" , {
            error : error.message
        });
    }
});

app.post("/" , async(req , res) => {
    try {
        const type = req.body.type;
        const participants = req.body.participants;

        const response = await axios.get(`https://bored-api.appbrewery.com/filter?type=${type}&participants=${participants}`);
        const result = response.data;
        console.log(result);

        res.render("index.ejs" , {
            data : result[Math.floor(Math.random()*result.length)],
        });
        
    } catch (error) {
        console.error("Failed to make request: ",error.message);
        
        res.render("index.ejs" , {
            error : "No activites matched!"
        }); 
    }
});

app.listen(port , () => {
    console.log(`Listening on port ${port}`);
    
})