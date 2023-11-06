input.onButtonPressed(Button.A, function () {
    if (скорость == 0) {
        скорость = -255
    } else {
        скорость = 0
    }
})
EM_IR.OnPressEvent(function (message) {
    if (IrCodes[message] == "UP") {
        скорость = -255
    }
    if (IrCodes[message] == "DOWN") {
        скорость = 255
    }
    if (IrCodes[message] == "OK") {
        Fire()
    }
    if (IrCodes[message] == "+") {
        if (angle <= 100) {
            angle = angle + 10
        } else {
            angle = 90
        }
    }
    if (IrCodes[message] == "-") {
        if (angle >= 40) {
            angle = angle - 10
        } else {
            angle = 30
        }
    }
})
function Fire () {
    скорость = 0
    LED0.showColor(neopixel.hsl(360, 99, 5))
    music.playTone(988, music.beat(BeatFraction.Quarter))
    LED1.showColor(neopixel.hsl(340, 99, 5))
    music.playTone(988, music.beat(BeatFraction.Quarter))
    LED2.showColor(neopixel.hsl(320, 99, 5))
    music.playTone(988, music.beat(BeatFraction.Quarter))
    LED3.showColor(neopixel.hsl(300, 99, 5))
    music.playTone(988, music.beat(BeatFraction.Quarter))
    magicbit.Servospeed(magicbit.Servos.S1, 100, 130, 10)
    magicbit.Servospeed(magicbit.Servos.S1, 130, 100, 10)
    strip.clear()
    strip.show()
}
input.onButtonPressed(Button.B, function () {
    Fire()
})
let angle = 0
let скорость = 0
let LED3: neopixel.Strip = null
let LED2: neopixel.Strip = null
let LED1: neopixel.Strip = null
let LED0: neopixel.Strip = null
let strip: neopixel.Strip = null
let IrCodes: any = {
    69: "A",
    70: "B",
    71: "C",
    68: "D",
    67: "+",
    13: "-",
    64: "UP",
    7: "LEFT",
    9: "RIGHT",
    25: "DOWN",
    21: "OK",
    22: "0",
    12: "1",
    24: "2",
    94: "3",
    8: "4",
    28: "5",
    90: "6",
    66: "7",
    82: "8",
    74: "9",
}
strip = neopixel.create(DigitalPin.P16, 4, NeoPixelMode.RGB)
strip.clear()
strip.show()
LED0 = strip.range(0, 1)
LED1 = strip.range(1, 1)
LED2 = strip.range(2, 1)
LED3 = strip.range(3, 1)
EM_IR.IrRemote_init(IrPins.P1)
basic.showLeds(`
    # # . # #
    # # . # #
    . . . . .
    # # # # #
    # # # # #
    `)
music.setVolume(70)
basic.forever(function () {
    magicbit.MotorRun(magicbit.Motors.M1, 0 - скорость)
})
basic.forever(function () {
    magicbit.MotorRun(magicbit.Motors.M2, скорость)
})
basic.forever(function () {
    magicbit.Servo(magicbit.Servos.S1, angle)
})
