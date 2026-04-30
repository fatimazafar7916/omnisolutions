import { useState } from 'react';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

const schema = z.object({
  name: z.string().trim().min(1, 'Name required').max(100),
  company: z.string().trim().min(1, 'Company required').max(150),
  email: z.string().trim().email('Valid email required').max(255),
  phone: z.string().trim().max(40).optional().or(z.literal('')),
  fleetSize: z.string().trim().max(40).optional().or(z.literal('')),
  message: z.string().trim().max(1000).optional().or(z.literal('')),
});

export function LeadForm({
  source = 'contact',
  compact = false,
}: {
  source?: string;
  compact?: boolean;
}) {
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const raw = {
      name: String(fd.get('name') ?? ''),
      company: String(fd.get('company') ?? ''),
      email: String(fd.get('email') ?? ''),
      phone: String(fd.get('phone') ?? ''),
      fleetSize: String(fd.get('fleetSize') ?? ''),
      message: String(fd.get('message') ?? ''),
    };
    const parsed = schema.safeParse(raw);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? 'Please check your details');
      return;
    }
    setLoading(true);
    try {
      // For now, just show success - you can add API endpoint later
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success("Got it. We'll be in touch within 1 business day.");
      e.currentTarget.reset();
    } catch (err) {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  if (compact) {
    return (
      <form onSubmit={onSubmit} className="flex flex-col gap-3 sm:flex-row">
        <input type="hidden" name="company" value="—" />
        <input type="hidden" name="name" value="Inline lead" />
        <Input
          name="email"
          type="email"
          required
          placeholder="you@yourrental.com"
          className="h-12 rounded-full border-cream/20 bg-cream/10 px-5 text-cream placeholder:text-cream/50 focus-visible:ring-mint"
        />
        <Button
          type="submit"
          disabled={loading}
          className="h-12 rounded-full bg-mint px-6 text-forest-deep hover:bg-mint/90"
        >
          {loading ? "Sending…" : "Book a Demo"}
        </Button>
      </form>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field name="name" label="Your name" required />
        <Field name="company" label="Company" required />
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field name="email" label="Work email" type="email" required />
        <Field name="phone" label="Phone (optional)" />
      </div>
      <Field
        name="fleetSize"
        label="Fleet size (optional)"
        placeholder="e.g. 25 vehicles, 3 locations"
      />
      <div>
        <Label htmlFor="message">What's the #1 thing you'd want AI to handle?</Label>
        <Textarea id="message" name="message" rows={4} className="mt-2" maxLength={1000} />
      </div>
      <Button
        type="submit"
        disabled={loading}
        className="h-12 rounded-full bg-forest-deep text-cream hover:bg-forest"
      >
        {loading ? "Sending…" : "Request your 14-day go-live"}
      </Button>
    </form>
  );
}

function Field({
  name,
  label,
  type = "text",
  required,
  placeholder,
}: {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <div>
      <Label htmlFor={name}>{label}</Label>
      <Input
        id={name}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="mt-2"
      />
    </div>
  );
}
