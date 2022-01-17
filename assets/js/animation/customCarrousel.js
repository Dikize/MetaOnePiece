var about = document.getElementById('about');
var carrousel = document.getElementsByClassName('content-carrousel')[0];
var figures = about.querySelectorAll('figure');

var counter = 0;

for (figure of figures) {
    figure.addEventListener('click', function () {
        clickFigure(this);
    });
    figure.ix = counter;
    counter++;
}

var figureDist = 300;
var viewImage = {};
viewImage.on = false;

var carrouselAngle = 0;
var carrouselPerspective = 0;
var lastX = 0;
var thisX = 0;
var lastY = -100;
var thisY = 0;

about.addEventListener('mousemove', move);

function move(e) {

    var rect = about.getBoundingClientRect();
    lastX = (rect.left + ((rect.right - rect.left) / 2)) - e.clientX;
    lastY = e.clientY - (rect.top + ((rect.bottom - rect.top) / 2));
}

function clickFigure(e) {

    if (viewImage.on) {
        return false;
    }

    document.querySelector('.closeImage').classList.add('open');

    e.classList.add('open');

    viewImage.on = true;
    viewImage.ended = false;
    viewImage.ix = e.ix;
    viewImage.angle = (((e.ix * 360) / figures.length) + carrouselAngle) % 360;
    viewImage.endAngle = (viewImage.angle <= 180) ? 0 : 360;

    console.log(viewImage.endAngle);
}

var lastRun = 0;
Run();

function Run() {

    var dt = 1;
    if (lastRun != 0) {
        dt = Math.min(30, (performance.now() - lastRun)) / 30;
    }
    lastRun = performance.now();

    thisX = viewImage.on ? 0 : thisX + ((lastX - thisX) * dt * 0.05);
    thisY = viewImage.on ? 0 : thisY + ((lastY - thisY) * dt * 0.05);

    carrousel.style.perspectiveOrigin = '50% ' + (thisY + 200) + 'px';
    carrouselAngle = ((carrouselAngle + 360 + (thisX / 1000)) % 360);

    figureDist = (!viewImage.on || ix == viewImage.ix) ? 300 : Math.max(0, (figureDist - (dt * 9)));

    var ix = 0;
    for (figure of figures) {

        var angle;

        if (ix == viewImage.ix) {

            viewImage.angle =
                Math.abs(viewImage.endAngle - viewImage.angle) < 0.01 ?
                (viewImage.angle = viewImage.endAngle) :
                (viewImage.angle + (viewImage.endAngle - viewImage.angle) * dt * 0.1);

            angle = viewImage.angle;

        } else {
            angle = (((ix * 360) / figures.length) + carrouselAngle) % 360;
        }

        var thisScale = ((ix == viewImage.ix) ? 1 : (figureDist / 300));

        figure.style.transform =
            'scale(' + thisScale + ') translate(-50%, -50%) rotateY(' + angle + 'deg) translateZ(' + figureDist + 'px)';
        figure.style.opacity = Math.pow(thisScale, 3);

        var opcity = Math.min(Math.abs(180 - angle), 180) / 180;
        figure.querySelector("img").style.opacity = opcity;

        ix++;
    }

    if (figureDist > 0 || viewImage.endAngle != viewImage.angle) {

        requestAnimationFrame(Run);

    } else {
        viewImage.ended = true;
    }
}

document.querySelector('.closeImage').addEventListener('click', closeImage);

function closeImage() {

    if (!viewImage.on) {
        return false;
    }

    document.querySelector('.closeImage').classList.remove('open');

    var opens = document.getElementsByClassName('open');

    for (e of opens) {
        e.classList.remove('open');
    }

    viewImage.on = false;
    viewImage.ix = -1;
    viewImage.angle = 0;
    viewImage.endAngle = 0;

    if (viewImage.ended) {
        Run();
    }
}