var app = angular.module("HangmanApp",[]);
app.controller("GameController",['$scope',function($scope){
    var words = ["remember","application","forget","school","hollywood","windows","apple","microsoft"];
    $scope.incorrectLettersChosen= [];
    $scope.correctLettersChosen= [];
    $scope.guesses = "";
    $scope.displayWord = "";
    $scope.result = "";
    $scope.width = '';
    $scope.bgColor = '';
    var recreateDisplayWord= "";
    $scope.input ={
        letter: ""
    }
    
    var selectRandomWord = function(){
        var index =  Math.round(Math.random()*words.length);
        return words[index];
    }

    var newGame = function(){
        $scope.incorrectLettersChosen = [];
        $scope.correctLettersChosen= [];
        $scope.guesses = 6;
        $scope.displayWord = "";
        selectedWord = selectRandomWord();
        var tempDisplayWord = "";
        for(var i =0;i < selectedWord.length;i++){
            tempDisplayWord += "*"
        }
        $scope.displayWord = tempDisplayWord;
    }
    
    $scope.letterChosen = function(){
        var selectedWordSplit = selectedWord.split('');
        var check = false;
        recreateDisplayWord= "";
        for(let i = 0;i <=selectedWordSplit.length-1; i++){
            if(selectedWordSplit[i] == $scope.input.letter){
                if($scope.correctLettersChosen.indexOf(selectedWordSplit[i]) < 0)
                    {
                        $scope.correctLettersChosen.push($scope.input.letter);
                        check = true;
                    }
                    else{
                        $scope.input.letter= "";
                    }
            }
            recreateDisplayWord+=  $scope.correctLettersChosen.indexOf(selectedWordSplit[i]) < 0 ? "*" : selectedWordSplit[i];  
        }
        if(check == false && $scope.guesses > 0 ){
            if($scope.incorrectLettersChosen.indexOf($scope.input.letter) < 0)
            {
                $scope.incorrectLettersChosen.push($scope.input.letter);
                $scope.guesses = $scope.guesses -1;    
            }       
        }
        $scope.displayWord = recreateDisplayWord;
        $scope.input.letter = "";
        if(recreateDisplayWord.indexOf("*") < 0 ){
            $scope.result = "You Won";
        }
        if( $scope.guesses <=0){
            $scope.result = "You lost";
        }
    }
    newGame();
}])
