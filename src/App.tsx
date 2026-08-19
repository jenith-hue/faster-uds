import { useState } from "react";
import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Input,
} from "./index";

export default function App() {
  const [open, setOpen] = useState(false);
  return (
    <main className="demo-shell">
      <p className="demo-eyebrow">FASTER / UDS</p>
      <h1>Small, dependable UI primitives.</h1>
      <p className="demo-copy">
        Button, Input, and Dialog. Built from reusable tokens and ready for your
        design system.
      </p>
      <div className="demo-actions">
        <Button onClick={() => setOpen(true)}>Open dialog</Button>
        <Button variant="secondary">Secondary action</Button>
      </div>
      <div className="demo-input">
        <Input
          label="Work email"
          placeholder="you@example.com"
          helperText="We only use this for updates."
        />
      </div>
      <Dialog
        open={open}
        onOpenChange={setOpen}
        aria-labelledby="demo-dialog-title"
      >
        <DialogHeader
          title="Welcome to Faster"
          id="demo-dialog-title"
          onClose={() => setOpen(false)}
        />
        <DialogBody>
          Start with these primitives, then layer your product visual language
          on top.
        </DialogBody>
        <DialogFooter>
          <Button variant="secondary" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={() => setOpen(false)}>Continue</Button>
        </DialogFooter>
      </Dialog>
    </main>
  );
}
