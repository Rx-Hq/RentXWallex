"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { FormDataSchema } from "../../../../../schemas";
import { steps } from "./steps";
import { FormError } from "@/components/form-error";
import { application } from "../../../../../actions/Application";
import { userInfo } from "../../../../../actions/userInfo";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { canadaStateNames, usaStateNames } from "@/data/monthNames";
type Inputs = z.infer<typeof FormDataSchema>;
export default function Form() {
  const [previousStep, setPreviousStep] = useState(0);
  const [currentStep, setCurrentStep] = useState(5);
  const [selectedImage, setSelectedImage] = useState("");
  const [incomeType, setIncomeType] = useState("Weekly");
  const [selectedCountry, setSelectedCountry] = useState("Canada");
  const [rentAmt, setRentAmt] = useState(0);
  const [selectedFile, setSelectedFile] = useState<File>();
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | undefined>("");
  const delta = currentStep - previousStep;
  const session = useSession();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    trigger,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(FormDataSchema),
  });
  useEffect(() => {
    userInfo().then((data) => {
      if (data != undefined) {
        setCurrentStep(5);
      } else {
        setCurrentStep(0);
      }
    });
  }, []);

  const processForm: SubmitHandler<Inputs> = (data) => {
    // event.preventDefault();
    // Check if all checkboxes are checked
    setError("");
    const allChecked = Object.values(checkboxes).every((value) => value);
    if (allChecked) {
      // Perform form submission logic here
      setFormSubmitted(true);

      application(data).then((result) => {
        console.log(result);

        // reset()
      });
    } else {
      setError("Please checks all checkbox");
    }
  };

  const handleUpload = async () => {
    setUploading(true);
    try {
      if (!selectedFile) return;
      const formData = new FormData();
      formData.append("myImage", selectedFile);
      const { data } = await axios.post("/api/image", formData);
      console.log(data);
    } catch (error: any) {
      console.log(error.response?.data);
    }
    setUploading(false);
  };

  type FieldName = keyof Inputs;

  const next = async () => {
    const fields = steps[currentStep].fields;
    console.log(fields);
    const output = await trigger(fields as FieldName[], { shouldFocus: true });
    const allChecked = Object.values(checkboxes).every((value) => value);
    if (!output) return;

    if (currentStep < steps.length - 1) {
      if (currentStep === steps.length - 2) {
        await handleSubmit(processForm)();
      }
      setPreviousStep(currentStep);
      if (currentStep != 4 || allChecked) {
        setCurrentStep((step) => step + 1);
      }
    }
  };

  const prev = () => {
    if (currentStep > 0) {
      setPreviousStep(currentStep);
      setCurrentStep((step) => step - 1);
    }
  };

  const [selectedOption, setSelectedOption] = useState("platinum"); // Set the default selected option

  const handleOptionChange = (event: any) => {
    setSelectedOption(event.target.value); // Update the selected option when the user clicks on a radio button
  };

  const [checkboxes, setCheckboxes] = useState({
    checkbox1: false,
    checkbox2: false,
    checkbox3: false,
    checkbox4: false,
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleCheckboxChange = (event: any) => {
    const { name, checked } = event.target;
    setCheckboxes((prevState) => ({
      ...prevState,
      [name]: checked,
    }));
  };

  const handleIncomeLabel = (event: any) => {
    const type = event.target.value;
    setIncomeType(type);
    console.log(event.target.value);
  };
  const handleSelectedCountry = (event: any) => {
    setSelectedCountry(event.target.value);
  };

  const handleMembershipPlans = (event: any) => {
    const type = event.target.value;
    if (type > 1500) {
      setSelectedOption("gold");
    } else {
      setSelectedOption("platinum");
    }
    setRentAmt(type);
    console.log(event.target.value);
  };

  // const handleSubmit = (event:any) => {
  //   event.preventDefault();
  //   // Check if all checkboxes are checked
  //   const allChecked = Object.values(checkboxes).every((value) => value);
  //   if (allChecked) {
  //     // Perform form submission logic here
  //     setFormSubmitted(true);
  //   } else {
  //     alert('Please check all checkboxes before submitting.');
  //   }
  // };

  return (
    <>
      <nav aria-label="Progress">
        <ol role="list" className="space-y-4 md:flex md:space-x-8 md:space-y-0">
          {steps.map((step, index) => (
            <li key={step.name} className="md:flex-1">
              {currentStep > index ? (
                <div className="group flex w-full flex-col border-l-4 border-lime-600 py-2 pl-4 transition-colors md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4">
                  <span className="text-sm font-medium text-sky-600 transition-colors ">
                    {step.id}
                  </span>
                  <span className="text-sm font-medium">{step.name}</span>
                </div>
              ) : currentStep === index ? (
                <div
                  className="flex w-full flex-col border-l-4 border-lime-600 py-2 pl-4 md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4"
                  aria-current="step"
                >
                  <span className="text-sm font-medium text-lime-600">
                    {step.id}
                  </span>
                  <span className="text-sm font-medium">{step.name}</span>
                </div>
              ) : (
                <div className="group flex w-full flex-col border-l-4 border-gray-200 py-2 pl-4 transition-colors md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4">
                  <span className="text-sm font-medium text-gray-500 transition-colors">
                    {step.id}
                  </span>
                  <span className="text-sm font-medium">{step.name}</span>
                </div>
              )}
            </li>
          ))}
        </ol>
      </nav>

      {/* Form */}
      <form className="" onSubmit={handleSubmit(processForm)}>
        {currentStep === 0 && (
          <motion.div
            initial={{ x: delta >= 0 ? "50%" : "-50%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <h2 className="text-xl font-semibold leading-7 mt-4 text-gray-900 dark:text-white">
              Personal Information
            </h2>

            <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-4">
                <label
                  htmlFor="firstName"
                  className="block text-sm font-medium leading-6 text-gray-900 dark:text-white"
                >
                  First Name
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    id="firstname"
                    {...register("firstName")}
                    autoComplete="given-name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 dark:text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                  />
                  {errors.firstName?.message && (
                    <p className="mt-2 text-sm text-red-400">
                      {errors.firstName.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="sm:col-span-4">
                <label
                  htmlFor="lastName"
                  className="block text-sm font-medium leading-6 text-gray-900 dark:text-white"
                >
                  Last name
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    id="lastName"
                    {...register("lastName")}
                    autoComplete="family-name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 dark:text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                  />
                  {errors.lastName?.message && (
                    <p className="mt-2 text-sm text-red-400">
                      {errors.lastName.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="sm:col-span-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900 dark:text-white"
                >
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    type="email"
                    {...register("email")}
                    value={session.data?.user.email!}
                    readOnly
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 dark:text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                  />
                  {errors.email?.message && (
                    <p className="mt-2 text-sm text-red-400">
                      {errors.email.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="sm:col-span-4">
                <label
                  htmlFor="phonenumber"
                  className="block text-sm font-medium leading-6 text-gray-900 dark:text-white"
                >
                  Phone Number
                </label>
                <div className="mt-2">
                  <input
                    id="phonenumber"
                    type="number"
                    {...register("phonenumber")}
                    autoComplete="phonenumber"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 dark:text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                  />
                  {errors.phonenumber?.message && (
                    <p className="mt-2 text-sm text-red-400">
                      {errors.phonenumber.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="col-span-4">
                <label
                  htmlFor="street"
                  className="block text-sm font-medium leading-6 text-gray-900 dark:text-white"
                >
                  Street address
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    id="street"
                    {...register("street")}
                    autoComplete="street-address"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 dark:text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                  />
                  {errors.street?.message && (
                    <p className="mt-2 text-sm text-red-400">
                      {errors.street.message}
                    </p>
                  )}
                </div>
              </div>

              <div></div>
              <div className="sm:col-span-1/2 sm:col-start-1">
                <label
                  htmlFor="city"
                  className="block text-sm font-medium leading-6 text-gray-900 dark:text-white"
                >
                  City
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    id="city"
                    {...register("city")}
                    autoComplete="address-level2"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 dark:text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                  />
                  {errors.city?.message && (
                    <p className="mt-2 text-sm text-red-400">
                      {errors.city.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="sm:col-span-1/2">
                <label
                  htmlFor="state"
                  className="block text-sm font-medium leading-6 text-gray-900 dark:text-white"
                >
                  State / Province
                </label>
                <div className="mt-2">
                  <select
                    id="state"
                    {...register("state")}
                    autoComplete="address-level1"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 dark:text-white shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  >
                    {selectedCountry == "Canada" && (
                      <>
                        {canadaStateNames.map((name, key) => (
                          <option key={key} value={name}>
                            {name}
                          </option>
                        ))}
                      </>
                    )}
                    {selectedCountry == "United States" && (
                      <>
                        {usaStateNames.map((name, key) => (
                          <option key={key} value={name}>
                            {name}
                          </option>
                        ))}
                      </>
                    )}
                  </select>

                  {errors.state?.message && (
                    <p className="mt-2 text-sm text-red-400">
                      {errors.state.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="sm:col-span-1/2">
                <label
                  htmlFor="zip"
                  className="block text-sm font-medium leading-6 text-gray-900 dark:text-white"
                >
                  ZIP / Postal code
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    id="zip"
                    {...register("zip")}
                    autoComplete="postal-code"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 dark:text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                  />
                  {errors.zip?.message && (
                    <p className="mt-2 text-sm text-red-400">
                      {errors.zip.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="sm:col-span-1/2">
                <label
                  htmlFor="country"
                  className="block text-sm font-medium leading-6 text-gray-900 dark:text-white"
                >
                  Country
                </label>
                <div className="mt-2">
                  <select
                    id="country"
                    {...register("country")}
                    autoComplete="country-name"
                    onChange={handleSelectedCountry}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 dark:text-white shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  >
                    <option value="Canada">Canada</option>
                    <option value="United States">United States</option>
                  </select>
                  {errors.country?.message && (
                    <p className="mt-2 text-sm text-red-400">
                      {errors.country.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="sm:col-span-4">
                <div>
                  <div>
                    <label
                      htmlFor="identification"
                      className="block text-sm font-medium leading-6 text-gray-900 dark:text-white"
                    >
                      Identification
                    </label>
                    <div className="mt-2">
                      <input
                        type="file"
                        id="identification"
                        name="identification"
                        onChange={({ target }) => {
                          if (target.files) {
                            const file = target.files[0];
                            setSelectedImage(URL.createObjectURL(file));
                            setSelectedFile(file);
                          }
                        }}
                        autoComplete="postal-code"
                        // {...register('identification')}

                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 dark:text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                    <div>
                      <button
                        className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-1 px-2 my-1 border border-gray-400 rounded shadow"
                        disabled={uploading}
                        onClick={handleUpload}
                      >
                        {uploading ? "Uploading" : "upload"}
                      </button>
                    </div>
                  </div>

                  {/* {errors.identification?.message && (
                    <p className='mt-2 text-sm text-red-400'>
                      {errors.identification.message}
                    </p>
                  )} */}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {currentStep === 1 && (
          <motion.div
            initial={{ x: delta >= 0 ? "50%" : "-50%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <h2 className="text-xl font-semibold leading-7 text-gray-900 dark:text-white">
              Employment Detail
            </h2>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-4">
                <label
                  htmlFor="currentEmployer"
                  className="block text-sm font-medium leading-6 text-gray-900 dark:text-white"
                >
                  Current Employer:
                </label>
                <div className="mt-2">
                  <input
                    id="currentEmployer"
                    type="text"
                    {...register("currentEmployer")}
                    autoComplete="currentEmployer"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 dark:text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                  />
                  {errors.currentEmployer?.message && (
                    <p className="mt-2 text-sm text-red-400">
                      {errors.currentEmployer.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="sm:col-span-4">
                <label
                  htmlFor="jobTitle"
                  className="block text-sm font-medium leading-6 text-gray-900 dark:text-white"
                >
                  Job Title:
                </label>
                <div className="mt-2">
                  <input
                    id="jobTitle"
                    type="text"
                    {...register("jobTitle")}
                    autoComplete="jobTitle"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 dark:text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                  />
                  {errors.jobTitle?.message && (
                    <p className="mt-2 text-sm text-red-400">
                      {errors.jobTitle.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="sm:col-span-4">
                <label
                  htmlFor="empStatus"
                  className="block text-sm font-medium leading-6 text-gray-900 dark:text-white"
                >
                  Employment Status (Full-time/Part-time)
                </label>
                <div className="mt-2">
                  <select
                    id="empStatus"
                    {...register("empStatus")}
                    autoComplete="empStatus"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 dark:text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                  >
                    <option value="Full-Time">Full-time</option>
                    <option value="Part-Time">Part-time</option>
                  </select>
                  {errors.empStatus?.message && (
                    <p className="mt-2 text-sm text-red-400">
                      {errors.empStatus.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="sm:col-span-4">
                <label
                  htmlFor="payFreq"
                  className="block text-sm font-medium leading-6 text-gray-900 dark:text-white"
                >
                  Payment Frequency (Weekly, Bi-weekly, Monthly)
                </label>
                <div className="mt-2">
                  <select
                    id="payFreq"
                    {...register("payFreq")}
                    autoComplete="jobTitle"
                    onChange={handleIncomeLabel}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 dark:text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                  >
                    <option value="Weekly">Weekly</option>
                    <option value="Biweekly">Bi-weekly</option>
                    <option value="Monthly">Monthly</option>
                  </select>
                  {errors.payFreq?.message && (
                    <p className="mt-2 text-sm text-red-400">
                      {errors.payFreq.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="sm:col-span-4">
                <label
                  htmlFor="monthlyIncome"
                  className="block text-sm font-medium leading-6 text-gray-900 dark:text-white"
                >
                  {incomeType} Income Before Taxes
                </label>
                <div className="mt-2">
                  <input
                    id="monthlyIncome"
                    type="text"
                    {...register("monthlyIncome")}
                    autoComplete="jobTitle"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 dark:text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                  />
                  {errors.monthlyIncome?.message && (
                    <p className="mt-2 text-sm text-red-400">
                      {errors.monthlyIncome.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {currentStep === 2 && (
          <motion.div
            initial={{ x: delta >= 0 ? "50%" : "-50%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <h2 className="text-xl font-semibold leading-7 text-gray-900 dark:text-white">
              Rental Detail
            </h2>
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-4">
                <label
                  htmlFor="propAddress"
                  className="block text-sm font-medium leading-6 text-gray-900 dark:text-white"
                >
                  Rental Property Address
                </label>
                <div className="mt-2">
                  <input
                    id="propAddress"
                    type="text"
                    {...register("propAddress")}
                    autoComplete="propAddress"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 dark:text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                  />
                  {errors.propAddress?.message && (
                    <p className="mt-2 text-sm text-red-400">
                      {errors.propAddress.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="sm:col-span-4">
                <label
                  htmlFor="propType"
                  className="block text-sm font-medium leading-6 text-gray-900 dark:text-white"
                >
                  Type of Property
                </label>
                <div className="mt-2">
                  <select
                    id="propType"
                    {...register("propType")}
                    autoComplete="propType"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 dark:text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                  >
                    <option value="House">House</option>
                    <option value="Condominiums">Condominiums</option>
                    <option value="Townhouse">Townhouse</option>
                    <option value="Apartment">Apartment</option>
                  </select>
                  {errors.propType?.message && (
                    <p className="mt-2 text-sm text-red-400">
                      {errors.propType.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="sm:col-span-4">
                <label
                  htmlFor="propNoOfBeds"
                  className="block text-sm font-medium leading-6 text-gray-900 dark:text-white"
                >
                  Number of bedrooms
                </label>
                <div className="mt-2">
                  <input
                    id="propNoOfBeds"
                    type="number"
                    {...register("propNoOfBeds")}
                    autoComplete="propNoOfBeds"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 dark:text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                  />
                  {errors.propNoOfBeds?.message && (
                    <p className="mt-2 text-sm text-red-400">
                      {errors.propNoOfBeds.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="sm:col-span-4">
                <label
                  htmlFor="rentAmt"
                  className="block text-sm font-medium leading-6 text-gray-900 dark:text-white"
                >
                  Current Monthly Rent Amount
                </label>
                <div className="flex mt-2">
                  <input
                    id="rentAmt"
                    type="number"
                    {...register("rentAmt")}
                    placeholder="$"
                    autoComplete="rentAmt"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 dark:text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                    onChange={handleMembershipPlans}
                  />
                  {errors.rentAmt?.message && (
                    <p className="mt-2 text-sm text-red-400">
                      {errors.rentAmt.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="sm:col-span-4">
                <label
                  htmlFor="managerName"
                  className="block text-sm font-medium leading-6 text-gray-900 dark:text-white"
                >
                  Property Manager Name: (If applicable)
                </label>
                <div className="mt-2">
                  <input
                    id="managerName"
                    type="text"
                    {...register("managerName")}
                    autoComplete="managerName"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 dark:text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                  />
                  {errors.managerName?.message && (
                    <p className="mt-2 text-sm text-red-400">
                      {errors.managerName.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="sm:col-span-4">
                <label
                  htmlFor="manageCompany"
                  className="block text-sm font-medium leading-6 text-gray-900 dark:text-white"
                >
                  Property Management Company:
                </label>
                <div className="mt-2">
                  <input
                    id="manageCompany"
                    type="text"
                    {...register("manageCompany")}
                    autoComplete="jobTitle"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 dark:text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                  />
                  {errors.manageCompany?.message && (
                    <p className="mt-2 text-sm text-red-400">
                      {errors.manageCompany.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="sm:col-span-4">
                <label
                  htmlFor="propManagerEmail"
                  className="block text-sm font-medium leading-6 text-gray-900 dark:text-white"
                >
                  Property Manager&apos;s Email
                </label>
                <div className="mt-2">
                  <input
                    id="propManagerEmail"
                    type="text"
                    {...register("propManagerEmail")}
                    autoComplete="propManagerEmail"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 dark:text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                  />
                  {errors.propManagerEmail?.message && (
                    <p className="mt-2 text-sm text-red-400">
                      {errors.propManagerEmail.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="sm:col-span-4">
                <label
                  htmlFor="propManagerPhone"
                  className="block text-sm font-medium leading-6 text-gray-900 dark:text-white"
                >
                  Property Manager&apos;s Phone
                </label>
                <div className="mt-2">
                  <input
                    id="propManagerPhone"
                    type="text"
                    {...register("propManagerPhone")}
                    autoComplete="propManagerPhone"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 dark:text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                  />
                  {errors.propManagerPhone?.message && (
                    <p className="mt-2 text-sm text-red-400">
                      {errors.propManagerPhone.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="sm:col-span-4">
                <label
                  htmlFor="payMethod"
                  className="block text-sm font-medium leading-6 text-gray-900 dark:text-white"
                >
                  How do you currently pay your rent ( E-transfer, Bank, Cash,
                  Cheque):
                </label>
                <div className="mt-2">
                  <select
                    id="payMethod"
                    {...register("payMethod")}
                    autoComplete="jobTitle"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 dark:text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                  >
                    <option value="etransfer">E-transfer</option>
                    <option value="bank">Bank</option>
                    <option value="cash">Cash</option>
                    <option value="cheque">Cheque</option>
                  </select>
                  {errors.payMethod?.message && (
                    <p className="mt-2 text-sm text-red-400">
                      {errors.payMethod.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {currentStep === 3 && (
          <>
            <motion.div
              initial={{ x: delta >= 0 ? "50%" : "-50%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <h2 className="text-xl font-semibold leading-7 text-gray-900 dark:text-white">
                Financial Information
              </h2>
              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-4">
                  Authorization for Automatic Payment <input type="checkbox" />
                </div>

                <div className="sm:col-span-4">
                  <label
                    htmlFor="bankName"
                    className="block text-sm font-medium leading-6 text-gray-900 dark:text-white"
                  >
                    Bank Name
                  </label>
                  <div className="mt-2">
                    <input
                      id="bankName"
                      type="text"
                      {...register("bankName")}
                      autoComplete="jobTitle"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 dark:text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                    />
                    {errors.bankName?.message && (
                      <p className="mt-2 text-sm text-red-400">
                        {errors.bankName.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="sm:col-span-4">
                  <label
                    htmlFor="acctHoldName"
                    className="block text-sm font-medium leading-6 text-gray-900 dark:text-white"
                  >
                    Account Holder’s Name
                  </label>
                  <div className="mt-2">
                    <input
                      id="acctHoldName"
                      type="text"
                      {...register("acctHoldName")}
                      autoComplete="jobTitle"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 dark:text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                    />
                    {errors.acctHoldName?.message && (
                      <p className="mt-2 text-sm text-red-400">
                        {errors.acctHoldName.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="sm:col-span-4">
                  <label
                    htmlFor="acctNumber"
                    className="block text-sm font-medium leading-6 text-gray-900 dark:text-white"
                  >
                    Account Number
                  </label>
                  <div className="mt-2">
                    <input
                      id="acctNumber"
                      type="text"
                      {...register("acctNumber")}
                      autoComplete="jobTitle"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 dark:text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                    />
                    {errors.acctNumber?.message && (
                      <p className="mt-2 text-sm text-red-400">
                        {errors.acctNumber.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="sm:col-span-4">
                  <div className="flex ">
                    <div className="flex-2 me-3">
                      <label
                        htmlFor="routNumber"
                        className="block text-sm font-medium leading-6 text-gray-900 dark:text-white"
                      >
                        Institution Number
                      </label>
                      <div className="mt-2">
                        <input
                          id="instNumber"
                          type="text"
                          {...register("instNumber")}
                          autoComplete="instNumber"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 dark:text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                        />
                        {errors.instNumber?.message && (
                          <p className="mt-2 text-sm text-red-400">
                            {errors.instNumber.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex-1">
                      <label
                        htmlFor="routNumber"
                        className="block text-sm font-medium leading-6 text-gray-900 dark:text-white"
                      >
                        Transit Number
                      </label>
                      <div className="mt-2">
                        <input
                          id="routNumber"
                          type="text"
                          {...register("routNumber")}
                          autoComplete="jobTitle"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 dark:text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                        />
                        {errors.routNumber?.message && (
                          <p className="mt-2 text-sm text-red-400">
                            {errors.routNumber.message}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="sm:col-span-4">
                  <div>
                    <div>
                      <label
                        htmlFor="identification"
                        className="block text-sm font-medium leading-6 text-gray-900 dark:text-white"
                      >
                        Attach a direct deposit form or a cheque
                      </label>
                      <div className="mt-2">
                        <input
                          type="file"
                          id="cheque"
                          onChange={({ target }) => {
                            if (target.files) {
                              const file = target.files[0];
                              setSelectedImage(URL.createObjectURL(file));
                              setSelectedFile(file);
                            }
                          }}
                          // {...register('identification')}
                          autoComplete="postal-code"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 dark:text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                      <div>
                        <button
                          className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-1 px-2 my-1 border border-gray-400 rounded shadow"
                          disabled={uploading}
                          onClick={handleUpload}
                        >
                          {uploading ? "Uploading" : "upload"}
                        </button>
                      </div>
                    </div>

                    {/* {errors.identification?.message && (
                    <p className='mt-2 text-sm text-red-400'>
                      {errors.identification.message}
                    </p>
                  )} */}
                  </div>
                </div>

                <div className="sm:col-span-4 text-xl font-semibold leading-7 text-gray-900 dark:text-white">
                  <p>Membership Selection</p>
                </div>

                <div className="sm:col-span-4 ">
                  <div className="flex flex-col">
                    {rentAmt < 1500 && (
                      <div className="mb-2">
                        <label>
                          <input
                            className="me-1"
                            name="membership"
                            type="radio"
                            value="platinum"
                            checked={selectedOption === "platinum"} // Set checked attribute based on the selected option
                            onChange={handleOptionChange}
                          />
                          Platinum Membership ( $25/month, billed annually )
                        </label>
                      </div>
                    )}

                    <div>
                      <label>
                        <input
                          className="me-1"
                          name="membership"
                          type="radio"
                          value="gold"
                          checked={selectedOption === "gold"} // Set checked attribute based on the selected option
                          onChange={handleOptionChange}
                        />
                        Gold Membership ( $35/month, billed annually )
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}

        {currentStep === 4 && (
          <>
            <motion.div
              initial={{ x: delta >= 0 ? "50%" : "-50%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <h2 className="text-xl font-semibold leading-7 text-gray-900 dark:text-white">
                Additional Information
              </h2>
              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-4">
                  <label
                    htmlFor="hearAbtRx"
                    className="block text-sm font-medium leading-6 text-gray-900 dark:text-white"
                  >
                    How do you hear about Rentwallex
                  </label>
                  <div className="mt-2">
                    <select
                      id="hearAbtRx"
                      {...register("hearAbtRx")}
                      autoComplete="jobTitle"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 dark:text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                    >
                      <option value="wordofmouth">Word of Mouth</option>
                      <option value="rentalcompany">Rental Company</option>
                      <option value="socialmedia">Social Media</option>
                      <option value="google">Google</option>
                      <option value="other">Other</option>
                    </select>
                    {errors.hearAbtRx?.message && (
                      <p className="mt-2 text-sm text-red-400">
                        {errors.hearAbtRx.message}
                      </p>
                    )}
                  </div>
                </div>

                <h2 className="aggrement sm:col-span-4 text-xl font-semibold leading-7 text-gray-900 dark:text-white">
                  Aggrements and Consent:
                </h2>

                <div className="aggrement sm:col-span-4">
                  <input
                    type="checkbox"
                    name="checkbox1"
                    checked={checkboxes.checkbox1}
                    onChange={handleCheckboxChange}
                  />
                  I authorize Rentwallex to verify the information provided in
                  this application.
                </div>
                <div className="aggrement sm:col-span-4">
                  <input
                    type="checkbox"
                    name="checkbox2"
                    checked={checkboxes.checkbox2}
                    onChange={handleCheckboxChange}
                  />
                  I understand that Rentwallex will use my information to
                  process my rent financing application and provide related
                  services.
                </div>
                <div className="aggrement sm:col-span-4">
                  <input
                    type="checkbox"
                    name="checkbox3"
                    checked={checkboxes.checkbox3}
                    onChange={handleCheckboxChange}
                  />
                  I acknowledge that Rentwallex may contact me via email, phone,
                  or SMS for account-related purposes
                </div>
                <div className="aggrement sm:col-span-4">
                  <input
                    type="checkbox"
                    name="checkbox4"
                    checked={checkboxes.checkbox4}
                    onChange={handleCheckboxChange}
                  />
                  I confirm that I have read and agree to Rentwallex&apos;s
                  terms of service and privacy policy.
                </div>

                <div className="sm:col-span-4">
                  Please review your information carefully before submitting.
                  Upon receipt of your application, our team will review it and
                  contact you to proceed with the onboarding process.
                </div>
              </div>
              <div>
                <FormError message={error} />
              </div>
            </motion.div>
          </>
        )}

        {currentStep === 5 && (
          <>
            <h2 className="text-base font-semibold leading-7 text-gray-900 dark:text-white">
              Complete
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              Thank you for choosing Rentwallex. Please be patient untill our
              team review your application.
            </p>
          </>
        )}
      </form>

      {/* Navigation */}
      <div className="mt-8 pt-5">
        <div className="flex">
          {currentStep != 0 && (
            <button
              type="button"
              onClick={prev}
              disabled={currentStep === 0}
              hidden={currentStep == 5}
              className="rounded bg-white px-2 py-1 text-sm font-semibold text-sky-900 shadow-sm ring-1 ring-inset ring-sky-300 hover:bg-sky-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {/* <svg
  xmlns='http://www.w3.org/2000/svg'
  fill='none'
  viewBox='0 0 24 24'
  strokeWidth='1.5'
  stroke='currentColor'
  className='h-6 w-6'
>
  <path
    strokeLinecap='round'
    strokeLinejoin='round'
    d='M15.75 19.5L8.25 12l7.5-7.5'
  />
</svg> */}
              back
            </button>
          )}

          <button
            type="button"
            onClick={next}
            disabled={
              currentStep === steps.length - 1 &&
              !Object.values(checkboxes).every((value) => value)
            }
            hidden={currentStep == 5}
            className="rounded ml-2 bg-white px-2 py-1 text-sm font-semibold text-sky-900 shadow-sm ring-1 ring-inset ring-sky-300 hover:bg-sky-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {/* <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth='1.5'
              stroke='currentColor'
              className='h-6 w-6'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M8.25 4.5l7.5 7.5-7.5 7.5'
              />
            </svg> */}
            {currentStep == 4 && <p>submit</p>}
            {currentStep != 4 && <p>next</p>}
          </button>
        </div>
      </div>
    </>
  );
}
