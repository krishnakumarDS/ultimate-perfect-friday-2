
// Volume meter worklet - simplified for now
const VolMeterWorklet = `
class VolMeterProcessor extends AudioWorkletProcessor {
  process(inputs, outputs, parameters) {
    // Simplified volume calculation
    return true;
  }
}

registerProcessor('vol-meter', VolMeterProcessor);
`;

export default VolMeterWorklet;
