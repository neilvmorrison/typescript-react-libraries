# useKeyboardShortcut

Registers a keyboard shortcut with optional modifiers (ctrl, shift, alt, meta) and automatic cleanup.

## Usage

```typescript
import { useKeyboardShortcut } from '@your-org/hooks';

function Editor() {
  useKeyboardShortcut({
    key: 's',
    modifiers: ['ctrl'],
    onPress: () => {
      saveDocument();
    },
  });

  return <div>Press Ctrl+S to save</div>;
}
```

## Parameters

- `options` (IUseKeyboardShortcutOptions) - Configuration object
  - `key` (string) - The key to listen for (case insensitive)
  - `modifiers` (KeyModifier[]) - Optional array of modifiers: 'ctrl', 'shift', 'alt', 'meta'
  - `onPress` (() => void) - Callback function to execute when shortcut is pressed
  - `preventDefault` (boolean) - Whether to prevent default browser behavior. Defaults to `true`

## Returns

- void

## Description

Sets up a keyboard event listener that triggers a callback when the specified key combination is pressed. Automatically handles cleanup when the component unmounts. The 'ctrl' modifier works with both Ctrl (Windows/Linux) and Cmd (Mac) keys.

## Examples

### Save shortcut (Ctrl/Cmd + S)

```typescript
function DocumentEditor() {
  const [content, setContent] = useState('');

  useKeyboardShortcut({
    key: 's',
    modifiers: ['ctrl'],
    onPress: () => {
      saveDocument(content);
      console.log('Document saved!');
    },
  });

  return (
    <textarea
      value={content}
      onChange={(e) => setContent(e.target.value)}
      placeholder="Start typing... (Ctrl/Cmd+S to save)"
    />
  );
}
```

### Search with Ctrl/Cmd + K

```typescript
function App() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useKeyboardShortcut({
    key: 'k',
    modifiers: ['ctrl'],
    onPress: () => {
      setIsSearchOpen(true);
    },
  });

  return (
    <>
      <div>Press Ctrl/Cmd+K to open search</div>
      {isSearchOpen && (
        <SearchModal onClose={() => setIsSearchOpen(false)} />
      )}
    </>
  );
}
```

### Escape to close modal

```typescript
function Modal({ onClose }: { onClose: () => void }) {
  useKeyboardShortcut({
    key: 'Escape',
    onPress: onClose,
  });

  return (
    <div className="modal">
      <p>Press Escape to close</p>
      <button onClick={onClose}>Close</button>
    </div>
  );
}
```

### Multiple modifiers

```typescript
function AdvancedEditor() {
  useKeyboardShortcut({
    key: 'z',
    modifiers: ['ctrl', 'shift'],
    onPress: () => {
      redo();
    },
  });

  useKeyboardShortcut({
    key: 'z',
    modifiers: ['ctrl'],
    onPress: () => {
      undo();
    },
  });

  return <div>Ctrl+Z to undo, Ctrl+Shift+Z to redo</div>;
}
```

### Without preventing default

```typescript
function TabNavigator() {
  useKeyboardShortcut({
    key: 'Tab',
    onPress: () => {
      console.log('Tab pressed');
      // Custom tab handling
    },
    preventDefault: false, // Allow default tab behavior
  });

  return <div>Tab navigation with custom logging</div>;
}
```

### Alt shortcuts

```typescript
function Toolbar() {
  useKeyboardShortcut({
    key: 'b',
    modifiers: ['alt'],
    onPress: () => {
      toggleBold();
    },
  });

  useKeyboardShortcut({
    key: 'i',
    modifiers: ['alt'],
    onPress: () => {
      toggleItalic();
    },
  });

  return (
    <div>
      <button>Alt+B for Bold</button>
      <button>Alt+I for Italic</button>
    </div>
  );
}
```

### Global shortcuts

```typescript
function GlobalShortcuts() {
  useKeyboardShortcut({
    key: 'n',
    modifiers: ['ctrl'],
    onPress: () => {
      createNewDocument();
    },
  });

  useKeyboardShortcut({
    key: 'o',
    modifiers: ['ctrl'],
    onPress: () => {
      openDocument();
    },
  });

  useKeyboardShortcut({
    key: 'p',
    modifiers: ['ctrl'],
    onPress: () => {
      printDocument();
    },
  });

  return <div>Standard document shortcuts enabled</div>;
}
```

### Shift + Key

```typescript
function SelectionHandler() {
  useKeyboardShortcut({
    key: 'a',
    modifiers: ['ctrl', 'shift'],
    onPress: () => {
      selectAll();
    },
  });

  useKeyboardShortcut({
    key: 'd',
    modifiers: ['ctrl', 'shift'],
    onPress: () => {
      deselectAll();
    },
  });

  return <div>Ctrl+Shift+A to select all</div>;
}
```

### Navigation shortcuts

```typescript
function Gallery() {
  const [currentImage, setCurrentImage] = useState(0);

  useKeyboardShortcut({
    key: 'ArrowLeft',
    onPress: () => {
      setCurrentImage((prev) => Math.max(0, prev - 1));
    },
  });

  useKeyboardShortcut({
    key: 'ArrowRight',
    onPress: () => {
      setCurrentImage((prev) => Math.min(images.length - 1, prev + 1));
    },
  });

  return <div>Use arrow keys to navigate</div>;
}
```

### Help shortcut

```typescript
function App() {
  const [showHelp, setShowHelp] = useState(false);

  useKeyboardShortcut({
    key: '?',
    modifiers: ['shift'],
    onPress: () => {
      setShowHelp((prev) => !prev);
    },
  });

  return (
    <>
      <div>Press ? to toggle help</div>
      {showHelp && <HelpPanel />}
    </>
  );
}
```

## Common Use Cases

- Save functionality (Ctrl/Cmd + S)
- Search modal (Ctrl/Cmd + K)
- Undo/Redo (Ctrl/Cmd + Z)
- Close modals (Escape)
- Navigation (Arrow keys)
- Text formatting (Alt/Ctrl + B, I, U)
- Copy/Paste custom behavior
- Quick actions and commands
- Accessibility shortcuts

## Features

- **Cross-platform** - 'ctrl' modifier works with both Ctrl (Windows/Linux) and Cmd (Mac)
- **Case insensitive** - Key matching is case insensitive
- **Multiple modifiers** - Support for ctrl, shift, alt, and meta modifiers
- **Auto cleanup** - Event listeners are automatically removed on unmount
- **Prevent default** - Option to prevent default browser behavior
- **Type-safe** - Full TypeScript support

## Notes

- The 'ctrl' modifier maps to Cmd on Mac and Ctrl on Windows/Linux
- Use 'meta' modifier if you specifically want the Cmd/Windows key
- Keys are case insensitive ('s' matches both 's' and 'S')
- Special keys like 'Escape', 'Enter', 'Tab', 'ArrowLeft', etc. are supported
- Shortcuts work globally within the window where the component is mounted
