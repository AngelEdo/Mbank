export class ResponseUserDto {
  private constructor(
    public readonly id: number,
    public readonly fullName: string,
    public readonly email: string,
    public readonly role: string,
  ) {}

  public static create(user: {id: number; firstName: string; lastName: string; email: string; role: string; }): ResponseUserDto {
    return new ResponseUserDto(
      user.id,
      `${user.firstName} ${user.lastName}`,
      user.email,
      user.role,
    );
  }
}