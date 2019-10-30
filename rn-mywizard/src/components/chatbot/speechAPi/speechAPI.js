

class SpeechAPI {

    constructor() {
        var SpeechRecognition = window.webkitSpeechRecognition
        this.recognition = new SpeechRecognition()
        console.log('[INITIALIZED REC] \n', this.recognition);

    }

    //constructor method, start the transcript  and return a transcript value
    startSpeech() {
        
        console.log('[START REC] \n');
        this.recognition.continous = true
        this.recognition.interimResults = true
        this.recognition.lang = 'en-US'
        this.recognition.start()

        console.log('reconition started');
        //get results from reconition 
        this.recognition.addEventListener('result', e => {
            // console.log(e.results)
            const results = e.results;
            //transverse through array 
            const transcript = Array.from(results)
                .map(result => result[0])
                .map(result => result.transcript)
                //join the two arrays at the end
                .join('')

            console.log(transcript);
            this.recognition.onresult = () => { 
                return transcript; };

        })

        //  this.recognition.addEventListener('end', this.recognition.start);
    }

    //constructor method, stop the transcript 
    stopSpeech() {
        this.recognition.abort();

        console.log('Speech recognition has stopped.');
    }
    //this.recognition.stop();


}

export default SpeechAPI; 