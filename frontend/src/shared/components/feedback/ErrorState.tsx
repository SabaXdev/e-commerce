type ErrorStateProps = {
  title?: string;
  message: string;
  action?: React.ReactNode;
};

export function ErrorState({
  title = 'Something went wrong',
  message,
  action,
}: ErrorStateProps) {
  return (
    <div className="rounded-xl border border-red-200 bg-red-50 px-6 py-8 text-center">
      <h3 className="text-lg font-medium text-red-900">{title}</h3>
      <p className="mt-2 text-sm text-red-700">{message}</p>
      {action ? <div className="mt-4">{action}</div> : null}
    </div>
  );
}
