/*
 * BOTMX
 *
 * Based in the work of https://github.com/chevyng/pxt-ucl-junkrobot
 * and  pxt-escornabot - Escornabot Makech library for MakeCode - Version 0.0.1
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
 * 
 */
//% weight=100
namespace botmx {

    export class Motor {

        private input1: DigitalInOutPin;
        private input2: DigitalInOutPin;
        private input3: DigitalInOutPin;
        private input4: DigitalInOutPin;
        private pwmA: PwmPin;
        private pwmB: PwmPin;

        setPins(in1: DigitalInOutPin, in2: DigitalInOutPin, in3: DigitalInOutPin, in4: DigitalInOutPin): void {
            // send pulse
            this.input1 = in1;
            this.input2 = in2;
            this.input3 = in3;
            this.input4 = in4;
        }

        //% blockId=move_forward_A block="%motor| Avanzar motor A  %pwmA| forward"
        //% weight=81
        //% group="Positional"
        //% advanced=false
        moveForwardMotorA(pwmA: number): void {
            this.input1.digitalWrite(false);
            this.input2.digitalWrite(false);
            this.pwmA.analogWrite(pwmA);
        }

    }
}
