import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import type { Employee } from '@/lib/employees';

export function EmployeeCard({ employee }: { employee: Employee }) {
  const Icon = employee.icon;
  return (
    <Link
      to="/solutions/$slug"
      params={{ slug: employee.slug }}
      className="group relative flex flex-col rounded-2xl border border-border bg-card p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-forest/40 hover:shadow-elegant"
    >
      <div className="flex items-center justify-between">
        <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-mint-soft text-forest-deep">
          <Icon className="h-5 w-5" />
        </div>
        <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-colors group-hover:text-forest-deep" />
      </div>
      <h3 className="mt-5 font-display text-xl text-forest-deep">{employee.name}</h3>
      <p className="mt-1.5 text-sm text-muted-foreground">{employee.tagline}</p>
    </Link>
  );
}
