import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

export async function verifyCharacters(page) {
  const contract = JSON.parse(await readFile('../../specs/data/characters.v1.0.0.json', 'utf8'));
  const section = page.locator('section').filter({ has: page.getByRole('heading', { name: 'Characters', exact: true }) });
  const theme = page.getByRole('combobox', { name: 'Tema' });
  const figures = section.locator('figure svg');
  const colors = ['rgb(65, 88, 155)', 'rgb(245, 131, 66)', 'rgb(228, 229, 230)', 'rgb(214, 116, 61)'];
  for (const mode of ['Contable', 'Administrativo', 'Servicios', 'Personas']) {
    await theme.selectOption(mode);
    const actual = await figures.evaluateAll(([beni, navi]) => [
      getComputedStyle(beni.querySelector('[data-part="body"]')).fill,
      getComputedStyle(navi.querySelector('[data-part="body"]')).fill,
      getComputedStyle(beni.querySelector('[data-part="left-eye"]')).fill,
      getComputedStyle(navi.querySelector('[data-part="left-shadow"]')).fill,
    ]);
    assert.deepEqual(actual, colors);
  }
  assert.deepEqual(await figures.evaluateAll(nodes => nodes.map(node => node.getAttribute('aria-hidden'))), ['true', 'true']);
  await section.locator('summary').click();
  assert.equal(await section.getByRole('img').count(), 13);
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  const play = section.getByRole('button', { name: 'Reproducir animaciones' });
  await play.focus();
  await page.keyboard.press('Space');
  const cycles = [];
  for (const [i, set] of contract.sets.entries()) {
    const tests = await figures.nth(i).evaluate((svg, plan) => {
      const animations = svg.getAnimations({ subtree: true });
      animations.forEach(animation => animation.pause());
      const sample = node => [...node.querySelectorAll('path')].map(path => {
        const { transform, opacity, d } = getComputedStyle(path);
        return { transform, opacity: Number(opacity), d };
      });
      const seek = time => {
        animations.forEach(animation => { animation.currentTime = time; });
        return sample(svg);
      };
      const duration = plan.frames.reduce((total, row) => total + row.holdMs + row.transitionMs, 0);
      let elapsed = 0;
      const sameTransform = (actual, expected) => {
        const keys = ['a', 'b', 'c', 'd', 'e', 'f'];
        const a = actual === 'none' ? new DOMMatrix() : new DOMMatrix(actual);
        const b = expected === 'none' ? new DOMMatrix() : new DOMMatrix(expected);
        // CSSOM serializes the animated and static matrices separately.
        return keys.every(key => Math.abs(a[key] - b[key]) < 0.0002);
      };
      const equalPose = (animated, fixed) => animated.every((part, index) => {
        const original = fixed[index];
        if (part.opacity === 0 && original.opacity === 0) return true;
        return sameTransform(part.transform, original.transform) && part.d === original.d && part.opacity === original.opacity;
      });
      const controls = plan.frames.map(row => {
        const current = seek(elapsed + row.holdMs / 2);
        const fixed = svg.closest('section').querySelector(`details svg[data-character="${plan.key}"][data-frame="${row.frame}"]`);
        const expected = sample(fixed);
        elapsed += row.holdMs + row.transitionMs;
        return { frame: row.frame, matches: equalPose(current, expected),
          differences: current.map((layer, index) => {
            const original = expected[index];
            return { transform: layer.transform === original.transform ? null : [layer.transform, original.transform],
              path: layer.d === original.d ? null : [layer.d, original.d], opacity: [layer.opacity, original.opacity] };
          }).filter(layer => layer.transform || layer.path || layer.opacity[0] !== layer.opacity[1]) };
      });
      const initial = seek(0);
      const startTransition = plan.frames[0].holdMs;
      const midTransition = seek(startTransition + plan.frames[0].transitionMs / 2);
      const nextPose = seek(startTransition + plan.frames[0].transitionMs + plan.frames[1].holdMs / 2);
      return { controls, duration, observed: [...new Set(animations.map(a => a.effect.getTiming().duration))],
        changesWithinTransition: !equalPose(midTransition, initial) && !equalPose(midTransition, nextPose),
        repeats: equalPose(seek(duration + 10), initial) };
    }, set);
    assert.deepEqual(tests.observed, [tests.duration]);
    assert.deepEqual(tests.controls.filter(row => !row.matches), []);
    assert.ok(tests.repeats && tests.changesWithinTransition);
    cycles.push({ name: set.name, durationMs: tests.duration, poses: tests.controls.length });
  }
  await page.emulateMedia({ reducedMotion: 'reduce' });
  assert.deepEqual(await figures.evaluateAll(nodes => nodes.map(svg => svg.getAnimations({ subtree: true }).length)), [0, 0]);
  await section.getByRole('button', { name: 'Detener animaciones' }).click();
  assert.equal(await play.count(), 1);
  return { cycles, themes: 4, reducedMotion: 'static', keyboard: true };
}
