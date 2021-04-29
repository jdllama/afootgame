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

       }
       else if(shape === "cross") {
           
        }
        else if(shape === "diamond") {
           
        }
        else if(shape === "pound") {
           name = "Octo Thorpe";
        }
        else if(shape === "star") {
           
        }
        else if(shape === "swirl") {
           
        }
        else if(shape === "dots") {
           name = "Trip Ledots";
        }
        else if(shape === "X") {
           name = "X";
        }
        this.name = name;
        this.shape = shape;
        this.used = false;
        this.image = image;
    }
}