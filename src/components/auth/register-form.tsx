// "use client";

// import * as z from "zod";
// import { useForm } from "react-hook-form";
// import React, { useState } from "react";
// import { CardWrapper } from "./card-wrapper";
// import { zodResolver } from "@hookform/resolvers/zod";
// import Link from "next/link";
// import { Input } from "@/components/ui/input";
// import { useTransition } from "react";

// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { RegisterSchema } from "../../../schemas";
// import { Button } from "../ui/button";
// import { FormError } from "../form-error";
// import { FormSuccess } from "../form-success";
// import { register } from "../../../actions/register";

// export const RegisterForm = () => {

// const [error,setError] = useState<string | undefined>("");
// const [success,setSuccess] = useState<string | undefined>("");
//     const [isPending,startTransition] = useTransition();

//   const form = useForm<z.infer<typeof RegisterSchema>>({
//     resolver: zodResolver(RegisterSchema),
//     defaultValues: {
//       email: "",
//       password: "",
//       name:"",
//     },
//   });

//   const onSubmit = (values: z.infer<typeof RegisterSchema>) => {

//     setError("");
//     setSuccess("");
//     startTransition(() => {
//       register(values)
//         .then((data) => {
//           setError(data.error);
//           setSuccess(data.success);
//         });
//     });

//   };

//   return (
//     <CardWrapper
//       headerLabel="Create an account"
//       backButtonLabel="Already have an account?"
//       backButtonHref="/auth/login"
//       showSocial
//     >
//       <Form {...form}>
//         <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
//           <div className="space-y-4">
//           <FormField
//               control={form.control}
//               name="name"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Name</FormLabel>
//                   <FormControl>
//                     <Input
//                       {...field}
//                       disabled={isPending}
//                       placeholder="john Doe"
//                     />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={form.control}
//               name="email"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Email</FormLabel>
//                   <FormControl>
//                     <Input
//                       {...field}
//                       disabled={isPending}
//                       placeholder="john.doe@example.com"
//                       type="email"
//                     />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={form.control}
//               name="password"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Password</FormLabel>
//                   <FormControl>
//                     <Input {...field}
//                     disabled={isPending}
//                     placeholder="" type="password" />
//                   </FormControl>
//                   <Button
//                     size="sm"
//                     variant="link"
//                     asChild
//                     className="px-0 font-normal"
//                   >
//                   </Button>
//                   <FormMessage />
//                   <Link className="text-xs font-normal" href="/auth/reset">Forgot password?</Link>

//                 </FormItem>
//               )}
//             />
//           </div>
//           <FormError message={error}/>
//           <FormSuccess message={success}/>
//           <Button type="submit" className="w-full">Create an account</Button>
//         </form>
//       </Form>
//     </CardWrapper>
//   );
// };

"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import React, { useState } from "react";
import { CardWrapper } from "./card-wrapper";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { useTransition } from "react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RegisterSchema } from "../../../schemas";
import { Button } from "../ui/button";
import { FormError } from "../form-error";
import { FormSuccess } from "../form-success";
import { register } from "../../../actions/register";
import { cn } from "@/lib/utils";
import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons";
import Modal from "./modal";
import { useRouter } from "next/navigation";

export const RegisterForm = () => {
  const router = useRouter();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [redirect, setRedirect] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  // const [step,setStep] = React.useState(0);
  const [showTwoFactor, setShowTwoFactor] = useState(false);
  const [modal, setModal] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = (event: any) => {
    setIsChecked(event.target.checked);
  };

  type input = z.infer<typeof RegisterSchema>;

  const form = useForm<input>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: "",
      password: "",
      repassword: "",
      firstname: "",
      lastname: "",
    },
  });

  // const handleCheckboxChange = () => {
  //   setIsChecked(!isChecked);
  // };

  const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
    if (values.password !== values.repassword) {
      setError("Password does not match");
      return;
    }
    // if(isChecked){
    setError("");
    setSuccess("");
    if (isChecked!) {
      startTransition(() => {
        register(values).then((data) => {
          // setError(data.error);
          // setSuccess(data.success);

          if (data?.error) {
            form.reset();
            setError(data.error);
          }

          if (data?.success) {
            form.reset();
            setSuccess(data.success);
          }

          if (data?.twoFactor) {
            setShowTwoFactor(true);
          }

          if (data?.redirect) setRedirect(data.redirect);
        });
      });
    } else {
      setError("Please agree to the terms and conditions.");
    }

    // }else{
    //   setError("Please accept the term and conditions");

    // }
    console.log(values);
    // setShowTwoFactor(true);
  };

  if (redirect) {
    router.push(redirect);
  }
  return (
    <CardWrapper
      headerLabel="Create an account"
      backButtonLabel="Already have an account?"
      backButtonHref="/auth/login"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            {/* <div className={cn("space-y-4",{'hidden':step == 1})}> */}
            {!showTwoFactor && (
              <>
                <FormField
                  control={form.control}
                  name="firstname"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Firstname</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          disabled={isPending}
                          placeholder="john"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastname"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Lastname</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          disabled={isPending}
                          placeholder="doe"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          disabled={isPending}
                          placeholder="john.doe@example.com"
                          type="email"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          disabled={isPending}
                          placeholder=""
                          type="password"
                        />
                      </FormControl>
                      {/* <Button
                  size="sm"
                  variant="link"
                  asChild
                  className="px-0 font-normal"
                >
                </Button>*/}
                      <FormMessage />
                      {/* <Link className="text-xs font-normal" href="/auth/reset">Forgot password?</Link> */}
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="repassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Re-Password</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          disabled={isPending}
                          placeholder=""
                          type="password"
                        />
                      </FormControl>
                      <Button
                        size="sm"
                        variant="link"
                        asChild
                        className="px-0 font-normal"
                      ></Button>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}
            {/* </div> */}
            {/* <div className={cn("space-y-4",{'hidden':step == 0})}> */}
            {showTwoFactor && (
              <FormField
                control={form.control}
                name="code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Two Factor Code</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder="123456"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            {/* {!showTwoFactor && (
                   <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <><FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="XXX-XXX-XXXX"
                      type="text" />
                  </FormControl>
                  <FormMessage />
                </FormItem><div>
                    <input className="" name="tnc" type="checkbox" checked={isChecked} onChange={handleCheckboxChange} />
                    <span className="ps-1 text-sm">I agree to <span className="underline cursor-pointer" onClick={() => setShowModal(true)}>Term and Condition</span> </span>
                  </div></>
              )}
            />
            
            
            )} */}

            {/* </div> */}

            {/* <div className={cn("space-y-4",{'hidden':step == 0 || step == 1})}>
                   <FormField
              control={form.control}
              name="sin"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>SIN Number</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="XXX-XXX-XXXX"
                      type="number"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            </div> */}
          </div>
          {!showTwoFactor && (
            <div className="py-2">
              <input
                type="checkbox"
                checked={isChecked}
                onChange={handleCheckboxChange}
              />
              <span className="ms-1">
                I agree to all{" "}
                <span
                  onClick={() => {
                    setModal(true);
                  }}
                  className="underline cursor-pointer hover:text-blue-500 "
                >
                  {" "}
                  terms and conditions
                </span>
              </span>
            </div>
          )}
          <FormError message={error} />
          <FormSuccess message={success} />
          <Button type="submit" className="w-full">
            Create an account
          </Button>
          {/* <div className="flex flex-row-reverse gap-2">
          <Button type="submit" className={cn("w-full",{'hidden':step == 0 })} >Create an account</Button>
          <Button type="button" className={cn("w-full",{'hidden':step == 1})} 
          onClick={()=>{
            form.trigger(['firstname','lastname','password','repassword','email'])
            const emailState = form.getFieldState('email')
            const fnameState = form.getFieldState('firstname')
            const lnameState = form.getFieldState('lastname')
            const passState = form.getFieldState('password')
            const repassState = form.getFieldState('repassword')
            if(!emailState.isDirty) return;
             if(!fnameState.isDirty) return;
             if(!lnameState.isDirty) return;
             if(!passState.isDirty) return;
             if(!repassState.isDirty) return;
              setStep(1)
            
            }}>
              Next Step<ArrowRightIcon className="w-4 h-4 ml-2"/></Button>

              <Button type="button" className={cn("w-full",{'hidden':step == 0})} onClick={()=>{
                setStep(0)
              }} ><ArrowLeftIcon className="w-4 h-4 mr-2"/>Back</Button>
          </div> */}
        </form>
      </Form>
      {modal && (
        <>
          <div className="fixed z-0 inset-0 bg-opacity-25 backdrop-blur-sm flex justify-center items-center">
            <div className="w-[600px] h-[600px] flex flex-col">
              <button
                className="text-black text-sm place-self-end"
                onClick={() => setModal(false)}
              >
                X
              </button>
              <div className="bg-white overflow-scroll p-2 border-solid border-4 border-gray-600 rounded">
                <h1 className="text-center text-xl font-bold">
                  Terms and Conditions
                </h1>

                <div className="terms-container">
                  <div className="terms-condition pt-2">
                    <p>
                      Please read these terms and conditions (&quot;terms and
                      conditions&quot;, &quot;terms&quot;) carefully before
                      using website operated by RentWallex.
                    </p>
                  </div>

                  <div className="terms-condition pt-2">
                    <p>
                      Conditions of use: By using this website, you certify that
                      you have read and reviewed this Agreement and that you
                      agree to comply with its terms. If you do not want to be
                      bound by the terms of this Agreement, you are advised to
                      stop using the website accordingly. [company name] only
                      grants use and access of this website, its products, and
                      its services to those who have accepted its terms.
                    </p>
                  </div>

                  <div className="terms-condition pt-2">
                    <p>
                      Privacy policy: Before you continue using our website, we
                      advise you to read our privacy policy [link to privacy
                      policy] regarding our user data collection. It will help
                      you better understand our practices.
                    </p>
                  </div>

                  <div className="terms-condition pt-2">
                    <p>
                      Age restriction: You must be at least 18 (eighteen) years
                      of age before you can use this website. By using this
                      website, you warrant that you are at least 18 years of age
                      and you may legally adhere to this Agreement. [company
                      name] assumes no responsibility for liabilities related to
                      age misrepresentation.
                    </p>
                  </div>
                  <div className="terms-condition pt-2">
                    <p>
                      Intellectual property: You agree that all materials,
                      products, and services provided on this website are the
                      property of [company name], its affiliates, directors,
                      officers, employees, agents, suppliers, or licensors
                      including all copyrights, trade secrets, trademarks,
                      patents, and other intellectual property. You also agree
                      that you will not reproduce or redistribute the [company
                      name]’s intellectual property in any way, including
                      electronic, digital, or new trademark registrations
                    </p>
                  </div>
                  <div className="terms-condition pt-2">
                    <p>
                      User accounts : As a user of this website, you may be
                      asked to register with us and provide private information.
                      You are responsible for ensuring the accuracy of this
                      information, and you are responsible for maintaining the
                      safety and security of your identifying information.
                      Website terms and conditions template by
                      WebsitePolicies.com You are also responsible for all
                      activities that occur under your account or password. If
                      you think there are any possible issues regarding the
                      security of your account on the website, inform us
                      immediately so we may address them accordingly. We reserve
                      all rights to terminate accounts, edit or remove content
                      and cancel orders at our sole discretion.
                    </p>
                  </div>
                  <div className="terms-condition pt-2">
                    <p>
                      Applicable law : By using this website, you agree that the
                      laws of the [your location], without regard to principles
                      of conflict laws, will govern these terms and conditions,
                      or any dispute of any sort that might come between
                      [company name] and you, or its business partners and
                      associates
                    </p>
                  </div>
                  <div className="terms-condition pt-2">
                    <p>
                      Disputes : Any dispute related in any way to your use of
                      this website or to products you purchase from us shall be
                      arbitrated by state or federal court [your location] and
                      you consent to exclusive jurisdiction and venue of such
                      courts.
                    </p>
                  </div>
                  <div className="terms-condition pt-2">
                    <p>
                      Indemnification : You agree to indemnify [company name]
                      and its affiliates and hold [company name] harmless
                      against legal claims and demands that may arise from your
                      use or misuse of our services. We reserve the right to
                      select our own legal counsel.
                    </p>
                  </div>
                  <div className="terms-condition pt-2">
                    <p>
                      Limitation on liability : [company name] is not liable for
                      any damages that may occur to you as a result of your
                      misuse of our website. [company name] reserves the right
                      to edit, modify, and change this Agreement at any time. We
                      shall let our users know of these changes through
                      electronic mail. This Agreement is an understanding
                      between [company name] and the user, and this supersedes
                      and replaces all prior agreements regarding the use of
                      this website.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </CardWrapper>
  );
};
