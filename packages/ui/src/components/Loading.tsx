export interface LoadingProps {
  readonly label?: string;
}
export function Loading({ label = "Loading..." }: LoadingProps) {
  return (
    <div role="status" className="p-8">
      {label}
    </div>
  );
}
