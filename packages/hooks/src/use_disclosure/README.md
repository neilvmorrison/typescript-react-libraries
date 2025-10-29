# useDisclosure

Manages the open/closed state of UI elements like modals, drawers, and popovers with simple open/close controls.

## Usage

```typescript
import { useDisclosure } from '@your-org/hooks';

function Modal() {
  const [value, { open, close }] = useDisclosure();

  return (
    <>
      <button onClick={open}>Open Modal</button>
      {value && (
        <div className="modal">
          <p>Modal content</p>
          <button onClick={close}>Close</button>
        </div>
      )}
    </>
  );
}
```

## Parameters

None

## Returns

- `[value: boolean, controls: { open: () => void; close: () => void }]`

## Description

Provides a simple boolean state for managing disclosure of UI elements. Returns the current state and two control functions to open and close the element. Useful for controlling visibility of modals, drawers, popovers, and other togglable components.

## Examples

### Modal Dialog

```typescript
function ConfirmDialog() {
  const [value, { open, close }] = useDisclosure();

  function handleError(error: Error) {
    console.log(error) // do something with the error
  }

  async function handleDeleteItem() {
    try {
      await deleteItem();
      close(); // close the modal after successful operation
    } catch (error) {
      handleError(error as Error);
    }
  }

  return (
    <>
      <button onClick={open}>Delete Item</button>
      {value && (
        <div className="modal">
          <h2>Confirm Delete</h2>
          <p>Are you sure?</p>
          <button onClick={close}>Cancel</button>
          <button onClick={() => { deleteItem(); close(); }}>Delete</button>
        </div>
      )}
    </>
  );
}
```

### Drawer Menu

```typescript
function SideDrawer() {
  const [isOpen, { open, close }] = useDisclosure();

  return (
    <>
      <button onClick={open}>☰ Menu</button>
      {isOpen && (
        <div className="drawer">
          <button onClick={close}>✕</button>
          <nav>
            <a href="/home">Home</a>
            <a href="/about">About</a>
            <a href="/contact">Contact</a>
          </nav>
        </div>
      )}
    </>
  );
}
```

### Popover

```typescript
function UserMenu() {
  const [isOpen, { open, close }] = useDisclosure();

  return (
    <div className="user-menu">
      <button onClick={open}>Account</button>
      {isOpen && (
        <div className="popover">
          <button onClick={close}>Settings</button>
          <button onClick={close}>Profile</button>
          <button onClick={close}>Logout</button>
        </div>
      )}
    </div>
  );
}
```

### Alert Dialog

```typescript
function ErrorAlert() {
  const [isOpen, { open, close }] = useDisclosure();
  const [error, setError] = useState<string>('');

  const handleAction = async () => {
    try {
      await riskyOperation();
    } catch (err) {
      setError(err.message);
      open();
    }
  };

  return (
    <>
      <button onClick={handleAction}>Perform Action</button>
      {isOpen && (
        <div className="alert">
          <p className="error">{error}</p>
          <button onClick={close}>Dismiss</button>
        </div>
      )}
    </>
  );
}
```

### Tooltip

```typescript
function HelpTooltip() {
  const [isOpen, { open, close }] = useDisclosure();

  return (
    <div
      onMouseEnter={open}
      onMouseLeave={close}
      className="tooltip-trigger"
    >
      <span>?</span>
      {isOpen && <div className="tooltip">Helpful information here</div>}
    </div>
  );
}
```

## Common Use Cases

- Modal dialogs and confirmation boxes
- Drawer/sidebar navigation
- Dropdown menus and popovers
- Tooltips and hints
- Alert messages
- Collapsible sections
- Expandable panels

## Features

- **Simple API** - Single hook with intuitive open/close methods
- **Type-safe** - Full TypeScript support
- **Memoized Controls** - Open and close functions are stable across renders
- **Lightweight** - Minimal overhead, no external dependencies
- **Optimized** - Uses `useCallback` to prevent unnecessary re-renders

## Notes

- The open and close functions are memoized and won't change between renders
- Multiple instances of the hook maintain independent state
- Works seamlessly with React's composition model for building complex UI components
