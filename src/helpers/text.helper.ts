const MAX_CHAR_SHOWN = 30;

interface StringWidthParams {
  value: string;
  maxShownLength?: number;
  ellipsis?: string;
}

export const stringWidth = ({
  value,
  maxShownLength,
  ellipsis,
}: StringWidthParams): string => {
  const maxLength = maxShownLength ?? MAX_CHAR_SHOWN;
  const trimMarker = ellipsis ?? "...";

  return value.length > maxLength
    ? value.substring(0, maxLength - 3) + trimMarker
    : value;
};
