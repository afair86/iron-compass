import test from 'node:test';
import assert from 'node:assert/strict';
import { audioPlaybackError } from '../lib/audioPlayback.ts';

test('Audio failures distinguish playback permission from unavailable media',()=>{
 assert.match(audioPlaybackError(new DOMException('Blocked fixture','NotAllowedError')),/browsers sometimes block/);
 for(const name of ['NotSupportedError','NetworkError','EncodingError']) {
  const message=audioPlaybackError(new DOMException('Private fixture URL must not appear',name));
  assert.match(message,/Audio could not load/);
  assert(!message.includes('Private fixture'));
 }
});
test('Intentional playback interruption stays quiet and unknown failures stay safe',()=>{
 assert.equal(audioPlaybackError(new DOMException('Pause fixture','AbortError')),null);
 for(const value of [null,undefined,'<script>fixture</script>',{},new Error('Private fixture URL')]) {
  assert.equal(audioPlaybackError(value),'Audio could not load. Refresh and try again.');
 }
});
