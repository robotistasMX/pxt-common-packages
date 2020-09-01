/*
 * 
 *
 * Based in the work of pxt-escornabot - https://github.com/ElectronicCats/pxt-escorna/blob/master
 * and https://github.com/chevyng/pxt-ucl-junkrobot
 * 
 *  by Gerardo Franco @ RobotistasMX and Andres Sabas @ Electronic Cats
 *
 * This library is free software; you can redistribute it and/or
 * modify it under the terms of the GNU Lesser General Public
 * License as published by the Free Software Foundation; either
 * version 2.1 of the License, or (at your option) any later version.
 *
 * This library is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 * Lesser General Public License for more details.
 */


/**
 * Botmx movements package
 */
//% weight=100
namespace botmx {

    export class Motor {

        private input1: DigitalInOutPin;
        private input2: DigitalInOutPin;
        private pwm: PwmPin;

        setPins(in1: DigitalInOutPin, in2: DigitalInOutPin, speed: PwmPin): void {
            // send pulse
            this.input1 = in1;
            this.input2 = in2;
            this.pwm = speed;
        }

        moveMotorForward(speed: number): void{
            this.input1.digitalWrite(true);
            this.input2.digitalWrite(false);
            this.pwm.analogWrite(speed);
        }

        moveMotorBackward(speed: number): void{
            this.input1.digitalWrite(false);
            this.input2.digitalWrite(true);
            this.pwm.analogWrite(speed);
        }

        stopMotor(): void{
            this.input1.digitalWrite(false);
            this.input2.digitalWrite(false);
        }

    }

    export class Robot {
        private motorL: Motor;
        private motorR: Motor;

        setMotors(motorL: Motor, motorR: Motor): void {
            this.motorL = motorL;
            this.motorR = motorR;
        }

        //% blockId=move_forward block="%this|move %speed forward"
        //% weight=81
        //% group="Positional"
        moveForward(speed: number): void {
            this.motorR.moveMotorForward(speed);
            this.motorL.moveMotorForward(speed);
        }

        //% blockId=move_backward block="%this|move %speed backward"
        //% weight=80
        //% group="Positional"
        moveBackward(speed: number): void {
            this.motorR.moveMotorBackward(speed);
            this.motorL.moveMotorBackward(speed);
        }

        //% blockId=turn_left block="%this| move %speed turnLeft"
        //% weight=71
        //% group="Positional"
        turnLeft(speed: number): void {
            this.motorR.moveMotorForward(speed);
            this.motorL.moveMotorBackward(speed);
        }

        //% blockId=turn_right block="%this| move %speed turnRight"
        //% weight=71
        //% group="Positional"
        turnRight(speed: number): void {
            this.motorR.moveMotorBackward(speed);
            this.motorL.moveMotorForward(speed);
        }

        //% blockId=forward_motor_r block="%this| move %speed forwardMotorR"
        //% weight=71
        //% group="Positional"
        forwardMotorR(speed: number): void {
            this.motorR.moveMotorForward(speed);
            this.motorL.stopMotor();
        }

        //% blockId=backward_motor_r block="%this| move %speed backwardMotorR"
        //% weight=71
        //% group="Positional"
        backwardMotorR(speed: number): void {
            this.motorR.moveMotorBackward(speed);
            this.motorL.stopMotor();
        }

        //% blockId=forward_motor_l block="%this| move %speed forwardMotorL"
        //% weight=71
        //% group="Positional"
        forwardMotorL(speed: number): void {
            this.motorL.moveMotorForward(speed);
            this.motorR.stopMotor();
        }

        //% blockId=backward_motor_l block="%this| move %speed backwardMotorL"
        //% weight=71
        //% group="Positional"
        backwardMotorL(speed: number): void {
            this.motorL.moveMotorBackward(speed);
            this.motorR.stopMotor();
        }

    }

    //% blockId=create_moto block="set pin1 %input1|set pin2 %input2|set pin3 %speed"
    //% weight=99
    //% group="Configuration"
    export function createMotor(input1: DigitalInOutPin, input2: DigitalInOutPin, speed: PwmPin)
        : Motor {
        let motor = new Motor();
        motor.setPins(input1, input2, speed);
        return motor;
    }

    //% blockId=create_robot block="set left motor %motor1|set right motor %motorR"
    //% weight=100
    //% group="Configuration"
    export function createBotMX(motorL: Motor, motorR: Motor): Robot {
        let robot = new Robot();
        robot.setMotors(motorL, motorR);
        return robot;
    }

}