import { useState } from "react";
import {
  Button,
  Dialog,
  Input,
} from "@/index";

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
        <Button onClick={() => setOpen(true)}>Test</Button>
        <Button variant="outline">Secondary action</Button>
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
        title="Welcome to Faster"
        closable
        footer={
          <>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setOpen(false)}>Continue</Button>
          </>
        }
      >
        Start with these primitives, then layer your product visual language
        on top.
      </Dialog>
    </main>
  );
}
