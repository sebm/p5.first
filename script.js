var oscNoise;
var oscSine;
var env;
var fft;

function setup() {
    createCanvas(720, 256);

    fft = new p5.FFT();
  oscNoise = new p5.Noise();
  oscNoise.start();
  oscNoise.amp(0)

  oscSine = new p5.SinOsc();
  oscSine.start();
  oscSine.amp(0);
  oscSine.freq(50);

  env = new p5.Env();
  env.setADSR(0.001, 0.1, 0.2, 0.1);
  env.setRange(1, 0);

  kickEnv = new p5.Env();
  kickEnv.setADSR(0.001, 0.1, 0.2, 0.1);
  kickEnv.setRange(1, 0);

  setInterval(function() {
      kick();
  }, 500);

  setInterval(function() {
      snare();
  }, 1000)
}

function snare() {
    env.play(oscNoise);
}

function kick() {
    kickEnv.play(oscSine);
}

function draw() {
    background(255)
    var waveform = fft.waveform();  // analyze the waveform
    beginShape();
    strokeWeight(5);
    for (var i = 0; i < waveform.length; i++){
      var x = map(i, 0, waveform.length, 0, width);
      var y = map(waveform[i], -1, 1, height, 0);
      vertex(x, y);
    }
    endShape();
}

function mouseClicked() {
}
