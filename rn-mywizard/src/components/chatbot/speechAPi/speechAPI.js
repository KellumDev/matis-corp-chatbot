


const initializeRecognition = () => {

    const SpeechRecognition = window.webkitSpeechRecognition
    const recognition = new SpeechRecognition()
    return recognition;
}


const startSpeech = () => {

    let rec = initializeRecognition()
    rec.continous = true
    rec.interimResults = true
    rec.lang = 'en-US'
    rec.start()

    console.log('reconition started');
    //get results from reconition 
    rec.addEventListener('result', e => {
        // console.log(e.results)
        let results = e.results;
        //transverse through array 
        const transcript = Array.from(results)
            .map(result => result[0])
            .map(result => result.transcript)
            //join the two arrays at the end
            .join('')

        console.log(transcript);
        return transcript;
    })

    rec.addEventListener('end', rec.start);

    
}//end speech

export default { startSpeech }