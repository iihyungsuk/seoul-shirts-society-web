export const NotFoundMessage = ({
  title,
  message,
}: {
  title: string;
  message: string;
}) => (
  <div className="flex min-h-screen items-center justify-center bg-neutral-50">
    <div className="text-center">
      <h1 className="text-2xl font-light text-neutral-900">{title}</h1>
      <p className="mt-2 text-neutral-600">{message}</p>
    </div>
  </div>
);
