module.exports = class Shape {
    constructor(shape) {
        let name = null;
        let image = null;
        /*
        new Shape("moon"),
            new Shape("cross"),
            new Shape("diamond"),
            new Shape("pound"),
            new Shape("star"),
            new Shape("swirl"),
            new Shape("dots"),
            new Shape("X"),
        */
        if(shape === "moon") {
            image = "🌛"
        }
        else if(shape === "diamond") {
           image = "♦";
        }
        else if(shape === "pound") {
           name = "Octo Thorpe";
           image = "#"
        }
        else if(shape === "star") {
           image = "☆"
        }
        else if(shape === "swirl") {
           image = "🌀"
        }
        else if(shape === "dots") {
           name = "Trip Ledots";
           image = "∴";
        }
        else if(shape === "X") {
           name = "X";
           image = "X";
        }
        this.name = name;
        this.shape = shape;
        this.used = false;
        this.image = image;
    }
}