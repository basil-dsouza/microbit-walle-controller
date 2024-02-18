function SendCommand (command: string) {
    if (lastCommand != command) {
        radio.setGroup(radioGroup)
        radio.sendString(command)
        serial.writeLine(command)
        lastCommand = command
        if (command == "F") {
            basic.showArrow(ArrowNames.North)
        } else if (command == "R") {
            basic.showArrow(ArrowNames.South)
        } else if (command == "CW") {
            basic.showArrow(ArrowNames.NorthEast)
        } else if (command == "CCW") {
            basic.showArrow(ArrowNames.NorthWest)
        } else if (command == "TL") {
            basic.showArrow(ArrowNames.West)
        } else if (command == "TR") {
            basic.showArrow(ArrowNames.East)
        } else if (command == "S") {
            basic.showIcon(IconNames.Chessboard)
        } else if (command == "ST") {
            basic.showIcon(IconNames.No)
        } else if (command == "SS") {
            basic.showIcon(IconNames.SmallDiamond)
        } else if (command == "SF") {
            basic.showIcon(IconNames.Diamond)
        }
    }
}
let yAxis = 0
let xAxis = 0
let radioGroup = 0
let lastCommand = ""
let prev_display_direction = ""
lastCommand = ""
let axisOrigin = 512
radioGroup = 0
radio.setGroup(radioGroup)
serial.redirectToUSB()
pins.setPull(DigitalPin.P8, PinPullMode.PullNone)
pins.setPull(DigitalPin.P15, PinPullMode.PullNone)
pins.setPull(DigitalPin.P13, PinPullMode.PullNone)
basic.forever(function () {
    if (pins.digitalReadPin(DigitalPin.P8) == 0) {
        SendCommand("ST")
    } else if (pins.digitalReadPin(DigitalPin.P15) == 0) {
        SendCommand("SF")
    } else if (pins.digitalReadPin(DigitalPin.P13) == 0) {
        SendCommand("SL")
    }
    if (input.buttonIsPressed(Button.A)) {
        SendCommand("TL")
    } else if (input.buttonIsPressed(Button.B)) {
        SendCommand("TR")
    } else {
        xAxis = pins.analogReadPin(AnalogPin.P1) - axisOrigin
        yAxis = pins.analogReadPin(AnalogPin.P2) - axisOrigin
        if (yAxis > 100) {
            SendCommand("F")
        } else if (yAxis < -100) {
            SendCommand("R")
        } else if (xAxis < -100) {
            SendCommand("CCW")
        } else if (xAxis > 100) {
            SendCommand("CW")
        } else if (pins.digitalReadPin(DigitalPin.P14) == 0) {
            SendCommand("\"HO\"")
        } else {
            SendCommand("S")
        }
    }
})
