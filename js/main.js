
$(document).ready(function(){

    var tetris = new Tetris();

    tetris.gameStart();




/*



    function gameInit(){
        tetrisArea = {
            canvas : document.createElement("canvas"),
            init : function() {
                this.canvas.width = cols * blockSize;
                this.canvas.height = rows * blockSize;
                this.context = this.canvas.getContext("2d");
                document.body.insertBefore(this.canvas, document.body.childNodes[0]);
                //this.interval = setInterval(updateGameArea, 20);
                
            },
            clear : function() {
                this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
            }
        };

        tetrisArea.init();

        $(tetrisArea.canvas).css("backgroundColor","#d3d3d3");
       
        blocks = initBlockArea({
            cols : cols,
            rows : rows
        });

        console.log(blocks);

        var area = new Area({
            context : tetrisArea.context
        });

        area.updateArea(blocks);
    }

    function Area(options){
        var context = options.context;

        this.updateArea = function(blocks){
            context.fillStyle = "blue";
            context.fillRect(100, 100, 50, 50);
            context.fillStyle = "blue";
            context.fillRect(200, 100, 50, 50);
        };

    }

    gameInit();
    

    function update() {
        tetrisArea.clear();
        //player.newPos();    
        //player.update();
    }



        // 전체 블록 초기화
        function initBlockArea(options){
            var totalCol = options.cols;
            var totalRow = options.rows;
    
            var blocks = [totalRow];
    
            for(var row= 0; row <= totalRow; row++){
                blocks[row] = [totalCol];
                for(var col = 0; col <= cols; col++){
                    if(row === 0){ 
                        blocks[row][col] = 1;
                    }
                    else if(row === totalRow){
                        blocks[row][col] = 1;
                    }
                    else if(col === 0 || col === totalCol){
                        blocks[row][col] = 1;
                    }
                    else {
                        blocks[row][col] = 0;
                    }
                }
            }
    
            return blocks;
        }
    

*/


});