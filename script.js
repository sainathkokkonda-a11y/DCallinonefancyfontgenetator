let currentCategory = 'all';

function switchTab(category, element) {
  currentCategory = category;
  document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
  element.classList.add('active');
  renderFonts();
}

function renderFonts() {
  const input = document.getElementById('userInput').value;
  const container = document.getElementById('fontResults');

  if (!input.trim()) {
    container.innerHTML = '<div style="color: #65676b; font-size: 14px; text-align: center; padding: 20px;">Start typing above to see styles...</div>';
    return;
  }

  const allStyles = [
    // Reverse & Flip Category
    { cat: "reverse", name: "Upside Down (Flipped)", text: flipText(input) },
    { cat: "reverse", name: "Backwards (Reverse Order)", text: input.split('').reverse().join('') },

    // Pure Unicode Fonts (Without Emojis)
    { cat: "fonts", name: "Small Capital Letters", text: transformSmallCaps(input) },
    { cat: "fonts", name: "Bold Script", text: transformUnicode(input, 0x1D4D0, 0x1D4EA, 0x1D7CE) },
    { cat: "fonts", name: "Double Struck (Outline)", text: transformUnicode(input, 0x1D538, 0x1D552, 0x1D7D8) },
    { cat: "fonts", name: "Gothic / Fraktur", text: transformUnicode(input, 0x1D56C, 0x1D586, 0x1D7CE) },
    { cat: "fonts", name: "Circled Letters (Bubbles)", text: transformCircles(input) },
    { cat: "fonts", name: "Squared Letters", text: transformSquares(input) },
    { cat: "fonts", name: "Monospace / Typewriter", text: transformUnicode(input, 0x1D670, 0x1D68A, 0x1D7F6) },
    { cat: "fonts", name: "Sans-Serif Bold", text: transformUnicode(input, 0x1D5A0, 0x1D5BA, 0x1D7E2) },
    { cat: "fonts", name: "Italic Serif", text: transformUnicode(input, 0x1D434, 0x1D44E, 0x1D7CE) },
    { cat: "fonts", name: "Full Width / Wide", text: transformFullWidth(input) }
  ];

  const filtered = currentCategory === 'all' 
    ? allStyles 
    : allStyles.filter(item => item.cat === currentCategory);

  container.innerHTML = filtered.map((item, idx) => `
    <div class="font-item">
      <div class="font-meta">
        <span class="font-style-name">${item.name}</span>
        <span class="font-text" id="font-${idx}">${item.text}</span>
      </div>
      <button class="copy-btn" onclick="copyFont('font-${idx}')">Copy</button>
    </div>
  `).join('');
}

// Flip Text (Upside Down Mapping)
function flipText(text) {
  const flipMap = {
    'a': 'ɐ', 'b': 'q', 'c': 'ɔ', 'd': 'p', 'e': 'ǝ', 'f': 'ɟ', 'g': 'ƃ', 'h': 'ɥ', 'i': 'ı', 'j': 'ɾ', 
    'k': 'ʞ', 'l': 'l', 'm': 'ɯ', 'n': 'u', 'o': 'o', 'p': 'd', 'q': 'b', 'r': 'ɹ', 's': 's', 't': 'ʇ', 
    'u': 'n', 'v': 'ʌ', 'w': 'ʍ', 'x': 'x', 'y': 'ʎ', 'z': 'z',
    'A': '∀', 'B': 'q', 'C': 'Ɔ', 'D': 'p', 'E': 'Ǝ', 'F': 'Ⅎ', 'G': 'פ', 'H': 'H', 'I': 'I', 'J': 'ſ', 
    'K': 'ʞ', 'L': '˥', 'M': 'W', 'N': 'N', 'O': 'O', 'P': 'Ԁ', 'Q': 'Ό', 'R': 'y', 'S': 'S', 'T': '⊥', 
    'U': '∩', 'V': 'Λ', 'W': 'M', 'X': 'X', 'Y': '⅄', 'Z': 'Z',
    '0': '0', '1': 'Ɩ', '2': '乙', '3': 'Ɛ', '4': 'ㄣ', '5': 'ϛ', '6': '9', '7': 'ㄥ', '8': '8', '9': '6',
    '.': '˙', ',': '\'', '\'': ',', '"': ',,', '?': '¿', '!': '¡', '[': ']', ']': '[', '(': ')', ')': '(', '{': '}', '}': '{', '<': '>', '>': '<', '_': '‾'
  };
  return text.split('').map(char => flipMap[char] || char).reverse().join('');
}

// Small Caps Mapping
function transformSmallCaps(text) {
  const smallCapsMap = {
    'a': 'ᴀ', 'b': 'ʙ', 'c': 'ᴄ', 'd': 'ᴅ', 'e': 'ᴇ', 'f': 'ғ', 'g': 'ɢ', 'h': 'ʜ', 'i': 'ɪ', 'j': 'ᴊ',
    'k': 'ᴋ', 'l': 'ʟ', 'm': 'ᴍ', 'n': 'ɴ', 'o': 'ᴏ', 'p': 'ᴘ', 'q': 'ǫ', 'r': 'ʀ', 's': 's', 't': 'ᴛ',
    'u': 'ᴜ', 'v': 'ᴠ', 'w': 'ᴡ', 'x': 'x', 'y': 'ʏ', 'z': 'ᴢ'
  };
  return text.split('').map(char => smallCapsMap[char] || char).join('');
}

function transformUnicode(text, upperStart, lowerStart, digitStart) {
  return text.split('').map(char => {
    const code = char.charCodeAt(0);
    if (code >= 65 && code <= 90) return String.fromCodePoint(upperStart + (code - 65));
    if (code >= 97 && code <= 122) return String.fromCodePoint(lowerStart + (code - 97));
    if (code >= 48 && code <= 57) return String.fromCodePoint(digitStart + (code - 48));
    return char;
  }).join('');
}

function transformCircles(text) {
  return text.split('').map(char => {
    const code = char.charCodeAt(0);
    if (code >= 65 && code <= 90) return String.fromCodePoint(0x24B6 + (code - 65));
    if (code >= 97 && code <= 122) return String.fromCodePoint(0x24D0 + (code - 97));
    return char;
  }).join('');
}

function transformSquares(text) {
  return text.split('').map(char => {
    const code = char.charCodeAt(0);
    if (code >= 65 && code <= 90) return String.fromCodePoint(0x1F170 + (code - 65));
    if (code >= 97 && code <= 122) return String.fromCodePoint(0x1F170 + (code - 97));
    return char;
  }).join('');
}

function transformFullWidth(text) {
  return text.split('').map(char => {
    const code = char.charCodeAt(0);
    if (code >= 33 && code <= 126) return String.fromCodePoint(0xFF01 + (code - 33));
    return char;
  }).join('');
}

async function copyFont(elementId) {
  const text = document.getElementById(elementId).innerText;
  try {
    await navigator.clipboard.writeText(text);
    showAlert();
  } catch (err) {
    alert('Failed to copy');
  }
}

function showAlert() {
  const msg = document.getElementById('alertMsg');
  msg.style.display = 'block';
  setTimeout(() => {
    msg.style.display = 'none';
  }, 2000);
}
