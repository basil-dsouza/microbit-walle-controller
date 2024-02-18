def SendCommand(command: str):
    global lastCommand
    if lastCommand != command:
        radio.set_group(radioGroup)
        radio.send_string(command)
        serial.write_line(command)
        lastCommand = command
        if command == "F":
            basic.show_arrow(ArrowNames.NORTH)
        elif command == "R":
            basic.show_arrow(ArrowNames.SOUTH)
        elif command == "CW":
            basic.show_arrow(ArrowNames.NORTH_EAST)
        elif command == "CCW":
            basic.show_arrow(ArrowNames.NORTH_WEST)
        elif command == "TL":
            basic.show_arrow(ArrowNames.WEST)
        elif command == "TR":
            basic.show_arrow(ArrowNames.EAST)
        elif command == "S":
            basic.show_icon(IconNames.CHESSBOARD)
        elif command == "ST":
            basic.show_icon(IconNames.NO)
        elif command == "SS":
            basic.show_icon(IconNames.SMALL_DIAMOND)
        elif command == "SF":
            basic.show_icon(IconNames.DIAMOND)
yAxis = 0
xAxis = 0
radioGroup = 0
lastCommand = ""
prev_display_direction = ""
lastCommand = ""
axisOrigin = 512
radioGroup = 0
radio.set_group(radioGroup)
serial.redirect_to_usb()
pins.set_pull(DigitalPin.P8, PinPullMode.PULL_NONE)
pins.set_pull(DigitalPin.P15, PinPullMode.PULL_NONE)
pins.set_pull(DigitalPin.P13, PinPullMode.PULL_NONE)

def on_forever():
    global xAxis, yAxis
    if pins.digital_read_pin(DigitalPin.P8) == 0:
        SendCommand("ST")
    elif pins.digital_read_pin(DigitalPin.P15) == 0:
        SendCommand("SF")
    elif pins.digital_read_pin(DigitalPin.P13) == 0:
        SendCommand("SL")
    if input.button_is_pressed(Button.A):
        SendCommand("TL")
    elif input.button_is_pressed(Button.B):
        SendCommand("TR")
    else:
        xAxis = pins.analog_read_pin(AnalogPin.P1) - axisOrigin
        yAxis = pins.analog_read_pin(AnalogPin.P2) - axisOrigin
        if yAxis > 100:
            SendCommand("F")
        elif yAxis < -100:
            SendCommand("R")
        elif xAxis < -100:
            SendCommand("CCW")
        elif xAxis > 100:
            SendCommand("CW")
        else:
            SendCommand("S")
basic.forever(on_forever)
