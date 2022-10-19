import { useFormik } from "formik";
import React, { useEffect } from "react";
import * as Yup from "yup";
import Organization from "../../assets/organization.svg";
import Carousel from "../../components/common/carousel";
import Footer from "../../components/common/footer";
import Header from "../../components/common/header";
import { YupValidations } from "../../utils/validate";
import AppConfig from "../../configs/AppConfig";
const { ORGANIZER_CAROUSEL } = AppConfig;
function OrganizeRegistration() {
  const initialValues = {
    name: "",
    email: "",
    organization_name: "",
  };
  // formik
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: Yup.object().shape({
      name: YupValidations.name,
      email: YupValidations.email,
      organization_name: YupValidations.name,
    }),
    onSubmit: (values) => {},
  });
  return (
    <>
      <Header />
      <div className="organization-container">
        <img
          src={ORGANIZER_CAROUSEL[2].background}
          className="w-full organization-background"
          alt="organizer-background"
        />
      </div>
      <Footer />
    </>
  );
}

export default OrganizeRegistration;
