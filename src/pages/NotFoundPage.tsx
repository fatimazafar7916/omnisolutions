import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <>
      <Helmet>
        <title>404 - Page Not Found — Aiaura</title>
      </Helmet>
      <div className="flex min-h-screen items-center justify-center bg-background px-4">
        <div className="max-w-md text-center">
          <h1 className="font-display text-7xl text-forest-deep">404</h1>
          <h2 className="mt-4 font-display text-xl text-foreground">Page not found</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <div className="mt-6">
            <Link
              to="/"
              className="inline-flex items-center justify-center rounded-full bg-forest-deep px-5 py-2.5 text-sm font-medium text-cream transition-colors hover:bg-forest"
            >
              Go home
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
