"use server";
import { db } from "@/lib/db";
import { auth } from "../auth";
import { NewPasswordSchema } from "../schemas";
import bcrypt from "bcryptjs";
export const userInfo = async () => {
  // const { data: session, status } = useSession()
  const session = await auth();
  const userEmail = session?.user?.email!;
  var email = userEmail;
  // if(session?.user.email != undefined){
  //     email = session.user.email;
  // }

  const result = await db.user_Info.findUnique({
    where: {
      email: email,
    },
    include: {
      Bank_Info: true,
    },
  });

  return result?.name;
};
export const userInfoByEmail = async (email: string) => {
  // const { data: session, status } = useSession()
  const session = await auth();
  const userEmail = email;
  var email = userEmail;
  // if(session?.user.email != undefined){
  //     email = session.user.email;
  // }

  const result = await db.user_Info.findUnique({
    where: {
      email: email,
    },
  });

  return result;
};

export const userInfos = async () => {
  // const { data: session, status } = useSession()
  const session = await auth();
  const userEmail = session?.user?.email!;
  var email = userEmail;
  // if(session?.user.email != undefined){
  //     email = session.user.email;
  // }

  const result = await db.user_Info.findUnique({
    where: {
      email: email,
    },
    include: {
      Bank_Info: true,
      Property_Info: true,
    },
  });

  return result;
};
export const changePassword = async (values: any) => {
  const session = await auth();
  const validatedFields = NewPasswordSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }
  const password = bcrypt.hash(validatedFields.data.password, 10);
  try {
    const user = await db.user.update({
      where: { email: session?.user.email! },
      data: { password: (await password).toString() },
    });

    return user;
  } catch {
    return null;
  }
};
