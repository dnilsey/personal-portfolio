export class ImageResponseDto {
  /** Use this as portraitId or aboutImageId in PATCH /profile */
  id: number;
  url: string;
  alt: string;
}
