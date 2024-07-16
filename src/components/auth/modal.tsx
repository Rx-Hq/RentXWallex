import React, { useState } from "react";

const Modal = ({ isVisible, onClose }: any) => {
  const [isChecked, setIsChecked] = useState(false);
  if (!isVisible) return null;

  const handleCheckboxChange = (e: any) => {
    setIsChecked(e.target.checked);
  };

  return (
    <div className="fixed z-0 inset-0 bg-opacity-25 backdrop-blur-sm flex justify-center items-center">
      <div className="w-[600px] h-[600px] flex flex-col">
        <button className="text-black text-sm place-self-end">X</button>
        <div className="bg-white overflow-scroll p-2 border-solid border-4 border-gray-600 rounded">
          <h1 className="text-center text-xl font-bold">
            Terms and Conditions
          </h1>

          <div className="terms-container">
            <div className="terms-condition">
              <p>
                Please read these terms and conditions (&quot;terms and
                conditions, terms&quot;) carefully before using [website URL]
                website (&quot;website&quot;, &quot;service&quot;) operated by
                [company name] (&quot;us&quot;, &quot;we&quot;,
                &quot;our&quot;).
              </p>
            </div>

            <div className="terms-condition">
              <p>
                Conditions of use: By using this website, you certify that you
                have read and reviewed this Agreement and that you agree to
                comply with its terms. If you do not want to be bound by the
                terms of this Agreement, you are advised to stop using the
                website accordingly. [company name] only grants use and access
                of this website, its products, and its services to those who
                have accepted its terms.
              </p>
            </div>

            <div className="terms-condition">
              <p>
                Privacy policy: Before you continue using our website, we advise
                you to read our privacy policy [link to privacy policy]
                regarding our user data collection. It will help you better
                understand our practices.
              </p>
            </div>

            <div className="terms-condition">
              <p>
                Age restriction: You must be at least 18 (eighteen) years of age
                before you can use this website. By using this website, you
                warrant that you are at least 18 years of age and you may
                legally adhere to this Agreement. [company name] assumes no
                responsibility for liabilities related to age misrepresentation.
              </p>
            </div>
            <div className="terms-condition">
              <p>
                Intellectual property: You agree that all materials, products,
                and services provided on this website are the property of
                [company name], its affiliates, directors, officers, employees,
                agents, suppliers, or licensors including all copyrights, trade
                secrets, trademarks, patents, and other intellectual property.
                You also agree that you will not reproduce or redistribute the
                [company name]’s intellectual property in any way, including
                electronic, digital, or new trademark registrations
              </p>
            </div>
            <div className="terms-condition">
              <p>
                User accounts : As a user of this website, you may be asked to
                register with us and provide private information. You are
                responsible for ensuring the accuracy of this information, and
                you are responsible for maintaining the safety and security of
                your identifying information. Website terms and conditions
                template by WebsitePolicies.com You are also responsible for all
                activities that occur under your account or password. If you
                think there are any possible issues regarding the security of
                your account on the website, inform us immediately so we may
                address them accordingly. We reserve all rights to terminate
                accounts, edit or remove content and cancel orders at our sole
                discretion.
              </p>
            </div>
            <div className="terms-condition">
              <p>
                Applicable law : By using this website, you agree that the laws
                of the [your location], without regard to principles of conflict
                laws, will govern these terms and conditions, or any dispute of
                any sort that might come between [company name] and you, or its
                business partners and associates
              </p>
            </div>
            <div className="terms-condition">
              <p>
                Disputes : Any dispute related in any way to your use of this
                website or to products you purchase from us shall be arbitrated
                by state or federal court [your location] and you consent to
                exclusive jurisdiction and venue of such courts.
              </p>
            </div>
            <div className="terms-condition">
              <p>
                Indemnification : You agree to indemnify [company name] and its
                affiliates and hold [company name] harmless against legal claims
                and demands that may arise from your use or misuse of our
                services. We reserve the right to select our own legal counsel.
              </p>
            </div>
            <div className="terms-condition">
              <p>
                Limitation on liability : [company name] is not liable for any
                damages that may occur to you as a result of your misuse of our
                website. [company name] reserves the right to edit, modify, and
                change this Agreement at any time. We shall let our users know
                of these changes through electronic mail. This Agreement is an
                understanding between [company name] and the user, and this
                supersedes and replaces all prior agreements regarding the use
                of this website.
              </p>
            </div>
          </div>

          <div className="py-2">
            <input
              type="checkbox"
              checked={isChecked}
              onChange={handleCheckboxChange}
            />
            <span className="font-medium">
              {" "}
              I agree to all terms and conditions
            </span>
          </div>
          <div className="text-center">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
              onClick={() => onClose()}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
