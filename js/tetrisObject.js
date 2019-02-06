


function Tetris(gameConfig){

    if(isEmpty(gameConfig)){
        gameConfig = {
            cols : 11,
            rows : 21,
            blockSize : 30,
            sideBlockColor : "gray",
            gameStartFlag : false 
        };
    }

    var self = this;
    var tetrisCanvas;
    var rendering;
    var blocks;
    var playerBlock;
    var collision;
    var rule;

    this.gameStart = function(){
        gameConfig.gameStartFlag = true;

        tetrisCanvas = new TetrisCanvas();
        rendering = new Rendering({
            context : tetrisCanvas.context
        });
    
        blocks = new Blocks();
        playerBlock = new PlayerBlock();
        collision = new Collision();
        rule = new Rule();
       
        //블록 초기화
        blocks.init();
        playerBlock.createPlayerBlock();

        gameConfig.intervalId = setInterval(playerBlockDropPerSeconds, 1000);
    }



    //테트리스 캔버스 객체
    function TetrisCanvas(){
        var self = this;
        var canvas = document.getElementById("tetrisCanvas");
    
        var context = canvas.getContext("2d");
        canvas.width = (gameConfig.cols +1) * gameConfig.blockSize;
        canvas.height = (gameConfig.rows  + 1) * gameConfig.blockSize;
        
        this.clear = function(){
            context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        }

    
        this.canvas = canvas;
        this.context = context;
    }
    
    function gameUpdate(){
        if(gameConfig.gameStartFlag){
            tetrisCanvas.clear();
            rendering.updateBlocks(blocks.getBlocks());
            rendering.updatePlayerBlock(playerBlock);   

            if(rule.isEnd(blocks.getBlocks())){
                gameConfig.gameStartFlag = false;
                
                clearInterval(gameConfig.intervalId);
                console.log("game End");
            }
        }
        
    }


    //화면 렌더링 객체
    function Rendering(options){
        var context = options.context;
    
        this.updateBlocks = function(blocks){
            renderingBlock(0,0,blocks,"gray");
        };

        this.updatePlayerBlock = function(playerBlock){
            renderingBlock(
                playerBlock.blockX,
                playerBlock.blockY,
                playerBlock.getBlockTypeArr(),
                playerBlock.blockColor
                );
        }

        function renderingBlock(x, y, blocks, blockColor){
            
            var initX = x * gameConfig.blockSize;
            var initY = y * gameConfig.blockSize;

            var blockX = initX;
            var blockY = initY;

            context.fillStyle = blockColor;
            context.strokeStyle = blockColor;

            for(var row in blocks){
                blockX = initX;
                for(var col in blocks[row]){
                    var value = blocks[row][col];
                    switch(value){
                        case 1:
                        case 4:
                        context.fillRect(
                            blockX,
                            blockY,
                            gameConfig.blockSize,
                            gameConfig.blockSize
                            );                        
                        break;
                        case 2:
                        case 3:
                        context.fillRect(
                            blockX,
                            blockY,    
                            gameConfig.blockSize,    
                            gameConfig.blockSize    
                            );                            
                            break;

                    }
                    blockX += gameConfig.blockSize;
                }
                blockY += gameConfig.blockSize;
            }

        }
    }

    //충돌 검사 객체
    function Collision(){

        //고정된 블럭과 Y축 끝부분이 닿았는지 검사
        this.buildedBlockColisionChk = function(playerBlock, fixedBlocks){

            var playerBlockArr = playerBlock.getBlockTypeArr();

            var maxRow = playerBlockArr.length;
            var maxCol = playerBlockArr[0].length;

            for(var row = 0; row < maxRow; row++){
                for(var col = 0; col < maxCol; col++){
                    var value = playerBlockArr[row][col];

                    if(value === 3){
                        var relativeX = (playerBlock.blockX + col); 
                        var relativeY = (playerBlock.blockY + row);

                        if(fixedBlocks[relativeY][relativeX] === 1 || fixedBlocks[relativeY][relativeX] === 4){
                            return true;
                        }
                    }


                }
            }
            return false;
        }
        this.leftRightColisionChk = function(playerBlocks, fixedBlocks){

            for(var index in playerBlocks){
                var x = playerBlocks[index].x;
                var y = playerBlocks[index].y;
                
                if(fixedBlocks[y][x] === 1 || fixedBlocks[y][x] === 4){
                    return true;
                }
            }
            return false;

        };

        

    }

    function Rule(){

        this.isEnd = function(blocks){
            var cols = blocks[1].length;
            
            for(var x =1; x < cols -1 ; x++){
                if(blocks[1][x] === 4){
                    return true;
                }
            }
            return false;
        }
    }


    function PlayerBlock(){
        this.blockX = 1 ;
        this.blockY = 1;
        this.blockType = 1;
        this.blockRocationIndex = 0;

        var blockColors = ["red","orange","yellow","green","blue","indigo","purple"];

        var possibleChar = "ABCDEF1234567890";
        var possibleCharLength = possibleChar.length;
        
        function getRandomRGB() {
            var rgb ="#";

            for(var index = 0; index < 6; index++){
                rgb += Math.floor(Math.random() * possibleCharLength);
            }
            return rgb;
        }
        function getRandomColor(){
            return blockColors[Math.floor(Math.random() * blockColors.length)];
        }

        var blockTypes = 
        [
            [       
                [             
                    [2],                    
                    [2],
                    [2],
                    [3]
                ],  
                [
                    [3,3,3,3]
                ],    
            ],
            [       
                [             
                    [3,2,3],                    
                    [0,3,0]
                ],  
                [
                    [0,2],
                    [3,2],
                    [0,3],
                ],   
                [
                    [0,2,0],                    
                    [3,3,3]
                ],   
                [
                    [2,0],
                    [2,3],
                    [3,0],
                ], 
            ],
            [       
                [             
                    [0,2],                    
                    [2,3],                   
                    [3,0]
                ],  
                [
                    [3,2,0],                    
                    [0,3,3]
                ]
            ],
            [       
                [             
                    [2,0],                    
                    [3,2],                   
                    [0,3]
                ],  
                [
                    [0,2,3],                    
                    [3,3,0]
                ]
            ],
            [       
                [             
                    [2,2],                    
                    [3,3]
                ]
            ],
            [       
                [             
                    [3,2],                    
                    [0,2],                   
                    [0,3]
                ],  
                [
                    [0,0,2],                    
                    [3,3,3]
                ],
                [             
                    [2,0],                    
                    [2,0],                   
                    [3,3]
                ], 
                [
                    [2,3,3],                    
                    [3,0,0]
                ]
            ],
            [       
                [             
                    [2,3],                    
                    [2,0],                   
                    [3,0]
                ],  
                [
                    [3,3,2],                    
                    [0,0,3]
                ],
                [             
                    [0,2],                    
                    [0,2],                   
                    [3,3]
                ], 
                [
                    [2,0,0],                    
                    [3,3,3]
                ]
            ],
        ];
       
        
        this.totalBlockTypeCnt = blockTypes.length;

        this.getBlockTypeArr = function(){
            return blockTypes[this.blockType][this.blockRocationIndex];
        };

        this.rocateBlock = function(){
            this.blockRocationIndex =  (this.blockRocationIndex + 1) % this.totalRocationTypeCnt ;

        }
        this.createPlayerBlock = function(){
            this.blockType = Math.floor(Math.random() * this.totalBlockTypeCnt);
            this.blockRocationIndex = 0; 
            this.blockX = 5 ;
            this.blockY = 1;
            this.totalRocationTypeCnt = blockTypes[this.blockType].length;
            this.blockColor = getRandomColor();
        }

        this.getRelativeBlockXY = function(){
            var relativeXY = [];
            var playerBlockArr = this.getBlockTypeArr();

            var maxRow = playerBlockArr.length;
            var maxCol = playerBlockArr[0].length;

            for(var row = 0; row < maxRow; row++){
                for(var col = 0; col < maxCol; col++){
                    var value = playerBlockArr[row][col];

                    if(value === 3 || value === 2){
                        relativeXY.push({
                            x : (playerBlock.blockX + col),
                            y : (playerBlock.blockY + row)
                        });
                    }
                }
            }
            return relativeXY;
        }

    }

    //화면에 존재하는 블록을 관리하는 객체
    function Blocks(){
        var blocks;
    
        this.init = function(){
    
            var totalCol = gameConfig.cols;
            var totalRow = gameConfig.rows;
    
            blocks = [totalRow];
    
            for(var row= 0; row <= totalRow; row++){
                blocks[row] = [totalCol];
                for(var col = 0; col <= totalCol; col++){
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
        }

        this.blockBuilding = function(playerBlocks){
            for(var index in playerBlocks){
                var x = playerBlocks[index].x;
                var y = playerBlocks[index].y;

                blocks[y-1][x] = 4;
            }
        };
        this.erasefullyRow = function(){
            var maxRow = blocks.length;
            var maxCol = blocks[0].length;
            var fullyRowArr = [];
            var fullyRow = true;

            for(var row = 1; row < maxRow - 1; row++){
                for(var col = 1; col < maxCol - 1; col++){
                    var value = blocks[row][col];
                    if(value !== 4){
                        fullyRow = false;
                        break;
                    }
                }
                if(fullyRow){
                    fullyRowArr.push(row);
                }
                fullyRow = true;
            }

            eraseRows(fullyRowArr);

        };
        function eraseRows(fullyRowArr){
            for(var index in fullyRowArr){
                blocks.splice(fullyRowArr[index],1);
                blocks.splice(1,0,[1,0,0,0,0,0,0,0,0,0,0,1]);
            }
        }
    
        this.getBlocks = function(){
            return blocks;
        };
    }



    function isEmpty(obj){
        return obj === null || obj === undefined;
    }


    $(document).keydown(function(e){
        if(!gameConfig.gameStartFlag){
            return;
        }
        e = e || window.event;
        if (e.keyCode == '38') {
    
            var beforeIndex = playerBlock.blockRocationIndex;
            playerBlock.rocateBlock();
            
            if(collision.leftRightColisionChk(playerBlock.getRelativeBlockXY(), blocks.getBlocks())){
                playerBlock.blockRocationIndex = beforeIndex;
            }
        }
        else if (e.keyCode == '40') {
            
            playerBlock.blockY += 1;
        }
        else if (e.keyCode == '37') {
            playerBlock.blockX -= 1;
            if(collision.leftRightColisionChk(playerBlock.getRelativeBlockXY(), blocks.getBlocks())){
                playerBlock.blockX++;
            }
        }
        else if (e.keyCode == '39') {
            playerBlock.blockX += 1;
            if(collision.leftRightColisionChk(playerBlock.getRelativeBlockXY(), blocks.getBlocks())){
                playerBlock.blockX--;
            }
        }
        else if(e.keyCode === 32){
            spaceDrop();
        }
        
        buildedBlockColisionChk();
        gameUpdate();
    });

    function buildedBlockColisionChk(){
        if(collision.buildedBlockColisionChk(playerBlock,blocks.getBlocks())){
            blocks.blockBuilding(playerBlock.getRelativeBlockXY());
            playerBlock.createPlayerBlock();
            blocks.erasefullyRow();
            console.log("colision!");
        }
    }
    function playerBlockDropPerSeconds(){
        playerBlock.blockY++;
        buildedBlockColisionChk();
        gameUpdate();
    }
    function spaceDrop(){
        for(var y = playerBlock.blockY ; y <= gameConfig.rows ; y++){
            playerBlock.blockY++;
            if(collision.buildedBlockColisionChk(playerBlock,blocks.getBlocks())){
                break;
            }
        }

    }
}


