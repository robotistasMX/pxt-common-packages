#include "pxt.h"

#include "dmac.h"
#include "SAMD21DAC.h"
#include "Synthesizer.h"
#include "DeviceConfig.h"

#define NOTE_PAUSE 20
class WSynthesizer {
  public:
    Synthesizer synth;
    SAMD21DAC dac;

    WSynthesizer()
        : dac(*getPin(PIN_SPEAKER), pxt::getWDMAC()->dmac, synth.output) {
        synth.setSampleRate(dac.getSampleRate());
        synth.setVolume(64);
    }
};
SINGLETON(WSynthesizer);

enum class SoundOutputDestination {
    //% block="pin"
    Pin = 1,
    //% block="speaker"
    Speaker = 0,
};

namespace music {

ManagedBuffer tone; // empty buffer to hold custom tone
SoundOutputDestination soundOutputDestination = SoundOutputDestination::Speaker;

// turns on/off the speaker amp
void updateSpeakerAmp() {
    // turn off speaker as needed
    //auto pinAmp = lookupPin(PIN_SPEAKER_AMP);
    //if (pinAmp) {
    //    bool on = SoundOutputDestination::Speaker == soundOutputDestination;
    //    pinAmp->setDigitalValue(on ? 1 : 0);
    //}
}

/**
* Set a source of digital sound data (PCM) for making tones.
* Samples are 1020 x 10bit unsigned PCM.
* A reference to the buffer is kept to avoid the memory overhead, so changes to the buffer
* values are reflected immediately to the sound output. 
*/
//% help=music/set-tone
//% weight=1 advanced=true
//% blockId=music_set_tone block="set tone %buffer"
void setTone(Buffer buffer) {
    if (!buffer) return;

    ManagedBuffer buf(buffer);
    if (buf.length() != TONE_WIDTH * sizeof(uint16_t))
        return; // invalid length

    tone = buf; // keep a reference to the buffer

    auto synth = &getWSynthesizer()->synth;
    synth->setTone((const uint16_t*)tone.getBytes());
}

/**
* Turn the on-board speaker on or off.
* @param out the destination for sounds generated by the synthesizer
*/
// weight=2
// blockId=music_set_output block="set output %out"
// parts="speaker" blockGap=8 advanced=true
void setOutput(SoundOutputDestination out) {
    if (out != soundOutputDestination) {
        soundOutputDestination = out;
        updateSpeakerAmp();
    }    
}

/**
* Set the output volume of the sound synthesizer.
* @param volume the volume 0...256, eg: 128
*/
//% weight=96
//% blockId=synth_set_volume block="set volume %volume"
//% parts="speaker" blockGap=8
//% volume.min=0 volume.max=256
//% help=music/set-volume
//% weight=1
void setVolume(int volume) {
    auto synth = &getWSynthesizer()->synth;
    synth->setVolume(max(0, min(1024, volume * 4)));
}

/**
* Play a tone through the speaker for some amount of time.
* @param frequency pitch of the tone to play in Hertz (Hz)
* @param ms tone duration in milliseconds (ms)
*/
//% help=music/play-tone weight=90
//% blockId=music_play_note block="play tone|at %note=device_note|for %duration=device_beat"
//% parts="headphone" async
//% blockNamespace=music
void playTone(int frequency, int ms) {
    auto synth = &getWSynthesizer()->synth;
    
    if (frequency <= 0) {
        synth->setFrequency(0, max(1, ms));
    } else {
        if (ms > 0) {
            int d = max(1, ms - NOTE_PAUSE); // allow for short rest
            int r = max(1, ms - d);
            synth->setFrequency((float) frequency, d);
            synth->setFrequency(0, r);
        } else {
            // ring
            synth->setFrequency((float) frequency);                
        }
    }
    fiber_sleep(1);
}

}