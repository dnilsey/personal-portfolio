export class LoginResponseDto {
  /** Paste this into Swagger's Authorize button */
  accessToken: string;
  /** Seconds until the token expires */
  expiresIn: number;
}
