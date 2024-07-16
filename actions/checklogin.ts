"use server";
import React from "react";
import { LoginSchema } from "../schemas";
import { z } from "zod";
import { getUserByEmail } from "@/data/user";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { auth } from "../auth";

export const checklogin = async (values: z.infer<typeof LoginSchema>) => {
  console.log(values);

  const validatedFields = LoginSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }
  const { email, password, code } = validatedFields.data;
  const existingUser = await getUserByEmail(email);
  console.log(existingUser?.email);

  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { error: "Email does not exist!" };
  }
  const isPassMatch = await bcrypt.compare(password, existingUser?.password);

  if (isPassMatch) {
    // console.log("yoooobubugu");

    return { success: true };
  } else {
    return { error: "Invalid credentials!" };
  }
};

export const checkPassword = async (oldPassInput: any) => {
  const session = await auth();
  const email = session?.user.email!;
  const user = await db.user.findUnique({ where: { email } });
  const isPassMatch = await bcrypt.compare(oldPassInput, user?.password!);
  console.log(isPassMatch);
  return isPassMatch;
};
