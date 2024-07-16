"use server";

import { db } from "@/lib/db";
import { FormDataSchema } from "../schemas";
import { auth } from "../auth";

export const application = async (values: any) => {
  const validatedFields = FormDataSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const {
    firstName,
    lastName,
    email,
    country,
    street,
    city,
    state,
    zip,
    phonenumber,
    currentEmployer,
    jobTitle,
    empStatus,
    monthlyIncome,
    payFreq,
    propAddress,
    propType,
    propNoOfBeds,
    rentAmt,
    manageCompany,
    managerName,
    payMethod,
    bankName,
    acctHoldName,
    acctNumber,
    instNumber,
    hearAbtRx,
    routNumber,
  } = validatedFields.data;

  console.log(validatedFields.data);

  const existingUser = await db.user_Info.findUnique({
    where: {
      email,
    },
  });
  if (existingUser) {
    return { error: "Email already exist" };
  }
  const name = firstName + " " + lastName;
  const propName = "propName";
  await db.user_Info.create({
    data: {
      name,
      email,
      country,
      street,
      city,
      state,
      zip,
      phonenumber,
      currentEmployer,
      jobTitle,
      empStatus,
      monthlyIncome,
      payFreq,
      hearAbtRx,
      isApproved: false,
      Bank_Info: {
        create: [
          {
            bankName,
            acctHoldName,
            acctNumber,
            instNumber,
            routNumber,
          },
        ],
      },
      Property_Info: {
        create: [
          {
            propName,
            propAddress,
            propType,
            propNoOfBeds,
            rentAmt,
            manageCompany,
            managerName,
            payMethod,
          },
        ],
      },
    },
  });

  //   if (email) {
  //     if (code) {
  //       const twoFactorToken = await getTwoFactorTokenByEmail(
  //       email
  //       );

  //       if (!twoFactorToken) {
  //         return { error: "Invalid code!" };
  //       }

  //       if (twoFactorToken.token !== code) {
  //         return { error: "Invalid code!" };
  //       }

  //       const hasExpired = new Date(twoFactorToken.expires) < new Date();

  //       if (hasExpired) {
  //         return { error: "Code expired!" };
  //       }

  //       await db.twoFactorToken.delete({
  //         where: { id: twoFactorToken.id }
  //       });

  //       // const existingConfirmation = await getTwoFactorConfirmationByUserId(
  //       //   existingUser.id
  //       // );

  //       // if (existingConfirmation) {
  //       //   await db.twoFactorConfirmation.delete({
  //       //     where: { id: existingConfirmation.id }
  //       //   });
  //       // }

  //       await db.twoFactorConfirmation.create({
  //         data: {
  //           userId: email,
  //         }
  //       });
  //     } else {
  //       const twoFactorToken = await generateTwoFactorToken(email)
  //       await sendTwoFactorTokenEmail(
  //         twoFactorToken.email,
  //         twoFactorToken.token,
  //       );

  //       return { twoFactor: true };
  //     }
  //   }

  // const verificationToken = await generateVerificationToken(email);
  // await sendVerificationEmail(
  //   verificationToken.email,
  //   verificationToken.token,
  // );

  return { success: "Application created Succesfully!" };
};

export const applicationCheck = async () => {
  const session = await auth();
  const email = session?.user.email!;
  const result = db.user_Info.findUnique({
    where: {
      email: email,
    },
  });
  return result;
};
