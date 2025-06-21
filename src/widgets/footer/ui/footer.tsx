export const Footer = () => {
  return (
    <footer className="bg-neutral-50">
      <div className="mx-auto max-w-7xl px-6 py-8">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-sm text-neutral-600">
            © 2024 Seoul Shirts Society. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-neutral-600">
            <a href="#" className="hover:text-neutral-900">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-neutral-900">
              Terms of Service
            </a>
            <a href="#" className="hover:text-neutral-900">
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
