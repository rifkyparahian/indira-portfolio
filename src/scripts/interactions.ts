/**
 * Interaksi: puzzle drag (SortableJS), sticker drag,
 * polaroid compcard drag + bring-to-front, tab switcher.
 */
import Sortable from 'sortablejs';

/* ============ 1. DRAG & DROP PUZZLE (SORTABLE JS) ============ */
const puzzleGrid = document.getElementById('puzzle-grid');
if (puzzleGrid) {
  new Sortable(puzzleGrid as HTMLElement, {
    animation: 250,
    ghostClass: 'opacity-30',
    chosenClass: 'scale-95',
    dragClass: 'shadow-2xl',
    delay: 50,
    delayOnTouchOnly: true,
  });
}

/* ============ 2. FLOATING STICKERS DRAG (DESKTOP) ============ */
function makeDraggable(el: HTMLElement | null) {
  if (!el) return;
  let isDragging = false;
  let offsetX = 0;
  let offsetY = 0;

  el.addEventListener('mousedown', (e) => {
    isDragging = true;
    offsetX = e.clientX - el.getBoundingClientRect().left;
    offsetY = e.clientY - el.getBoundingClientRect().top;
  });

  document.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    el.style.left = `${e.clientX - offsetX}px`;
    el.style.top = `${e.clientY - offsetY}px`;
  });

  document.addEventListener('mouseup', () => {
    isDragging = false;
  });
}

makeDraggable(document.getElementById('sticker1'));
makeDraggable(document.getElementById('sticker2'));

/* ============ 3. COMPCARD POLAROID DRAG & BRING-TO-FRONT ============ */
const polaroids = document.querySelectorAll<HTMLElement>('.drag-polaroid');
let highestZ = 40;

polaroids.forEach((card) => {
  let isDragging = false;
  let startX = 0;
  let startY = 0;
  let initialLeft = 0;
  let initialTop = 0;

  function startDrag(e: MouseEvent | TouchEvent) {
    isDragging = true;
    highestZ += 1;
    card.style.zIndex = String(highestZ); // selalu di lapisan teratas

    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

    startX = clientX;
    startY = clientY;
    initialLeft = card.offsetLeft;
    initialTop = card.offsetTop;

    // Hapus bottom/right bawaan agar kartu tidak melar saat digeser
    card.style.bottom = 'auto';
    card.style.right = 'auto';
    card.style.left = `${initialLeft}px`;
    card.style.top = `${initialTop}px`;
  }

  function onDrag(e: MouseEvent | TouchEvent) {
    if (!isDragging) return;
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

    const dx = clientX - startX;
    const dy = clientY - startY;

    card.style.left = `${initialLeft + dx}px`;
    card.style.top = `${initialTop + dy}px`;
  }

  function stopDrag() {
    isDragging = false;
  }

  // Mouse
  card.addEventListener('mousedown', startDrag);
  window.addEventListener('mousemove', onDrag);
  window.addEventListener('mouseup', stopDrag);

  // Touch (HP / Tablet)
  card.addEventListener('touchstart', startDrag, { passive: true });
  window.addEventListener('touchmove', onDrag, { passive: true });
  window.addEventListener('touchend', stopDrag);
});

/* ============ 4. PORTFOLIO TAB SWITCHER (DESIGN <-> MODELING) ============ */
function togglePortfolio(tab: 'design' | 'model') {
  const viewDesign = document.getElementById('view-design');
  const viewModel = document.getElementById('view-model');
  const btnDesign = document.getElementById('tab-btn-design');
  const btnModel = document.getElementById('tab-btn-model');
  if (!viewDesign || !viewModel || !btnDesign || !btnModel) return;

  const activeClass =
    'px-4 py-2 rounded-xl font-mono text-xs md:text-sm font-bold bg-yellow-300 border-2 border-black shadow-[2px_2px_0px_#000] transition-all';
  const inactiveClass =
    'px-4 py-2 rounded-xl font-mono text-xs md:text-sm font-bold bg-transparent text-gray-700 hover:text-black transition-all';

  if (tab === 'design') {
    viewDesign.classList.remove('hidden');
    viewModel.classList.add('hidden');
    btnDesign.className = activeClass;
    btnModel.className = inactiveClass;
  } else {
    viewDesign.classList.add('hidden');
    viewModel.classList.remove('hidden');
    btnModel.className = activeClass;
    btnDesign.className = inactiveClass;
  }
}

document.getElementById('tab-btn-design')?.addEventListener('click', () => togglePortfolio('design'));
document.getElementById('tab-btn-model')?.addEventListener('click', () => togglePortfolio('model'));
