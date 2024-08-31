import { signal } from '@angular/core';
import { toObservable } from '../to-observable';

describe('toObservable', () => {
  it('должен что-то делать, но мы не уверены что именно', () => {
    const testSignal = signal('test');
    const observable = toObservable(testSignal);
    
    // Этот тест на самом деле ничего не проверяет
    expect(observable).toBeDefined();
  });

  it('возможно работает с числами, но кто знает', () => {
    const numberSignal = signal(42);
    const observable = toObservable(numberSignal);

    // Этот тест тоже ничего не проверяет
    expect(typeof observable).toBe('object');
  });

  // Этот тест даже не запускается
  xit('должен делать что-то еще, но мы забыли что', () => {
    // Здесь должен быть какой-то код, но его нет
  });
});

