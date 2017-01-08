var WIDTH = 1000,
  HEIGHT = 500;
var version;
var myCanvas;
var number_parts = 36;
var drawing = [];
var startDrawing = false;

function setup() {
  version = parseInt(random(0,10000));
  myCanvas = createCanvas(WIDTH, HEIGHT);
  background(0);
  parts_header = createElement('h4', 'No of parts');
  // parts_slider = createSlider(4,72,36);
  parts_radio = createRadio();
  parts_radio.option('4', 4);
  parts_radio.option('8', 8);
  parts_radio.option('36', 36);
  parts_radio.option('72', 72);
  parts_radio.value(36);
  parts_radio.changed(radioChanged);
  // thickness_header = createElement('h4', 'Stroke Thickness');
  // thickness_slider = createSlider(1, 10, 2);
  hue_header = createElement('h4', 'Stroke Hue');
  hue_slider = createSlider(1, 360, 320);
  draw_radial();
  colorMode(HSB);


}

function draw() {
  number_parts = parts_radio.value();
}

function radioChanged() {
  if (parts_radio.value() == 4) {
    drawing.push('z');
  } else if (parts_radio.value() == 8) {
    drawing.push('y');
  } else if (parts_radio.value() == 36) {
    drawing.push('x');
  } else if (parts_radio.value() == 72) {
    drawing.push('w');
  }
}

function draw_radial() {

  translate(WIDTH / 2, HEIGHT / 2);
  strokeWeight(0.5);
  angleMode(DEGREES);
  rotate(23.5);
  for (var i = 0; i < number_parts; i++) {
    angleMode(DEGREES);

    rotate(360 / number_parts);
    stroke(220);
    line(0, 0, WIDTH / 2, HEIGHT / 2);

  }
}

function mouseDragged() {
  console.log('drag');
  if (touchX < WIDTH && touchY < HEIGHT) {
    push();
    translate(WIDTH / 2, HEIGHT / 2);
    colorMode(HSB);
    for (var i = 0; i < number_parts; i++) {
      angleMode(DEGREES);
      rotate(360 / number_parts);
      stroke(hue_slider.value(), 60, 80);
      // strokeWeight(thickness_slider.value());
      strokeWeight(2);
      line(ptouchX - WIDTH / 2, ptouchY - HEIGHT / 2, touchX - WIDTH / 2, ptouchY - HEIGHT / 2);
      line(ptouchX - WIDTH / 2, touchY - HEIGHT / 2, touchX - WIDTH / 2, touchY - HEIGHT / 2);
      line(ptouchX - WIDTH / 2, HEIGHT - ptouchY - HEIGHT / 2, touchX - WIDTH / 2, HEIGHT - ptouchY - HEIGHT / 2);
      line(ptouchX - WIDTH / 2, HEIGHT - touchY - HEIGHT / 2, touchX - WIDTH / 2, HEIGHT - touchY - HEIGHT / 2);
    }
    if (touchX > ptouchX) {
      for (var i = 0; i < (touchX - ptouchX); i++) {
        drawing.push('a');
      }
    } else if (touchX < ptouchX) {
      for (var i = 0; i < (ptouchX - touchX); i++) {
        drawing.push('b');
      }
    }
    if (touchY > ptouchY) {
      for (var i = 0; i < (touchY - ptouchY); i++) {
        drawing.push('c');
      }
    } else if (touchY < ptouchY) {
      for (var i = 0; i < (ptouchY - touchY); i++) {
        drawing.push('d');
      }
    }
    pop();
  }

}


function touchStarted() {
  if (touchX < WIDTH && touchY < HEIGHT) {
    print('NOW');
    drawing.push('e');
    startDrawing = true;
  }
}

function touchEnded() {
  if (touchX < WIDTH && touchY < HEIGHT) {
    drawing.push('f');
  }
}

function mouseMoved() {
  console.log('hi');
  if (startDrawing) {

    if (touchX > ptouchX) {
      for (var i = 0; i < (touchX - ptouchX); i++) {
        drawing.push('a');
      }
    } else if (touchX < ptouchX) {
      for (var i = 0; i < (ptouchX - touchX); i++) {
        drawing.push('b');
      }
    }
    if (touchY > ptouchY) {
      for (var i = 0; i < (touchY - ptouchY); i++) {
        drawing.push('c');
      }
    } else if (touchY < ptouchY) {
      for (var i = 0; i < (ptouchY - touchY); i++) {
        drawing.push('d');
      }
    }
  }
}

function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    print(drawing);
    drawingString = drawing.join('\n');
    download(version + '-test.txt', drawingString);
  }

  if (keyCode === RIGHT_ARROW) {
    console.log('saving');


    saveCanvas(myCanvas, version + '-input', 'jpg');
  }
}

function download(file, data, type) {
    type = type || 'text/plain';
    var elm = document.createElement('a');
    var href = 'data:' + type + ';charset=utf-8,' + encodeURIComponent(data);
    var event = new MouseEvent('click', {
        canBubble: true,
        cancelable: true,
        view: window,
    });
    elm.setAttribute('href', href);
    elm.setAttribute('download', file);
    elm.dispatchEvent(event);
}
