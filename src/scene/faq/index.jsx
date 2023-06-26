import React, { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { Link } from "react-router-dom";

const FAQ = () => {
  const [faq1, setFaq1] = useState(false);
  const [faq2, setFaq2] = useState(false);
  const [faq3, setFaq3] = useState(false);
  const [faq4, setFaq4] = useState(false);
  const [faq5, setFaq5] = useState(false);
  const [faq6, setFaq6] = useState(false);
  const [faq7, setFaq7] = useState(false);
  const [faq8, setFaq8] = useState(false);

  const handleFaq1 = () => {
    setFaq1(!faq1);
  };
  const handleFaq2 = () => {
    setFaq2(!faq2);
  };
  const handleFaq3 = () => {
    setFaq3(!faq3);
  };
  const handleFaq4 = () => {
    setFaq4(!faq4);
  };
  const handleFaq5 = () => {
    setFaq5(!faq5);
  };
  const handleFaq6 = () => {
    setFaq6(!faq6);
  };
  const handleFaq7 = () => {
    setFaq7(!faq7);
  };
  const handleFaq8 = () => {
    setFaq8(!faq8);
  };

  return (
    <div>
      <section className=" py-[48px] px-[30px]   relative md:px-[80px] lg:px-[130px]">
        <h2 className="text-[1.7rem] lg:text-[2.5rem] font-extrabold text-center text-gray-600 tracking-wide mb-3">
          Frequently Asked Questions
        </h2>
        <div className="py-7 border-t border-b ">
          <div className="flex justify-between items-center mb-2">
            <p className="text-gray-500 font-bold text-lg">
              When do i get my settlement?
            </p>{" "}
            {faq1 ? (
              <button onClick={handleFaq1}>
                <IoIosArrowUp />{" "}
              </button>
            ) : (
              <button onClick={handleFaq1}>
                <IoIosArrowDown />
              </button>
            )}
          </div>
          {faq1 ? (
            <p className="py-4 px-5 bg-slate-100">
              All settlement will be received the next day for local payments.
              International payment varies depending on your region.
            </p>
          ) : (
            ""
          )}
        </div>
        <div className="py-7  border-b ">
          <div className="flex justify-between items-center mb-2">
            <p className="text-gray-500 font-bold text-lg">
              Who pay for the transaction charge?
            </p>{" "}
            {faq2 ? (
              <button onClick={handleFaq2}>
                <IoIosArrowUp />{" "}
              </button>
            ) : (
              <button onClick={handleFaq2}>
                <IoIosArrowDown />
              </button>
            )}
          </div>
          {faq2 ? (
            <p className="py-4 px-5 bg-slate-100">
              By default, your customers bear the transaction charges. You can
              change this on your dashboard anytime to your preference.
            </p>
          ) : (
            ""
          )}
        </div>
        <div className="py-7  border-b ">
          <div className="flex justify-between items-center mb-2">
            <p className="text-gray-500 font-bold text-lg">
              Can I get settled in USD
            </p>{" "}
            {faq3 ? (
              <button onClick={handleFaq3}>
                <IoIosArrowUp />{" "}
              </button>
            ) : (
              <button onClick={handleFaq3}>
                <IoIosArrowDown />
              </button>
            )}
          </div>
          {faq3 ? (
            <p className="py-4 px-5 bg-slate-100">
              Settlement in USD to a local domicilliary account in
              our settlement bank
            </p>
          ) : (
            ""
          )}
        </div>
        <div className="py-7  border-b ">
          <div className="flex justify-between items-center mb-2">
            <p className="text-gray-500 font-bold text-lg">
              How can I contact support for other questions?
            </p>{" "}
            {faq4 ? (
              <button onClick={handleFaq4}>
                <IoIosArrowUp />{" "}
              </button>
            ) : (
              <button onClick={handleFaq4}>
                <IoIosArrowDown />
              </button>
            )}
          </div>
          {faq4 ? (
            <p className="py-4 px-5 bg-slate-100">You can send an email to</p>
          ) : (
            ""
          )}
        </div>

        <div className="py-7  border-b ">
          <div className="flex justify-between items-center mb-2">
            <p className="text-gray-500 font-bold text-lg">
              I signed up for Paylode and I'm yet to receive a
              verification/confirmation email
            </p>{" "}
            {faq5 ? (
              <button onClick={handleFaq5}>
                <IoIosArrowUp />{" "}
              </button>
            ) : (
              <button onClick={handleFaq5}>
                <IoIosArrowDown />
              </button>
            )}
          </div>
          {faq5 ? (
            <p className="py-4 px-5 bg-slate-100 text-justify">
              Double-check to confirm that the email you entered was accurate.
              Check your spam/promotion emails. Emails sent from Flutterwave are
              sent via info@paylode.net Please whitelist this address on your
              mailbox. <br /> <br /> If you still don't find the email, click
              the resend email link on your sign-up screen. <br /> <br /> After
              3 attempts and waiting for at least an hour, if you still don't
              receive a mail, please send a message to our support handles
              (Instagram & Facebook) or email us: sales@paylodeservices.com
              stating this issue. Learn more here
            </p>
          ) : (
            ""
          )}
        </div>

        <div className="py-7  border-b ">
          <div className="flex justify-between items-center mb-2">
            <p className="text-gray-500 font-bold text-lg">
              How much does it cost to create a Paylode account?
            </p>{" "}
            {faq6 ? (
              <button onClick={handleFaq6}>
                <IoIosArrowUp />{" "}
              </button>
            ) : (
              <button onClick={handleFaq6}>
                <IoIosArrowDown />
              </button>
            )}
          </div>
          {faq6 ? (
            <p className="py-4 px-5 bg-slate-100 text-justify">
              Nothing! You can create an account and set it up to receive
              payments on Paylode completely free. Flutterwave only charges
              fees per transaction on transfers and payments you receive. You
              can find more information on Paylode pricing <a href="http://paylodeservices.com/pricing" target="blank" className="text-[#124072] underline">here</a>
            </p>
          ) : (
            ""
          )}
        </div>

        <div className="py-7  border-b ">
          <div className="flex justify-between items-center mb-2">
            <p className="text-gray-500 font-bold text-lg">
              Can I get settled in USD
            </p>{" "}
            {faq7 ? (
              <button onClick={handleFaq7}>
                <IoIosArrowUp />{" "}
              </button>
            ) : (
              <button onClick={handleFaq7}>
                <IoIosArrowDown />
              </button>
            )}
          </div>
          {faq7 ? (
            <p className="py-4 px-5 bg-slate-100">
              Settlement in USD to a local domicilliary account in
              our settlement bank
            </p>
          ) : (
            ""
          )}
        </div>

        <div className="py-7  border-b ">
          <div className="flex justify-between items-center mb-2">
            <p className="text-gray-500 font-bold text-lg">
              Can I get settled in USD
            </p>{" "}
            {faq8 ? (
              <button onClick={handleFaq8}>
                <IoIosArrowUp />{" "}
              </button>
            ) : (
              <button onClick={handleFaq8}>
                <IoIosArrowDown />
              </button>
            )}
          </div>
          {faq8 ? (
            <p className="py-4 px-5 bg-slate-100">
              Settlement in USD to a local domicilliary account in
              our settlement bank
            </p>
          ) : (
            ""
          )}
        </div>

        <div></div>
      </section>
    </div>
  );
};

export default FAQ;
