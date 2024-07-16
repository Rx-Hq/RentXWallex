import * as z from "zod";

export const LoginSchema = z.object({
  email: z
    .string()
    .email({
      message: "Email is required",
    })
    .toLowerCase(),
  password: z.string().min(1, {
    message: "Password is required",
  }),
  code: z.optional(z.string()),
});

// export const RegisterSchema = z.object({
//   email: z.string().email({
//     message: "Email is required",
//   }),
//   password: z.string().min(6, {
//     message: "Minimum 6 characters required",
//   }),
//   name:z.string().min(1, {
//       message: "Name is required",
//     }),
// });

export const RegisterSchema = z
  .object({
    email: z
      .string()
      .email({
        message: "Email is required",
      })
      .toLowerCase(),
    password: z.string().min(6, {
      message: "Minimum 6 characters required",
    }),
    repassword: z.string().min(6, {
      message: "Minimum 6 characters required",
    }),
    firstname: z.string().min(1, {
      message: "Firstname is required",
    }),
    lastname: z.string().min(1, {
      message: "Lastname is required",
    }),
    // phone: z.string().min(7, {
    //   message: "Phone number is required",
    // }),
    code: z.optional(z.string()),
    // sin:z.string().min(7, {
    //   message: "SIN number is required",
    // }),
  })
  .superRefine(({ password, repassword }, ctx) => {
    if (repassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "The passwords did not match",
        path: ["repassword"],
      });
    }
  });

export const UserInfoSchema = z.object({
  name: z.string().min(1, {
    message: "Name is required",
  }),
  email: z.string().email({
    message: "Email is required",
  }),
  country: z.string().min(1, {
    message: "Country is required",
  }),
  street: z.string().min(1, {
    message: "Street is required",
  }),
  city: z.string().min(1, {
    message: "City is required",
  }),
  state: z.string().min(1, {
    message: "State is required",
  }),
  zip: z.string().min(6, {
    message: "Zipcode is required",
  }),
  phonenumber: z
    .string()
    .min(1, "Phone number is required")
    .refine(
      (value) => {
        return /^(?:\+?1[-.\s]?)?\(?[2-9]\d{2}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/.test(
          value
        );
      },
      {
        message: "Invalid phone number format",
      }
    ),
  currentEmployer: z.string().min(1, "Current Employer is required"),
  jobTitle: z.string().min(1, "Job Title is required"),
  empStatus: z.string().min(1, "Employment Status is required"),
  monthlyIncome: z
    .string()
    .min(1, "Monthly Income is required")
    .refine(
      (value) => {
        // Check if the value is a valid number
        return !isNaN(parseFloat(value));
      },
      {
        message: "Monthly income must be a valid number",
      }
    )
    .refine(
      (value) => {
        // Additional custom validation logic can be added here, if needed
        const incomeNumber = parseFloat(value);
        return incomeNumber > 0; // Ensure income is greater than zero
      },
      {
        message: "Monthly income must be a positive number greater than zero",
      }
    ),
  payFreq: z.string().min(1, "Payment Frequency is required"),
  // sin:z.string().min(7, {
  //   message: "SIN number is required",
  // }),
});

// export const AccountSchema = z.object({

//   phone: z.string().min(7, {
//     message: "Phone number is required",
//   }),
//   dateofbirth: z.string().min(6, {
//     message: "Minimum 6 characters required",
//   }),
//  firstname:z.string().min(1, {
//       message: "Firstname is required",
//     }),
//     lastname:z.string().min(1, {
//       message: "Lastname is required",
//     }),
//     phone:z.string().min(7, {
//       message: "Phone number is required",
//     }),
// });

export const NewPasswordSchema = z
  .object({
    oldpassword: z.string().min(6, {
      message: "Minimum of 6 characters required",
    }),
    password: z.string().min(6, {
      message: "Minimum of 6 characters required",
    }),
    repassword: z.string().min(6, {
      message: "Minimum of 6 characters required",
    }),
  })
  .superRefine(({ password, repassword }, ctx) => {
    if (repassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "The passwords did not match",
        path: ["repassword"],
      });
    }
  });

export const ResetSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
});

export const FormDataSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  country: z.string().min(1, "Country is required"),
  street: z.string().min(1, "Street is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  zip: z.string().min(1, "Zip is required"),
  phonenumber: z
    .string()
    .min(1, "Phone number is required")
    .refine(
      (value) => {
        return /^(?:\+?1[-.\s]?)?\(?[2-9]\d{2}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/.test(
          value
        );
      },
      {
        message: "Invalid phone number format",
      }
    ),
  // identification:z.string().min(1,"required"),

  currentEmployer: z.string().min(1, "Current Employer is required"),
  jobTitle: z.string().min(1, "Job Title is required"),
  empStatus: z.string().min(1, "Employment Status is required"),
  monthlyIncome: z
    .string()
    .min(1, "Monthly Income is required")
    .refine(
      (value) => {
        // Check if the value is a valid number
        return !isNaN(parseFloat(value));
      },
      {
        message: "Monthly income must be a valid number",
      }
    )
    .refine(
      (value) => {
        // Additional custom validation logic can be added here, if needed
        const incomeNumber = parseFloat(value);
        return incomeNumber > 0; // Ensure income is greater than zero
      },
      {
        message: "Monthly income must be a positive number greater than zero",
      }
    ),
  payFreq: z.string().min(1, "Payment Frequency is required"),
  propAddress: z.string().min(1, "Property Address is required"),
  propType: z.string().min(1, "Property Type is required"),
  propNoOfBeds: z.string().min(1, "Number of bedrooms is required"),
  rentAmt: z
    .string()
    .min(1, "Rent Amount is required")
    .refine(
      (value) => {
        // Check if the value is a valid number
        return !isNaN(parseFloat(value));
      },
      {
        message: "Rent Amount must be a valid number",
      }
    )
    .refine(
      (value) => {
        // Additional custom validation logic can be added here, if needed
        const incomeNumber = parseFloat(value);
        return incomeNumber > 0; // Ensure income is greater than zero
      },
      {
        message: "Rent Amount must be a positive number greater than zero",
      }
    ),
  managerName: z.string().min(1, "Manager Name is required"),
  manageCompany: z.string().min(1, "Management Company Name is required"),
  propManagerEmail: z
    .string()
    .min(1, "Email of property manager is required")
    .email("Invalid email address"),
  propManagerPhone: z
    .string()
    .min(1, "Phone number of property manager is required")
    .refine(
      (value) => {
        return /^(?:\+?1[-.\s]?)?\(?[2-9]\d{2}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/.test(
          value
        );
      },
      {
        message: "Invalid phone number format",
      }
    ),
  payMethod: z.string().min(1, "Payment Method is required"),

  bankName: z.string().min(1, "Bank Name is required"),
  acctHoldName: z.string().min(1, "Account Holder Name is required"),
  acctNumber: z
    .string()
    .min(1, "Account Number is required")
    .refine(
      (value) => {
        // Check if the value is a valid number
        return !isNaN(parseFloat(value));
      },
      {
        message: "Account Number must be a valid number",
      }
    )
    .refine(
      (value) => {
        return /^[0-9]{7,12}$/.test(value);
      },
      {
        message: "Invalid account number format",
      }
    ),
  instNumber: z
    .string()
    .min(1, "Institution Number is required")
    .refine(
      (value) => {
        // Check if the value is a valid number
        return !isNaN(parseFloat(value));
      },
      {
        message: "Institution Number must be a valid number",
      }
    )
    .refine(
      (value) => {
        return /^[0-9]{3}$/.test(value);
      },
      {
        message: "Invalid Institution number format",
      }
    ),
  routNumber: z
    .string()
    .min(1, "Transit Number is required")
    .refine(
      (value) => {
        // Check if the value is a valid number
        return !isNaN(parseFloat(value));
      },
      {
        message: "Transit Number must be a valid number",
      }
    )
    .refine(
      (value) => {
        return /^[0-9]{5}$/.test(value);
      },
      {
        message: "Invalid Transit number format",
      }
    ),
  hearAbtRx: z.string().min(1, "field is required"),
});

export const PropertySchema = z.object({
  propName: z.string().min(1, "Property Name is required"),
  propAddress: z.string().min(1, "Property Address is required"),
  rentAmt: z
    .string()
    .min(1, "Rent Amount is required")
    .refine(
      (value) => {
        // Check if the value is a valid number
        return !isNaN(parseFloat(value));
      },
      {
        message: "Rent Amount must be a valid number",
      }
    )
    .refine(
      (value) => {
        // Additional custom validation logic can be added here, if needed
        const incomeNumber = parseFloat(value);
        return incomeNumber > 0; // Ensure income is greater than zero
      },
      {
        message: "Rent Amount must be a positive number greater than zero",
      }
    ),
  managerName: z.string().min(1, "Manager Name is required"),
  manageCompany: z.string().min(1, "Management Company Name is required"),
  payMethod: z.string().min(1, "Payment Method is required"),
});

export const BankSchema = z.object({
  bankName: z.string().min(1, "Bank Name is required"),
  acctHoldName: z.string().min(1, "Account Holder Name is required"),
  acctNumber: z
    .string()
    .min(1, "Account Number is required")
    .refine(
      (value) => {
        // Check if the value is a valid number
        return !isNaN(parseFloat(value));
      },
      {
        message: "Account Number must be a valid number",
      }
    )
    .refine(
      (value) => {
        return /^[0-9]{7,12}$/.test(value);
      },
      {
        message: "Invalid account number format",
      }
    ),
  instNumber: z
    .string()
    .min(1, "Institution Number is required")
    .refine(
      (value) => {
        // Check if the value is a valid number
        return !isNaN(parseFloat(value));
      },
      {
        message: "Institution Number must be a valid number",
      }
    )
    .refine(
      (value) => {
        return /^[0-9]{3}$/.test(value);
      },
      {
        message: "Invalid Institution number format",
      }
    ),
  routNumber: z
    .string()
    .min(1, "Transit Number is required")
    .refine(
      (value) => {
        // Check if the value is a valid number
        return !isNaN(parseFloat(value));
      },
      {
        message: "Transit Number must be a valid number",
      }
    )
    .refine(
      (value) => {
        return /^[0-9]{5}$/.test(value);
      },
      {
        message: "Invalid Transit number format",
      }
    ),
});

export const MembershipSchema = z.object({
  MembershipType: z.string().min(1, "Bank Name is required"),
  MembershipDuration: z.string().min(1, "Account Holder Name is required"),
});

export const ReferalToSchema = z.object({
  referToEmail: z
    .string()
    .min(1, "Email is required")
    .email("Invalid Email address"),
});

export const ReferalFromSchema = z.object({
  referCode: z.string().min(6, "Referal Code is required"),
});
