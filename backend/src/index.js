import "dotenv/config" ;
import express from "express" ;
import cors from "cors" ;
import feedRoutes from "./routes/feed.js" ;

const app = express() ;

app.use(cors()) ;
app.use(express.json()) ;
app.use("/api/feed", feedRoutes) ;

// Health check route
app.get("/api/health", (req,res) => {
    res.json({ok:true}) ;
}) ;

const PORT = process.env.PORT || 4000 ;
app.listen(PORT,() => {
    console.log(`API running on http://localhost:${PORT}`);
}) ;
