export async function login(data: { email: string }) {
  const user = await prisma.user.findFirst({
    where: {
      email: data.email,
    },
  });

  if (user) {
    return user;
  } else {
    return null;
  }
}

export async function register() {}
