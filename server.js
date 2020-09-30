const express = require("express");
const nunjucks = require('nunjucks');

const server = express();
const videos = require("./data");

server.use(express.static('public'))

server.set("view engine", "html")

nunjucks.configure("views", {
    express: server,
    noCache: true
})

server.get("/", function(req,res) {
    const about = {
        avatar_url: "https://avatars1.githubusercontent.com/u/28929274?s=280&v=4",
        name: "Rocketseat o que é?",
        about: "A Rocketseat é uma platafroma de cursos online de programação.",
        tech: "Tecnologias usadas",
        links: [
            {name: "Node.js", url: "https://nodejs.org"},
            {name: "Javascript", url: "https://javascript.com"},
            {name: "php", url: "https://php.net"},
            {name: "Python", url: "https://python.org"},
            {name: "Typescript", url: "https://typescriptlang.org/"}
        ]
    }

    return res.render("about", { about });
})

server.get("/classes", function(req,res) {
    return res.render("classes", {items: videos});
})

server.get("/video", function(req, res) {
    const id = req.query.id;

    const video = videos.find(function(video){
        if (video.id == id) {
            return true;
        }
    })

    if (!video) {
        return res.send("Video not found!")
    }

    res.render("video", { item: video })
})

server.listen(5000, function() {
    console.log("server is running");
})