export const ErrorText = ({ id, message }: { id: string; message?: string }) =>
  message ? (
    <p id={id} className="mt-1.5 text-sm text-danger">
      {message}
    </p>
  ) : null;
