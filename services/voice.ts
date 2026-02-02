export class VoiceService {
  private synth: SpeechSynthesis;
  private voices: SpeechSynthesisVoice[] = [];
  private preferredVoice: SpeechSynthesisVoice | null = null;

  constructor() {
    this.synth = window.speechSynthesis;
    // Initial load
    this.updateVoices();
    
    // Listener for async loading
    if (typeof window !== 'undefined' && window.speechSynthesis) {
        window.speechSynthesis.onvoiceschanged = () => {
            this.updateVoices();
        };
    }
  }

  private updateVoices() {
      this.voices = this.synth.getVoices();
      // Try to find a premium/natural Indian voice
      // Priority: Google Hindi/English > Microsoft Ravi/Heera > Any IN > Default
      this.preferredVoice = this.voices.find(v => v.name.includes('Google') && (v.lang === 'en-IN' || v.lang === 'hi-IN'))
          || this.voices.find(v => (v.lang === 'en-IN' || v.lang === 'hi-IN'))
          || this.voices[0];
  }

  public getVoices(): SpeechSynthesisVoice[] {
      return this.voices;
  }

  public setVoice(voiceName: string) {
      const found = this.voices.find(v => v.name === voiceName);
      if (found) this.preferredVoice = found;
  }

  public speak(text: string, lang: 'en' | 'hi' | 'auto' = 'auto', rate: number = 1.0, pitch: number = 1.0) {
      if (!text) return;
      
      // Stop previous
      this.stop();

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = rate;
      utterance.pitch = pitch;

      // Language Detection
      let targetLang = 'en-US';
      if (lang === 'auto') {
          // Check for Devanagari characters
          const isHindi = /[\u0900-\u097F]/.test(text);
          targetLang = isHindi ? 'hi-IN' : 'en-IN'; // Prefer Indian English by default
      } else {
          targetLang = lang === 'hi' ? 'hi-IN' : 'en-US';
      }
      
      utterance.lang = targetLang;

      // Select Voice
      // 1. If we have a preferred voice that MATCHES the target language, use it.
      // 2. Else, find a new best match for the language.
      let voiceToUse = this.preferredVoice;
      
      if (!voiceToUse || !voiceToUse.lang.startsWith(targetLang.split('-')[0])) {
          voiceToUse = this.voices.find(v => v.lang === targetLang && v.name.includes('Google')) 
              || this.voices.find(v => v.lang === targetLang)
              || this.voices.find(v => v.lang.startsWith(targetLang.split('-')[0])) 
              || null;
      }

      if (voiceToUse) {
          utterance.voice = voiceToUse;
      }

      this.synth.speak(utterance);
  }

  public stop() {
      if (this.synth.speaking || this.synth.pending) {
          this.synth.cancel();
      }
  }
}

export const voice = new VoiceService();
