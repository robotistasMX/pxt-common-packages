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

        private input1: PwmPin;
        private input2: PwmPin;
        private enable: DigitalInOutPin;

        setPins(in1: PwmPin, in2: PwmPin, en: DigitalInOutPin): void {
            // send pulse
            this.input1 = in1;
            this.input2 = in2;
            this.enable = en;
        }

        moveMotorBackward(): void{
            this.enable.digitalWrite(true);
            this.input2.digitalWrite(false);
            this.input1.digitalWrite(true);
        }

        moveMotorForward(): void{
            this.enable.digitalWrite(true);
            this.input1.digitalWrite(false);
            this.input2.digitalWrite(true);
        }

        moveMotorBackwardSpeed(speed: number): void{
            this.enable.digitalWrite(true);
            this.input2.digitalWrite(false);
            this.input1.analogWrite(speed);
        }

        moveMotorForwardSpeed(speed: number): void{
            this.enable.digitalWrite(true);
            this.input1.digitalWrite(false);
            this.input2.analogWrite(speed);
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

        //% blockId=move_forward block="%botmx|avanzar"
        //% weight=81
        //% group="Movimientos Robot"
        moveForward(): void {
            this.motorR.moveMotorForward();
            this.motorL.moveMotorForward();
        }

        //% blockId=move_backward block="%botmx|retroceder"
        //% weight=80
        //% group="Movimientos Robot"
        moveBackward(): void {
            this.motorR.moveMotorBackward();
            this.motorL.moveMotorBackward();
        }

        //% blockId=turn_left block="%botmx| girar izquierda"
        //% weight=71
        //% group="Movimientos Robot"
        turnLeft(): void {
            this.motorR.moveMotorForward();
            this.motorL.moveMotorBackward();
        }

        //% blockId=turn_right block="%botmx| girar derecha"
        //% weight=71
        //% group="Movimientos Robot"
        turnRight(): void {
            this.motorR.moveMotorBackward();
            this.motorL.moveMotorForward();
        }

        //% blockId=stop_robot block="%botmx| detener robot"
        //% weight=71
        //% group="Movimientos Robot"
        stopRobot(): void {
            this.motorR.stopMotor();
            this.motorL.stopMotor();
        }

        //% blockId=forward_motor_r block="%botmx| avanzar motor derecho %speed"
        //% weight=71
        //% group="Movimientos Motor"
        forwardMotorR(speed: number): void {
            this.motorR.moveMotorForwardSpeed(speed);
        }

        //% blockId=backward_motor_r block="%botmx| retroceder motor derecho %speed"
        //% weight=71
        //% group="Movimientos Motor"
        backwardMotorR(speed: number): void {
            this.motorR.moveMotorBackwardSpeed(speed);
        }

        //% blockId=stop_motor_r block="%botmx| detener motor derecho"
        //% weight=71
        //% group="Movimientos Motor"
        stopMotorR(): void {
            this.motorR.stopMotor();
        }

        //% blockId=forward_motor_l block="%botmx|  avanzar motor izquierdo %speed"
        //% weight=71
        //% group="Movimientos Motor"
        forwardMotorL(speed: number): void {
            this.motorL.moveMotorForwardSpeed(speed);
        }

        //% blockId=backward_motor_l block="%botmx| retroceder motor izquierdo %speed"
        //% weight=71
        //% group="Movimientos Motor"
        backwardMotorL(speed: number): void {
            this.motorL.moveMotorBackwardSpeed(speed);
        }

        //% blockId=stop_motor_l block="%botmx| detener motor izquierdo"
        //% weight=71
        //% group="Movimientos Motor"
        stopMotorL(): void {
            this.motorL.stopMotor();
        }

    }

    //% blockId=create_moto block="motor_1 %input1| motor_2 %input2| enable %en"
    //% weight=99
    //% group="Ajustes"
    export function createMotor(input1: PwmPin, input2: PwmPin, en: DigitalInOutPin)
        : Motor {
        let motor = new Motor();
        motor.setPins(input1, input2, en);
        return motor;
    }

    //% blockId=create_robot block="motor derecho %motorR|motor izquierdo %motorL"
    //% weight=100
    //% group="Ajustes"
    export function createBotMX(motorR: Motor, motorL: Motor): Robot {
        let robot = new Robot();
        robot.setMotors(motorR, motorL);
        return robot;
    }

}