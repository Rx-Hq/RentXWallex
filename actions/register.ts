"use server";

import { db } from "@/lib/db";
import bcrypt from "bcryptjs";
import * as z from "zod";
import { RegisterSchema } from "../schemas";
import { log } from "console";
import { sendTwoFactorTokenEmail, sendVerificationEmail } from "@/lib/mail";

import {
  generateTwoFactorToken,
  generateVerificationToken,
} from "@/lib/tokens";
import { getTwoFactorTokenByEmail } from "@/data/two-factor-token";

export const register = async (values: any) => {
  console.log("yesyd");
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { email, password, firstname, lastname, code } = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);
  console.log(validatedFields.data);
  console.log("hashedPassword");
  console.log(hashedPassword);

  const existingUser = await db.user.findUnique({
    where: {
      email,
    },
  });

  if (existingUser) {
    return { error: "Email already exist" };
  }

  const name = firstname + " " + lastname;

  if (email) {
    if (code) {
      const twoFactorToken = await getTwoFactorTokenByEmail(email);

      if (!twoFactorToken) {
        return { error: "Invalid code!" };
      }

      if (twoFactorToken.token !== code) {
        return { error: "Invalid code!" };
      }

      const hasExpired = new Date(twoFactorToken.expires) < new Date();

      if (hasExpired) {
        return { error: "Code expired!" };
      }

      await db.twoFactorToken.delete({
        where: { id: twoFactorToken.id },
      });

      // const existingConfirmation = await getTwoFactorConfirmationByUserId(
      //   existingUser.id
      // );

      // if (existingConfirmation) {
      //   await db.twoFactorConfirmation.delete({
      //     where: { id: existingConfirmation.id }
      //   });
      // }

      await db.twoFactorConfirmation.create({
        data: {
          userId: email,
        },
      });
    } else {
      const twoFactorToken = await generateTwoFactorToken(email);
      console.log(twoFactorToken.email);
      await sendTwoFactorTokenEmail(twoFactorToken.email, twoFactorToken.token);

      return { twoFactor: true };
    }
  }

  await db.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  // const verificationToken = await generateVerificationToken(email);
  // await sendVerificationEmail(
  //   verificationToken.email,
  //   verificationToken.token,
  // );

  return { success: "User create Succesfully!", redirect: "/auth/login" };
};
