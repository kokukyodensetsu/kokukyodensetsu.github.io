let ac;
let midiSound;
export let baseVolume = 0.5;
let vol;

export function initialize(){
    var audioContext = new AudioContext({latencyHint:"balanced", sampleRate: 44100}); // Androidで正常に再生するために指定必須
    fetch('./lib/benten/benten_bg.wasm').then((wasm) => wasm.arrayBuffer()).then(wasmBuffer => {
        audioContext.resume().then(() => {
            audioContext.audioWorklet.addModule('./lib/midisound.js').then(() => {
                midiSound = new AudioWorkletNode(audioContext, "midi-sound-processor");
                vol = new GainNode(audioContext, {gain: baseVolume});
                midiSound.port.postMessage({type:"init_wasm", wasm: wasmBuffer});
                
                midiSound.connect(vol).connect(audioContext.destination);
                ac = audioContext;
            });
        });
    });
}

function ensure_initialize(){
    return ac;
}
export function playBuffer(sf2Buffer, smfBuffer){
    if(ensure_initialize()){
        midiSound.port.postMessage({type:"play", sf2:sf2Buffer, smf:smfBuffer, sampleRate:ac.sampleRate});
    }
}
export function stop(){
    if(ensure_initialize()){
        midiSound.port.postMessage({type:"stop"});
    }
}
export function setTempo(speed){
    if(ensure_initialize()){
        midiSound.port.postMessage({type:"set_speed", speed});
    }
}
export function setVolume(volume){
    if(ensure_initialize()){
        vol.gain.value = volume * baseVolume;
    }
}

export function mute(){
    if(ensure_initialize()){
        midiSound.port.postMessage({type:"mute"});
    }
}
export function unmute(){
    if(ensure_initialize()){
        midiSound.port.postMessage({type:"unmute"});
    }
}