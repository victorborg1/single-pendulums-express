const lengthSlider = document.getElementById('lengthSlider')
const currentLength = document.getElementById('currentLength')

const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
canvas.height = 900;
canvas.width = 900;
let pendulumArr = []

class Pendulum {
    constructor(length, color){
        this.color = color
        this.length = length
        this.ang = Math.PI/2
        this.ox = canvas.width/2
        this.oy = canvas.width/6
        this.ang_v = 0
        this.energy_loss_factor = 0.992
        this.g = 0.8
    }
    draw () {
        context.lineWidth = 0.3
        context.strokeStyle = 'black'
        context.fillStyle = this.color
        let ball_x = this.ox + this.length*Math.sin(this.ang)
        let ball_y = this.oy + this.length*Math.cos(this.ang)
        context.beginPath()
        context.moveTo(this.ox, this.oy);
        context.lineTo(ball_x, ball_y);
        context.stroke()
        context.beginPath()
        context.arc(ball_x, ball_y, 10, 0, Math.PI * 2, false)
        context.fill()
        context.stroke()
        this.update()
    }
    update() {
        let ang_a = -(this.g/this.length)*Math.sin(this.ang)
        this.ang += this.ang_v;
        this.ang_v += ang_a;
        this.ang_v *= this.energy_loss_factor;
    }
}

generatePendulums(lengthSlider.value)
animate();

function generatePendulums(amount) {
    for (let i = 0; i<amount; i++) {
        let randomColor = getRandomColor()
        let length = (Math.floor(Math.random()*canvas.width/2.1) + 100)
        pendulumArr.push(new Pendulum(length, randomColor))
    }
}

function getRandomColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    const a = Math.floor(Math.random() * 10);
    return `rgba(${r},${g},${b},${a})`;
}

function animate() {
  requestAnimationFrame(animate);
  context.fillStyle = "white";
  context.fillRect(0, 0, canvas.width, canvas.height);
  pendulumArr.forEach((pendulum) => pendulum.draw());
}

lengthSlider.addEventListener('input', () => {
    const length = lengthSlider.value
    currentLength.innerText = length
    pendulumArr = []
    generatePendulums(lengthSlider.value)
    cancelAnimationFrame()
    animate()
})