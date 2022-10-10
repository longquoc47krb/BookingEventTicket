import { useFormik } from "formik";
import React from "react";
import * as Yup from "yup";
import Organization from "../../assets/organization.svg";
import Footer from "../../components/common/footer";
import Header from "../../components/common/header";
import { YupValidations } from "../../utils/validate";
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
        <img src={Organization} alt="organization" className="w-[45%]" />
        <div class="organization-register">
          <h1>Trở thành Nhà Tổ Chức Sự kiện</h1>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default OrganizeRegistration;
