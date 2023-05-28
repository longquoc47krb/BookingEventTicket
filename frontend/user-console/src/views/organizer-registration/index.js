/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable no-unused-vars */
import { Field, Form, FormikProvider, useFormik } from "formik";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import Footer from "../../components/common/footer";
import Header from "../../components/common/header";
import Marquee from "react-fast-marquee";
import { YupValidations } from "../../utils/validate";
import AppConfig from "../../configs/AppConfig";
import { useTranslation } from "react-i18next";
import wowjs from "wowjs";
import Organizer from "../../assets/Approved.svg";
import { Col, Row } from "antd";
import { Input } from "../../components/common/input/customField";
import organizationServices from "../../api/services/organizationServices";
import { useNavigate } from "react-router-dom";
import { AlertErrorPopup, AlertPopup } from "../../components/common/alert";
import ThreeDotsLoading from "../../components/loading/three-dots";
import accountServices, {
  useFindAllOrganizers,
} from "../../api/services/accountServices";
import Skeleton from "react-loading-skeleton";
const {
  ORGANIZER_CAROUSEL,
  ORGANIZER_LANDINGPAGE_PICTURE,
  ORGANIZATION_INTRODUCE_ITEM,
  ORGANIZATION_PARTNERS,
} = AppConfig;
const { submitOrganizer } = organizationServices;
function OrganizeRegistration() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { data: organizers, isLoading } = useFindAllOrganizers();
  console.log({ organizers });
  useEffect(() => {
    new wowjs.WOW().init();
  }, []);
  const initialValues = {
    name: "",
    email: "",
    phoneNumber: "",
  };
  var y = window.scrollY;

  // formik
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: Yup.object().shape({
      name: YupValidations.name,
      email: YupValidations.email,
      phoneNumber: YupValidations.phone,
    }),
    onSubmit: async (values) => {
      const { email, name, phoneNumber } = values;
      setLoading(true);
      const response = await submitOrganizer({
        email,
        name,
        phoneNumber,
      });
      if (response.status === 200) {
        setLoading(false);
        AlertPopup({
          title: t("popup.organizer.success"),
          text: t("popup.organizer.success-text"),
        });
      } else {
        setLoading(false);
        AlertErrorPopup({
          title: t("popup.organizer.error"),
          text: t("popup.organizer.error-text"),
        });
      }
    },
  });
  const { handleSubmit } = formik;
  return (
    <>
      <Header />
      <div className="organization-container">
        <div class="organization-background">
          <img
            src={ORGANIZER_CAROUSEL[2].background}
            alt="organizer-background"
            className="w-full h-full object-cover"
          />
          <div className="w-[80vw]">
            <h1 className="wow fadeInUp" data-wow-delay="0.5s">
              {t("lotus.big-slogan")}
            </h1>
            <p className="wow fadeInUp" data-wow-delay="1s">
              {t("lotus.description")}
            </p>
          </div>
        </div>
        <section className="organization-section-1">
          <img src={ORGANIZER_LANDINGPAGE_PICTURE[0]} alt="figure-1" />
          <div className="organization-info-1">
            <h1 className="wow zoomIn" data-wow-offset="20">
              {t("lotus.introduce")}
            </h1>
            <div className="organization-grid">
              {ORGANIZATION_INTRODUCE_ITEM.map((item) => (
                <div
                  className="item wow flipInX"
                  data-wow-delay={item.delay}
                  data-wow-duration="2s"
                  data-wow-offset="20"
                >
                  {item.icon}
                  <div class="block">
                    <span className="text-white text-xl font-semibold">
                      {t(item.title)}
                    </span>
                    <p className="text-white">{t(item.content)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="organization-section-2">
          <h1
            className="organization-partners-title wow zoomIn"
            data-wow-delay="1s"
          >
            {t("lotus.partners")}
          </h1>
          <Marquee>
            <div class="flex w-screen items-center justify-around">
              {isLoading
                ? [...Array(10)].map((item) => (
                    <Skeleton width={100} height={100} />
                  ))
                : organizers?.map((item, index) => (
                    <img
                      key={index}
                      src={item.avatar}
                      alt={`Image-${index}`}
                      className="inline-block mr-8 hover:cursor-pointer rounded-lg"
                      onClick={() => navigate(`/organizer-profile/${item.id}`)}
                    />
                  ))}
            </div>
          </Marquee>
        </section>
        <section className="organization-section-3">
          <div
            className="organization-register-form wow pulse"
            data-wow-offset="10"
            data-wow-duration="1s"
          >
            <FormikProvider value={formik}>
              <Form className="organization-form" onSubmit={handleSubmit}>
                <h1 className="text-white font-bold text-2xl text-center uppercase">
                  {t("org.become-an-org")}
                </h1>
                <Row
                  align="middle"
                  style={{
                    height: "auto",
                    display: "flex",
                    alignContent: "center",
                  }}
                  gutter={[0, 8]}
                >
                  <Col flex={4}>
                    <h1 className="text-white text-lg">{t("org.name")}</h1>
                    <Field component={Input} name="name" />
                  </Col>
                </Row>
                <Row
                  align="middle"
                  style={{
                    height: "auto",
                    display: "flex",
                    alignContent: "center",
                  }}
                  gutter={[0, 8]}
                >
                  <Col flex={4}>
                    <h1 className="text-white text-lg">Email</h1>
                    <Field component={Input} name="email" />
                  </Col>
                </Row>
                <Row
                  align="middle"
                  style={{
                    height: "auto",
                    display: "flex",
                    alignContent: "center",
                  }}
                  gutter={[0, 8]}
                >
                  <Col flex={4}>
                    <h1 className="text-white text-lg">{t("user.phone")}</h1>
                    <Field component={Input} name="phoneNumber" />
                  </Col>
                </Row>
                <Col span={24}>
                  <button
                    className="primary-button w-[50%] text-xl"
                    type="submit"
                  >
                    {loading ? <ThreeDotsLoading /> : t("submit")}
                  </button>
                </Col>
              </Form>
            </FormikProvider>
          </div>
          <div className="vertical-line"></div>
          <div className="organization-register-contact">
            <img
              src={Organizer}
              className="w-full h-auto"
              alt="organizer-illustration"
            />
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}

export default OrganizeRegistration;
