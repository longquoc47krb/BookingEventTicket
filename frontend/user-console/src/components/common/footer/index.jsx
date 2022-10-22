/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import AppConfig from "../../../configs/AppConfig";
const { MENU_ORG, SOCIAL_MENU } = AppConfig;
function Footer() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  return (
    <footer class="p-4 bg-white sm:p-6 dark:bg-gray-900 footer-container">
      <div class="md:flex md:justify-between">
        <div class="mb-6 md:mb-0">
          <a href="/" class="flex items-center">
            <img
              src={process.env.PUBLIC_URL + "/logo.png"}
              class="mr-3 h-12"
              alt="Lotus Ticket Logo"
              onClick={() => navigate("/")}
            />
            <span
              style={{ fontFamily: "Montserrat" }}
              class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white"
            >
              Lotus Ticket
            </span>
          </a>
          <h1 className="text-white text-base mt-2">{t("lotus.slogan")}</h1>{" "}
          <hr className="border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-4" />
          {/* <img src={lincense} alt="" className="h-16 absolute top-24 left-4" /> */}
        </div>
        <div class="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
          <div>
            <h2 class="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
              {t("lotus.follow-us")}
            </h2>
            <ul class="text-gray-600 dark:text-gray-400 flex gap-x-2">
              {SOCIAL_MENU.map((item, index) => (
                <a href={item.link}>{item.icon}</a>
              ))}
            </ul>
          </div>
          <div>
            <h2 class="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
              {t("org.menu")}
            </h2>
            <ul class="text-gray-600 dark:text-gray-400">
              {MENU_ORG.map((item, index) => (
                <li class="mb-4">
                  <a href={item.link} class="hover:underline" target={"_blank"}>
                    {t(item.label)}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 class="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
              Legal
            </h2>
            <ul class="text-gray-600 dark:text-gray-400">
              <li class="mb-4">
                <a href="#" class="hover:underline">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" class="hover:underline">
                  Terms &amp; Conditions
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <hr class="my-6 border-gray-200 sm:mx-auto dark:border-gray-300 lg:my-8" />
      <div class="flex items-center justify-center">
        <span class="text-sm text-gray-500 sm:text-center dark:text-gray-400">
          © 2022{" "}
          <a href="/" class="hover:underline">
            Lotus Ticket™
          </a>
          . All Rights Reserved.
        </span>
      </div>
    </footer>
  );
}

export default Footer;
