    var wrapper = this.document.getElementById('wrapper')
    var slots = this.document.getElementsByTagName('input')    

    var attempts = 0

    var word = words[this.Math.floor(this.Math.random() * words.length)]
    var alphabet = {}

    function fillAlphabet () {
        this.alphabet = {}
        for (var i = 0; i < this.word.length; i++) {
            if (this.alphabet.hasOwnProperty(this.word.charAt(i)))
                this.alphabet[this.word.charAt(i)] += 1
            else
                this.alphabet[this.word.charAt(i)] = 1
        }
    }

    this.fillAlphabet();

    (function createSlots () {
        for (var i = 0; i < 25; i++) {
            var input = this.document.createElement('input')

            input.maxLength = 1
            if (i > 4)
                input.readOnly = true;
            this.wrapper.appendChild(input)
        }

        this.wrapper.children[0].value = this.word.charAt(0)
        this.wrapper.children[0].classList.add('red')
    })()

    function updateSlots () {
        var checkpoints = [5, 10, 15, 20, 25]
        for (var i = (this.attempts - 1) * 5; i < this.attempts * 5; i++)
            this.slots[i].readOnly = true

        for (var i = (this.attempts * 5); i < (this.attempts * 5) + 5; i++) {
            this.slots[i].readOnly = false            

            for (var j = 0; j < checkpoints.length; j++) {
                if (i == checkpoints[j]) {
                    this.slots[i].classList.add('red')
                    this.slots[i].value = this.word.charAt(0)
                    continue
                }
            }
        }
    }

    function submitGuess () {
        var userGuess = ''
        for (var i = this.attempts * 5; i < (this.attempts + 1) * 5; i++) {
            if (this.slots[i].value.length == 0)
                return
            userGuess += this.slots[i].value
        }

        this.updateRow()
        if (userGuess == this.word)
            return

        this.attempts++
        if (this.attempts == 5)
            return;

        this.updateSlots()
    }

    function updateRow() {
        var wordCopy = this.word;
        for (var i = this.attempts * 5; i < (this.attempts + 1) * 5; i++) {
            if (this.slots[i].value.toLowerCase() == this.word.charAt(i - (this.attempts * 5))) {
                this.slots[i].classList.add('red')
                this.alphabet[this.slots[i].value] -= 1
                continue
            }
        }
        for (var i = this.attempts * 5; i < (this.attempts + 1) * 5; i++) {
            for (var j = 0; j < wordCopy.length; j++) {
                if (this.slots[i].value == wordCopy.charAt(j) && this.alphabet[wordCopy.charAt(j)] != 0) {
                    this.slots[i].classList.add('yellow')
                    this.alphabet[wordCopy.charAt(j)] -= 1
                }
            }
        }
        this.fillAlphabet()
    }