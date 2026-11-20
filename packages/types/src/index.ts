export type ImageResponse = {
  src: string;
  alt: string;
  blurDataURL?: string;
};

export interface ProfileResponse {
  name: string;
  greeting: string;
  headline: string;
  bio: string;
  portrait: ImageResponse | null;
}
