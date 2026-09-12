type ErrorStateProps = {
  message?: string;
  onRetry?: () => void;
};
export default function ErrorState({
  message = "Something went wrong.",
  onRetry,
}: ErrorStateProps) {
  return (
    <div role="alert" className="p-8">
      <p>{message}</p>
      {onRetry ? (
        <button type="button" onClick={onRetry} className="mt-4">
          Retry
        </button>
      ) : null}
    </div>
  );
}
